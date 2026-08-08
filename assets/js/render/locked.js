/**
 * locked.js — odomykanie zašifrovanej sekcie priamo v prehliadači.
 *
 * Zámerne to NIE je „skrytý div, ktorý sa po hesle ukáže". Taká vec nechráni nič —
 * obsah by bol v stiahnutom súbore a stačilo by pozrieť zdroj stránky. Tu je
 * v repozitári uložený len šifrovaný text; bez kódu z neho nie je ako dostať nič.
 *
 * Postup je presne obrátený k tools/encrypt.mjs:
 *   kód → PBKDF2-SHA-256 (600 000 iterácií, soľ zo súboru) → AES-256-GCM
 *
 * Čo to NEchráni, aby v tom nebol zmätok:
 *   · kód sa nedá odvolať — kto ho raz dostane, obsah si môže uložiť navždy
 *   · šifrovaný súbor je verejný, takže kód sa dá skúšať mimo stránky bez limitu
 *     pokusov; preto musí byť dlhý, nie „strava2026"
 *   · nie je to prihlásenie, nevieš kto a kedy sekciu otvoril
 *
 * WebCrypto potrebuje bezpečný kontext — na https aj na http://localhost funguje,
 * pri otvorení súboru cez file:// nie.
 */

import { $ } from '../util.js';

const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

/** Odvodí kľúč z kódu. Trvá to skoro sekundu — to je zámer, nie pomalý kód. */
async function deriveKey(passphrase, salt, iterations) {
  const base = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

/**
 * Vráti rozšifrovaný objekt, alebo null pri zlom kóde.
 * AES-GCM overuje aj neporušenosť, takže zlý kód nevydá nezmysly — proste zlyhá.
 */
export async function decrypt(payload, passphrase) {
  try {
    const key = await deriveKey(passphrase, b64(payload.salt), payload.iter);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: b64(payload.iv) }, key, b64(payload.ct)
    );
    return JSON.parse(new TextDecoder().decode(plain));
  } catch {
    return null;
  }
}

/**
 * Postaví zámok nad sekciou.
 *
 * @param {object} o
 * @param {string} o.mount      selektor prvku, do ktorého sa vykreslí zámok aj obsah
 * @param {object} o.payload    zašifrovaný blok z data/*.enc.js
 * @param {string} o.storageKey kľúč v localStorage, aby sa kód nemusel písať zakaždým
 * @param {(data:object, el:HTMLElement)=>void} o.render  vykreslí rozšifrovaný obsah
 */
export function lockedSection({ mount, payload, storageKey, render }) {
  const host = $(mount);
  if (!host) return;

  if (!window.isSecureContext || !crypto?.subtle) {
    host.innerHTML = `<div class="note bad"><b>Tu to nepôjde</b>
      Odomykanie potrebuje zabezpečené spojenie. Otvor stránku cez
      <span class="mono">https://</span> alebo <span class="mono">http://localhost</span> —
      priamo z disku (<span class="mono">file://</span>) prehliadač šifrovanie nepovolí.</div>`;
    return;
  }

  const showLock = (message) => {
    host.innerHTML = `<div class="lockbox">
      <h3>Zamknuté</h3>
      <p>Táto časť je v repozitári uložená zašifrovaná. Bez kódu je to nečitateľný blok znakov — nedá sa obísť pozretím zdroja stránky.</p>
      <form class="lockform" novalidate>
        <input type="password" id="lock-code" autocomplete="current-password"
               placeholder="Kód" aria-label="Kód na odomknutie" spellcheck="false">
        <button class="btn" type="submit">Odomknúť</button>
      </form>
      <p class="lockmsg" role="status">${message || ''}</p>
      <label class="lockremember"><input type="checkbox" id="lock-remember" checked> Zapamätať v tomto prehliadači</label>
    </div>`;

    const form = host.querySelector('.lockform');
    const input = host.querySelector('#lock-code');
    const msg = host.querySelector('.lockmsg');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const code = input.value.trim();
      if (!code) return;
      msg.textContent = 'Odomykám…';
      form.querySelector('button').disabled = true;

      const data = await decrypt(payload, code);
      if (!data) {
        form.querySelector('button').disabled = false;
        msg.textContent = 'Zlý kód. Skús znova — na veľkosti písmen záleží.';
        input.select();
        return;
      }
      if (host.querySelector('#lock-remember').checked) {
        try { localStorage.setItem(storageKey, code); } catch { /* súkromné okno */ }
      }
      unlocked(data);
    });

    input.focus();
  };

  const unlocked = (data) => {
    host.innerHTML = '<div class="unlocked"></div>';
    render(data, host.querySelector('.unlocked'));

    const bar = document.createElement('p');
    bar.className = 'lockbar noprint';
    bar.innerHTML = '<button class="fchip" type="button">Zamknúť a zabudnúť kód</button>';
    bar.querySelector('button').addEventListener('click', () => {
      try { localStorage.removeItem(storageKey); } catch { /* nič */ }
      showLock('Kód zabudnutý.');
    });
    host.prepend(bar);
  };

  // uložený kód skús automaticky — po zmene obsahu prestane platiť a zámok sa vráti
  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch { /* nič */ }
  if (!saved) { showLock(); return; }

  showLock('Skúšam uložený kód…');
  decrypt(payload, saved).then((data) => {
    if (data) unlocked(data);
    else {
      try { localStorage.removeItem(storageKey); } catch { /* nič */ }
      showLock('Uložený kód už neplatí — obsah sa medzitým zmenil.');
    }
  });
}
