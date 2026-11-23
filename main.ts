import { readdirSync as R, readFileSync as F, writeFileSync as W, mkdirSync as M } from 'node:fs';
import { join as J } from 'node:path';
const T = { 0: [0, 0, 0], 1: [1, 0, 1], 2: [4, 0, 1], 3: [0, 1, 0], 4: [0, 1, 2], 5: [0, 2, 2], 6: [0, 2, 3], 7: [0, 3, 3], 16: [0, 2, 1], 17: [0, 2, 1], 18: [0, 2, 1], 19: [0, 2, 1], 20: [0, 2, 1], 21: [0, 2, 1], 22: [0, 2, 1], 23: [0, 1, 1], 24: [0, 2, 1], 25: [0, 2, 1], 26: [0, 2, 1], 27: [0, 1, 1], 28: [0, 2, 1], 29: [0, 2, 1], 30: [0, 2, 1], 32: [0, 2, 1], 33: [0, 2, 1], 34: [0, 2, 1], 48: [2, 0, 0], 49: [2, 1, 0], 50: [2, 1, 0], 51: [2, 0, 0], 52: [0, 0, 0], 64: [0, 1, 1], 65: [0, 2, 0], 80: [0, 1, 0], 81: [0, 1, 0], 82: [0, 0, 1], 83: [0, 1, 0] };
function V(p, n) {
  const D = new Int32Array(256); let s = 0;
  const C = new Int32Array(64); let e = 0;
  const A = new Int32Array(256);
  const o = new Uint8Array(65536); let l = 0, q = 0, w = 0, k = 0;
  const E = new TextEncoder();
  const d = (c) => ({ o: o.slice(0, l), c });
  for (;;) {
    if (k === 1000000) return d(10);
    if (w < 0 || w >= p.length) return d(9);
    const t = T[p[w]];
    if (t === undefined) return d(5);
    const g = t[0], u = t[1], f = t[2];
    if (w + g >= p.length) return d(9);
    k++;
    const x = w + 1 + g;
    if (s < u) return d(2);
    if (s - u + f > 256) return d(3);
    w = x;
    const y = p[w - 1 - g];
    if (y === 0) return d(0);
    if (y === 1) { D[s++] = (p[x - 1] << 24) >> 24; continue; }
    if (y === 2) { D[s++] = p[x - 4] | (p[x - 3] << 8) | (p[x - 2] << 16) | (p[x - 1] << 24); continue; }
    if (y === 3) { s--; continue; }
    if (y === 4) { D[s] = D[s - 1]; s++; continue; }
    if (y === 5) { const z = D[s - 1]; D[s - 1] = D[s - 2]; D[s - 2] = z; continue; }
    if (y === 6) { D[s] = D[s - 2]; s++; continue; }
    if (y === 7) { const z = D[s - 3]; D[s - 3] = D[s - 2]; D[s - 2] = D[s - 1]; D[s - 1] = z; continue; }
    if (y === 23) { D[s - 1] = -D[s - 1]; continue; }
    if (y === 27) { D[s - 1] = ~D[s - 1]; continue; }
    if (y >= 16 && y <= 34 && y !== 23 && y !== 27) {
      const b = D[s - 1], a = D[s - 2]; let r;
      if (y === 16) r = a + b;
      else if (y === 17) r = a - b;
      else if (y === 18) r = Math.imul(a, b);
      else if (y === 19) { if (b === 0) return d(4); r = a === -2147483648 && b === -1 ? a : a / b; }
      else if (y === 20) { if (b === 0) return d(4); r = b === -1 ? 0 : a % b; }
      else if (y === 21) { if (b === 0) return d(4); r = Math.floor((a >>> 0) / (b >>> 0)); }
      else if (y === 22) { if (b === 0) return d(4); r = (a >>> 0) % (b >>> 0); }
      else if (y === 24) r = a & b;
      else if (y === 25) r = a | b;
      else if (y === 26) r = a ^ b;
      else if (y === 28) r = a << (b & 31);
      else if (y === 29) r = a >> (b & 31);
      else if (y === 30) r = a >>> (b & 31);
      else if (y === 32) r = a === b ? 1 : 0;
      else if (y === 33) r = a < b ? 1 : 0;
      else r = (a >>> 0) < (b >>> 0) ? 1 : 0;
      s -= 2; D[s++] = r; continue;
    }
    if (y === 48 || y === 49 || y === 50) {
      const h = ((p[x - 2] | (p[x - 1] << 8)) << 16) >> 16;
      let z = true;
      if (y !== 48) { const v = D[--s]; z = y === 49 ? v === 0 : v !== 0; }
      if (z) w = x + h;
      continue;
    }
    if (y === 51) {
      if (e === 64) return d(7);
      C[e++] = x; w = p[x - 2] | (p[x - 1] << 8); continue;
    }
    if (y === 52) { if (e === 0) return d(8); w = C[--e]; continue; }
    if (y === 64) { const z = D[s - 1]; if (z < 0 || z >= 256) return d(6); D[s - 1] = A[z]; continue; }
    if (y === 65) {
      const z = D[s - 1], v = D[s - 2];
      if (z < 0 || z >= 256) return d(6);
      s -= 2; A[z] = v; continue;
    }
    if (y === 80) {
      const z = E.encode(String(D[s - 1]));
      if (l + z.length > 65536) return d(11);
      s--; o.set(z, l); l += z.length; continue;
    }
    if (y === 81) { if (l + 1 > 65536) return d(11); o[l++] = D[--s] & 255; continue; }
    if (y === 82) { D[s++] = q < n.length ? n[q++] : -1; continue; }
    if (y === 83) return d(D[--s] & 255);
  }
}
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const id of R(I).sort()) {
  const r = V(new Uint8Array(F(J(I, id, 'program.bin'))), new Uint8Array(F(J(I, id, 'input.bin'))));
  M(J(O, id), { recursive: true });
  W(J(O, id, 'stdout.bin'), r.o);
  W(J(O, id, 'exit.txt'), r.c+'\n');
}
