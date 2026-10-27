/* =====================================================================
   SORU MASASI · HESAP ÇEKİRDEĞİ (arayüzden bağımsız, test edilebilir)
   · Nesne listesinden konum hesabı (serbest nokta, çizgi/çember üstünde nokta, kesişim, orta nokta)
   · Etiket ifadeleri: "6", "40°", "x", "2x+10", "?" …
   · Verilere uydurma: Levenberg–Marquardt ile şekli yazılan ölçülere getirir,
     bilinmeyenleri (x, y …) bulur, cevabın tek olup olmadığını dener.
   · Öğrenci cevabı ayrıştırma: 12 · 3,5 · 2√3 · 3/2 · √2/2
   ===================================================================== */
"use strict";
(function () {
  const H = {};

  /* ---------------- Saf geometri ---------------- */
  const G = {};
  G.uz = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  G.birim = (x, y) => { const l = Math.hypot(x, y); return l < 1e-12 ? null : { x: x / l, y: y / l }; };
  G.icinde = (l, t) => !l.sinirli || (t >= -1e-9 && t <= l.uz + 1e-9);
  G.kesisim = function (a, b) {
    const dm = (o) => o.tur === "dogru";
    if (dm(a) && dm(b)) {
      const cr = a.dx * b.dy - a.dy * b.dx; if (Math.abs(cr) < 1e-12) return [];
      const t = ((b.x - a.x) * b.dy - (b.y - a.y) * b.dx) / cr, s = ((b.x - a.x) * a.dy - (b.y - a.y) * a.dx) / cr;
      if (!G.icinde(a, t) || !G.icinde(b, s)) return [null];
      return [{ x: a.x + t * a.dx, y: a.y + t * a.dy }];
    }
    if (dm(a) !== dm(b)) {
      const l = dm(a) ? a : b, c = dm(a) ? b : a;
      const fx = l.x - c.x, fy = l.y - c.y, bb = fx * l.dx + fy * l.dy, cc = fx * fx + fy * fy - c.r * c.r, d = bb * bb - cc;
      if (d < -1e-9) return [];
      const k = Math.sqrt(Math.max(0, d));
      return [-bb - k, -bb + k].map((t) => (G.icinde(l, t) ? { x: l.x + t * l.dx, y: l.y + t * l.dy } : null));
    }
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    if (d < 1e-12 || d > a.r + b.r + 1e-9 || d < Math.abs(a.r - b.r) - 1e-9) return [];
    const p = (a.r * a.r - b.r * b.r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, a.r * a.r - p * p));
    const ux = (b.x - a.x) / d, uy = (b.y - a.y) / d, mx = a.x + p * ux, my = a.y + p * uy;
    return [{ x: mx - h * uy, y: my + h * ux }, { x: mx + h * uy, y: my - h * ux }];
  };
  G.aci = (a, v, c) => { const u = G.birim(a.x - v.x, a.y - v.y), w = G.birim(c.x - v.x, c.y - v.y); if (!u || !w) return NaN; return Math.acos(Math.max(-1, Math.min(1, u.x * w.x + u.y * w.y))) * 180 / Math.PI; };
  G.dogruUzaklik = (l, p) => Math.abs((p.x - l.x) * l.dy - (p.y - l.y) * l.dx);
  H.G = G;

  /* ---------------- Konum hesabı ----------------
     nokta  : {x,y} | {uzerinde, t} | {turet:"kesisim", a, b, i} | {turet:"orta", a, b}
     parca  : {p, q, sonsuz?} | {turet:"dik"|"paralel", nokta, dogru}
     cember : {m, p}
     t: parça ve doğruda p→q vektörünün katı; türetilmiş doğruda piksel; çemberde açı (radyan) */
  H.cizgiNokta = (h, t) => h.tur === "cember" ? { x: h.x + h.r * Math.cos(t), y: h.y + h.r * Math.sin(t) }
    : { x: h.x + h.dx * t * (h.olc || 1), y: h.y + h.dy * t * (h.olc || 1) };
  H.parametre = function (h, p) {
    if (h.tur === "cember") return Math.atan2(p.y - h.y, p.x - h.x);
    let t = ((p.x - h.x) * h.dx + (p.y - h.y) * h.dy) / (h.olc || 1);
    if (h.sinirli) t = Math.max(0, Math.min(1, t));
    return t;
  };
  function bir(o, P) {
    const gec = { gecerli: false };
    if (o.tur === "nokta") {
      if (o.uzerinde) { const h = P(o.uzerinde); if (!h) return gec; const q = H.cizgiNokta(h, o.t); return { gecerli: true, x: q.x, y: q.y }; }
      if (o.turet === "orta") { const a = P(o.a), b = P(o.b); return a && b ? { gecerli: true, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : gec; }
      if (o.turet === "kesisim") { const a = P(o.a), b = P(o.b); if (!a || !b) return gec; const k = G.kesisim(a, b)[o.i]; return k ? { gecerli: true, x: k.x, y: k.y } : gec; }
      return { gecerli: true, x: o.x, y: o.y };
    }
    if (o.tur === "parca") {
      if (o.turet === "dik" || o.turet === "paralel") {
        const n = P(o.nokta), l = P(o.dogru); if (!n || !l) return gec;
        const d = o.turet === "dik" ? { x: -l.dy, y: l.dx } : { x: l.dx, y: l.dy };
        return { gecerli: true, tur: "dogru", x: n.x, y: n.y, dx: d.x, dy: d.y, uz: 0, olc: 1, sinirli: false };
      }
      const a = P(o.p), b = P(o.q); if (!a || !b) return gec;
      const d = G.birim(b.x - a.x, b.y - a.y); if (!d) return gec;
      const uz = G.uz(a, b);
      return { gecerli: true, tur: "dogru", x: a.x, y: a.y, dx: d.x, dy: d.y, uz, olc: uz, sinirli: !o.sonsuz };
    }
    if (o.tur === "cember") { const m = P(o.m), p = P(o.p); if (!m || !p) return gec; const r = G.uz(m, p); return r > 1e-9 ? { gecerli: true, tur: "cember", x: m.x, y: m.y, r } : gec; }
    return { gecerli: [o.a, o.b, o.v, o.c].filter(Boolean).every((i) => P(i)) };
  }
  H.hesapla = function (nesne) {
    const hesap = {}, P = (id) => { const h = hesap[id]; return h && h.gecerli ? h : null; };
    for (const o of nesne) hesap[o.id] = bir(o, P);
    return { hesap, P };
  };

  /* ---------------- İfadeler ---------------- */
  // "2x+10" → {sabit:10, kat:{x:2}} · "40°" → {sabit:40, kat:{}} · "?" → {soru:true} · çözülemezse null
  H.ifade = function (metin) {
    let s = String(metin || "").replace(/\s+/g, "").replace(/[°º]/g, "").replace(/−/g, "-").replace(/,/g, ".").replace(/(cm|birim|br|m)$/i, "");
    if (!s) return null;
    if (s === "?") return { soru: true, sabit: 0, kat: {} };
    if (!/^[+-]?(\d+(\.\d+)?|\d*(\.\d+)?[a-zçğıöşüα-ω])([+-](\d+(\.\d+)?|\d*(\.\d+)?[a-zçğıöşüα-ω]))*$/i.test(s)) return null;
    const sonuc = { sabit: 0, kat: {} };
    for (const m of s.matchAll(/([+-]?)(\d*(?:\.\d+)?)([a-zçğıöşüα-ω]?)/gi)) {
      if (!m[0]) continue;
      const isaret = m[1] === "-" ? -1 : 1;
      if (m[3]) { const k = m[2] === "" ? 1 : parseFloat(m[2]); const ad = m[3].toLocaleLowerCase("tr-TR"); sonuc.kat[ad] = (sonuc.kat[ad] || 0) + isaret * k; }
      else if (m[2] !== "") sonuc.sabit += isaret * parseFloat(m[2]);
    }
    return sonuc;
  };
  H.ifadeDeger = (e, d) => e.sabit + Object.entries(e.kat).reduce((t, [k, a]) => t + a * (d[k] ?? 0), 0);

  /* Öğrenci ve öğretmen cevabı: 12 · 3,5 · 2√3 · √2/2 · 3/2 · π · 5√2+1 */
  H.cevapOku = function (metin) {
    let s = String(metin || "").trim().toLocaleLowerCase("tr-TR").replace(/\s+/g, "").replace(/[°º]/g, "").replace(/−/g, "-").replace(/,/g, ".").replace(/×|·/g, "*").replace(/kök/g, "√").replace(/pi/g, "π");
    s = s.replace(/(cm|birim|br)$/, "");
    if (!s || !/^[0-9+\-*/().√π]+$/.test(s)) return NaN;
    const js = s.replace(/(\d|\)|π)(?=√|π|\()/g, "$1*").replace(/√(\d+(?:\.\d+)?|\([^()]*\))/g, "Math.sqrt($1)").replace(/π/g, "Math.PI");
    if (/√/.test(js)) return NaN;
    try { const v = Function('"use strict";return (' + js + ")")(); return typeof v === "number" && isFinite(v) ? v : NaN; } catch (e) { return NaN; }
  };
  H.dogruMu = (girilen, cevap, tolerans) => {
    const v = H.cevapOku(girilen); if (!isFinite(v) || !isFinite(cevap)) return false;
    return Math.abs(v - cevap) <= (tolerans ?? Math.max(0.01 * Math.abs(cevap), 0.02));
  };

  /* ---------------- Doğrusal cebir ---------------- */
  function coz(A, b) {
    const n = b.length, M = A.map((r, i) => [...r, b[i]]);
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      if (Math.abs(M[p][c]) < 1e-14) return null;
      [M[c], M[p]] = [M[p], M[c]];
      for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c] / M[c][c]; if (f) for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
    }
    return M.map((r, i) => r[n] / r[i]);
  }

  /* ---------------- Verilere uydurma ---------------- */
  const OLCEK0 = 40;                 // etiket yoksa 1 birim = 40 piksel
  const LUZ = 60, LACI = 4;          // artık ölçekleri: 60 piksel ↔ 4 derece
  H.kisitlar = function (nesne) {
    const k = { uz: [], aci: [], centik: {}, yay: {}, degiskenler: new Set(), soru: null, hatali: [] };
    for (const o of nesne) {
      if (o.ogr) continue;
      if (o.tur === "uz" || o.tur === "aci") {
        const e = H.ifade(o.metin);
        if (!e) { k.hatali.push(o); continue; }
        if (e.soru) { k.soru = o; continue; }
        Object.keys(e.kat).forEach((d) => k.degiskenler.add(d));
        (o.tur === "uz" ? k.uz : k.aci).push({ o, e });
      }
      if (o.tur === "centik") (k.centik[o.n] = k.centik[o.n] || []).push(o);
      if (o.tur === "yay") (k.yay[o.n] = k.yay[o.n] || []).push(o);
    }
    return k;
  };
  function degiskenlerKur(nesne, k) {
    const v = [];  // {tur, o, alan, eps}
    for (const o of nesne) {
      if (o.tur !== "nokta" || o.turet) continue;
      if (o.uzerinde) v.push({ o, alan: "t", eps: 1e-4 });
      else { v.push({ o, alan: "x", eps: 0.02 }); v.push({ o, alan: "y", eps: 0.02 }); }
    }
    v.push({ alan: "logs", eps: 1e-4 });
    [...k.degiskenler].forEach((d) => v.push({ alan: "d:" + d, eps: 1e-4 }));
    return v;
  }
  /* durum: {nesne (kopya), logs, d:{x:…}} */
  function uygula(dur, v, x) {
    v.forEach((vi, i) => {
      if (vi.alan === "logs") dur.logs = x[i];
      else if (vi.alan.startsWith("d:")) dur.d[vi.alan.slice(2)] = x[i];
      else dur.harita[vi.o.id][vi.alan] = x[i];
    });
  }
  function artiklar(dur, k, bas, agirlik) {
    const { P } = H.hesapla(dur.nesne), s = Math.exp(dur.logs), r = [];
    const nk = (id) => P(id);
    const ceza = 8;
    for (const { o, e } of k.uz) { const a = nk(o.a), b = nk(o.b); r.push(a && b ? (G.uz(a, b) - s * H.ifadeDeger(e, dur.d)) / LUZ : ceza); }
    for (const { o, e } of k.aci) { const a = nk(o.a), v = nk(o.v), c = nk(o.c); const ac = a && v && c ? G.aci(a, v, c) : NaN; r.push(isFinite(ac) ? (ac - H.ifadeDeger(e, dur.d)) / LACI : ceza); }
    for (const grup of Object.values(k.centik)) for (let i = 1; i < grup.length; i++) {
      const [a, b, c, d] = [nk(grup[0].a), nk(grup[0].b), nk(grup[i].a), nk(grup[i].b)];
      r.push(a && b && c && d ? (G.uz(a, b) - G.uz(c, d)) / LUZ : ceza);
    }
    for (const grup of Object.values(k.yay)) for (let i = 1; i < grup.length; i++) {
      const g0 = grup[0], g = grup[i], p = [g0.a, g0.v, g0.c, g.a, g.v, g.c].map(nk);
      r.push(p.every(Boolean) ? (G.aci(p[0], p[1], p[2]) - G.aci(p[3], p[4], p[5])) / LACI : ceza);
    }
    // Değişken açılar ve uzunluklar pozitif kalsın
    for (const { e } of k.aci) { const d = H.ifadeDeger(e, dur.d); if (d < 1) r.push((1 - d) / LACI); else if (d > 179) r.push((d - 179) / LACI); else r.push(0); }
    for (const { e } of k.uz) { const d = H.ifadeDeger(e, dur.d); r.push(d < 1e-3 ? (1e-3 - d) * 10 : 0); }
    // Noktalar üst üste binmesin; geçersiz noktalar cezalandırılsın
    const nlar = dur.nesne.filter((o) => o.tur === "nokta");
    for (const o of nlar) if (!nk(o.id)) r.push(ceza);
    for (let i = 0; i < nlar.length; i++) for (let j = i + 1; j < nlar.length; j++) {
      const a = nk(nlar[i].id), b = nk(nlar[j].id); if (!a || !b) continue;
      const d = G.uz(a, b); r.push(d < 24 ? (24 - d) / 24 : 0);
    }
    // Hafif çapa: şekil izlenen görselden uzaklaşmasın (yalnızca serbest noktalar)
    if (agirlik) for (const o of dur.nesne) if (o.tur === "nokta" && !o.turet && !o.uzerinde) {
      const b0 = bas[o.id]; r.push(agirlik * (o.x - b0.x) / 100, agirlik * (o.y - b0.y) / 100);
    }
    return r;
  }
  function lm(f, x0, eps, tur = 120) {
    let x = x0.slice(), r = f(x), c = r.reduce((t, v) => t + v * v, 0), lam = 1e-2;
    const n = x.length;
    for (let it = 0; it < tur && c > 1e-16; it++) {
      const J = [];
      for (let j = 0; j < n; j++) { const y = x.slice(); y[j] += eps[j]; const ry = f(y); J.push(ry.map((v, i) => (v - r[i]) / eps[j])); }
      const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => { let s = 0; for (let k = 0; k < r.length; k++) s += J[i][k] * J[j][k]; return s; }));
      const g = Array.from({ length: n }, (_, i) => { let s = 0; for (let k = 0; k < r.length; k++) s += J[i][k] * r[k]; return s; });
      let ilerledi = false;
      for (let deneme = 0; deneme < 10; deneme++) {
        const M = A.map((satir, i) => satir.map((v, j) => v + (i === j ? lam * (A[i][i] + 1e-6) : 0)));
        const d = coz(M, g.map((v) => -v)); if (!d) { lam *= 10; continue; }
        const xn = x.map((v, i) => v + d[i]), rn = f(xn), cn = rn.reduce((t, v) => t + v * v, 0);
        if (cn < c) { x = xn; r = rn; const eski = c; c = cn; lam = Math.max(lam / 3, 1e-9); ilerledi = true; if (eski - cn < 1e-14 * (1 + eski)) it = tur; break; }
        lam *= 5;
      }
      if (!ilerledi) break;
    }
    return { x, c };
  }

  /* Ana fonksiyon. Dönüş: {nesne, olcek, degerler, hata: {uz, aci} en büyük sapmalar, basarili, cevap} */
  H.uydur = function (nesne, ayar = {}) {
    const k = H.kisitlar(nesne);
    const kopya = JSON.parse(JSON.stringify(nesne.filter((o) => !o.ogr)));
    const harita = Object.fromEntries(kopya.map((o) => [o.id, o]));
    const bas = Object.fromEntries(kopya.filter((o) => o.tur === "nokta").map((o) => [o.id, { x: o.x, y: o.y }]));
    const v = degiskenlerKur(kopya, k);
    const dur = { nesne: kopya, harita, logs: Math.log(ayar.olcek || OLCEK0), d: {} };
    // Uzunluk etiketi varsa ölçeği mevcut çizimden tahmin et
    if (k.uz.length && !ayar.olcek) {
      const { P } = H.hesapla(kopya), oran = [];
      for (const { o, e } of k.uz) if (!Object.keys(e.kat).length && e.sabit > 0) { const a = P(o.a), b = P(o.b); if (a && b) oran.push(G.uz(a, b) / e.sabit); }
      if (oran.length) dur.logs = Math.log(oran.reduce((t, x) => t + x, 0) / oran.length);
    }
    const x0 = v.map((vi) => vi.alan === "logs" ? dur.logs : vi.alan.startsWith("d:") ? (ayar.d0 && ayar.d0[vi.alan.slice(2)]) ?? (k.aci.some(({ e }) => e.kat[vi.alan.slice(2)]) ? 30 : 5) : vi.o[vi.alan]);
    const eps = v.map((vi) => vi.eps);
    let x = x0;
    for (const w of [0.08, 0.01, 0.0005]) {
      const f = (xx) => { uygula(dur, v, xx); return artiklar(dur, k, bas, w); };
      x = lm(f, x, eps, ayar.tur || 150).x;
    }
    uygula(dur, v, x);
    const { P } = H.hesapla(kopya), s = Math.exp(dur.logs);
    let hUz = 0, hAci = 0;
    for (const { o, e } of k.uz) { const a = P(o.a), b = P(o.b), hedef = H.ifadeDeger(e, dur.d); hUz = Math.max(hUz, a && b ? Math.abs(G.uz(a, b) / s - hedef) / Math.max(Math.abs(hedef), 1e-6) : 1); }
    for (const { o, e } of k.aci) { const a = P(o.a), vv = P(o.v), c = P(o.c), ac = a && vv && c ? G.aci(a, vv, c) : NaN; hAci = Math.max(hAci, isFinite(ac) ? Math.abs(ac - H.ifadeDeger(e, dur.d)) : 180); }
    for (const grup of Object.values(k.centik)) for (let i = 1; i < grup.length; i++) { const p = [grup[0].a, grup[0].b, grup[i].a, grup[i].b].map(P); hUz = Math.max(hUz, p.every(Boolean) ? Math.abs(G.uz(p[0], p[1]) - G.uz(p[2], p[3])) / Math.max(G.uz(p[0], p[1]), 1e-6) : 1); }
    for (const grup of Object.values(k.yay)) for (let i = 1; i < grup.length; i++) { const g0 = grup[0], g = grup[i], p = [g0.a, g0.v, g0.c, g.a, g.v, g.c].map(P); hAci = Math.max(hAci, p.every(Boolean) ? Math.abs(G.aci(p[0], p[1], p[2]) - G.aci(p[3], p[4], p[5])) : 180); }
    const gecersiz = kopya.some((o) => o.tur === "nokta" && !P(o.id));
    const basarili = !gecersiz && hUz < 0.004 && hAci < 0.15;
    // Serbest noktaların son konumlarını yaz
    for (const o of kopya) if (o.tur === "nokta" && !o.turet && !o.uzerinde) { o.x = +o.x.toFixed(3); o.y = +o.y.toFixed(3); }
    const sonuc = { nesne: kopya, olcek: s, degerler: { ...dur.d }, hata: { uz: hUz, aci: hAci }, basarili, gecersiz, kisit: k };
    sonuc.cevap = H.cevapHesapla(sonuc);
    return sonuc;
  };
  /* İstenen: "?" etiketi varsa onun ölçüsü; yoksa x (ya da tek değişken) */
  H.cevapHesapla = function (s) {
    const k = s.kisit, { P } = H.hesapla(s.nesne);
    if (k.soru) {
      const o = k.soru;
      if (o.tur === "uz") { const a = P(o.a), b = P(o.b); return a && b ? { deger: G.uz(a, b) / s.olcek, birim: k.uz.length ? "birim" : "", ad: "uz", kaynak: o.id } : null; }
      const a = P(o.a), v = P(o.v), c = P(o.c); return a && v && c ? { deger: G.aci(a, v, c), birim: "°", ad: "aci", kaynak: o.id } : null;
    }
    const ad = Object.keys(s.degerler);
    if (!ad.length) return null;
    const sec = ad.includes("x") ? "x" : ad[0];
    const aciDa = k.aci.some(({ e }) => e.kat[sec]);
    return { deger: s.degerler[sec], birim: aciDa ? "°" : k.uz.length ? "birim" : "", ad: sec };
  };
  /* Cevap tek mi? Noktaları sarsıp birkaç kez yeniden uydur, cevapları karşılaştır. */
  H.teklik = function (nesne, ilk, deneme = 4, rastgele = Math.random) {
    if (!ilk || !ilk.cevap) return { tek: null, cevaplar: [] };
    const cevaplar = [ilk.cevap.deger];
    for (let i = 0; i < deneme; i++) {
      const sarsik = JSON.parse(JSON.stringify(nesne)).map((o) => {
        if (o.tur === "nokta" && !o.turet && !o.uzerinde) { o.x += (rastgele() - .5) * 160; o.y += (rastgele() - .5) * 160; }
        if (o.tur === "nokta" && o.uzerinde) o.t += (rastgele() - .5) * 0.4;
        return o;
      });
      const d0 = Object.fromEntries(Object.keys(ilk.degerler).map((d) => [d, ilk.degerler[d] * (0.6 + rastgele() * 0.8)]));
      const s = H.uydur(sarsik, { olcek: ilk.olcek * (0.7 + rastgele() * 0.6), d0, tur: 100 });
      if (s.basarili && s.cevap) cevaplar.push(s.cevap.deger);
    }
    const en = Math.max(...cevaplar), ek = Math.min(...cevaplar);
    return { tek: cevaplar.length > 1 ? en - ek <= Math.max(0.01 * Math.abs(ilk.cevap.deger), 0.05) : null, cevaplar };
  };

  H.yuvarla = (x) => Math.abs(x - Math.round(x)) < 0.005 ? String(Math.round(x)) : x.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
  /* 2√3 gibi güzel bir gösterim bulmaya çalış */
  H.guzelYaz = function (x) {
    if (!isFinite(x)) return "—";
    if (Math.abs(x - Math.round(x)) < 0.003) return String(Math.round(x));
    for (const q of [2, 3, 4, 5, 6]) if (Math.abs(x * q - Math.round(x * q)) < 0.003 * q) return `${Math.round(x * q)}/${q}`;
    for (let n = 2; n <= 200; n++) {
      if (Math.sqrt(n) % 1 === 0) continue;
      let karesiz = true; for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) { karesiz = false; break; }
      if (!karesiz) continue;
      const a = x / Math.sqrt(n);
      for (const q of [1, 2, 3]) if (Math.abs(a * q - Math.round(a * q)) < 0.002 * q && Math.round(a * q) !== 0) {
        const p = Math.round(a * q); return `${p === 1 ? "" : p === -1 ? "−" : p}√${n}${q > 1 ? "/" + q : ""}`;
      }
    }
    return x.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
  };

  (typeof window !== "undefined" ? (window.MC = window.MC || {}) : globalThis.MC = globalThis.MC || {}).soruHesap = H;
})();
