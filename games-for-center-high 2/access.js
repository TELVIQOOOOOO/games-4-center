/* ===== GAMES FOR CENTER HIGH — access code system =====
   No server needed. A code is valid if its checksum matches
   a value derived from a secret salt baked into this file.
   Change SALT below any time to invalidate every old code
   (e.g. if a code leaks around school) and re-share fresh ones.
*/
const CHG_SALT = "danny-center-high-2026";
const CHG_UNLOCK_KEY = "chg_unlocked";
const CHG_LOG_KEY = "chg_admin_log";

function chgHash(str) {
  let h = 0;
  const s = str + CHG_SALT;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(h, 31) + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function chgBase36(n, len) {
  let s = n.toString(36).toUpperCase();
  while (s.length < len) s = "0" + s;
  return s.slice(-len);
}

function chgRandomSeed(len) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing 0/O/1/I
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

// Generate a brand-new valid promo code.
function chgGenerateCode() {
  const seed = chgRandomSeed(6);
  const checksum = chgBase36(chgHash(seed), 4);
  return `${seed}-${checksum}`;
}

// Check whether a typed code is valid.
function chgValidateCode(input) {
  if (!input) return false;
  const clean = input.trim().toUpperCase().replace(/\s+/g, "");
  const parts = clean.split("-");
  if (parts.length !== 2) return false;
  const [seed, checksum] = parts;
  if (seed.length !== 6 || checksum.length !== 4) return false;
  return chgBase36(chgHash(seed), 4) === checksum;
}

function chgIsUnlocked() {
  return localStorage.getItem(CHG_UNLOCK_KEY) === "true";
}

function chgUnlock() {
  localStorage.setItem(CHG_UNLOCK_KEY, "true");
}
