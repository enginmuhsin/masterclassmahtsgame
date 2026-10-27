/* =====================================================================
   ÇİZİM MASASI — cetvel ve pergelle dinamik geometri.
   Her nesne başka nesnelere bağlıdır; bir noktayı sürükleyince ona bağlı her şey yeniden hesaplanır.
   Görev kipinde yalnızca Öklid'in araçları açıktır ve çizim otomatik denetlenir.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, Ses = MC.Ses, S = MC.sayi;
  const BIRIM = 40;                 // 1 birim = 40 piksel (ızgara karesi)
  const TOL = 0.5;                  // denetim toleransı (piksel)
  const RENK = { dogru: "#5b8cff", parca: "#eef3ff", cember: "#35e0b0", turev: "#a66bff", olcu: "#ffc657", serbest: "#eef3ff", turevNokta: "#ff4d61", sabit: "#ffc657", secili: "#ffc657", izgara: "rgba(91,140,255,.10)", izgaraKalin: "rgba(91,140,255,.22)" };

  /* ---------------- Saf geometri ---------------- */
  const G = {};
  G.uz = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  G.birim = (x, y) => { const l = Math.hypot(x, y); return l < 1e-12 ? null : { x: x / l, y: y / l }; };
  /* doğru: {x, y, dx, dy, uz?, sinirli} — (x,y) noktasından (dx,dy) birim yönünde; parça ise 0 ≤ t ≤ uz */
  G.kesisim = function (a, b) {
    const dogruMu = (o) => o.tur === "dogru";
    if (dogruMu(a) && dogruMu(b)) {
      const cr = a.dx * b.dy - a.dy * b.dx;
      if (Math.abs(cr) < 1e-12) return [];
      const t = ((b.x - a.x) * b.dy - (b.y - a.y) * b.dx) / cr, s = ((b.x - a.x) * a.dy - (b.y - a.y) * a.dx) / cr;
      if (!G.icinde(a, t) || !G.icinde(b, s)) return [null];
      return [{ x: a.x + t * a.dx, y: a.y + t * a.dy }];
    }
    if (dogruMu(a) !== dogruMu(b)) {
      const l = dogruMu(a) ? a : b, c = dogruMu(a) ? b : a;
      const fx = l.x - c.x, fy = l.y - c.y, bb = fx * l.dx + fy * l.dy, cc = fx * fx + fy * fy - c.r * c.r, disk = bb * bb - cc;
      if (disk < -1e-9) return [];
      const k = Math.sqrt(Math.max(0, disk));
      return [-bb - k, -bb + k].map((t) => (G.icinde(l, t) ? { x: l.x + t * l.dx, y: l.y + t * l.dy } : null));
    }
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    if (d < 1e-12 || d > a.r + b.r + 1e-9 || d < Math.abs(a.r - b.r) - 1e-9) return [];
    const p = (a.r * a.r - b.r * b.r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, a.r * a.r - p * p));
    const ux = (b.x - a.x) / d, uy = (b.y - a.y) / d, mx = a.x + p * ux, my = a.y + p * uy;
    return [{ x: mx - h * uy, y: my + h * ux }, { x: mx + h * uy, y: my - h * ux }];
  };
  G.icinde = (l, t) => !l.sinirli || (t >= -1e-9 && t <= l.uz + 1e-9);
  G.dogruUzaklik = (l, p) => Math.abs((p.x - l.x) * l.dy - (p.y - l.y) * l.dx);
  G.aci = (a, v, c) => { const u = G.birim(a.x - v.x, a.y - v.y), w = G.birim(c.x - v.x, c.y - v.y); if (!u || !w) return NaN; return Math.acos(Math.max(-1, Math.min(1, u.x * w.x + u.y * w.y))) * 180 / Math.PI; };

  /* ---------------- Durum ---------------- */
  let el, svg, kutu, W = 800, H = 560;
  let nesne = [], hesap = {}, sayac = 0, arac = "parca", secim = [], gecmis = [], ileri = [], surukle = null, fare = null, izgara = true;
  let gorev = null, adim = 0, basarildi = false;
  const ADLAR = "ABCDEFGHIJKLMNOPRSTUVYZ";
  const bul = (id) => nesne.find((o) => o.id === id);
  function yeniAd() { const n = nesne.filter((o) => o.tur === "nokta").length; return ADLAR[n % ADLAR.length] + (n >= ADLAR.length ? S.alt(Math.floor(n / ADLAR.length)) : ""); }
  function ekle(o) { o.id = "n" + (++sayac); if (o.tur === "nokta" && !o.ad) o.ad = yeniAd(); nesne.push(o); return o.id; }

  /* ---------------- Hesap ---------------- */
  const P = (id) => { const h = hesap[id]; return h && h.gecerli ? h : null; };
  function hesapBir(o) {
    const gec = { gecerli: false };
    if (o.tur === "nokta") {
      if (!o.turet) return { gecerli: true, x: o.x, y: o.y };
      if (o.turet === "orta") { const a = P(o.a), b = P(o.b); return a && b ? { gecerli: true, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : gec; }
      if (o.turet === "kesisim") {
        const a = P(o.a), b = P(o.b); if (!a || !b) return gec;
        const k = G.kesisim(a, b)[o.i]; return k ? { gecerli: true, x: k.x, y: k.y } : gec;
      }
      return gec;
    }
    if (o.tur === "dogru") {
      let x, y, d, uz = 0;
      if (!o.turet) {
        const a = P(o.p), b = P(o.q); if (!a || !b) return gec;
        d = G.birim(b.x - a.x, b.y - a.y); if (!d) return gec; x = a.x; y = a.y; uz = G.uz(a, b);
      } else if (o.turet === "dik" || o.turet === "paralel") {
        const n = P(o.nokta), l = P(o.dogru); if (!n || !l) return gec;
        x = n.x; y = n.y; d = o.turet === "dik" ? { x: -l.dy, y: l.dx } : { x: l.dx, y: l.dy };
      } else if (o.turet === "ortadik") {
        const a = P(o.a), b = P(o.b); if (!a || !b) return gec;
        const u = G.birim(b.x - a.x, b.y - a.y); if (!u) return gec; x = (a.x + b.x) / 2; y = (a.y + b.y) / 2; d = { x: -u.y, y: u.x };
      } else if (o.turet === "aciortay") {
        const a = P(o.a), v = P(o.b), c = P(o.c); if (!a || !v || !c) return gec;
        const u = G.birim(a.x - v.x, a.y - v.y), w = G.birim(c.x - v.x, c.y - v.y); if (!u || !w) return gec;
        d = G.birim(u.x + w.x, u.y + w.y) || { x: -u.y, y: u.x }; x = v.x; y = v.y;
      } else return gec;
      return { gecerli: true, tur: "dogru", x, y, dx: d.x, dy: d.y, uz, sinirli: !!o.parca };
    }
    if (o.tur === "cember") {
      const m = P(o.m); if (!m) return gec;
      let r;
      if (o.p) { const p = P(o.p); if (!p) return gec; r = G.uz(m, p); }
      else { const a = P(o.r1), b = P(o.r2); if (!a || !b) return gec; r = G.uz(a, b); }
      return r > 1e-9 ? { gecerli: true, tur: "cember", x: m.x, y: m.y, r } : gec;
    }
    if (o.tur === "uzunluk" || o.tur === "aci") return { gecerli: [o.a, o.b, o.c].filter(Boolean).every((i) => P(i)) };
    return gec;
  }
  function hesapla() { hesap = {}; for (const o of nesne) hesap[o.id] = hesapBir(o); }

  /* ---------------- Araçlar ---------------- */
  const IKON = {
    tasi: '<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
    nokta: '<circle cx="12" cy="12" r="4" fill="currentColor"/>',
    parca: '<path d="M5 18L19 6"/><circle cx="5" cy="18" r="2" fill="currentColor"/><circle cx="19" cy="6" r="2" fill="currentColor"/>',
    dogru: '<path d="M2 20L22 4"/><circle cx="8" cy="15" r="2" fill="currentColor"/><circle cx="16" cy="9" r="2" fill="currentColor"/>',
    cember: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
    pergel: '<path d="M12 3l-6 18M12 3l6 18M8.5 13h7"/><circle cx="12" cy="3" r="1.5" fill="currentColor"/>',
    kesisim: '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/><circle cx="12" cy="7.5" r="1.6" fill="currentColor"/><circle cx="12" cy="16.5" r="1.6" fill="currentColor"/>',
    orta: '<path d="M4 12h16"/><circle cx="4" cy="12" r="2" fill="currentColor"/><circle cx="20" cy="12" r="2" fill="currentColor"/><path d="M12 8v8"/>',
    dik: '<path d="M3 19h18M12 19V4"/><path d="M12 15h4v4"/>',
    paralel: '<path d="M3 16L21 8M3 21L21 13"/>',
    ortadik: '<path d="M4 16h16M12 4v16"/><circle cx="4" cy="16" r="2" fill="currentColor"/><circle cx="20" cy="16" r="2" fill="currentColor"/>',
    aciortay: '<path d="M4 19L20 19M4 19L16 5M4 19L21 11" /><path d="M10 19a6 6 0 0 0-1.5-4"/>',
    uzunluk: '<path d="M3 15h18M3 11v8M21 11v8"/><path d="M8 7h8" stroke-dasharray="2 2"/>',
    aci: '<path d="M4 19h16M4 19L15 6"/><path d="M10 19a6 6 0 0 0-2-4.5"/>',
    sil: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  };
  const ARAC = {
    tasi: { ad: "Taşı", istek: [], ip: "Serbest bir noktayı sürükle: ona bağlı her şey birlikte değişir." },
    nokta: { ad: "Nokta", istek: [], ip: "Boş bir yere dokunarak nokta koy." },
    parca: { ad: "Doğru parçası", istek: ["n", "n"], ip: "İki nokta seç ya da boş yere dokun." },
    dogru: { ad: "Doğru", istek: ["n", "n"], ip: "Doğrunun geçeceği iki noktayı seç." },
    cember: { ad: "Çember", istek: ["n", "n"], ip: "Önce merkezi, sonra çemberin geçeceği noktayı seç." },
    pergel: { ad: "Pergel", istek: ["n", "n", "n"], ip: "Pergeli iki noktaya aç, sonra sivri ucunu merkeze koy." },
    kesisim: { ad: "Kesişim", istek: ["e", "e"], ip: "Kesişen iki çizgiyi (doğru, parça ya da çember) seç." },
    orta: { ad: "Orta nokta", istek: ["n", "n"], ip: "İki nokta seç." },
    dik: { ad: "Dik doğru", istek: ["l", "n"], ip: "Bir doğru ve bir nokta seç." },
    paralel: { ad: "Paralel", istek: ["l", "n"], ip: "Bir doğru ve bir nokta seç." },
    ortadik: { ad: "Orta dikme", istek: ["n", "n"], ip: "Doğru parçasının iki ucunu seç." },
    aciortay: { ad: "Açıortay", istek: ["n", "n", "n"], ip: "Kol, köşe, kol sırasıyla üç nokta seç." },
    uzunluk: { ad: "Uzunluk", istek: ["n", "n"], ip: "Ölçmek için iki nokta seç. 1 birim = 1 ızgara karesi." },
    aci: { ad: "Açı", istek: ["n", "n", "n"], ip: "Kol, köşe, kol sırasıyla üç nokta seç." },
    sil: { ad: "Sil", istek: [], ip: "Silinecek nesneye dokun; ona bağlı nesneler de silinir." },
  };
  const OKLID = ["tasi", "nokta", "parca", "dogru", "cember", "kesisim", "sil"];
  const GRUPLAR = [["tasi", "nokta", "parca", "dogru", "cember", "pergel", "kesisim"], ["orta", "dik", "paralel", "ortadik", "aciortay"], ["uzunluk", "aci", "sil"]];

  /* ---------------- Görevler (Öklid, Elemanlar) ---------------- */
  const merkez = () => ({ x: W / 2, y: H / 2 });
  function sabit(dx, dy, ad) { const m = merkez(); return ekle({ tur: "nokta", x: m.x + dx, y: m.y + dy, sabit: true, ad }); }
  const turetilmisMi = (id) => { const o = bul(id); return o && (o.turet || o.sabit); };
  const cizgiler = () => nesne.filter((o) => o.tur === "dogru" && !o.sabit && P(o.id));
  const parcaVarMi = (a, b) => nesne.some((o) => o.tur === "dogru" && o.parca && !o.turet && ((o.p === a && o.q === b) || (o.p === b && o.q === a)));
  const GOREVLER = [
    { id: "eskenar", ad: "Eşkenar üçgen", kaynak: "Elemanlar I.1", par: 5,
      metin: "AB doğru parçası üzerine bir eşkenar üçgen çiz. Göz kararı konan nokta sayılmaz.",
      ipucu: "A merkezli ve B'den geçen bir çember, B merkezli ve A'dan geçen bir çember çiz. Kesişim noktası üçgenin üçüncü köşesidir.",
      kur() { const a = sabit(-80, 50, "A"), b = sabit(80, 50, "B"); ekle({ tur: "dogru", p: a, q: b, parca: true, sabit: true }); return { a, b }; },
      kontrol(v) { const A = P(v.a), B = P(v.b), ab = G.uz(A, B); return nesne.some((o) => o.tur === "nokta" && o.turet && P(o.id) && Math.abs(G.uz(P(o.id), A) - ab) < TOL && Math.abs(G.uz(P(o.id), B) - ab) < TOL && parcaVarMi(o.id, v.a) && parcaVarMi(o.id, v.b)); } },
    { id: "ortadik", ad: "Orta dikme", kaynak: "Elemanlar I.10–11", par: 4,
      metin: "AB doğru parçasının orta dikmesini çiz: AB'yi tam ortasından dik kesen doğru.",
      ipucu: "A ve B merkezli, birbirinden geçen iki çember çiz. İki kesişim noktasından geçen doğru orta dikmedir.",
      kur() { const a = sabit(-110, 20, "A"), b = sabit(110, -20, "B"); ekle({ tur: "dogru", p: a, q: b, parca: true, sabit: true }); return { a, b }; },
      kontrol(v) { const A = P(v.a), B = P(v.b), u = G.birim(B.x - A.x, B.y - A.y), m = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
        return cizgiler().some((o) => { const l = P(o.id); return Math.abs(l.dx * u.x + l.dy * u.y) < 1e-3 && G.dogruUzaklik(l, m) < TOL && [o.p, o.q].every(turetilmisMi); }); } },
    { id: "aciortay", ad: "Açıortay", kaynak: "Elemanlar I.9", par: 6,
      metin: "BAC açısının açıortayını çiz: açıyı iki eş parçaya bölen doğru.",
      ipucu: "A merkezli, B'den geçen çember AC'yi D'de keser. Sonra B ve D merkezli iki çember çiz; kesişimleri E ise AE açıortaydır.",
      kur() { const a = sabit(-150, 90, "A"), b = sabit(120, 90, "B"), c = sabit(60, -120, "C"); ekle({ tur: "dogru", p: a, q: b, sabit: true }); ekle({ tur: "dogru", p: a, q: c, sabit: true }); return { a, b, c }; },
      kontrol(v) { const A = P(v.a), B = P(v.b), C = P(v.c), u = G.birim(B.x - A.x, B.y - A.y), w = G.birim(C.x - A.x, C.y - A.y), bis = G.birim(u.x + w.x, u.y + w.y);
        return cizgiler().some((o) => { const l = P(o.id); return Math.abs(l.dx * bis.y - l.dy * bis.x) < 1e-3 && G.dogruUzaklik(l, A) < TOL && [o.p, o.q].every(turetilmisMi); }); } },
    { id: "dik", ad: "Dışarıdaki noktadan dik", kaynak: "Elemanlar I.12", par: 6,
      metin: "P noktasından d doğrusuna bir dik doğru çiz.",
      ipucu: "P merkezli ve Q'dan geçen çember d'yi ikinci bir noktada keser. Bu iki noktanın orta dikmesi P'den geçer.",
      kur() { const q = sabit(-140, 80, "Q"), r = sabit(150, 60, "R"), p = sabit(10, -110, "P"); ekle({ tur: "dogru", p: q, q: r, sabit: true }); return { q, r, p }; },
      kontrol(v) { const Q = P(v.q), R = P(v.r), Pn = P(v.p), u = G.birim(R.x - Q.x, R.y - Q.y);
        return cizgiler().some((o) => { const l = P(o.id); return Math.abs(l.dx * u.x + l.dy * u.y) < 1e-3 && G.dogruUzaklik(l, Pn) < TOL && [o.p, o.q].every(turetilmisMi); }); } },
    { id: "altigen", ad: "Düzgün altıgen", kaynak: "Elemanlar IV.15", par: 14,
      metin: "O merkezli çembere içten teğet bir düzgün altıgen çiz (6 kenarın hepsi çizilmeli).",
      ipucu: "Altıgenin kenarı yarıçapa eşittir. A merkezli ve O'dan geçen çember büyük çemberi iki noktada keser; aynı adımı yeni noktalarla tekrarla.",
      kur() { const o = sabit(0, 0, "O"), a = sabit(140, 0, "A"); ekle({ tur: "cember", m: o, p: a, sabit: true }); return { o, a }; },
      kontrol(v) { const O = P(v.o), r = G.uz(O, P(v.a)), uygun = nesne.filter((x) => x.tur === "dogru" && x.parca && !x.turet && P(x.id)).filter((x) => { const a = P(x.p), b = P(x.q); return Math.abs(G.uz(a, b) - r) < TOL && Math.abs(G.uz(a, O) - r) < TOL && Math.abs(G.uz(b, O) - r) < TOL && turetilmisMi(x.p) && turetilmisMi(x.q); });
        const kose = new Set(); uygun.forEach((x) => { kose.add(x.p); kose.add(x.q); });
        const konum = [...kose].map((i) => P(i)), farkli = konum.filter((p, i) => konum.findIndex((q) => G.uz(p, q) < TOL) === i);
        return uygun.length >= 6 && farkli.length >= 6; } },
  ];

  /* ---------------- Etkileşim ---------------- */
  function noktaBul(p, r = 14) { let en = null, d0 = r; for (const o of nesne) if (o.tur === "nokta" && P(o.id)) { const d = G.uz(p, P(o.id)); if (d < d0) { d0 = d; en = o; } } return en; }
  function cizgiBul(p, sadeceDogru) {
    let en = null, d0 = 10;
    for (const o of nesne) {
      const h = P(o.id); if (!h) continue;
      let d = Infinity;
      if (o.tur === "dogru") { const t = (p.x - h.x) * h.dx + (p.y - h.y) * h.dy; if (G.icinde(h, t)) d = G.dogruUzaklik(h, p); }
      else if (o.tur === "cember" && !sadeceDogru) d = Math.abs(G.uz(p, h) - h.r);
      if (d < d0) { d0 = d; en = o; }
    }
    return en;
  }
  function anlik() { gecmis.push(JSON.stringify({ nesne, sayac, adim })); if (gecmis.length > 200) gecmis.shift(); ileri = []; }
  function geriAl() { if (!gecmis.length) return; ileri.push(JSON.stringify({ nesne, sayac, adim })); const s = JSON.parse(gecmis.pop()); nesne = s.nesne; sayac = s.sayac; adim = s.adim; secim = []; yenile(); Ses.efekt("dokun"); }
  function yinele() { if (!ileri.length) return; gecmis.push(JSON.stringify({ nesne, sayac, adim })); const s = JSON.parse(ileri.pop()); nesne = s.nesne; sayac = s.sayac; adim = s.adim; secim = []; yenile(); Ses.efekt("dokun"); }
  function bagimlilar(id, set = new Set([id])) {
    for (const o of nesne) if (!set.has(o.id) && ["a", "b", "c", "p", "q", "m", "r1", "r2", "nokta", "dogru"].some((k) => set.has(o[k]))) { set.add(o.id); bagimlilar(o.id, set); }
    return set;
  }
  function koordinat(e) { const r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; }
  function noktaAlYaDaKoy(p) {
    const n = noktaBul(p); if (n) return n.id;
    const c = cizgiBul(p);
    if (c && c.tur === "cember") { const h = P(c.id), d = G.birim(p.x - h.x, p.y - h.y); if (d) p = { x: h.x + d.x * h.r, y: h.y + d.y * h.r }; }
    return ekle({ tur: "nokta", x: p.x, y: p.y });
  }
  function tamamla() {
    const s = secim, varsa = (tur) => s.map(bul).find((o) => o && (tur === "n" ? o.tur === "nokta" : o.tur === "dogru"));
    switch (arac) {
      case "parca": ekle({ tur: "dogru", p: s[0], q: s[1], parca: true }); break;
      case "dogru": ekle({ tur: "dogru", p: s[0], q: s[1] }); break;
      case "cember": ekle({ tur: "cember", m: s[0], p: s[1] }); break;
      case "pergel": ekle({ tur: "cember", m: s[2], r1: s[0], r2: s[1] }); break;
      case "orta": ekle({ tur: "nokta", turet: "orta", a: s[0], b: s[1] }); break;
      case "dik": case "paralel": ekle({ tur: "dogru", turet: arac, nokta: varsa("n").id, dogru: varsa("l").id }); break;
      case "ortadik": ekle({ tur: "dogru", turet: "ortadik", a: s[0], b: s[1] }); break;
      case "aciortay": ekle({ tur: "dogru", turet: "aciortay", a: s[0], b: s[1], c: s[2] }); break;
      case "uzunluk": ekle({ tur: "uzunluk", a: s[0], b: s[1] }); break;
      case "aci": ekle({ tur: "aci", a: s[0], b: s[1], c: s[2] }); break;
      case "kesisim": {
        hesapla();
        const k = G.kesisim(P(s[0]), P(s[1]));
        let yeni = 0;
        k.forEach((p, i) => { if (p && !noktaBul(p, 1)) { ekle({ tur: "nokta", turet: "kesisim", a: s[0], b: s[1], i }); yeni++; } });
        if (!yeni) { U.bildir(k.length ? "Bu kesişim noktaları zaten var." : "Bu iki çizgi kesişmiyor."); secim = []; return false; }
        break;
      }
    }
    if (!["uzunluk", "aci"].includes(arac)) adim++;
    return true;
  }
  function tikla(e) {
    const p = koordinat(e);
    if (arac === "tasi") {
      const n = noktaBul(p, 18);
      if (n && !n.turet) { anlik(); surukle = n.id; try { svg.setPointerCapture(e.pointerId); } catch (_) {} }
      return;
    }
    if (arac === "sil") {
      const o = noktaBul(p) || cizgiBul(p) || olcuBul(p);
      if (!o) return;
      if (o.sabit) { U.bildir("Görevin verilen parçaları silinemez."); return; }
      anlik(); const sil = bagimlilar(o.id); nesne = nesne.filter((x) => !sil.has(x.id)); Ses.efekt("kirik"); yenile(); return;
    }
    if (arac === "nokta") { if (noktaBul(p)) return; anlik(); noktaAlYaDaKoy(p); Ses.efekt("sec"); yenile(); return; }
    const istek = ARAC[arac].istek;
    const sira = istek[secim.length];
    const surum = JSON.stringify({ nesne, sayac, adim });
    let id = null;
    if (arac === "dik" || arac === "paralel") {
      const l = cizgiBul(p, true), n = noktaBul(p);
      const gerekNokta = !secim.some((i) => bul(i).tur === "nokta"), gerekDogru = !secim.some((i) => bul(i).tur === "dogru");
      if (n && gerekNokta) id = n.id; else if (l && gerekDogru) id = l.id; else if (gerekNokta && !l) id = noktaAlYaDaKoy(p);
    } else if (sira === "n") id = noktaAlYaDaKoy(p);
    else if (sira === "e") { const c = cizgiBul(p); if (c) id = c.id; }
    if (!id) return;
    if (secim.includes(id) && arac !== "pergel") return;
    if (!secim.length) { gecmis.push(surum); ileri = []; }
    secim.push(id); Ses.efekt("sec");
    if (secim.length === istek.length) { if (tamamla()) Ses.efekt("dogru"); secim = []; }
    yenile();
  }
  function olcuBul(p) {
    for (const o of nesne) {
      if (o.tur === "uzunluk" && P(o.a) && P(o.b)) { const a = P(o.a), b = P(o.b); if (G.uz(p, { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }) < 24) return o; }
      if (o.tur === "aci" && P(o.b) && G.uz(p, P(o.b)) < 40) return o;
    }
    return null;
  }

  /* ---------------- Çizim ---------------- */
  function dogruUclari(h) {
    if (h.sinirli) return [{ x: h.x, y: h.y }, { x: h.x + h.dx * h.uz, y: h.y + h.dy * h.uz }];
    const L = 4 * (W + H); return [{ x: h.x - h.dx * L, y: h.y - h.dy * L }, { x: h.x + h.dx * L, y: h.y + h.dy * L }];
  }
  function svgYaz(onizleme) {
    const p = [];
    p.push(`<rect width="${W}" height="${H}" fill="#06122a"/>`);
    if (izgara) {
      for (let x = (W / 2) % BIRIM, i = 0; x < W; x += BIRIM, i++) { const k = Math.round((x - W / 2) / BIRIM) % 5 === 0; p.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${k ? RENK.izgaraKalin : RENK.izgara}"/>`); }
      for (let y = (H / 2) % BIRIM; y < H; y += BIRIM) { const k = Math.round((y - H / 2) / BIRIM) % 5 === 0; p.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${k ? RENK.izgaraKalin : RENK.izgara}"/>`); }
    }
    const secili = new Set(secim);
    for (const o of nesne) {
      const h = P(o.id); if (!h) continue;
      const vurgu = secili.has(o.id);
      if (o.tur === "cember") p.push(`<circle cx="${h.x}" cy="${h.y}" r="${h.r}" fill="none" stroke="${vurgu ? RENK.secili : RENK.cember}" stroke-width="${vurgu ? 4 : o.sabit ? 2.5 : 2}"/>`);
    }
    for (const o of nesne) {
      const h = P(o.id); if (!h || o.tur !== "dogru") continue;
      const [a, b] = dogruUclari(h), vurgu = secili.has(o.id);
      const renk = vurgu ? RENK.secili : o.turet ? RENK.turev : o.parca ? RENK.parca : RENK.dogru;
      p.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${renk}" stroke-width="${vurgu ? 4.5 : o.parca ? 3 : 2}" stroke-linecap="round"${o.turet ? ' stroke-dasharray="10 6"' : ""}/>`);
    }
    for (const o of nesne) {
      if (!P(o.id)) continue;
      if (o.tur === "uzunluk") {
        const a = P(o.a), b = P(o.b), d = G.birim(b.x - a.x, b.y - a.y); if (!d) continue;
        const nx = -d.y * 16, ny = d.x * 16, m = { x: (a.x + b.x) / 2 + nx * 1.5, y: (a.y + b.y) / 2 + ny * 1.5 };
        p.push(`<line x1="${a.x + nx}" y1="${a.y + ny}" x2="${b.x + nx}" y2="${b.y + ny}" stroke="${RENK.olcu}" stroke-width="1.5" stroke-dasharray="4 3"/>`);
        p.push(`<text x="${m.x}" y="${m.y + 5}" text-anchor="middle" fill="${RENK.olcu}" font-family="JetBrains Mono, monospace" font-weight="700" font-size="15" paint-order="stroke" stroke="#06122a" stroke-width="4">${S.ondalik(G.uz(a, b) / BIRIM)}</text>`);
      }
      if (o.tur === "aci") {
        const a = P(o.a), v = P(o.b), c = P(o.c), deg = G.aci(a, v, c); if (!isFinite(deg)) continue;
        const u = G.birim(a.x - v.x, a.y - v.y), w = G.birim(c.x - v.x, c.y - v.y), r = 32;
        const buyuk = 0, sweep = (u.x * w.y - u.y * w.x) > 0 ? 1 : 0, ort = G.birim(u.x + w.x, u.y + w.y) || { x: -u.y, y: u.x };
        p.push(`<path d="M${v.x + u.x * r} ${v.y + u.y * r} A${r} ${r} 0 ${buyuk} ${sweep} ${v.x + w.x * r} ${v.y + w.y * r}" fill="rgba(255,198,87,.15)" stroke="${RENK.olcu}" stroke-width="2"/>`);
        p.push(`<text x="${v.x + ort.x * (r + 22)}" y="${v.y + ort.y * (r + 22) + 5}" text-anchor="middle" fill="${RENK.olcu}" font-family="JetBrains Mono, monospace" font-weight="700" font-size="15" paint-order="stroke" stroke="#06122a" stroke-width="4">${S.ondalik(deg, 1)}°</text>`);
      }
    }
    if (onizleme && fare && secim.length && arac !== "tasi") {
      const ilk = P(secim[0]), son = P(secim[secim.length - 1]);
      if (ilk && ["parca", "dogru", "orta", "ortadik", "uzunluk"].includes(arac)) p.push(`<line x1="${ilk.x}" y1="${ilk.y}" x2="${fare.x}" y2="${fare.y}" stroke="${RENK.secili}" stroke-width="1.5" stroke-dasharray="5 5"/>`);
      if (ilk && arac === "cember") p.push(`<circle cx="${ilk.x}" cy="${ilk.y}" r="${G.uz(ilk, fare)}" fill="none" stroke="${RENK.secili}" stroke-width="1.5" stroke-dasharray="5 5"/>`);
      if (arac === "pergel" && secim.length === 2) { const a = P(secim[0]), b = P(secim[1]); if (a && b) p.push(`<circle cx="${fare.x}" cy="${fare.y}" r="${G.uz(a, b)}" fill="none" stroke="${RENK.secili}" stroke-width="1.5" stroke-dasharray="5 5"/>`); }
      if (son && ["aciortay", "aci"].includes(arac)) p.push(`<line x1="${son.x}" y1="${son.y}" x2="${fare.x}" y2="${fare.y}" stroke="${RENK.secili}" stroke-width="1.5" stroke-dasharray="5 5"/>`);
    }
    for (const o of nesne) {
      const h = P(o.id); if (!h || o.tur !== "nokta") continue;
      const vurgu = secili.has(o.id), renk = vurgu ? RENK.secili : o.sabit ? RENK.sabit : o.turet ? RENK.turevNokta : RENK.serbest;
      p.push(`<circle cx="${h.x}" cy="${h.y}" r="${vurgu ? 8 : 6}" fill="${renk}" stroke="#06122a" stroke-width="2"/>`);
      if (!o.turet) p.push(`<circle cx="${h.x}" cy="${h.y}" r="11" fill="none" stroke="${renk}" stroke-opacity=".35" stroke-width="2"/>`);
      p.push(`<text x="${h.x + 10}" y="${h.y - 10}" fill="#eef3ff" font-family="Onest, sans-serif" font-weight="700" font-size="16" paint-order="stroke" stroke="#06122a" stroke-width="4">${U.kacis(o.ad)}</text>`);
    }
    return p.join("");
  }
  function ciz(onizleme = true) { svg.innerHTML = svgYaz(onizleme); }
  function yenile() {
    hesapla(); ciz();
    U.$("#czGeri", el).disabled = !gecmis.length; U.$("#czIleri", el).disabled = !ileri.length;
    const ist = ARAC[arac].istek, kalan = ist.length - secim.length;
    U.$("#czDurum", el).innerHTML = `<b>${ARAC[arac].ad}:</b> ${ARAC[arac].ip}${secim.length && kalan ? ` <span class="soluk">(${kalan} seçim kaldı)</span>` : ""}`;
    olculeriYaz();
    const ad = U.$("#czAdim", el); if (ad) ad.textContent = adim;
    if (gorev) gorevDenetle();
  }
  function olculeriYaz() {
    const ol = nesne.filter((o) => (o.tur === "uzunluk" || o.tur === "aci") && P(o.id));
    const ad = (id) => bul(id).ad;
    U.$("#czOlcu", el).innerHTML = ol.length ? ol.map((o) => o.tur === "uzunluk"
      ? `<div><span>|${ad(o.a)}${ad(o.b)}|</span><b>${S.ondalik(G.uz(P(o.a), P(o.b)) / BIRIM)} birim</b></div>`
      : `<div><span>∠${ad(o.a)}${ad(o.b)}${ad(o.c)}</span><b>${S.ondalik(G.aci(P(o.a), P(o.b), P(o.c)), 1)}°</b></div>`).join("") : '<p class="soluk" style="font-family:var(--f-govde)">Uzunluk ve açı ölçüleri burada listelenir. Noktaları sürükleyince canlı değişir.</p>';
  }

  /* ---------------- Görev yönetimi ---------------- */
  let gorevVeri = null;
  function gorevBaslat(id) {
    gorev = GOREVLER.find((g) => g.id === id) || null;
    nesne = []; sayac = 0; adim = 0; gecmis = []; ileri = []; secim = []; basarildi = false;
    gorevVeri = gorev ? gorev.kur() : null;
    araclariCiz(); aracSec(gorev ? "cember" : "parca");
    gorevPaneli(); yenile();
  }
  function gorevDenetle() {
    if (basarildi || !gorev) return;
    let ok = false; try { ok = gorev.kontrol(gorevVeri); } catch (e) { ok = false; }
    if (!ok) return;
    basarildi = true;
    const yildiz = adim <= gorev.par ? 3 : adim <= gorev.par + 3 ? 2 : 1;
    const kayit = U.depoAl("geo_gorev", {}); if (!kayit[gorev.id] || kayit[gorev.id] < yildiz) { kayit[gorev.id] = yildiz; U.depoYaz("geo_gorev", kayit); }
    const adimlar = U.depoAl("geo_gorev_adim", {}); if (!adimlar[gorev.id] || adim < adimlar[gorev.id]) { adimlar[gorev.id] = adim; U.depoYaz("geo_gorev_adim", adimlar); }
    const toplamYildiz = GOREVLER.reduce((t, g) => t + (kayit[g.id] || 0), 0), toplamAdim = GOREVLER.reduce((t, g) => t + (kayit[g.id] ? adimlar[g.id] || g.par + 4 : 0), 0);
    Ses.efekt("bitis");
    gorevPaneli(`<div class="basari"><b>Tebrikler, çizim doğru!</b><br>${adim} adımda tamamladın (Öklid'in çözümü ${gorev.par} adım). <span class="yildiz">${"★".repeat(yildiz)}${"☆".repeat(3 - yildiz)}</span>
      <p class="soluk" style="margin-top:6px">Şimdi <b>Taşı</b> aracıyla sarı noktaları sürükle: inşa her konumda doğru kalır. Göz kararı çizimle cetvel-pergel çizimi arasındaki fark budur.</p></div>
      <div id="czSiralama"></div>`);
    if (MC.bulut) MC.bulut.gonderKutusu(U.$("#czSiralama", el), { oyun: "oklid", varyant: "toplam", puan: toplamYildiz, ikincil: toplamAdim, ayrinti: { yildiz: kayit, adim: adimlar } });
    if (U.animasyon()) gsap.fromTo(U.$(".basari", el), { scale: .9, opacity: 0 }, { scale: 1, opacity: 1, duration: .4, ease: "back.out(2)", overwrite: true });
  }
  function gorevPaneli(ek = "") {
    const kayit = U.depoAl("geo_gorev", {});
    U.$("#czGorevler", el).innerHTML = `<button class="gorev" data-g="" aria-pressed="${!gorev}"><b>Serbest çizim</b><small>Bütün araçlar açık</small></button>` +
      GOREVLER.map((g) => `<button class="gorev" data-g="${g.id}" aria-pressed="${gorev && gorev.id === g.id}"><b>${g.ad}</b><small>${g.kaynak} · Öklid: ${g.par} adım</small>${kayit[g.id] ? `<span class="yildiz">${"★".repeat(kayit[g.id])}${"☆".repeat(3 - kayit[g.id])}</span>` : ""}</button>`).join("");
    const k = U.$("#czGorevBilgi", el);
    if (!gorev) { k.innerHTML = '<p class="soluk">Serbest kipte tüm araçlar açık. Hazır yapılar (orta dikme, açıortay, paralel) kesikli mor çizgiyle gösterilir.</p>'; return; }
    k.innerHTML = `<div class="bilgi-kutu"><b>${gorev.ad}</b> <span class="soluk">(${gorev.kaynak})</span><br>${gorev.metin}</div>
      <p class="soluk">Yalnızca cetvel (doğru, doğru parçası) ve pergel (çember) kullanılabilir. Adım: <b id="czAdim">${adim}</b></p>
      ${ek || `<details class="acilir"><summary>İpucu</summary><p>${gorev.ipucu}</p></details>`}`;
  }

  /* ---------------- Kurulum ---------------- */
  function araclariCiz() {
    const izinli = gorev ? OKLID : Object.keys(ARAC);
    U.$("#czAraclar", el).innerHTML = GRUPLAR.map((g) => g.map((a) => `<button class="arac" data-a="${a}" aria-pressed="${a === arac}" ${izinli.includes(a) ? "" : "disabled"} title="${ARAC[a].ad}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IKON[a]}</svg>${ARAC[a].ad}</button>`).join("")).join('<div class="arac-ayrac"></div>');
  }
  function aracSec(a) { arac = a; secim = []; U.$$("#czAraclar .arac", el).forEach((b) => b.setAttribute("aria-pressed", b.dataset.a === a)); if (svg) yenile(); }
  function pngIndir() {
    const s = new XMLSerializer().serializeToString(Object.assign(document.createElementNS("http://www.w3.org/2000/svg", "svg"), { innerHTML: svgYaz(false) }));
    const tam = s.replace("<svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"`);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = W * 2; c.height = H * 2; const g = c.getContext("2d"); g.scale(2, 2); g.drawImage(img, 0, 0);
      const a = document.createElement("a"); a.download = "geometri-cizim.png"; a.href = c.toDataURL("image/png"); a.click(); U.bildir("Çizim PNG olarak indirildi.");
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(tam);
  }
  function kur(e) {
    el = e;
    el.innerHTML = `
      <div class="bolum-basi"><span class="etiket" style="color:var(--turkuaz)">Çizim Masası</span><h2>Cetvel ve pergelle geometri</h2>
        <p>Öklid'in 2300 yıl önceki kuralıyla çiz: yalnızca işaretsiz bir cetvel ve bir pergel. Her şey birbirine bağlıdır; bir noktayı sürüklediğinde ona bağlı tüm çizim birlikte hareket eder.</p></div>
      <div class="masa">
        <div class="arac-kutusu" id="czAraclar" role="toolbar" aria-label="Çizim araçları"></div>
        <div class="tahta-kutu" id="czKutu">
          <svg id="czSvg" role="img" aria-label="Çizim tahtası"></svg>
          <div class="tahta-ust">
            <div class="durum-cubugu" id="czDurum"></div>
            <div class="mini-btnlar">
              <button class="mini-btn" id="czGeri" title="Geri al (Ctrl+Z)">↶</button>
              <button class="mini-btn" id="czIleri" title="Yinele (Ctrl+Y)">↷</button>
              <button class="mini-btn" id="czIzgara" title="Izgarayı aç/kapat">▦</button>
              <button class="mini-btn" id="czPng" title="PNG olarak indir">PNG</button>
              <button class="mini-btn" id="czTemizle" title="Baştan başla">Temizle</button>
            </div>
          </div>
        </div>
        <div class="yan-panel yigin">
          <div class="panel"><span class="etiket" style="color:var(--turkuaz)">Öklid görevleri</span><div class="gorev-liste" id="czGorevler"></div></div>
          <div class="panel" id="czGorevBilgi"></div>
          <div class="panel"><span class="etiket soluk">Ölçüler</span><div class="olcu-liste" id="czOlcu"></div></div>
        </div>
      </div>`;
    svg = U.$("#czSvg", el); kutu = U.$("#czKutu", el);
    const boyut = () => { const r = kutu.getBoundingClientRect(); if (!r.width) return; W = Math.round(r.width); H = Math.round(r.height); svg.setAttribute("viewBox", `0 0 ${W} ${H}`); ciz(); };
    new ResizeObserver(boyut).observe(kutu); boyut();
    U.$("#czAraclar", el).addEventListener("click", (ev) => { const b = ev.target.closest(".arac"); if (b && !b.disabled) { Ses.efekt("dokun"); aracSec(b.dataset.a); } });
    svg.addEventListener("pointerdown", (ev) => { ev.preventDefault(); tikla(ev); });
    svg.addEventListener("pointermove", (ev) => {
      fare = koordinat(ev);
      if (surukle) { const o = bul(surukle); o.x = fare.x; o.y = fare.y; hesapla(); ciz(false); olculeriYaz(); return; }
      if (secim.length) ciz();
    });
    const birak = () => { if (surukle) { surukle = null; yenile(); } };
    svg.addEventListener("pointerup", birak); svg.addEventListener("pointercancel", birak);
    svg.addEventListener("pointerleave", () => { fare = null; if (secim.length) ciz(); });
    U.$("#czGeri", el).addEventListener("click", geriAl);
    U.$("#czIleri", el).addEventListener("click", yinele);
    U.$("#czIzgara", el).addEventListener("click", () => { izgara = !izgara; ciz(); });
    U.$("#czPng", el).addEventListener("click", pngIndir);
    U.$("#czTemizle", el).addEventListener("click", () => { gorevBaslat(gorev ? gorev.id : null); Ses.efekt("kirik"); });
    U.$("#czGorevler", el).addEventListener("click", (ev) => { const b = ev.target.closest(".gorev"); if (b) { Ses.efekt("basla"); gorevBaslat(b.dataset.g || null); } });
    document.addEventListener("keydown", (ev) => {
      if (!el.closest(".gorunum.aktif") || ev.target.matches("input, textarea")) return;
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "z") { ev.preventDefault(); geriAl(); }
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "y") { ev.preventDefault(); yinele(); }
      if (ev.key === "Escape") { secim = []; yenile(); }
    });
    gorevBaslat("eskenar");
  }
  MC.modul("cizim", { baslik: "Çizim Masası", kur });
  MC.geo = { G, GOREVLER, durum: () => ({ nesne, hesap, adim, basarildi, gorev: gorev && gorev.id }), _test: { gorevBaslat, aracSec, tiklaXY: (x, y) => { const r = svg.getBoundingClientRect(); tikla({ clientX: r.left + x * r.width / W, clientY: r.top + y * r.height / H, pointerId: 1 }); }, boyut: () => ({ W, H }), P, ekle, hesapla, yenile, veri: () => gorevVeri, kontrol: () => gorev.kontrol(gorevVeri), adimArtir: () => adim++ } };
})();
