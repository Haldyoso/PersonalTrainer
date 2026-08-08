/**
 * encrypt.mjs — zašifruje čitateľný JSON do modulu, ktorý smie ísť do verejného repozitára.
 *
 *   node tools/encrypt.mjs strava.source.json assets/js/data/strava.enc.js STRAVA_ENC
 *
 * Kód sa zadáva do výzvy, nie ako argument — argumenty príkazov sa ukladajú
 * do histórie shellu a tam kód nemá čo robiť.
 *
 * Čo to robí:
 *   1. z kódu odvodí kľúč cez PBKDF2-SHA-256, 600 000 iterácií, náhodná soľ
 *   2. obsah zašifruje AES-256-GCM s náhodným IV
 *   3. zapíše soľ, IV a šifrovaný text v base64
 *
 * Prečo 600 000 iterácií: zašifrovaný súbor je verejný, takže kód sa dá skúšať
 * mimo stránky, bez limitu pokusov. Iterácie predražia jeden pokus. Krátky kód
 * to však nezachráni — musí byť dlhý.
 *
 * Rozšifrovať to isté vie prehliadač cez WebCrypto (assets/js/render/locked.js).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { pbkdf2Sync, randomBytes, createCipheriv } from 'node:crypto';
import { createInterface } from 'node:readline';

const ITERATIONS = 600_000;
const MIN_LENGTH = 12;

const args = process.argv.slice(2);
const allowWeak = args.includes('--allow-weak');
const [input, output, exportName = 'LOCKED_ENC'] = args.filter((a) => !a.startsWith('--'));

if (!input || !output) {
  console.error('Použitie: node tools/encrypt.mjs <vstup.json> <vystup.js> [NAZOV_EXPORTU] [--allow-weak]');
  process.exit(1);
}

/**
 * Koľko zhruba stojí prejsť celý priestor kódu na jednej hernej grafickej karte.
 * Slúži na to, aby sa krátky kód nepoužil omylom — nie na presnú predpoveď.
 * Východisko: ~10 000 pokusov za sekundu pri 600 000 iteráciách PBKDF2-SHA-256.
 */
function crackEstimate(code) {
  const classes = [[/[a-z]/, 26], [/[A-Z]/, 26], [/[0-9]/, 10], [/[^a-zA-Z0-9]/, 33]];
  const alphabet = classes.reduce((n, [re, size]) => n + (re.test(code) ? size : 0), 0);
  const space = Math.pow(alphabet, code.length);
  const seconds = space / 10_000 / 2; // v priemere polovica priestoru
  if (seconds < 60) return `~${Math.round(seconds)} sekúnd`;
  if (seconds < 3600) return `~${Math.round(seconds / 60)} minút`;
  if (seconds < 86400 * 365) return `~${Math.round(seconds / 86400)} dní`;
  const years = seconds / (86400 * 365);
  return years > 1e9 ? 'prakticky nikdy' : `~${Math.round(years).toLocaleString('sk-SK')} rokov`;
}

/** Načíta kód bez toho, aby sa objavil v histórii shellu. */
function askPassphrase() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question('Kód (nezobrazuje sa nikde inde): ', (a) => {
    rl.close();
    resolve(a.trim());
  }));
}

const passphrase = process.env.STRAVA_CODE || await askPassphrase();
const estimate = crackEstimate(passphrase);

if (passphrase.length < MIN_LENGTH && !allowWeak) {
  console.error(`Kód má ${passphrase.length} znakov, minimum je ${MIN_LENGTH}.`);
  console.error(`Odhadovaný čas na prelomenie na jednej grafickej karte: ${estimate}.`);
  console.error('');
  console.error('Zašifrovaný súbor je verejný, takže sa dá stiahnuť a skúšať bez limitu pokusov.');
  console.error('Ak to je vedomé rozhodnutie, zopakuj príkaz s --allow-weak.');
  process.exit(1);
}

if (passphrase.length < MIN_LENGTH) {
  console.warn(`⚠ Krátky kód (${passphrase.length} znakov). Odhadovaný čas na prelomenie: ${estimate}.`);
  console.warn('  Zastaví náhodného návštevníka, nie niekoho, kto obsah naozaj chce.');
  console.warn('');
}

const plaintext = readFileSync(input, 'utf8');
JSON.parse(plaintext); // ak zdroj nie je platný JSON, nech to padne tu a nie v prehliadači

const salt = randomBytes(16);
const iv = randomBytes(12);
const key = pbkdf2Sync(passphrase, salt, ITERATIONS, 32, 'sha256');

const cipher = createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
const tag = cipher.getAuthTag();

const payload = {
  v: 1,
  alg: 'AES-GCM',
  kdf: 'PBKDF2-SHA-256',
  iter: ITERATIONS,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  // WebCrypto očakáva overovací tag pripojený za šifrovaný text
  ct: Buffer.concat([ct, tag]).toString('base64')
};

writeFileSync(output, `/**
 * ${output.split('/').pop()} — GENEROVANÉ, needituj ručne.
 *
 * Zašifrovaný obsah. Bez kódu je to nečitateľný blok znakov, takže smie byť
 * vo verejnom repozitári. Čitateľný zdroj je v ${input}, ktorý je v .gitignore.
 *
 * Zmena obsahu:  node tools/encrypt.mjs ${input} ${output} ${exportName}
 */
export const ${exportName} = ${JSON.stringify(payload, null, 2)};
`, 'utf8');

console.log(`Hotovo: ${output}`);
console.log(`  vstup      ${plaintext.length} znakov`);
console.log(`  šifrované  ${payload.ct.length} znakov base64`);
console.log(`  iterácie   ${ITERATIONS.toLocaleString('sk-SK')}`);
console.log(`  odolnosť   ${estimate} na jednej grafickej karte`);
