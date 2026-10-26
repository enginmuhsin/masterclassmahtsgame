/* =====================================================================
   ÇEKİRDEK — sayı kuramı fonksiyonları (BigInt ile 10¹⁹'a kadar kesin)
   Tüm site bu dosyadaki fonksiyonları MC.sayi üzerinden kullanır.
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
(function () {
  const S = {};
  const UST = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  S.tr = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  S.us = (e) => String(e).split("").map((c) => UST[+c]).join("");
  S.alt = (e) => String(e).split("").map((c) => "₀₁₂₃₄₅₆₇₈₉"[+c]).join("");
  S.ondalik = (x, b = 2) => x.toLocaleString("tr-TR", { minimumFractionDigits: b, maximumFractionDigits: b });
  S.ONDOKUZ = 10n ** 19n;
  S.DENEME_SINIRI = 10n ** 12n;

  /* ---------- Asallık: deterministik Miller–Rabin ---------- */
  const MR = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  function modpow(b, e, m) { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; }
  S.modpow = modpow;
  S.asalMi = function (n) {
    n = BigInt(n);
    if (n < 2n) return false;
    for (const p of MR) if (n % p === 0n) return n === p;
    let d = n - 1n, s = 0;
    while ((d & 1n) === 0n) { d >>= 1n; s++; }
    dis: for (const a of MR) {
      let x = modpow(a, d, n);
      if (x === 1n || x === n - 1n) continue;
      for (let i = 1; i < s; i++) { x = x * x % n; if (x === n - 1n) continue dis; }
      return false;
    }
    return true;
  };
  S.ebob = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };

  /* ---------- Çarpanlara ayırma: küçük asallarla deneme + Pollard rho (Brent) ---------- */
  const rastgele = (n) => BigInt(Math.floor(Math.random() * 2 ** 31)) % (n - 1n) + 1n;
  function rho(n) {
    if (n % 2n === 0n) return 2n;
    for (;;) {
      let y = rastgele(n), c = rastgele(n), g = 1n, r = 1, q = 1n, x = y, ys = y;
      const m = 64;
      while (g === 1n) {
        x = y;
        for (let i = 0; i < r; i++) y = (y * y + c) % n;
        let k = 0;
        while (k < r && g === 1n) {
          ys = y;
          const sinir = Math.min(m, r - k);
          for (let i = 0; i < sinir; i++) { y = (y * y + c) % n; q = q * (x > y ? x - y : y - x) % n; }
          g = S.ebob(q, n); k += m;
        }
        r *= 2;
      }
      if (g === n) { do { ys = (ys * ys + c) % n; g = S.ebob(x > ys ? x - ys : ys - x, n); } while (g === 1n); }
      if (g !== n) return g;
    }
  }
  S.elek = function (N) {
    const isaret = new Uint8Array(N + 1); const asal = [];
    for (let i = 2; i <= N; i++) { if (!isaret[i]) { asal.push(i); for (let j = i * i; j <= N; j += i) isaret[j] = 1; } }
    return asal;
  };
  const KUCUK = S.elek(1000).map(BigInt);
  const onbellek = new Map();
  S.carpanlar = function (n) {
    n = BigInt(n);
    const anahtar = n.toString();
    if (onbellek.has(anahtar)) return onbellek.get(anahtar);
    const sonuc = [];
    let m = n;
    if (m > 1n) {
      for (const p of KUCUK) { if (p * p > m) break; while (m % p === 0n) { sonuc.push(p); m /= p; } }
      const ayir = (k) => { if (k === 1n) return; if (S.asalMi(k)) { sonuc.push(k); return; } const d = rho(k); ayir(d); ayir(k / d); };
      if (m > 1n) ayir(m);
      sonuc.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    }
    if (onbellek.size > 20000) onbellek.clear();
    onbellek.set(anahtar, sonuc);
    return sonuc;
  };
  S.ussler = function (n) { const m = new Map(); for (const p of S.carpanlar(n)) m.set(p, (m.get(p) || 0) + 1); return m; };
  S.carpimYazi = (n) => [...S.ussler(n)].map(([p, e]) => S.tr(p) + (e > 1 ? S.us(e) : "")).join(" × ");
  S.carpimTex = (n) => [...S.ussler(n)].map(([p, e]) => p.toString() + (e > 1 ? `^{${e}}` : "")).join(" \\cdot ");
  S.tau = (n) => { n = BigInt(n); let t = 1n; for (const e of S.ussler(n).values()) t *= BigInt(e + 1); return t; };
  S.sigma = (n) => { n = BigInt(n); if (n === 1n) return 1n; let s = 1n; for (const [p, e] of S.ussler(n)) s *= (p ** BigInt(e + 1) - 1n) / (p - 1n); return s; };
  S.phi = (n) => { n = BigInt(n); let r = n; for (const p of S.ussler(n).keys()) r -= r / p; return r; };
  S.mobius = (n) => { n = BigInt(n); if (n === 1n) return 1; const u = [...S.ussler(n).values()]; return u.some((e) => e > 1) ? 0 : (u.length % 2 ? -1 : 1); };
  S.bolenler = function (n, sinir = 200000) {
    n = BigInt(n);
    let b = [1n];
    for (const [p, e] of S.ussler(n)) {
      const yeni = [];
      for (const d of b) { let k = 1n; for (let i = 0; i <= e; i++) { yeni.push(d * k); k *= p; } }
      b = yeni;
      if (b.length > sinir) break;
    }
    return b.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
  };
  S.karekok = (n) => { n = BigInt(n); if (n < 2n) return n; let x = BigInt(Math.floor(Math.sqrt(Number(n)))); while (x * x > n) x--; while ((x + 1n) * (x + 1n) <= n) x++; return x; };
  S.kupkok = (n) => { n = BigInt(n); if (n < 2n) return n; let x = BigInt(Math.round(Math.cbrt(Number(n)))); while (x ** 3n > n) x--; while ((x + 1n) ** 3n <= n) x++; return x; };
  S.tamKare = (n) => { n = BigInt(n); return n >= 0n && S.karekok(n) ** 2n === n; };
  S.rakamTop = (n) => n.toString().split("").reduce((a, c) => a + +c, 0);
  S.dijitalKok = (n) => { n = BigInt(n); return n === 0n ? 0 : Number(1n + (n - 1n) % 9n); };
  S.ramanujanTemsil = function (n) {
    n = BigInt(n);
    if (n > 10n ** 13n) return null;
    const N = Number(n), sonuc = [];
    let a = 1, b = Math.round(Math.cbrt(N));
    while (b ** 3 > N) b--;
    while (a <= b) { const s = a ** 3 + b ** 3; if (s === N) { sonuc.push([a, b]); a++; b--; } else if (s < N) a++; else b--; }
    return sonuc;
  };

  /* ---------- Asallık izi: √n'ye kadar 6k±1 deneme bölmesi (öğretim amaçlı) ---------- */
  S.asallikIzi = function (n, gosterim = 80) {
    const N = Number(n);
    if (N < 4) return { denenen: [], bulunan: null, sayac: 0 };
    const denenen = []; let sayac = 0;
    for (const d of [2, 3]) { sayac++; denenen.push(d); if (N % d === 0) return { denenen, bulunan: d, sayac }; }
    const sinir = Math.floor(Math.sqrt(N));
    for (let i = 5; i <= sinir; i += 6) {
      for (const d of [i, i + 2]) {
        if (d > sinir) break;
        sayac++;
        if (denenen.length < gosterim) denenen.push(d);
        if (N % d === 0) return { denenen, bulunan: d, sayac };
      }
    }
    return { denenen, bulunan: null, sayac };
  };

  /* ---------- Sayı türleri (kayıt defteri) ---------- */
  S.KAT = [
    { k: "cift", ad: "Çift Sayı", puan: 20, w: .5, f: (n) => n % 2n === 0n },
    { k: "tek", ad: "Tek Sayı", puan: 20, w: .5, f: (n) => n % 2n === 1n },
    { k: "asal", ad: "Asal Sayı", puan: 40, w: 2, f: (n) => S.asalMi(n) },
    { k: "yari", ad: "Yarı Asal", puan: 60, w: 3, f: (n) => S.carpanlar(n).length === 2 },
    { k: "kare", ad: "Tam Kare", puan: 40, w: 1.2, f: (n) => S.tamKare(n) },
    { k: "kup", ad: "Tam Küp", puan: 90, w: 1, f: (n) => S.kupkok(n) ** 3n === n },
    { k: "ucgen", ad: "Üçgensel Sayı", puan: 50, w: 1, f: (n) => n >= 1n && S.tamKare(8n * n + 1n) },
    { k: "fib", ad: "Fibonacci Sayısı", puan: 80, w: 1, f: (n) => S.tamKare(5n * n * n + 4n) || (n > 0n && S.tamKare(5n * n * n - 4n)) },
    { k: "iki", ad: "2'nin Kuvveti", puan: 70, w: 1, f: (n) => n >= 1n && (n & (n - 1n)) === 0n },
    { k: "palin", ad: "Palindromik", puan: 40, w: 1, f: (n) => { const s = n.toString(); return s === [...s].reverse().join(""); } },
    { k: "harshad", ad: "Harshad Sayısı", puan: 30, w: 1, f: (n) => n > 0n && n % BigInt(S.rakamTop(n)) === 0n },
    { k: "arm", ad: "Armstrong Sayısı", puan: 150, w: .8, f: (n) => { const s = n.toString(), k = BigInt(s.length); return n >= 1n && [...s].reduce((a, c) => a + BigInt(c) ** k, 0n) === n; } },
    { k: "muk", ad: "Mükemmel Sayı", puan: 200, w: .6, f: (n) => n > 1n && S.sigma(n) === 2n * n },
    { k: "ram", ad: "Ramanujan Sayısı", puan: 200, w: .6, f: (n) => { const t = S.ramanujanTemsil(n); return !!t && t.length >= 2; } },
  ];
  S.KATK = Object.fromEntries(S.KAT.map((c) => [c.k, c]));
  S.turMu = (n, k) => S.KATK[k].f(BigInt(n));

  /* ---------- Kanıt üretici: her sınıflandırmanın kısa, öğrenci dostu gerekçesi ---------- */
  S.kanit = function (n, k) {
    n = BigInt(n);
    const N = S.tr(n);
    switch (k) {
      case "cift": case "tek": return `${N} ÷ 2 → kalan ${n % 2n}. ${n % 2n === 0n ? "Çifttir." : "Tektir."}`;
      case "asal": {
        if (n < 2n) return "Asal sayılar 2'den başlar; 1 asal değildir.";
        if (S.asalMi(n)) return n <= S.DENEME_SINIRI ? `${N} asaldır: 2'den √${N} ≈ ${S.tr(S.karekok(n))} sınırına kadar hiçbir bölen yok.` : `${N} asaldır: deterministik Miller–Rabin testi 12 tabanın hepsinde geçti.`;
        const c = S.carpanlar(n);
        return c.length === 2 ? `${N} asal DEĞİL, yarı asal: ${N} = ${S.tr(c[0])} × ${S.tr(c[1])}.` : `${N} asal değil: ${N} = ${S.carpimYazi(n)}.`;
      }
      case "yari": {
        const c = S.carpanlar(n);
        if (c.length === 2) return `${N} = ${S.tr(c[0])} × ${S.tr(c[1])}: tam iki asalın çarpımı, yarı asal.`;
        if (c.length === 1) return `${N} asaldır; tek bir asal çarpanı var, yarı asal değil.`;
        return c.length ? `${N} = ${S.carpimYazi(n)}: ${c.length} asal çarpan (tekrarlarıyla), yarı asal değil.` : "Asal çarpanı yok.";
      }
      case "kare": { const r = S.karekok(n); return r * r === n ? `${N} = ${S.tr(r)}², tam karedir.` : `${S.tr(r)}² = ${S.tr(r * r)} < ${N} < ${S.tr((r + 1n) ** 2n)} = ${S.tr(r + 1n)}²; tam kare değil.`; }
      case "kup": { const r = S.kupkok(n); return r ** 3n === n ? `${N} = ${S.tr(r)}³, tam küptür.` : `${S.tr(r)}³ = ${S.tr(r ** 3n)} < ${N} < ${S.tr((r + 1n) ** 3n)} = ${S.tr(r + 1n)}³; tam küp değil.`; }
      case "ucgen": {
        if (n < 1n) return "Üçgensel sayılar 1'den başlar.";
        const m = (S.karekok(8n * n + 1n) - 1n) / 2n, t = m * (m + 1n) / 2n;
        return t === n ? `${N} = ${S.tr(m)}·${S.tr(m + 1n)}/2: ${S.tr(m)}. üçgensel sayı (${S.tr(m)} sıralık nokta üçgeni).` : `T${S.alt(m)} = ${S.tr(t)} < ${N} < T${S.alt(m + 1n)} = ${S.tr((m + 1n) * (m + 2n) / 2n)}; üçgensel değil.`;
      }
      case "fib": { let a = 0n, b = 1n; while (b < n) [a, b] = [b, a + b]; return b === n || n === 0n ? `Dizide … ${S.tr(a)}, ${N} …; Fibonacci sayısı.` : `Dizide ${S.tr(a)} ile ${S.tr(b)} arasında kalır; Fibonacci değil.`; }
      case "iki": { if (n < 1n) return "Pozitif değil."; const e = n.toString(2).length - 1; return (1n << BigInt(e)) === n ? `${N} = 2${S.us(e)} (ikili tabanda 1 ve ${e} sıfır).` : `2${S.us(e)} = ${S.tr(1n << BigInt(e))} < ${N} < 2${S.us(e + 1)}; 2'nin kuvveti değil.`; }
      case "palin": { const s = n.toString(), t = [...s].reverse().join(""); return `Tersten ${t} okunur; ${t === s ? "palindromik." : "palindromik değil."}`; }
      case "harshad": { const s = S.rakamTop(n); return n % BigInt(s) === 0n ? `Rakam toplamı ${s}; ${N} ÷ ${s} = ${S.tr(n / BigInt(s))}, Harshad sayısı.` : `Rakam toplamı ${s}; bölümden kalan ${n % BigInt(s)}, Harshad değil.`; }
      case "arm": {
        const s = n.toString(), k = s.length, top = [...s].reduce((a, c) => a + BigInt(c) ** BigInt(k), 0n);
        const ifade = s.length > 8 ? `Rakamların ${k}. kuvvetleri toplamı ${S.tr(top)}` : `${[...s].map((c) => c + S.us(k)).join(" + ")} = ${S.tr(top)}`;
        return top === n ? `${ifade}; Armstrong sayısı.` : `${ifade} ≠ ${N}; Armstrong değil.`;
      }
      case "muk": { const s = S.sigma(n) - n; return n > 1n && s === n ? `Kendisi hariç bölenlerinin toplamı ${S.tr(s)} = ${N}; mükemmel.` : `Kendisi hariç bölenlerinin toplamı ${S.tr(s)} ≠ ${N} (${s > n ? "bol" : "eksik"} sayı).`; }
      case "ram": {
        const t = S.ramanujanTemsil(n);
        if (!t) return "10¹³'ün üzerinde bu test hız nedeniyle yapılmaz.";
        if (t.length >= 2) return `${N} = ${t.map(([a, b]) => `${a}³ + ${b}³`).join(" = ")}; iki farklı küp toplamı.`;
        return t.length === 1 ? `Yalnızca ${t[0][0]}³ + ${t[0][1]}³ yazılışı var; iki farklı yol gerekir.` : "İki pozitif küpün toplamı olarak yazılamaz.";
      }
    }
    return "";
  };

  /* ---------- Diğer araçlar ---------- */
  S.oncekiAsal = function (n) { n = BigInt(n); for (let m = n - 1n; m >= 2n; m--) if (S.asalMi(m)) return m; return null; };
  S.sonrakiAsal = function (n) { n = BigInt(n); let m = n + 1n; while (!S.asalMi(m)) m++; return m; };
  S.collatz = function (n, sinir = 20000) {
    n = BigInt(n); const yol = [n];
    while (n !== 1n && yol.length < sinir) { n = n % 2n === 0n ? n / 2n : 3n * n + 1n; yol.push(n); }
    return yol;
  };
  S.goldbach = function (n) {
    n = BigInt(n);
    if (n < 4n || n % 2n) return null;
    for (let p = 2n; p <= n / 2n; p = p === 2n ? 3n : p + 2n) if (S.asalMi(p) && S.asalMi(n - p)) return [p, n - p];
    return null;
  };
  S.ikiKareMi = (n) => [...S.ussler(n)].every(([p, e]) => p % 4n !== 3n || e % 2 === 0);
  S.ikiKareTemsil = function (n) {
    n = BigInt(n);
    if (!S.ikiKareMi(n) || n > 10n ** 10n) return null;
    const N = Number(n);
    for (let a = 0; a * a * 2 <= N; a++) { const b2 = N - a * a, b = Math.round(Math.sqrt(b2)); if (b * b === b2) return [a, b]; }
    return null;
  };
  S.roma = function (n) {
    n = Number(n);
    if (!(n >= 1 && n <= 3999)) return "—";
    const t = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let s = ""; for (const [d, h] of t) while (n >= d) { s += h; n -= d; } return s;
  };
  S.ulam = function (N) {
    let x = 0, y = 0, dx = 1, dy = 0, n = 1, adim = 1; const k = [[0, 0]];
    while (n < N) { for (let t = 0; t < 2; t++) { for (let i = 0; i < adim && n < N; i++) { x += dx; y += dy; n++; k.push([x, y]); } [dx, dy] = [-dy, dx]; } adim++; }
    return k;
  };
  S.tauDizisi = function (N) { const t = new Uint16Array(N + 1); for (let d = 1; d <= N; d++) for (let k = d; k <= N; k += d) t[k]++; return t; };

  /* ---------- Güvenli ifade çözümleyici: 7×13 · 2^61−1 · 10! · (2^5)·3 · 1.000.003 ---------- */
  S.ifadeCoz = function (metin, ust = S.ONDOKUZ) {
    const s = String(metin).replace(/[\s.,]/g, "").replace(/[×xX·]/g, "*").replace(/[−–]/g, "-");
    if (!s) throw new Error("Bir sayı ya da ifade yaz.");
    if (!/^[0-9+\-*^!()]+$/.test(s)) throw new Error("Yalnızca rakam ve + − × ^ ! ( ) kullanılabilir.");
    let i = 0;
    const bak = () => s[i];
    function ifade() { let v = terim(); while (bak() === "+" || bak() === "-") { const op = s[i++]; const w = terim(); v = op === "+" ? v + w : v - w; } return v; }
    function terim() { let v = kuvvet(); while (bak() === "*") { i++; v *= kuvvet(); if (v > 10n ** 40n || v < -(10n ** 40n)) throw new Error("Sayı çok büyük."); } return v; }
    function kuvvet() {
      const t = tekli();
      if (bak() === "^") {
        i++; const e = kuvvet();
        const ab = t < 0n ? -t : t;
        if (e < 0n || e > 400n || (ab > 1n && Number(e) * Math.log10(Number(ab)) > 40)) throw new Error("Üs çok büyük.");
        return t ** e;
      }
      return t;
    }
    function tekli() { if (bak() === "-") { i++; return -tekli(); } if (bak() === "+") { i++; return tekli(); } return sonek(); }
    function sonek() { let v = temel(); while (bak() === "!") { i++; if (v < 0n || v > 30n) throw new Error("Faktöriyel 0–30 arası olmalı."); let f = 1n; for (let k = 2n; k <= v; k++) f *= k; v = f; } return v; }
    function temel() {
      if (bak() === "(") { i++; const v = ifade(); if (bak() !== ")") throw new Error("Parantez kapanmamış."); i++; return v; }
      const bas = i; while (/[0-9]/.test(bak() || "")) i++;
      if (bas === i) throw new Error("İfade anlaşılamadı."); return BigInt(s.slice(bas, i));
    }
    const v = ifade();
    if (i !== s.length) throw new Error("İfade anlaşılamadı.");
    if (v < 1n || v > ust) throw new Error(`Sayı 1 ile ${ust === S.ONDOKUZ ? "10¹⁹" : S.tr(ust)} arasında olmalı.`);
    return v;
  };

  MC.sayi = S;
})();
