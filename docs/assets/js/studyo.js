/* =====================================================================
   ÇÖZÜM STÜDYOSU — yalnızca yönetici öğretmenin kullandığı geometri atölyesi
   Soru Masası'nın üstüne kurulur (studyo/ sayfası, window.MC_STUDYO = true).
   · Giriş: Supabase hesabı + yöneticiler tablosu (yönetim sayfasıyla aynı oturum)
   · Çözüm: sayısal cevap, çözüm radarı (gizli eşitlikler, ikizkenar üçgenler,
     yuvarlak açılar, çemberdeş noktalar, gizli doğrusallık, paralellik)
   · Ek çizim önerici: döndürme, yansıma, orta nokta, üçgen kopyalama adaylarını
     dener; yeni eşitlik doğuranları sıralar. (YZ değil: arama + ölçüm.)
   · Adım kaydı: ek çizimleri adım adım kaydet, açıklama yaz, önizle, dışa aktar
   · Arşiv: sorular buluttaki studyo_sorular tablosunda (yalnızca yönetici görür)
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, B = MC.bulut, H = MC.soruHesap, G = H.G;
  const I = () => MC.geoSoru.ic;
  const T = (MC.studyo = { kayit: false });
  const TOL = 2e-3;                      // göreli eşitlik toleransı
  let sekme = "coz", radar = null, oneriler = null, kok = null, arsivListe = null, arsivAra = "";

  /* =================================================================
     GİRİŞ (yönetim sayfasıyla aynı oturum anahtarı)
     ================================================================= */
  const DEPO = "mc_yonetici_oturum";
  let oturum = (() => { try { return JSON.parse(sessionStorage.getItem(DEPO) || localStorage.getItem(DEPO) || "null"); } catch (e) { return null; } })();
  function oturumKaydet(r, kalici) {
    oturum = { erisim: r.access_token, yenile: r.refresh_token, bitis: r.expires_at ? r.expires_at * 1000 : Date.now() + (r.expires_in || 3600) * 1000,
      eposta: (r.user && r.user.email) || (oturum && oturum.eposta) || "", kalici: !!kalici };
    try { sessionStorage.removeItem(DEPO); localStorage.removeItem(DEPO); (kalici ? localStorage : sessionStorage).setItem(DEPO, JSON.stringify(oturum)); } catch (e) {}
  }
  function oturumSil() { oturum = null; try { sessionStorage.removeItem(DEPO); localStorage.removeItem(DEPO); } catch (e) {} }
  async function token() {
    if (!oturum) throw new Error("oturum_yok");
    if (oturum.bitis - Date.now() < 60000) oturumKaydet(await B.istek("/auth/v1/token?grant_type=refresh_token", { yontem: "POST", govde: { refresh_token: oturum.yenile } }), oturum.kalici);
    return oturum.erisim;
  }
  async function api(yol, s = {}) {
    let t; try { t = await token(); } catch (e) { oturumSil(); girisCiz("Oturumun süresi doldu. Yeniden giriş yap."); throw new Error("oturum_bitti"); }
    try { return await B.istek(yol, { ...s, token: t }); }
    catch (e) { if (e.durum === 401 || /JWT/i.test(e.message)) { oturumSil(); girisCiz("Oturumun süresi doldu. Yeniden giriş yap."); throw new Error("oturum_bitti"); } throw e; }
  }
  const kapi = () => U.$("#stKapi"), masa = () => U.$("#g-soru");
  function ustCiz() {
    const k = U.$("#stKullanici"); if (!k) return;
    k.innerHTML = oturum ? `<span class="soluk st-eposta">${U.kacis(oturum.eposta || "")}</span><button class="ses-btn" id="stCikis" type="button">Çıkış</button>` : "";
    const c = U.$("#stCikis"); if (c) c.onclick = async () => { try { await B.istek("/auth/v1/logout", { yontem: "POST", token: oturum.erisim }); } catch (e) {} oturumSil(); location.reload(); };
  }
  function girisCiz(mesaj) {
    ustCiz(); masa().hidden = true; kapi().hidden = false;
    kapi().innerHTML = `<form class="panel st-giris" id="stForm" novalidate>
        <span class="etiket" style="color:var(--altin)">Yalnızca yetkili öğretmen</span><h2>Çözüm Stüdyosu</h2>
        <p class="soluk">Geometri sorularını kurup çözdüğün, ek çizimli çözümleri adım adım kaydettiğin ve arşivlediğin özel atölye. Yönetim sayfasındaki hesabınla gir.</p>
        <label class="alan"><span>E-posta</span><input class="girdi" id="stEposta" type="email" autocomplete="username" required></label>
        <label class="alan"><span>Şifre</span><input class="girdi" id="stSifre" type="password" autocomplete="current-password" required></label>
        <label class="anahtar"><input type="checkbox" id="stKalici"> Bu cihazda oturumu açık tut</label>
        <p class="hata-metin" id="stHata" role="alert">${mesaj ? U.kacis(mesaj) : ""}</p>
        <div class="satir"><button class="btn btn-ana" type="submit">Giriş yap</button></div></form>`;
    U.$("#stForm").addEventListener("submit", async (e) => {
      e.preventDefault(); const h = U.$("#stHata"); h.textContent = "Giriş yapılıyor…";
      try { oturumKaydet(await B.istek("/auth/v1/token?grant_type=password", { yontem: "POST", govde: { email: U.$("#stEposta").value.trim(), password: U.$("#stSifre").value } }), U.$("#stKalici").checked); yetki(); }
      catch (err) { h.textContent = B.hataMetni(err); }
    });
  }
  async function yetki() {
    ustCiz(); kapi().hidden = false; masa().hidden = true;
    kapi().innerHTML = '<p class="soluk">Yetki denetleniyor…</p>';
    let d; try { d = await api("/rest/v1/rpc/yonetici_durum", { yontem: "POST", govde: {} }); }
    catch (e) { if (e.message !== "oturum_bitti") kapi().innerHTML = `<div class="panel st-giris"><p class="hata-metin">${U.kacis(B.hataMetni(e))}</p><button class="btn btn-ikinci" id="stTekrar">Yeniden dene</button></div>`; const t = U.$("#stTekrar"); if (t) t.onclick = yetki; return; }
    if (!d || !d.yonetici) { kapi().innerHTML = `<div class="panel st-giris"><h2>Yetki yok</h2><p class="soluk">Bu hesap yönetici değil. Çözüm Stüdyosu yalnızca yönetici öğretmene açıktır.</p></div>`; return; }
    kapi().hidden = true; masa().hidden = false;
    if (!T.basladi) { T.basladi = true; MC.ui.baslat(); }
  }
  T.basla = function () {
    if (!B || !B.ayarli()) { kapi().innerHTML = '<div class="panel st-giris"><p class="hata-metin">Bulut bağlantısı ayarlı değil (bulut-ayar.js).</p></div>'; return; }
    if (oturum) yetki(); else girisCiz();
  };

  /* =================================================================
     SAHNE: noktalar, çizili doğrular, bilinen eşitlikler
     ================================================================= */
  const anahtar = (a, b) => (a < b ? a + "|" + b : b + "|" + a);
  const yakin = (a, b) => Math.abs(a - b) <= TOL * Math.max(Math.abs(a), Math.abs(b), 1);
  function sahne() {
    const S = I().S(), P = I().P;
    const N = S.nesne.filter((o) => o.tur === "nokta" && !o.ogr && P(o.id)).map((o) => ({ id: o.id, ad: o.ad, x: P(o.id).x, y: P(o.id).y }));
    const nb = Object.fromEntries(N.map((n) => [n.id, n]));
    const L = [];
    for (const o of S.nesne) {
      if (o.tur !== "parca" || o.ogr || !nb[o.p] || !nb[o.q]) continue;
      const a = nb[o.p], b = nb[o.q], uz = G.uz(a, b); if (uz < 1e-6) continue;
      const d = { x: (b.x - a.x) / uz, y: (b.y - a.y) / uz };
      const on = N.filter((n) => { const t = (n.x - a.x) * d.x + (n.y - a.y) * d.y, h = Math.abs((n.x - a.x) * d.y - (n.y - a.y) * d.x); return h < 0.8 && (o.sonsuz || (t > -0.8 && t < uz + 0.8)); });
      L.push({ id: o.id, a, b, d, on: new Set(on.map((n) => n.id)), sonsuz: !!o.sonsuz });
    }
    const cizili = (i, j) => L.some((l) => l.on.has(i) && l.on.has(j));
    // Bilinen eşitlikler (birleşim-bul): çentik grupları ve aynı sayısal uzunluk etiketleri
    const ana = {}, bul = (k) => (ana[k] === undefined || ana[k] === k ? (ana[k] = k) : (ana[k] = bul(ana[k])));
    const birlestir = (a, b) => { ana[bul(a)] = bul(b); };
    const gruplar = {};
    for (const o of S.nesne) {
      if (o.ogr) continue;
      if (o.tur === "centik" && nb[o.a] && nb[o.b]) (gruplar["c" + o.n] = gruplar["c" + o.n] || []).push(anahtar(o.a, o.b));
      if (o.tur === "uz" && nb[o.a] && nb[o.b]) { const e = H.ifade(o.metin); if (e && !e.soru && !Object.keys(e.kat).length) (gruplar["u" + e.sabit] = gruplar["u" + e.sabit] || []).push(anahtar(o.a, o.b)); }
    }
    Object.values(gruplar).forEach((g) => g.forEach((k) => birlestir(k, g[0])));
    const esitBilinen = Object.values(gruplar).filter((g) => g.length >= 2);
    const verilenAci = S.nesne.filter((o) => o.tur === "aci" && !o.ogr && nb[o.a] && nb[o.v] && nb[o.c]).map((o) => ({ v: o.v, u: G.birim(nb[o.a].x - nb[o.v].x, nb[o.a].y - nb[o.v].y), w: G.birim(nb[o.c].x - nb[o.v].x, nb[o.c].y - nb[o.v].y) }));
    return { S, N, nb, L, cizili, bul, esitBilinen, verilenAci, olcek: S.olcek || 40 };
  }
  const ad = (sh, id) => (sh.nb[id] ? sh.nb[id].ad : "?");
  const uzY = (sh, i, j, x) => `${x ? "" : ""}|${ad(sh, i)}${ad(sh, j)}|`;

  /* =================================================================
     ÇÖZÜM RADARI
     ================================================================= */
  function radarCalistir() {
    const sh = sahne(), N = sh.N, n = N.length, sonuc = { esit: [], ikiz: [], aci: [], cember: [], dogrusal: [], paralel: [] };
    if (n < 3) return { sh, sonuc, az: true };
    const alan2 = (a, b, c) => Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
    const dogrusalMi = (a, b, c) => alan2(a, b, c) < 1e-4 * Math.max(G.uz(a, b), G.uz(a, c), G.uz(b, c)) ** 2;
    // 1) Eş uzunluklar
    const ciftler = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) ciftler.push({ i: N[i].id, j: N[j].id, d: G.uz(N[i], N[j]) });
    ciftler.sort((a, b) => a.d - b.d);
    for (let s = 0; s < ciftler.length;) {
      let e = s + 1; while (e < ciftler.length && yakin(ciftler[e].d, ciftler[s].d)) e++;
      const g = ciftler.slice(s, e); s = e;
      if (g.length < 2) continue;
      const siniflar = new Set(g.map((c) => sh.bul(anahtar(c.i, c.j))));
      if (siniflar.size < 2) continue;
      const cz = g.filter((c) => sh.cizili(c.i, c.j)).length;
      sonuc.esit.push({ g, cz, metin: g.map((c) => (sh.cizili(c.i, c.j) ? `<b>|${ad(sh, c.i)}${ad(sh, c.j)}|</b>` : `<i>|${ad(sh, c.i)}${ad(sh, c.j)}|</i>`)).join(" = "), deger: H.guzelYaz(g[0].d / sh.olcek) });
    }
    sonuc.esit.sort((a, b) => b.cz - a.cz || b.g.length - a.g.length); sonuc.esit = sonuc.esit.slice(0, 10);
    // 2) İkizkenar ve eşkenar üçgenler (en az iki kenarı çizili)
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
      const A = N[i], Bn = N[j], C = N[k]; if (dogrusalMi(A, Bn, C)) continue;
      const cz = [sh.cizili(A.id, Bn.id), sh.cizili(Bn.id, C.id), sh.cizili(A.id, C.id)].filter(Boolean).length; if (cz < 2) continue;
      const ab = G.uz(A, Bn), bc = G.uz(Bn, C), ac = G.uz(A, C);
      const e1 = yakin(ab, ac), e2 = yakin(ab, bc), e3 = yakin(ac, bc);
      if (e1 && e2) { sonuc.ikiz.push({ ids: [A.id, Bn.id, C.id], metin: `<b>${A.ad}${Bn.ad}${C.ad} eşkenar</b>` }); continue; }
      const tepe = e1 ? A : e2 ? Bn : e3 ? C : null; if (!tepe) continue;
      const [p, q] = [A, Bn, C].filter((x) => x !== tepe);
      const bilinen = sh.bul(anahtar(tepe.id, p.id)) === sh.bul(anahtar(tepe.id, q.id)) && sh.esitBilinen.some((g) => g.includes(anahtar(tepe.id, p.id)));
      if (bilinen && cz === 3) continue;
      sonuc.ikiz.push({ ids: [tepe.id, p.id, q.id], metin: `${p.ad}${tepe.ad}${q.ad} ikizkenar: |${tepe.ad}${p.ad}| = |${tepe.ad}${q.ad}|, tepe ${tepe.ad} (${H.yuvarla(G.aci(p, tepe, q))}°)${bilinen ? "" : " <span class='st-yeni'>yeni</span>"}` });
    }
    sonuc.ikiz = sonuc.ikiz.slice(0, 10);
    // 3) Yuvarlak açılar (çizili ışınlar arasında, verilmemiş olanlar)
    for (const V of N) {
      const isin = [];
      for (const l of sh.L) {
        if (!l.on.has(V.id)) continue;
        for (const yon of [1, -1]) {
          let en = null, d0 = Infinity;
          for (const id of l.on) { if (id === V.id) continue; const p = sh.nb[id], t = ((p.x - V.x) * l.d.x + (p.y - V.y) * l.d.y) * yon; if (t > 0.8 && t < d0) { d0 = t; en = p; } }
          if (en) { const u = G.birim(en.x - V.x, en.y - V.y); if (!isin.some((r) => r.u.x * u.x + r.u.y * u.y > 0.99999)) isin.push({ p: en, u }); }
        }
      }
      for (let a = 0; a < isin.length; a++) for (let b = a + 1; b < isin.length; b++) {
        const A = isin[a], C = isin[b], deg = Math.acos(Math.max(-1, Math.min(1, A.u.x * C.u.x + A.u.y * C.u.y))) * 180 / Math.PI;
        if (deg < 0.5 || deg > 179.5) continue;
        const yuv = Math.round(deg * 2) / 2; if (Math.abs(deg - yuv) > 0.03) continue;
        const ayni = (x, y) => x && y && x.x * y.x + x.y * y.y > 0.99999;
        if (sh.verilenAci.some((g) => g.v === V.id && ((ayni(g.u, A.u) && ayni(g.w, C.u)) || (ayni(g.u, C.u) && ayni(g.w, A.u))))) continue;
        sonuc.aci.push({ ids: [A.p.id, V.id, C.p.id], metin: `m(${A.p.ad}${V.ad}${C.p.ad}) = <b>${H.yuvarla(yuv)}°</b>` });
      }
    }
    // 4) Çemberdeş dörtlüler, 5) gizli doğrusallık
    const cevrel = (a, b, c) => { const d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)); if (Math.abs(d) < 1e-9) return null; const a2 = a.x * a.x + a.y * a.y, b2 = b.x * b.x + b.y * b.y, c2 = c.x * c.x + c.y * c.y; const x = (a2 * (b.y - c.y) + b2 * (c.y - a.y) + c2 * (a.y - b.y)) / d, y = (a2 * (c.x - b.x) + b2 * (a.x - c.x) + c2 * (b.x - a.x)) / d; return { x, y, r: Math.hypot(a.x - x, a.y - y) }; };
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
      const A = N[i], Bn = N[j], C = N[k];
      if (dogrusalMi(A, Bn, C)) { if (!sh.L.some((l) => l.on.has(A.id) && l.on.has(Bn.id) && l.on.has(C.id))) sonuc.dogrusal.push({ ids: [A.id, Bn.id, C.id], metin: `${A.ad}, ${Bn.ad}, ${C.ad} doğrusal` }); continue; }
      const c = cevrel(A, Bn, C); if (!c || c.r > 5000) continue;
      for (let m = k + 1; m < n; m++) { const D = N[m]; if (Math.abs(G.uz(D, c) - c.r) < TOL * c.r && ![[A, Bn, D], [A, C, D], [Bn, C, D]].some(([p, q, r]) => dogrusalMi(p, q, r))) sonuc.cember.push({ ids: [A.id, Bn.id, C.id, D.id], metin: `${A.ad}, ${Bn.ad}, ${C.ad}, ${D.ad} çemberdeş` }); }
    }
    // 6) Paralel çizgiler (ortak noktası olmayan)
    for (let a = 0; a < sh.L.length; a++) for (let b = a + 1; b < sh.L.length; b++) {
      const l = sh.L[a], m = sh.L[b]; if ([...l.on].some((id) => m.on.has(id))) continue;
      if (Math.abs(l.d.x * m.d.y - l.d.y * m.d.x) < 1e-3) sonuc.paralel.push({ ids: [l.id, m.id], metin: `${l.a.ad}${l.b.ad} ∥ ${m.a.ad}${m.b.ad}` });
    }
    ["aci", "cember", "dogrusal", "paralel"].forEach((k) => (sonuc[k] = sonuc[k].slice(0, k === "aci" ? 24 : 8)));
    return { sh, sonuc };
  }

  /* =================================================================
     EK ÇİZİM ÖNERİCİ — adayları dene, yeni eşitlik doğuranları sırala
     ================================================================= */
  function ekCizimOner() {
    const sh = sahne(), N = sh.N, aday = [];
    if (N.length < 3) return [];
    const ekle = (p, tanim, metin, bilinen, baglar, sira) => { if (p && isFinite(p.x) && isFinite(p.y)) aday.push({ x: p.x, y: p.y, tanim, metin, bilinen: new Set(bilinen), baglar, sira }); };
    const don = (A, M, deg) => { const r = -deg * Math.PI / 180, x = A.x - M.x, y = A.y - M.y; return { x: M.x + x * Math.cos(r) - y * Math.sin(r), y: M.y + x * Math.sin(r) + y * Math.cos(r) }; };
    const yans = (A, a, d) => { const t = (A.x - a.x) * d.x + (A.y - a.y) * d.y, h = { x: a.x + d.x * t, y: a.y + d.y * t }; return { x: 2 * h.x - A.x, y: 2 * h.y - A.y }; };
    // Orta noktalar
    for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) { const A = N[i], C = N[j]; ekle({ x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 }, { turet: "orta", a: A.id, b: C.id }, `[${A.ad}${C.ad}] doğru parçasının orta noktası`, [A.id, C.id], [], 1); }
    // Yansımalar
    for (const l of sh.L) for (const A of N) { if (l.on.has(A.id)) continue; ekle(yans(A, l.a, l.d), { turet: "yansit", a: A.id, p: l.a.id, q: l.b.id }, `${A.ad} noktasının ${l.a.ad}${l.b.ad} doğrusuna göre yansıması`, [...l.on], [A.id], 2); }
    // Döndürmeler
    for (const M of N) for (const A of N) { if (A === M) continue; for (const deg of [60, -60, 90, -90]) ekle(don(A, M, deg), { turet: "dondur", a: A.id, m: M.id, derece: deg }, `${A.ad} noktasını ${M.ad} etrafında ${Math.abs(deg)}° ${deg > 0 ? "saat yönünün tersine" : "saat yönünde"} döndür`, Math.abs(deg) === 60 ? [M.id, A.id] : [M.id], Math.abs(deg) === 60 ? [M.id, A.id] : [M.id], 3); }
    // Üçgen kopyalama: verilen eşit iki parça arasında eşlik taşıması
    const parcalar = []; sh.esitBilinen.forEach((g) => { for (let a = 0; a < g.length; a++) for (let b = a + 1; b < g.length; b++) parcalar.push([g[a].split("|"), g[b].split("|")]); });
    for (const [s1, s2] of parcalar) for (const [x1, x2] of [s1, [s1[1], s1[0]]]) for (const [y1, y2] of [s2, [s2[1], s2[0]]]) for (const ters of [false, true]) for (const Y of N) {
      if (Y.id === x1 || Y.id === x2) continue;
      const a1 = sh.nb[x1], a2 = sh.nb[x2], b1 = sh.nb[y1], b2 = sh.nb[y2]; if (!a1 || !a2 || !b1 || !b2) continue;
      let q = { x: Y.x, y: Y.y }; if (ters) { const d = G.birim(a2.x - a1.x, a2.y - a1.y); q = yans(q, a1, d); }
      const th = Math.atan2(b2.y - b1.y, b2.x - b1.x) - Math.atan2(a2.y - a1.y, a2.x - a1.x), c = Math.cos(th), s = Math.sin(th), x = q.x - a1.x, y = q.y - a1.y;
      ekle({ x: b1.x + x * c - y * s, y: b1.y + x * s + y * c }, { turet: "tasi", a1: x1, a2: x2, b1: y1, b2: y2, y: Y.id, ters }, `${a1.ad}${a2.ad}${Y.ad} üçgenini [${b1.ad}${b2.ad}] üzerine ${ters ? "aynalayarak " : ""}kopyala (${a1.ad}→${b1.ad}, ${a2.ad}→${b2.ad})`, [y1, y2], [y1, y2], 4);
    }
    // Puanla: çizili uzunluklarla yeni eşitlikler, çizili doğru üzerine düşme, çemberdeşlik
    const verilen = new Set(sh.esitBilinen.flat());
    const uzunluklar = []; for (let i = 0; i < N.length; i++) for (let j = i + 1; j < N.length; j++) if (sh.cizili(N[i].id, N[j].id)) uzunluklar.push({ d: G.uz(N[i], N[j]), ad: `|${N[i].ad}${N[j].ad}|`, verilen: verilen.has(anahtar(N[i].id, N[j].id)) });
    uzunluklar.sort((a, b) => b.verilen - a.verilen);
    const olcu = Math.max(...N.map((p) => p.x)) - Math.min(...N.map((p) => p.x)) + Math.max(...N.map((p) => p.y)) - Math.min(...N.map((p) => p.y));
    const sonuc = [];
    for (const a of aday) {
      if (N.some((p) => G.uz(p, a) < 3) || a.x < -400 || a.x > 1400 || a.y < -400 || a.y > 1100) continue;
      const olgu = [], baglar = new Set(a.baglar); let puan = 0;
      for (const Y of N) {
        if (a.bilinen.has(Y.id)) continue;
        const d = G.uz(a, Y), es = uzunluklar.find((u) => yakin(u.d, d) && d > olcu * 0.02);
        if (es) { olgu.push(`|X${Y.ad}| = ${es.ad}${es.verilen ? " (verilen)" : ""}`); baglar.add(Y.id); puan += es.verilen ? 2 : 1; }
      }
      for (const l of sh.L) { if ([...a.bilinen].some((id) => l.on.has(id)) && a.tanim.turet !== "orta") continue; const t = (a.x - l.a.x) * l.d.x + (a.y - l.a.y) * l.d.y, h = Math.abs((a.x - l.a.x) * l.d.y - (a.y - l.a.y) * l.d.x); if (h < 0.8 && a.tanim.turet !== "orta") { olgu.push(`X, ${l.a.ad}${l.b.ad} doğrusu üzerinde${t < 0 || t > G.uz(l.a, l.b) ? " (uzantısında)" : ""}`); puan += 1; } }
      if (!olgu.length) continue;
      sonuc.push({ ...a, olgu, baglar: [...baglar], puan });
    }
    sonuc.sort((x, y) => y.puan - x.puan || x.sira - y.sira);
    // Aynı noktaya farklı yollardan varılıyorsa tek öneri: en çok puan getiren yol ana yol, ötekiler "ya da"
    const tekil = [];
    for (const s of sonuc) {
      const t = tekil.find((x) => Math.hypot(x.x - s.x, x.y - s.y) < 2);
      if (!t) tekil.push({ ...s, yollar: [s.metin] });
      else if (!t.yollar.includes(s.metin) && t.yollar.length < 4) t.yollar.push(s.metin);
    }
    tekil.sort((x, y) => y.puan - x.puan || y.yollar.length - x.yollar.length || x.sira - y.sira);
    return tekil.slice(0, 8);
  }
  function oneriUygula(o) {
    T.kayit = true; I().anlik();
    const x = I().ekle({ tur: "nokta", ...o.tanim });
    for (const y of o.baglar) I().ekle({ tur: "parca", p: x, q: y });
    I().degisti(); I().vurgula([x]); sekme = "adim"; ciz();
    U.bildir("Ek çizim eklendi ve adım kaydı açıldı. Açıklamasını yazıp adımı kaydet.");
  }

  /* =================================================================
     ADIMLAR: kayıt, düzenleme, dışa aktarma
     ================================================================= */
  const metinHtml = (t) => String(t || "").trim().split(/\n+/).filter(Boolean).map((p) => `<p>${U.kacis(p).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")}</p>`).join("");
  const bekleyen = () => I().S().nesne.filter((o) => o.ogr && o.adim === undefined);
  function adimlarAl() {
    const S = I().S(), meta = S.adimMeta || [];
    return meta.map((m, k) => {
      const ob = S.nesne.filter((o) => o.ogr && o.adim === k);
      const ekle = ob.filter((o) => o.tur !== "bolge").map(({ ogr, adim, ...o }) => o), bolge = ob.filter((o) => o.tur === "bolge").map((o) => o.noktalar);
      return { baslik: m.baslik || "", metin: metinHtml(m.ham), ekle, vurgu: ekle.map((o) => o.id), ...(bolge.length ? { bolge } : {}), ...(m.gizle && m.gizle.length ? { gizle: m.gizle } : {}) };
    });
  }
  function soruAl() { const S = I().S(); return { ...JSON.parse(JSON.stringify({ ...S, gorsel: null })), nesne: S.nesne.filter((o) => !o.ogr).map((o) => ({ ...o })), adimlar: adimlarAl() }; }
  function adimKaydet() {
    const S = I().S(), b = U.$("#stAdimBaslik", kok), m = U.$("#stAdimMetin", kok);
    if (!m.value.trim()) { U.bildir("Adımın açıklamasını yaz: ne çizdin, ne gördün?"); m.focus(); return; }
    S.adimMeta = S.adimMeta || []; const k = S.adimMeta.length;
    bekleyen().forEach((o) => (o.adim = k));
    S.adimMeta.push({ baslik: b.value.trim(), ham: m.value.trim() });
    I().vurgula([]); I().degisti(); ciz(); U.bildir(`Adım ${k + 1} kaydedildi.`); MC.Ses.efekt("dogru");
  }
  function sonAdimGeri() {
    const S = I().S(); if (!S.adimMeta || !S.adimMeta.length) return;
    const k = S.adimMeta.length - 1, m = S.adimMeta.pop();
    S.nesne.forEach((o) => { if (o.adim === k) delete o.adim; });
    I().degisti(); ciz();
    U.$("#stAdimBaslik", kok).value = m.baslik || ""; U.$("#stAdimMetin", kok).value = m.ham || "";
    U.bildir("Son adım çözüldü: çizimleri bekleyen ek çizimlere döndü, metni düzenleyebilirsin.");
  }
  function onizle() {
    const q = soruAl(); if (!q.adimlar.length) { U.bildir("Önce en az bir adım kaydet."); return; }
    I().cozBaslat(q); I().adimGit(0);
    U.bildir("Öğrencinin göreceği hâl. Geri dönmek için “Öğretmen: hazırla”ya bas.");
  }
  function indir(ad, veri) {
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(veri, null, 1)], { type: "application/json" }));
    a.download = ad; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  const dosyaAdi = (S) => (S.baslik || "geometri").toLocaleLowerCase("tr-TR").replace(/[^a-z0-9çğıöşü]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "soru";
  function haftalikJson() {
    const S = I().S(), q = soruAl();
    return { id: S.haftaId || "", tur: "geometri", baslik: S.baslik, seviye: S.seviye || "", konu: ["Geometri"], zorluk: 2, metin: S.metin, ipuclari: S.ipuclari || [],
      cevapMetin: S.cevapMetin, birim: S.birim, sekil: { nesne: q.nesne, olcek: S.olcek || null, uyduruldu: !!S.uyduruldu }, hazirlayan: "Muhsin ENGİN" };
  }

  /* =================================================================
     ARŞİV (bulut)
     ================================================================= */
  const TABLO = "/rest/v1/studyo_sorular";
  const tabloYok = (e) => e && (e.durum === 404 || /studyo_sorular|PGRST205|does not exist/i.test(e.message || ""));
  async function arsivYukle() {
    try { arsivListe = await api(`${TABLO}?select=id,baslik,cevap,etiket,guncelleme&order=guncelleme.desc&limit=500`); }
    catch (e) { arsivListe = { hata: e.message === "oturum_bitti" ? null : tabloYok(e) ? "tablo" : B.hataMetni(e) }; }
    if (sekme === "arsiv") ciz();
  }
  async function arsivKaydet() {
    const S = I().S();
    if (!S.baslik.trim()) { U.bildir("Önce sorunun başlığını yaz (3 · Soru bölümü)."); return; }
    const veri = JSON.parse(JSON.stringify({ ...S, gorsel: null }));
    try {
      await api(`${TABLO}?on_conflict=id`, { yontem: "POST", govde: [{ id: S.id, baslik: S.baslik.trim(), cevap: S.cevapMetin || "", etiket: S.etiket || [], veri }], ek: { Prefer: "resolution=merge-duplicates,return=minimal" } });
      U.bildir("Arşive kaydedildi."); MC.Ses.efekt("seri"); arsivYukle();
    } catch (e) { if (e.message !== "oturum_bitti") U.bildir(tabloYok(e) ? "Arşiv tablosu kurulmamış: veritabani/studyo.sql dosyasını Supabase'de çalıştır." : B.hataMetni(e)); }
  }
  async function arsivAc(id) {
    try { const r = await api(`${TABLO}?id=eq.${encodeURIComponent(id)}&select=veri`); if (!r || !r[0]) throw new Error("bulunamadı"); I().taslakYukle(r[0].veri); sekme = "coz"; radar = oneriler = null; U.bildir("Soru açıldı."); }
    catch (e) { if (e.message !== "oturum_bitti") U.bildir(B.hataMetni(e)); }
  }
  async function arsivSil(id) {
    try { await api(`${TABLO}?id=eq.${encodeURIComponent(id)}`, { yontem: "DELETE", ek: { Prefer: "return=minimal" } }); arsivYukle(); }
    catch (e) { if (e.message !== "oturum_bitti") U.bildir(B.hataMetni(e)); }
  }

  /* =================================================================
     PANEL
     ================================================================= */
  function cozHtml() {
    const S = I().S(), su = I().sonUydur();
    const cevap = S.uyduruldu && su && su.basarili && su.cevap ? `<div class="basari"><b>Sayısal cevap: ${H.guzelYaz(su.cevap.deger)}${su.cevap.birim === "°" ? "°" : su.cevap.birim ? " " + su.cevap.birim : ""}</b>${su.tek === false ? '<br><span class="hata-metin">Dikkat: cevap tek değil, bir veri eksik olabilir.</span>' : ""}</div>`
      : `<p class="soluk">Şekli kurup verileri yazdıktan sonra <b>Şekli verilere uydur</b>: cevap burada çıkar. Radar ve öneriler ölçekli şekle bakar.</p><button class="btn btn-ikinci btn-kucuk" id="stUydur">Şekli verilere uydur</button>`;
    const liste = (b, l, bos) => `<div class="st-radar-grup"><b>${b}</b>${l.length ? `<ul>${l.map((x, i) => `<li data-r="${b}|${i}">${x.metin}</li>`).join("")}</ul>` : `<p class="soluk">${bos}</p>`}</div>`;
    const r = radar && radar.sonuc;
    return `<div class="panel"><span class="etiket" style="color:var(--altin)">Cevap</span>${cevap}</div>
      <div class="panel"><div class="satir" style="justify-content:space-between"><span class="etiket" style="color:var(--altin)">Çözüm radarı</span><button class="btn btn-ikinci btn-kucuk" id="stRadar">${radar ? "Yenile" : "Çalıştır"}</button></div>
        <p class="soluk" style="font-size:13px">Şekildeki gizli ilişkileri ölçerek bulur. <b>Kalın</b>: çizili parça, <i>eğik</i>: çizili olmayan. Bir satıra dokununca şekilde vurgulanır.</p>
        ${radar ? (radar.az ? '<p class="soluk">En az üç nokta gerekli.</p>' : liste("Eş uzunluklar", r.esit, "Verilenler dışında eşit uzunluk yok.") + liste("İkizkenar / eşkenar üçgenler", r.ikiz, "Yok.") + liste("Yuvarlak açılar", r.aci, "Verilmemiş yuvarlak açı yok.") + liste("Çemberdeş noktalar", r.cember, "Yok.") + liste("Gizli doğrusallık", r.dogrusal, "Yok.") + liste("Paralellik", r.paralel, "Yok.")) : ""}</div>
      <div class="panel"><div class="satir" style="justify-content:space-between"><span class="etiket" style="color:var(--altin)">Ek çizim önerileri</span><button class="btn btn-ikinci btn-kucuk" id="stOner">${oneriler ? "Yenile" : "Ara"}</button></div>
        <p class="soluk" style="font-size:13px">Orta nokta, yansıma, 60°/90° döndürme ve eşit parçalar arasında üçgen kopyalama adaylarını dener; şekle yeni eşitlik getirenleri sıralar. Kanıt değil, ipucudur.</p>
        ${oneriler ? (oneriler.length ? oneriler.map((o, i) => `<div class="st-oneri"><b>${i + 1}. ${U.kacis(o.metin)}</b>${o.yollar.length > 1 ? `<span class="soluk">ya da: ${o.yollar.slice(1).map(U.kacis).join(" · ")}</span>` : ""}<span class="soluk">→ X: ${o.olgu.map(U.kacis).join(" · ")}</span><button class="btn btn-ikinci btn-kucuk" data-uygula="${i}">Şekle ekle</button></div>`).join("") : '<p class="soluk">Yeni eşitlik getiren basit bir ek çizim bulunamadı.</p>') : ""}</div>`;
  }
  function adimHtml() {
    const S = I().S(), meta = S.adimMeta || [], bk = bekleyen().length;
    return `<div class="panel st-kayit ${T.kayit ? "acik" : ""}"><label class="anahtar"><input type="checkbox" id="stKayit" ${T.kayit ? "checked" : ""}><span><b>Ek çizim kaydı</b> · açıkken çizdiğin her şey ek çizim sayılır (kesik turkuaz)</span></label>
        <p class="soluk" style="font-size:13px">Sol alttaki araçlar: Yardımcı çizgi, Döndür, Yansıt, Orta nokta, Paralel, Dik, Açıya yaz, Üçgen boya. Önce şekli verilere uydur, sonra ek çizimlere başla.</p></div>
      <div class="panel"><span class="etiket" style="color:var(--altin)">Yeni adım</span>
        <p class="soluk" style="font-size:13px" id="stBekleyen">${bk ? `Bu adımda <b>${bk}</b> yeni çizim var.` : "Bu adımda yeni çizim yok (yalnızca metin adımı da olabilir)."}</p>
        <label class="alan"><span>Başlık</span><input class="girdi" id="stAdimBaslik" maxlength="60" placeholder="örn. Ek çizim: üçgeni kopyala"></label>
        <label class="alan"><span>Açıklama (**kalın** için iki yıldız)</span><textarea class="girdi" id="stAdimMetin" rows="3" maxlength="600" placeholder="BPE ve CAP üçgenlerinde |BP| = |CA| … **KAK eşliği**"></textarea></label>
        <div class="satir"><button class="btn btn-ana btn-kucuk" id="stAdimKaydet">Adımı kaydet</button>${meta.length ? '<button class="btn btn-hayalet btn-kucuk" id="stAdimGeri">Son adımı geri al</button>' : ""}</div></div>
      <div class="panel"><span class="etiket" style="color:var(--altin)">Kayıtlı adımlar · ${meta.length}</span>
        ${meta.length ? `<ol class="st-adimlar">${meta.map((m, k) => `<li><b>${U.kacis(m.baslik || "Adım " + (k + 1))}</b><span class="soluk st-adim-metin">${metinHtml(m.ham)}</span><small>${S.nesne.filter((o) => o.adim === k).length} çizim</small></li>`).join("")}</ol>
          <div class="satir"><button class="btn btn-ana btn-kucuk" id="stOnizle">Öğrenci gibi önizle</button><button class="btn btn-hayalet btn-kucuk" id="stAdimIndir">adimlar.json</button><button class="btn btn-hayalet btn-kucuk" id="stHaftaIndir">Haftalık soru .json</button></div>` : '<p class="soluk">Henüz adım yok.</p>'}</div>`;
  }
  function arsivHtml() {
    const l = arsivListe;
    const ust = `<div class="panel"><div class="satir"><button class="btn btn-ana btn-kucuk" id="stArsivKaydet">Bu soruyu arşive kaydet</button><button class="btn btn-hayalet btn-kucuk" id="stArsivYenile">Yenile</button></div>
      <p class="soluk" style="font-size:13px">Arşiv bulutta, yalnızca senin hesabınla görünür. Görsel (fotoğraf) arşive gitmez; kurduğun şekil, veriler, cevap ve adımlar gider.</p>
      <input class="girdi" id="stAra" placeholder="Başlıkta ara…" value="${U.kacis(arsivAra)}"></div>`;
    if (!l) return ust + '<p class="soluk">Yükleniyor…</p>';
    if (l.hata === "tablo") return ust + '<div class="sq-uyari"><b>Arşiv tablosu henüz kurulmamış.</b> Supabase → SQL Editor’de <span class="mono">veritabani/studyo.sql</span> dosyasının içeriğini bir kez çalıştır.</div>';
    if (l.hata) return ust + `<p class="hata-metin">${U.kacis(l.hata)}</p>`;
    const ara = arsivAra.trim().toLocaleLowerCase("tr-TR"), g = l.filter((x) => !ara || (x.baslik || "").toLocaleLowerCase("tr-TR").includes(ara));
    return ust + `<div class="panel"><span class="etiket soluk">${g.length} soru</span><div class="gorev-liste">${g.map((x) => `<div class="sq-kayit"><button class="gorev" data-ac="${U.kacis(x.id)}"><b>${U.kacis(x.baslik || "Başlıksız")}</b><small>Cevap: ${U.kacis(x.cevap || "—")} · ${new Date(x.guncelleme).toLocaleDateString("tr-TR")}</small></button><button class="mini-btn" data-sil="${U.kacis(x.id)}" title="Sil">×</button></div>`).join("") || '<p class="soluk">Arşiv boş.</p>'}</div></div>`;
  }
  function ciz(el) {
    if (el) kok = el; if (!kok || !kok.isConnected) return;
    kok.innerHTML = `<div class="panel st-ust"><span class="etiket" style="color:var(--altin)">★ Çözüm Stüdyosu</span><div id="stSekme"></div></div><div id="stIcerik" class="yigin"></div>`;
    U.segment(U.$("#stSekme", kok), [["coz", "Çözüm"], ["adim", "Adımlar"], ["arsiv", "Arşiv"]], sekme, (v) => { sekme = v; if (v === "arsiv" && !arsivListe) arsivYukle(); icerik(); });
    icerik();
  }
  function icerik() {
    const k = U.$("#stIcerik", kok); if (!k) return;
    k.innerHTML = sekme === "coz" ? cozHtml() : sekme === "adim" ? adimHtml() : arsivHtml();
    const b = (id, f, olay = "click") => { const x = U.$(id, k); if (x) x.addEventListener(olay, f); };
    b("#stUydur", () => { I().uydur(); icerik(); });
    b("#stRadar", () => { radar = radarCalistir(); icerik(); });
    b("#stOner", () => { oneriler = ekCizimOner(); icerik(); });
    b("#stKayit", (e) => { T.kayit = e.target.checked; U.$(".st-kayit", k).classList.toggle("acik", T.kayit); if (T.kayit) I().aracSec("yardimci"); U.bildir(T.kayit ? "Ek çizim kaydı açık." : "Ek çizim kaydı kapalı: çizdiklerin sorunun parçası olur."); }, "change");
    b("#stAdimKaydet", adimKaydet); b("#stAdimGeri", sonAdimGeri); b("#stOnizle", onizle);
    b("#stAdimIndir", () => indir(`${dosyaAdi(I().S())}-adimlar.json`, adimlarAl()));
    b("#stHaftaIndir", () => indir(`${dosyaAdi(I().S())}-haftalik.json`, haftalikJson()));
    b("#stArsivKaydet", arsivKaydet); b("#stArsivYenile", () => { arsivListe = null; icerik(); arsivYukle(); });
    b("#stAra", (e) => { arsivAra = e.target.value; const p = e.target.selectionStart; icerik(); const a = U.$("#stAra", k); a.focus(); a.setSelectionRange(p, p); }, "input");
    k.onclick = (e) => {
      const u = e.target.closest("[data-uygula]"); if (u) oneriUygula(oneriler[+u.dataset.uygula]);
      const r = e.target.closest("[data-r]"); if (r && radar) { const [grup, i] = r.dataset.r.split("|"), ad2 = { "Eş uzunluklar": "esit", "İkizkenar / eşkenar üçgenler": "ikiz", "Yuvarlak açılar": "aci", "Çemberdeş noktalar": "cember", "Gizli doğrusallık": "dogrusal", "Paralellik": "paralel" }[grup]; const x = radar.sonuc[ad2][+i]; I().vurgula(x.ids || (x.g ? x.g.flatMap((c) => [c.i, c.j]) : [])); U.$$("[data-r]", k).forEach((y) => y.classList.toggle("secili", y === r)); }
      const a = e.target.closest("[data-ac]"); if (a) arsivAc(a.dataset.ac);
      const s = e.target.closest("[data-sil]"); if (s) { if (s.dataset.emin) arsivSil(s.dataset.sil); else { s.dataset.emin = "1"; s.textContent = "Sil?"; setTimeout(() => { if (s.isConnected) { delete s.dataset.emin; s.textContent = "×"; } }, 3000); } }
    };
  }
  T.ciz = ciz;
  T.degisti = function () { const b = kok && U.$("#stBekleyen", kok); if (b) { const n = bekleyen().length; b.innerHTML = n ? `Bu adımda <b>${n}</b> yeni çizim var.` : "Bu adımda yeni çizim yok (yalnızca metin adımı da olabilir)."; } };
  T._test = { radarCalistir, ekCizimOner, oneriUygula, adimlarAl, soruAl, sahne };
})();
