/* =====================================================================
   SORU MASASI — bir geometri sorusunun şeklini görselin üzerinden kur,
   verileri yaz, şekli verilere uydur; öğrenci aynı şekil üzerinde çözsün.
   Görsel yalnızca bu cihazda kalır, hiçbir sunucuya gönderilmez.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, Ses = MC.Ses, H = MC.soruHesap, G = H.G;
  const W = 1000, Y = 700;                       // mantıksal tahta (her ekranda aynı oran)
  const RENK = { kagit: "#06122a", parca: "#eef3ff", dogru: "#5b8cff", cember: "#35e0b0", turev: "#a66bff", ogr: "#35e0b0", kalem: "#ff8a1f",
    nokta: "#eef3ff", uzerinde: "#5b8cff", kesisim: "#ff4d61", veri: "#ffc657", soru: "#ff6fa0", esit: "#35e0b0", secili: "#ffc657", olcu: "#ffc657", not: "#ff8a1f" };
  const ADLAR = "ABCDEFGHKLMNOPRSTUVYZ";
  /* Çözüm Stüdyosu (yalnızca studyo/ sayfasında, öğretmen girişiyle): ek araçlar, adım kaydı, ayrı yerel kayıt anahtarları */
  const STUDYO = () => !!window.MC_STUDYO;
  const DEPO_TASLAK = () => (STUDYO() ? "studyo_taslak" : "geo_soru_taslak"), DEPO_KAYIT = () => (STUDYO() ? "studyo_yerel" : "geo_sorular");
  const kayitAcik = () => kip === "hazirla" && !!(MC.studyo && MC.studyo.kayit);

  /* ---------------- Durum ---------------- */
  let gorselSuruk = null;
  let el, svg, kutu, ekran = 1, kip = "hazirla", arac = "parca", secim = [], fare = null, surukle = null, cizgiKalem = null;
  let S = null;                  // ekrandaki soru
  let taslak = null;             // öğretmenin hazırladığı soru
  let coz = null;                // öğrenci oturumu {soru, deneme, ipucu, cozuldu}
  let gecmis = [], ileri = [], hs = { hesap: {}, P: () => null }, konum = {}, olcumler = [], izgara = false, sonUydur = null;
  let vurgu = new Set(), gizli = new Set();   // çözüm adımında vurgulanan / o adımda gizlenen nesneler
  const bul = (id) => S.nesne.find((o) => o.id === id);
  const P = (id) => hs.P(id);
  const px = (n) => n / ekran;   // ekranda n piksel görünen mantıksal uzunluk

  function bosSoru() {
    return { id: "s" + Date.now().toString(36), baslik: "", metin: "", ipuclari: [], cozum: "", cevapMetin: "", birim: "°", nesne: [], gorsel: null, opaklik: 0.55, gorselGoster: true, gorselOgrenci: false, gorselKonum: { k: 1, dx: 0, dy: 0 }, istenen: "", olceksizGoster: false, olcek: null, uyduruldu: false, sayac: 0 };
  }
  function yeniId() { S.sayac = (S.sayac || S.nesne.length) + 1; let id; do { id = "o" + S.sayac++; } while (bul(id)); return id; }
  function yeniAd() { const kul = new Set(S.nesne.filter((o) => o.tur === "nokta").map((o) => o.ad)); for (let k = 0; ; k++) for (const h of ADLAR) { const a = h + (k ? MC.sayi.alt(k) : ""); if (!kul.has(a)) return a; } }
  function ekle(o) { o.id = yeniId(); if (kip === "coz" || kayitAcik()) o.ogr = true; if (o.tur === "nokta" && !o.ad) o.ad = yeniAd(); S.nesne.push(o); return o.id; }

  /* ---------------- Araçlar ---------------- */
  const IKON = {
    tasi: '<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',
    nokta: '<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M3 20L21 6" stroke-dasharray="2 3"/>',
    parca: '<path d="M5 18L19 6"/><circle cx="5" cy="18" r="2" fill="currentColor"/><circle cx="19" cy="6" r="2" fill="currentColor"/>',
    dogru: '<path d="M2 20L22 4"/><circle cx="8" cy="15" r="2" fill="currentColor"/><circle cx="16" cy="9" r="2" fill="currentColor"/>',
    cember: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>',
    adver: '<path d="M6 19l6-14 6 14M8.5 14h7"/>',
    uz: '<path d="M3 17h18M3 14v6M21 14v6"/><path d="M9 9h6M12 6v6" />',
    aci: '<path d="M4 19h16M4 19L15 6"/><path d="M10 19a6 6 0 0 0-2-4.5"/><path d="M15 12h5" stroke-width="1.4"/>',
    centik: '<path d="M3 16L21 8"/><path d="M10 9l2 5M13 8l2 5"/>',
    yay: '<path d="M4 19h16M4 19L15 6"/><path d="M9 19a5 5 0 0 0-1.6-3.8M12 19a8 8 0 0 0-2.4-6"/>',
    sil: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    yardimci: '<path d="M4 18L20 6" stroke-dasharray="3 3"/><circle cx="4" cy="18" r="2" fill="currentColor"/><circle cx="20" cy="6" r="2" fill="currentColor"/>',
    paralel: '<path d="M3 16L21 8M3 21L21 13"/>',
    dik: '<path d="M3 19h18M12 19V4"/><path d="M12 15h4v4"/>',
    orta: '<path d="M4 12h16"/><circle cx="4" cy="12" r="2" fill="currentColor"/><circle cx="20" cy="12" r="2" fill="currentColor"/><path d="M12 8v8"/>',
    not: '<path d="M4 19h16M4 19L15 6"/><path d="M10 19a6 6 0 0 0-2-4.5"/><path d="M14 10l3-3 2 2-3 3z"/>',
    kalem: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    olcUz: '<path d="M3 15h18M3 11v8M21 11v8"/><path d="M8 7h8" stroke-dasharray="2 2"/>',
    olcAci: '<path d="M4 19h16M4 19L15 6"/><path d="M10 19a6 6 0 0 0-2-4.5"/>',
    dondur: '<circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M17 3v4.5h-4.5"/>',
    yansit: '<path d="M12 3v18" stroke-dasharray="2 2.5"/><path d="M9 7L4 12l5 5z"/><path d="M15 7l5 5-5 5z"/>',
    bolge: '<path d="M4 19L12 5l8 14z" fill="currentColor" fill-opacity=".3"/>',
  };
  const ARAC = {
    tasi: { ad: "Taşı", istek: [], ip: "Noktayı sürükle; çizgi ya da çember üstündeki nokta yalnızca onun üzerinde kayar. Boş yeri sürüklersen görsel kayar." },
    nokta: { ad: "Nokta", istek: [], ip: "Boş yere dokun: serbest nokta. Çizginin ya da çemberin üstüne: o çizgiye bağlı nokta. İki çizginin kesiştiği yere: kesişim noktası." },
    parca: { ad: "Doğru parçası", istek: ["n", "n"], ip: "İki nokta seç ya da görseldeki köşelere dokun." },
    dogru: { ad: "Doğru", istek: ["n", "n"], ip: "İki yönde sonsuz uzanan doğru: iki nokta seç." },
    cember: { ad: "Çember", istek: ["n", "n"], ip: "Önce merkezi, sonra çemberin geçtiği noktayı seç." },
    adver: { ad: "Ad ver", istek: ["N"], ip: "Adını değiştirmek istediğin noktaya dokun." },
    uz: { ad: "Uzunluk yaz", istek: ["N", "N"], ip: "İki uç nokta seç ve değeri yaz: 6 · x · 2x+1 · ? (istenen)." },
    aci: { ad: "Açı yaz", istek: ["N", "N", "N"], ip: "Kol, köşe, kol sırasıyla üç nokta seç ve değeri yaz: 40 · 90 (dik) · x · 2x+10 · ? (istenen)." },
    centik: { ad: "Eş kenar", istek: ["N", "N"], ip: "Eşit kenarlara aynı çentiği koy. Aynı kenarı yeniden seçince çentik sayısı değişir (1 → 2 → 3 → yok)." },
    yay: { ad: "Eş açı", istek: ["N", "N", "N"], ip: "Eşit açılara aynı sayıda yay koy. Aynı açıyı yeniden seçince yay sayısı değişir." },
    sil: { ad: "Sil", istek: [], ip: "Silinecek nesneye ya da etikete dokun; ona bağlı nesneler de silinir." },
    yardimci: { ad: "Yardımcı çizgi", istek: ["n", "n"], ip: "İki nokta seç. Çizginin üstüne dokunursan oraya yeni bir nokta konur." },
    paralel: { ad: "Paralel", istek: ["l", "n"], ip: "Bir çizgi ve bir nokta seç." },
    dik: { ad: "Dik", istek: ["l", "n"], ip: "Bir çizgi ve bir nokta seç." },
    orta: { ad: "Orta nokta", istek: ["N", "N"], ip: "İki nokta seç." },
    not: { ad: "Açıya yaz", istek: ["N", "N", "N"], ip: "Bulduğun açıyı şeklin üzerine yaz: kol, köşe, kol." },
    kalem: { ad: "Kalem", istek: [], ip: "Serbestçe yaz ve çiz. Kâğıttaki karalama gibi." },
    olcUz: { ad: "Uzunluk ölç", istek: ["N", "N"], ip: "İki nokta seç." },
    olcAci: { ad: "Açı ölç", istek: ["N", "N", "N"], ip: "Kol, köşe, kol sırasıyla üç nokta seç." },
    dondur: { ad: "Döndür", istek: ["N", "N"], ip: "Önce döndürülecek noktayı, sonra merkezi seç; açıyı yaz (artı: saat yönünün tersine)." },
    yansit: { ad: "Yansıt", istek: ["N", "l"], ip: "Önce noktayı, sonra ayna olacak doğru parçasını seç." },
    bolge: { ad: "Üçgen boya", istek: ["N", "N", "N"], ip: "Çözüm adımında renklendirilecek üçgenin üç köşesini seç." },
  };
  const STUDYO_ARAC = [["yardimci", "dondur", "yansit", "orta", "paralel", "dik"], ["not", "bolge"]];
  const HAZIRLA = [["tasi", "nokta", "parca", "dogru", "cember", "adver"], ["uz", "aci", "centik", "yay"], ["sil"]];
  const COZ = [["yardimci", "paralel", "dik", "orta"], ["not", "kalem", "sil"], ["olcUz", "olcAci"]];

  /* ---------------- Yardımcılar ---------------- */
  function koordinat(e) {
    const r = svg.getBoundingClientRect(), s = Math.min(r.width / W, r.height / Y) || 1;
    return { x: (e.clientX - r.left - (r.width - W * s) / 2) / s, y: (e.clientY - r.top - (r.height - Y * s) / 2) / s };
  }
  function noktaBul(p, r = 16) { let en = null, d0 = px(r); for (const o of S.nesne) if (o.tur === "nokta" && P(o.id)) { const d = G.uz(p, P(o.id)); if (d < d0) { d0 = d; en = o; } } return en; }
  function cizgiMesafe(o, p) {
    const h = P(o.id); if (!h || !h.tur) return Infinity;
    if (h.tur === "dogru") { const t = (p.x - h.x) * h.dx + (p.y - h.y) * h.dy; return G.icinde({ sinirli: h.sinirli, uz: h.uz }, t) ? G.dogruUzaklik(h, p) : Infinity; }
    return Math.abs(G.uz(p, h) - h.r);
  }
  function cizgilerYakin(p, r = 12, sadeceDogru) {
    return S.nesne.filter((o) => (o.tur === "parca" || (o.tur === "cember" && !sadeceDogru))).map((o) => ({ o, d: cizgiMesafe(o, p) })).filter((x) => x.d < px(r)).sort((a, b) => a.d - b.d);
  }
  function noktaAlYaDaKoy(p) {
    const n = noktaBul(p); if (n) return n.id;
    const yakin = cizgilerYakin(p, 14);
    if (yakin.length >= 2) {
      const a = yakin[0].o, b = yakin[1].o, k = G.kesisim(P(a.id), P(b.id));
      let en = -1, d0 = px(20); k.forEach((q, i) => { if (q && G.uz(q, p) < d0) { d0 = G.uz(q, p); en = i; } });
      if (en >= 0) return ekle({ tur: "nokta", turet: "kesisim", a: a.id, b: b.id, i: en });
    }
    if (yakin.length) { const c = yakin[0].o, h = P(c.id); return ekle({ tur: "nokta", uzerinde: c.id, t: H.parametre(h, p) }); }
    return ekle({ tur: "nokta", x: p.x, y: p.y });
  }
  function bagimlilar(id, set = new Set([id])) {
    let degisti = true;
    while (degisti) { degisti = false; for (const o of S.nesne) if (!set.has(o.id) && (["a", "b", "c", "v", "p", "q", "m", "uzerinde", "nokta", "dogru", "a1", "a2", "b1", "b2", "y"].some((k) => set.has(o[k])) || (o.noktalar || []).some((k) => set.has(k)))) { set.add(o.id); degisti = true; } }
    return set;
  }
  const anlikAl = () => JSON.stringify({ nesne: S.nesne, sayac: S.sayac });
  function anlik() { gecmis.push(anlikAl()); if (gecmis.length > 150) gecmis.shift(); ileri = []; }
  function geriAl() { if (!gecmis.length) return; ileri.push(anlikAl()); const s = JSON.parse(gecmis.pop()); S.nesne = s.nesne; S.sayac = s.sayac; secim = []; degisti(); Ses.efekt("dokun"); }
  function yinele() { if (!ileri.length) return; gecmis.push(anlikAl()); const s = JSON.parse(ileri.pop()); S.nesne = s.nesne; S.sayac = s.sayac; secim = []; degisti(); Ses.efekt("dokun"); }
  const ayniKume = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
  const etiketBul = (tur, ids, kendi) => S.nesne.find((o) => o.tur === tur && (kendi === undefined || !!o.ogr === kendi) &&
    (ids.length === 2 ? ayniKume([o.a, o.b], ids) : o.v === ids[1] && ayniKume([o.a, o.c], [ids[0], ids[2]])));

  /* Küçük metin penceresi */
  function metinSor(baslik, aciklama, varsayilan = "") {
    return new Promise((coz) => {
      const perde = document.createElement("div");
      perde.className = "perde"; perde.setAttribute("role", "dialog"); perde.setAttribute("aria-modal", "true");
      perde.innerHTML = `<form class="panel pencere" style="width:min(420px,100%)" novalidate><h3>${baslik}</h3><p class="soluk" style="font-size:14px">${aciklama}</p>
        <input class="girdi" id="msGirdi" maxlength="24" autocomplete="off" spellcheck="false" value="${U.kacis(varsayilan)}">
        <div class="satir"><button class="btn btn-ana" type="submit">Tamam</button><button class="btn btn-hayalet" type="button" data-v>Vazgeç</button></div></form>`;
      document.body.appendChild(perde);
      const g = U.$("#msGirdi", perde), kapat = (v) => { perde.remove(); coz(v); };
      U.$("form", perde).addEventListener("submit", (e) => { e.preventDefault(); kapat(g.value.trim()); });
      U.$("[data-v]", perde).addEventListener("click", () => kapat(null));
      perde.addEventListener("keydown", (e) => { if (e.key === "Escape") kapat(null); });
      setTimeout(() => { g.focus(); g.select(); }, 20);
    });
  }

  /* ---------------- Tıklama ---------------- */
  async function tamamla() {
    const s = secim; secim = [];
    switch (arac) {
      case "parca": ekle({ tur: "parca", p: s[0], q: s[1] }); break;
      case "yardimci": ekle({ tur: "parca", p: s[0], q: s[1] }); break;
      case "dogru": ekle({ tur: "parca", p: s[0], q: s[1], sonsuz: true }); break;
      case "cember": ekle({ tur: "cember", m: s[0], p: s[1] }); break;
      case "orta": ekle({ tur: "nokta", turet: "orta", a: s[0], b: s[1] }); break;
      case "dik": case "paralel": { const n = s.map(bul).find((o) => o.tur === "nokta"), l = s.map(bul).find((o) => o.tur === "parca"); ekle({ tur: "parca", turet: arac, nokta: n.id, dogru: l.id }); break; }
      case "adver": {
        const o = bul(s[0]), yeni = await metinSor("Noktaya ad ver", "En çok 3 karakter. Örn. A, D, O, A'", o.ad);
        if (yeni) { const t = yeni.slice(0, 3); if (S.nesne.some((x) => x.tur === "nokta" && x !== o && x.ad === t)) U.bildir("Bu ad başka bir noktada var."); else o.ad = t; }
        break;
      }
      case "uz": case "aci": case "not": {
        const tur = arac === "uz" ? "uz" : "aci", ogr = arac === "not", eski = etiketBul(tur, s, ogr);
        const adlar = s.map((i) => bul(i).ad), yazi = tur === "uz" ? `|${adlar.join("")}|` : `m(${adlar.join("")})`;
        const v = await metinSor(ogr ? `${yazi} için notun` : `${yazi} değeri`, ogr ? "Bulduğun değeri yaz. Örn. 70°" : tur === "uz" ? "Sayı (6, 2,5), ifade (x, 2x+1) ya da istenen için ? yaz. Boş bırakırsan etiket silinir." : "Derece (40, 90), ifade (x, 2x+10) ya da istenen için ? yaz. 90 yazınca dik açı işareti çıkar. Boş bırakırsan etiket silinir.", eski ? eski.metin : "");
        if (v === null) break;
        if (!ogr && v && !H.ifade(v)) { U.bildir("Bu ifade okunamadı. Örnekler: 6 · 40 · x · 2x+10 · ?"); break; }
        if (!v) { if (eski) S.nesne = S.nesne.filter((o) => o !== eski); break; }
        if (!ogr && v.trim() === "?") S.nesne.filter((o) => (o.tur === "uz" || o.tur === "aci") && !o.ogr && o.metin.trim() === "?" && o !== eski).forEach((o) => { S.nesne = S.nesne.filter((x) => x !== o); });
        if (eski) eski.metin = v;
        else ekle(tur === "uz" ? { tur, a: s[0], b: s[1], metin: v } : { tur, a: s[0], v: s[1], c: s[2], metin: v, ...(ogr ? { ogr: true } : {}) });
        break;
      }
      case "centik": case "yay": {
        const eski = etiketBul(arac, s);
        if (eski) { eski.n++; if (eski.n > 3) S.nesne = S.nesne.filter((o) => o !== eski); }
        else ekle(arac === "centik" ? { tur: "centik", a: s[0], b: s[1], n: 1 } : { tur: "yay", a: s[0], v: s[1], c: s[2], n: 1 });
        break;
      }
      case "dondur": {
        const v = await metinSor("Döndürme açısı", "Derece yaz. Artı: saat yönünün tersine, eksi: saat yönünde. Örn. 60 · −90", "60");
        if (v === null) break; const d = parseFloat(v.replace("−", "-").replace(",", "."));
        if (!isFinite(d)) { U.bildir("Açıyı sayı olarak yaz: 60, -90"); break; }
        ekle({ tur: "nokta", turet: "dondur", a: s[0], m: s[1], derece: d }); break;
      }
      case "yansit": {
        const l = bul(s[1]); if (!l.p || !l.q) { U.bildir("Ayna olarak iki ucu belli bir doğru parçası seç."); break; }
        ekle({ tur: "nokta", turet: "yansit", a: s[0], p: l.p, q: l.q }); break;
      }
      case "bolge": ekle({ tur: "bolge", noktalar: s.slice(), ogr: true }); break;
      case "olcUz": { const a = P(s[0]), b = P(s[1]); olcumler.push({ tur: "uz", a: s[0], b: s[1] }); U.bildir(`|${bul(s[0]).ad}${bul(s[1]).ad}| ≈ ${H.yuvarla(G.uz(a, b) / (S.olcek || 40))} birim`); break; }
      case "olcAci": { olcumler.push({ tur: "aci", a: s[0], v: s[1], c: s[2] }); U.bildir(`m(${s.map((i) => bul(i).ad).join("")}) ≈ ${H.yuvarla(G.aci(P(s[0]), P(s[1]), P(s[2])))}°`); break; }
    }
    degisti(); Ses.efekt("dogru");
  }
  async function tikla(e) {
    const p = koordinat(e);
    if (arac === "kalem") { anlik(); cizgiKalem = { tur: "kalem", yol: [[+p.x.toFixed(1), +p.y.toFixed(1)]] }; ekle(cizgiKalem); try { svg.setPointerCapture(e.pointerId); } catch (_) {} ciz(); return; }
    if (arac === "tasi") {
      const n = noktaBul(p, 22);
      if (n && !n.turet && kip === "hazirla") { anlik(); surukle = n.id; try { svg.setPointerCapture(e.pointerId); } catch (_) {} }
      else if (!n && kip === "hazirla" && S.gorsel && S.gorselGoster) { S.gorselKonum = S.gorselKonum || { k: 1, dx: 0, dy: 0 }; gorselSuruk = { x: p.x, y: p.y, dx: S.gorselKonum.dx, dy: S.gorselKonum.dy }; try { svg.setPointerCapture(e.pointerId); } catch (_) {} }
      return;
    }
    if (arac === "sil") {
      const hedef = etiketHedef(p) || kalemHedef(p) || noktaBul(p) || (cizgilerYakin(p, 12)[0] || {}).o;
      if (!hedef) return;
      if (kip === "coz" && !hedef.ogr) { U.bildir("Sorunun verilen parçaları silinemez; yalnızca kendi çizdiklerini silebilirsin."); return; }
      anlik(); const sil = bagimlilar(hedef.id); S.nesne = S.nesne.filter((x) => !sil.has(x.id)); Ses.efekt("kirik"); degisti(); return;
    }
    if (arac === "nokta") { if (noktaBul(p)) return; anlik(); noktaAlYaDaKoy(p); Ses.efekt("sec"); degisti(); return; }
    const istek = ARAC[arac].istek, sira = istek[secim.length];
    const surum = anlikAl();
    let id = null;
    if (arac === "dik" || arac === "paralel") {
      const n = noktaBul(p), l = cizgilerYakin(p, 12, true)[0];
      const gerekN = !secim.some((i) => bul(i).tur === "nokta"), gerekL = !secim.some((i) => bul(i).tur === "parca");
      if (n && gerekN) id = n.id; else if (l && gerekL) id = l.o.id; else if (gerekN && !l) id = noktaAlYaDaKoy(p);
    } else if (sira === "n") id = noktaAlYaDaKoy(p);
    else if (sira === "N") { const n = noktaBul(p, 22); if (n) id = n.id; else { U.bildir("Bir noktaya dokun."); return; } }
    else if (sira === "l") { const l = cizgilerYakin(p, 14, true)[0]; if (l) id = l.o.id; else { U.bildir("Bir doğru parçasına dokun."); return; } }
    if (!id) return;
    if (secim.includes(id)) return;
    if (!secim.length) { gecmis.push(surum); ileri = []; }
    secim.push(id); Ses.efekt("sec");
    if (secim.length === istek.length) await tamamla(); else ciz();
    durumYaz();
  }
  function etiketHedef(p) { let en = null, d0 = px(24); for (const [id, q] of Object.entries(konum)) { const d = G.uz(p, q); if (d < d0) { d0 = d; en = bul(id); } } return en; }
  function kalemHedef(p) { return S.nesne.find((o) => o.tur === "kalem" && o.yol.some(([x, y]) => Math.hypot(x - p.x, y - p.y) < px(12))); }

  /* ---------------- Çizim ---------------- */
  function agirlik() { const n = S.nesne.filter((o) => o.tur === "nokta" && !o.ogr).map((o) => P(o.id)).filter(Boolean); return n.length ? { x: n.reduce((t, a) => t + a.x, 0) / n.length, y: n.reduce((t, a) => t + a.y, 0) / n.length } : { x: W / 2, y: Y / 2 }; }
  function dogruUclari(h) {
    if (h.sinirli) return [{ x: h.x, y: h.y }, { x: h.x + h.dx * h.uz, y: h.y + h.dy * h.uz }];
    const L = 3 * (W + Y); return [{ x: h.x - h.dx * L, y: h.y - h.dy * L }, { x: h.x + h.dx * L, y: h.y + h.dy * L }];
  }
  const metin = (x, y, yazi, renk, boy = 17, kalin = 700, ek = "") => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${renk}" font-family="Onest, sans-serif" font-weight="${kalin}" font-size="${px(boy)}" paint-order="stroke" stroke="${RENK.kagit}" stroke-width="${px(4)}"${ek}>${U.kacis(yazi)}</text>`;
  function aciYayi(a, v, c, r) {
    const u = G.birim(a.x - v.x, a.y - v.y), w = G.birim(c.x - v.x, c.y - v.y); if (!u || !w) return null;
    const sweep = u.x * w.y - u.y * w.x > 0 ? 1 : 0, ort = G.birim(u.x + w.x, u.y + w.y) || { x: -u.y, y: u.x };
    return { d: `M${v.x + u.x * r} ${v.y + u.y * r} A${r} ${r} 0 0 ${sweep} ${v.x + w.x * r} ${v.y + w.y * r}`, u, w, ort };
  }
  function svgYaz(onizleme = true) {
    const p = [], ag = agirlik(), secili = new Set(secim), L = S.nesne.filter((o) => !gizli.has(o.id));
    konum = {};
    p.push(`<rect x="-2000" y="-2000" width="${W + 4000}" height="${Y + 4000}" fill="${RENK.kagit}"/>`);
    if (S.gorsel && S.gorselGoster && (kip === "hazirla" || S.gorselOgrenci)) {
      const g = S.gorsel, gk = S.gorselKonum || { k: 1, dx: 0, dy: 0 }, s = Math.min(W / g.w, Y / g.h) * gk.k, gw = g.w * s, gh = g.h * s;
      p.push(`<image href="${g.src}" x="${(W - gw) / 2 + gk.dx}" y="${(Y - gh) / 2 + gk.dy}" width="${gw}" height="${gh}" opacity="${kip === "hazirla" ? S.opaklik : 0.35}" preserveAspectRatio="xMidYMid meet"/>`);
    }
    if (izgara) { for (let x = 0; x <= W; x += 50) p.push(`<line x1="${x}" y1="0" x2="${x}" y2="${Y}" stroke="rgba(91,140,255,.10)"/>`); for (let y = 0; y <= Y; y += 50) p.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="rgba(91,140,255,.10)"/>`); }
    p.push(`<rect x="0" y="0" width="${W}" height="${Y}" fill="none" stroke="rgba(150,180,255,.12)" stroke-width="${px(1)}"/>`);
    // Çözüm adımı bölgeleri (vurgulanan üçgenler)
    for (const o of L) {
      if (o.tur !== "bolge") continue; const q = (o.noktalar || []).map(P); if (q.length < 3 || q.some((x) => !x)) continue;
      const r = o.renk || RENK.secili;
      p.push(`<polygon points="${q.map((x) => `${x.x},${x.y}`).join(" ")}" fill="${r}" fill-opacity=".22" stroke="${r}" stroke-opacity=".7" stroke-width="${px(2)}" stroke-dasharray="${px(6)} ${px(5)}" stroke-linejoin="round"/>`);
    }
    // Çemberler ve çizgiler
    for (const o of L) {
      const h = P(o.id); if (!h || o.tur !== "cember") continue;
      const v = secili.has(o.id) || vurgu.has(o.id);
      p.push(`<circle cx="${h.x}" cy="${h.y}" r="${h.r}" fill="none" stroke="${v ? RENK.secili : o.ogr ? RENK.ogr : RENK.cember}" stroke-width="${px(v ? 4 : 2.5)}"${o.ogr ? ` stroke-dasharray="${px(8)} ${px(6)}"` : ""}/>`);
    }
    for (const o of L) {
      const h = P(o.id); if (!h || o.tur !== "parca") continue;
      const [a, b] = dogruUclari(h), v = secili.has(o.id) || vurgu.has(o.id);
      const renk = v ? RENK.secili : o.renk || (o.ogr ? RENK.ogr : o.turet ? RENK.turev : o.sonsuz ? RENK.dogru : RENK.parca);
      const kesik = (o.ogr || o.turet || o.kesik) && !vurgu.has(o.id) ? ` stroke-dasharray="${px(10)} ${px(7)}"` : "";
      p.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${renk}" stroke-width="${px(v ? 5 : o.sonsuz || o.ogr || o.turet ? 2.2 : 3.2)}" stroke-linecap="round"${kesik}/>`);
      if (o.ok) { // yön oku (ışın, rota): parçanın ortasında p → q yönünde
        const ux = b.x - a.x, uy = b.y - a.y, n = Math.hypot(ux, uy) || 1, dx = ux / n, dy = uy / n, mx = (a.x + b.x) / 2 + dx * px(7), my = (a.y + b.y) / 2 + dy * px(7), k = px(13);
        p.push(`<path d="M${mx} ${my} L${mx - dx * k - dy * k * .55} ${my - dy * k + dx * k * .55} L${mx - dx * k + dy * k * .55} ${my - dy * k - dx * k * .55}Z" fill="${renk}"/>`);
      }
    }
    // Kalem
    for (const o of L) if (o.tur === "kalem" && o.yol.length) p.push(`<path d="M${o.yol.map((q) => q.join(" ")).join(" L")}" fill="none" stroke="${RENK.kalem}" stroke-width="${px(3)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    // Çentikler
    for (const o of L) {
      if (o.tur !== "centik") continue; const a = P(o.a), b = P(o.b); if (!a || !b) continue;
      const d = G.birim(b.x - a.x, b.y - a.y); if (!d) continue;
      const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, nx = -d.y, ny = d.x, L = px(9), ara = px(6);
      for (let i = 0; i < o.n; i++) { const k = (i - (o.n - 1) / 2) * ara, c = { x: m.x + d.x * k, y: m.y + d.y * k }; p.push(`<line x1="${c.x - nx * L + d.x * px(2)}" y1="${c.y - ny * L + d.y * px(2)}" x2="${c.x + nx * L - d.x * px(2)}" y2="${c.y + ny * L - d.y * px(2)}" stroke="${vurgu.has(o.id) ? RENK.secili : RENK.esit}" stroke-width="${px(2.6)}" stroke-linecap="round"/>`); }
      konum[o.id] = m;
    }
    // Eş açı yayları
    for (const o of L) {
      if (o.tur !== "yay") continue; const a = P(o.a), v = P(o.v), c = P(o.c); if (!a || !v || !c) continue;
      for (let i = 0; i < o.n; i++) { const y = aciYayi(a, v, c, px(24 + i * 6)); if (y) p.push(`<path d="${y.d}" fill="none" stroke="${RENK.esit}" stroke-width="${px(2.4)}"/>`); }
      const y = aciYayi(a, v, c, px(24)); if (y) konum[o.id] = { x: v.x + y.ort.x * px(24), y: v.y + y.ort.y * px(24) };
    }
    // Açı ve uzunluk etiketleri
    for (const o of L) {
      if (o.tur === "aci") {
        const a = P(o.a), v = P(o.v), c = P(o.c); if (!a || !v || !c) continue;
        const e = H.ifade(o.metin), soru = e && e.soru, renk = vurgu.has(o.id) ? RENK.secili : o.ogr ? RENK.not : soru || (e && Object.keys(e.kat).length) ? RENK.soru : RENK.veri;
        const dik = e && !e.soru && !Object.keys(e.kat).length && Math.abs(e.sabit - 90) < 1e-9;
        const derece = G.aci(a, v, c), genis = derece > 100, r = px((o.ogr ? 40 : 34) * (genis ? .75 : Math.min(1.8, Math.max(1, 45 / (derece || 45))))), y = aciYayi(a, v, c, r); if (!y) continue;
        if (dik) { const k = px(16); p.push(`<path d="M${v.x + y.u.x * k} ${v.y + y.u.y * k} L${v.x + (y.u.x + y.w.x) * k} ${v.y + (y.u.y + y.w.y) * k} L${v.x + y.w.x * k} ${v.y + y.w.y * k}" fill="none" stroke="${renk}" stroke-width="${px(2.4)}"/>`); }
        else p.push(`<path d="${y.d}" fill="none" stroke="${renk}" stroke-width="${px(2.4)}"/>`);
        const q = { x: v.x + y.ort.x * (r + px(genis ? 15 : 22)), y: v.y + y.ort.y * (r + px(genis ? 15 : 22)) };
        const yazi = dik ? "" : e && !e.soru && !Object.keys(e.kat).length ? `${H.yuvarla(e.sabit)}°` : o.metin.replace(/°$/, "") + (e && !e.soru ? "" : "");
        if (yazi) p.push(metin(q.x, q.y, yazi, renk, 17));
        konum[o.id] = dik ? { x: v.x + (y.u.x + y.w.x) * px(16), y: v.y + (y.u.y + y.w.y) * px(16) } : q;
      }
      if (o.tur === "uz") {
        const a = P(o.a), b = P(o.b); if (!a || !b) continue;
        const d = G.birim(b.x - a.x, b.y - a.y); if (!d) continue;
        const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; let n = { x: -d.y, y: d.x };
        if ((m.x - ag.x) * n.x + (m.y - ag.y) * n.y < 0) n = { x: -n.x, y: -n.y };
        const q = { x: m.x + n.x * px(20), y: m.y + n.y * px(20) }, e = H.ifade(o.metin);
        p.push(metin(q.x, q.y, o.metin, e && (e.soru || Object.keys(e.kat).length) ? RENK.soru : RENK.veri, 17));
        konum[o.id] = q;
      }
    }
    // Ölçümler (öğrenci, çözdükten sonra)
    for (const o of olcumler) {
      if (o.tur === "uz") { const a = P(o.a), b = P(o.b); if (a && b) { p.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${RENK.olcu}" stroke-width="${px(1.5)}" stroke-dasharray="${px(4)} ${px(4)}"/>`); p.push(metin((a.x + b.x) / 2, (a.y + b.y) / 2 - px(16), H.yuvarla(G.uz(a, b) / (S.olcek || 40)), RENK.olcu, 15)); } }
      else { const a = P(o.a), v = P(o.v), c = P(o.c); const y = a && v && c && aciYayi(a, v, c, px(54)); if (y) { p.push(`<path d="${y.d}" fill="none" stroke="${RENK.olcu}" stroke-width="${px(1.5)}" stroke-dasharray="${px(4)} ${px(3)}"/>`); p.push(metin(v.x + y.ort.x * px(72), v.y + y.ort.y * px(72), H.yuvarla(G.aci(a, v, c)) + "°", RENK.olcu, 15)); } }
    }
    // Önizleme
    if (onizleme && fare && secim.length) {
      const ilk = P(secim[0]), son = P(secim[secim.length - 1]);
      if (ilk && ["parca", "dogru", "yardimci", "uz", "centik", "orta", "olcUz"].includes(arac)) p.push(`<line x1="${ilk.x}" y1="${ilk.y}" x2="${fare.x}" y2="${fare.y}" stroke="${RENK.secili}" stroke-width="${px(1.5)}" stroke-dasharray="${px(5)} ${px(5)}"/>`);
      if (ilk && arac === "cember") p.push(`<circle cx="${ilk.x}" cy="${ilk.y}" r="${G.uz(ilk, fare)}" fill="none" stroke="${RENK.secili}" stroke-width="${px(1.5)}" stroke-dasharray="${px(5)} ${px(5)}"/>`);
      if (son && ["aci", "yay", "not", "olcAci"].includes(arac)) p.push(`<line x1="${son.x}" y1="${son.y}" x2="${fare.x}" y2="${fare.y}" stroke="${RENK.secili}" stroke-width="${px(1.5)}" stroke-dasharray="${px(5)} ${px(5)}"/>`);
    }
    // Noktalar
    for (const o of L) {
      const h = P(o.id); if (!h || o.tur !== "nokta" || o.isaretsiz) continue;
      const v = secili.has(o.id) || vurgu.has(o.id), renk = v ? RENK.secili : o.ogr ? RENK.ogr : o.turet ? RENK.kesisim : o.uzerinde ? RENK.uzerinde : RENK.nokta;
      p.push(`<circle cx="${h.x}" cy="${h.y}" r="${px(v ? 8 : 5.5)}" fill="${renk}" stroke="${RENK.kagit}" stroke-width="${px(2)}"/>`);
      const d = G.birim(h.x - ag.x, h.y - ag.y) || { x: 0.7, y: -0.7 };
      p.push(metin(h.x + d.x * px(20), h.y + d.y * px(20), o.ad, vurgu.has(o.id) ? RENK.secili : o.ogr ? RENK.ogr : "#eef3ff", 18, 800));
    }
    // Bağlam yazıları (yeni nesil sorular: “ayna”, “güneş ışını”, “kuzey” …) — işaretsiz bir noktaya bağlıdır
    for (const o of L) {
      if (o.tur !== "yazi") continue; const h = P(o.n); if (!h) continue;
      p.push(metin(h.x, h.y, o.metin, o.renk || "#9fb3d9", o.boy || 15, 600, o.yatik ? ' font-style="italic"' : ""));
    }
    return p.join("");
  }
  function ciz(onizleme = true) { if (svg && S) svg.innerHTML = svgYaz(onizleme); }
  function yenile() { hs = H.hesapla(S.nesne); ciz(); }
  let kayitZaman = null;
  function degisti() {
    yenile(); durumYaz();
    if (kip === "hazirla") {
      S.uyduruldu = false; veriListesi();
      clearTimeout(kayitZaman); kayitZaman = setTimeout(() => { const t = { ...S, gorsel: null }; U.depoYaz(DEPO_TASLAK(), t); }, 400);
    }
    U.$("#sqGeri", el).disabled = !gecmis.length; U.$("#sqIleri", el).disabled = !ileri.length;
    if (MC.studyo && kip === "hazirla") MC.studyo.degisti();
  }
  function durumYaz() {
    const a = ARAC[arac], kalan = a.istek.length - secim.length;
    U.$("#sqDurum", el).innerHTML = `<b>${a.ad}:</b> ${a.ip}${secim.length && kalan ? ` <span class="soluk">(${kalan} seçim kaldı)</span>` : ""}`;
  }

  /* ---------------- Araç kutusu ---------------- */
  function araclariCiz() {
    const gruplar = kip === "hazirla" ? (STUDYO() ? [...HAZIRLA, ...STUDYO_ARAC] : HAZIRLA) : COZ;
    U.$("#sqAraclar", el).innerHTML = gruplar.map((g) => g.map((a) => {
      const olceksiz = coz && coz.soru.olceksizGoster, kilit = (a === "olcUz" || a === "olcAci") && (!(coz && coz.cozuldu) || olceksiz);
      return `<button class="arac" data-a="${a}" aria-pressed="${a === arac}" ${kilit ? "disabled" : ""} title="${ARAC[a].ad}${kilit ? (olceksiz ? " (şekil ölçeksiz çizildi)" : " (cevabı bulunca açılır)") : ""}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IKON[a]}</svg>${ARAC[a].ad}${kilit ? '<span class="kilit" aria-hidden="true">🔒</span>' : ""}</button>`;
    }).join("")).join('<div class="arac-ayrac"></div>');
  }
  function aracSec(a) { arac = a; secim = []; U.$$("#sqAraclar .arac", el).forEach((b) => b.setAttribute("aria-pressed", b.dataset.a === a)); durumYaz(); ciz(); }

  /* ---------------- Görsel ---------------- */
  function gorselOku(dosya) {
    if (!dosya || !/^image\//.test(dosya.type)) { U.bildir("Lütfen bir resim dosyası seç (PNG, JPG)."); return; }
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight)), w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k);
        let src = fr.result;
        try { const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.drawImage(img, 0, 0, w, h); src = c.toDataURL("image/jpeg", 0.85); } catch (e) {}
        S.gorsel = { src, w, h }; S.gorselGoster = true; hazirlaPanel(); yenile(); Ses.efekt("basla");
        U.bildir("Görsel yerleşti. Şimdi Doğru parçası aracıyla köşelere dokunarak şekli üzerinden geç.");
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(dosya);
  }

  /* ---------------- Verilere uydur ---------------- */
  function uydur(sessiz) {
    const k = H.kisitlar(S.nesne);
    const sayi = k.uz.length + k.aci.length + Object.values(k.centik).reduce((t, g) => t + Math.max(0, g.length - 1), 0) + Object.values(k.yay).reduce((t, g) => t + Math.max(0, g.length - 1), 0);
    if (!sayi) { if (!sessiz) U.bildir("Önce şekle en az bir veri yaz: uzunluk, açı ya da eşitlik işareti."); return null; }
    if (S.istenen && S.istenen.trim() && !H.formulDerle(S.istenen)) { if (!sessiz) U.bildir("İstenen formül okunamadı. Örnek: |AC|-|DC| · A(BCD) · m(ABC)"); return null; }
    const adlar = new Set(S.nesne.filter((o) => o.tur === "nokta").map((o) => o.ad)), eksik = H.formulAdlar(H.formulDerle(S.istenen)).filter((a) => !adlar.has(a));
    if (eksik.length) { if (!sessiz) U.bildir(`Formüldeki ${eksik.join(", ")} noktası şekilde yok.`); return null; }
    anlik();
    const ayar = { olcek: S.olceksizGoster ? undefined : S.olcek || undefined, istenen: S.istenen && S.istenen.trim() ? S.istenen : undefined };
    const s = H.uydur(S.nesne, ayar);
    const tek = s.basarili && s.cevap ? H.teklik(S.nesne, s, 4) : { tek: null };
    if (s.basarili && !S.olceksizGoster) { S.nesne = s.nesne.concat(S.nesne.filter((o) => o.ogr)); S.olcek = s.olcek; }
    sonUydur = { ...s, tek: tek.tek };
    yenile();
    if (kip === "hazirla") { S.uyduruldu = s.basarili; veriListesi(); uydurSonucu(); U.depoYaz(DEPO_TASLAK(), { ...S, gorsel: null }); }
    if (!sessiz) Ses.efekt(s.basarili ? "seri" : "yanlis");
    return sonUydur;
  }
  function uydurSonucu() {
    const k = U.$("#sqUydurSonuc", el); if (!k || !sonUydur) return;
    const s = sonUydur, d = Object.entries(s.degerler);
    if (!s.basarili) {
      k.innerHTML = `<div class="sq-uyari"><b>Şekil bu verilere tam uymadı.</b> En büyük sapma: açılarda ${H.yuvarla(s.hata.aci)}°, uzunluklarda %${H.yuvarla(100 * s.hata.uz)}.
        Veriler çelişiyor olabilir (örn. açılar toplamı 180°'yi aşıyor) ya da bir etiket yanlış iki noktaya bağlanmış. Etiketleri kontrol et, Geri al ile önceki şekle dön.</div>`;
      return;
    }
    k.innerHTML = `<div class="basari">${S.olceksizGoster ? "<b>Veriler tutarlı.</b> Cevap ölçekli bir kopya üzerinde hesaplandı; senin çizdiğin şekil olduğu gibi kaldı." : "<b>Şekil verilere uyduruldu.</b> Artık ölçekli: yazdığın her açı ve uzunluk şekilde gerçekten öyle."}
      ${d.length ? `<br>Bulunan değerler: ${d.map(([a, v]) => `<b>${a} = ${H.guzelYaz(v)}</b>`).join(" · ")}` : ""}
      ${s.cevap ? `<br>İstenen: <b>${H.guzelYaz(s.cevap.deger)}${s.cevap.birim === "°" ? "°" : s.cevap.birim ? " " + s.cevap.birim : ""}</b>` : ""}
      ${s.tek === false ? '<div class="sq-uyari" style="margin-top:8px"><b>Dikkat:</b> Şekil farklı biçimlerde kurulunca istenen değer değişiyor. Veriler cevabı tek başına belirlemiyor; bir veri eksik olabilir.</div>' : ""}
      ${s.cevap ? '<div class="satir" style="margin-top:8px"><button class="btn btn-kucuk btn-ikinci" id="sqCevapAl">Bu değeri doğru cevap yap</button></div>' : ""}</div>`;
    const b = U.$("#sqCevapAl", k);
    if (b) b.addEventListener("click", () => { const g = U.$("#sqCevap", el); g.value = H.guzelYaz(s.cevap.deger); S.cevapMetin = g.value; const bs = U.$("#sqBirim", el); bs.value = s.cevap.birim || ""; S.birim = bs.value; U.bildir("Doğru cevap yazıldı. Kendin de kontrol et."); });
  }
  function veriListesi() {
    const k = U.$("#sqVeriler", el); if (!k) return;
    const ad = (id) => (bul(id) || {}).ad || "?";
    const ver = S.nesne.filter((o) => !o.ogr && ["uz", "aci", "centik", "yay"].includes(o.tur));
    if (!ver.length) { k.innerHTML = '<p class="soluk">Henüz veri yok. Sol taraftaki <b>Uzunluk yaz</b>, <b>Açı yaz</b>, <b>Eş kenar</b> ve <b>Eş açı</b> araçlarıyla sorudaki bilgileri şekle işle.</p>'; return; }
    k.innerHTML = `<div class="olcu-liste">${ver.map((o) => {
      const e = H.ifade(o.metin || "");
      const ust = o.tur === "uz" ? `|${ad(o.a)}${ad(o.b)}|` : o.tur === "aci" ? `m(${ad(o.a)}${ad(o.v)}${ad(o.c)})` : o.tur === "centik" ? `|${ad(o.a)}${ad(o.b)}|` : `m(${ad(o.a)}${ad(o.v)}${ad(o.c)})`;
      const deger = o.tur === "centik" ? `eş grup ${"I".repeat(o.n)}` : o.tur === "yay" ? `eş açı grubu ${o.n}` : e && e.soru ? "istenen (?)" : o.metin;
      return `<div><span>${ust}</span><b style="color:${e && e.soru ? "var(--pembe, #ff6fa0)" : "inherit"}">${U.kacis(deger)}</b></div>`;
    }).join("")}</div>`;
  }

  /* ---------------- Kayıt, paylaşım ---------------- */
  const kayitlar = () => U.depoAl(DEPO_KAYIT(), []);
  function kaydet() {
    if (!S.metin.trim() && !S.baslik.trim()) { U.bildir("Önce sorunun başlığını ya da metnini yaz."); return; }
    if (!isFinite(H.cevapOku(S.cevapMetin))) { U.bildir("Doğru cevabı sayı olarak yaz (örn. 30, 2√3, 3/2)."); return; }
    const l = kayitlar().filter((x) => x.id !== S.id), kopya = JSON.parse(JSON.stringify(S));
    if (!kopya.gorselSakla) kopya.gorsel = null;
    l.unshift(kopya);
    try { localStorage.setItem(DEPO_KAYIT(), JSON.stringify(l.slice(0, 60))); U.bildir("Soru bu cihaza kaydedildi."); Ses.efekt("seri"); }
    catch (e) { kopya.gorsel = null; l[0] = kopya; U.depoYaz(DEPO_KAYIT(), l.slice(0, 60)); U.bildir("Kaydedildi (görsel çok büyük olduğu için görselsiz)."); }
    hazirlaPanel();
  }
  const b64 = { yaz: (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
    oku: (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)))) };
  const paylasimVerisi = (q) => { const k = JSON.parse(JSON.stringify(q)); k.gorsel = q.gorselOgrenci && q.gorselSakla ? q.gorsel : null; delete k.opaklik; return k; };
  function baglanti(q) { const v = paylasimVerisi(q); v.gorsel = null; return location.href.split("#")[0] + "#soru-coz." + b64.yaz(JSON.stringify(v)); }
  async function baglantiKopyala() {
    if (!isFinite(H.cevapOku(S.cevapMetin))) { U.bildir("Paylaşmadan önce doğru cevabı yaz."); return; }
    const url = baglanti(S);
    try { await navigator.clipboard.writeText(url); U.bildir("Bağlantı kopyalandı. Öğrencilere gönderebilirsin."); }
    catch (e) { await metinSor("Bağlantıyı kopyala", "Kutudaki bağlantıyı seçip kopyala.", url); }
  }
  function dosyaIndir() {
    const v = paylasimVerisi(S); if (S.gorselSakla) v.gorsel = S.gorsel;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(v, null, 1)], { type: "application/json" }));
    a.download = `soru-${(S.baslik || "geometri").toLocaleLowerCase("tr-TR").replace(/[^a-z0-9çğıöşü]+/g, "-").slice(0, 40)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
  }
  function dosyaAc(dosya) {
    const fr = new FileReader();
    fr.onload = () => { try { const q = JSON.parse(fr.result); if (!Array.isArray(q.nesne)) throw 0; q.id = q.id || "s" + Date.now().toString(36); taslakYukle(q); U.bildir("Soru dosyası açıldı."); } catch (e) { U.bildir("Bu dosya bir Soru Masası dosyası değil."); } };
    fr.readAsText(dosya);
  }
  function taslakYukle(q) { taslak = Object.assign(bosSoru(), JSON.parse(JSON.stringify(q))); kipSec("hazirla", true); }

  /* ---------------- Hazırla paneli ---------------- */
  function hazirlaPanel() {
    const k = U.$("#sqYan", el), l = kayitlar();
    k.innerHTML = (STUDYO() ? '<div id="sqStudyo" class="yigin"></div>' : "") + `
      <div class="panel"><span class="etiket" style="color:var(--turkuaz)">1 · Görsel</span>
        <p class="soluk">Sorunun fotoğrafını ya da ekran görüntüsünü koy; şekli üzerinden geç. Görsel bu cihazdan çıkmaz.</p>
        <div class="satir"><label class="btn btn-ikinci btn-kucuk sq-dosya">Görsel yükle<input type="file" accept="image/*" id="sqGorselDosya" hidden></label>
        ${S.gorsel ? '<button class="btn btn-hayalet btn-kucuk" id="sqGorselSil">Görseli kaldır</button>' : '<span class="soluk" style="font-size:13px">ya da Ctrl+V ile yapıştır, tahtaya sürükle</span>'}</div>
        ${S.gorsel ? `<label class="alan"><span>Görselin saydamlığı</span><input type="range" id="sqOpak" min="0.1" max="1" step="0.05" value="${S.opaklik}"></label>
        <label class="alan"><span>Görseli büyüt (şekil küçükse; boş yeri Taşı aracıyla sürükleyerek kaydır)</span><input type="range" id="sqGorselK" min="1" max="5" step="0.1" value="${(S.gorselKonum || {}).k || 1}"></label>
        <label class="anahtar"><input type="checkbox" id="sqGorselGoster" ${S.gorselGoster ? "checked" : ""}><span>Görseli göster</span></label>` : ""}
      </div>
      <div class="panel"><span class="etiket" style="color:var(--turkuaz)">2 · Veriler</span><div id="sqVeriler"></div>
        <label class="alan"><span>İstenen formül (isteğe bağlı)</span><input class="girdi mono" id="sqIstenen" maxlength="60" value="${U.kacis(S.istenen || "")}" placeholder="|AC|-|DC| · A(BCD) · m(PQC)"></label>
        <p class="soluk" style="font-size:12.5px">Tek bir açı ya da uzunluk isteniyorsa şekle “?” yazman yeter. Alan, fark, toplam gibi istekler için formül yaz: <span class="mono">|AB|</span> uzunluk, <span class="mono">m(ABC)</span> açı, <span class="mono">A(ABC)</span> alan, <span class="mono">Çevre(ABC)</span>.</p>
        <button class="btn btn-ana" id="sqUydur">Şekli verilere uydur</button>
        <label class="anahtar"><input type="checkbox" id="sqOlceksiz" ${S.olceksizGoster ? "checked" : ""}><span>Öğrenciye benim çizdiğim (ölçeksiz) şekli göster</span></label>
        <p class="soluk" style="font-size:13px">Göz kararı çizilmiş şekli yazdığın ölçülere getirir; x gibi bilinmeyenleri ve “?” ile işaretlenen istenen değeri hesaplar.</p>
        <div id="sqUydurSonuc"></div></div>
      <div class="panel"><span class="etiket" style="color:var(--turkuaz)">3 · Soru</span>
        <label class="alan"><span>Başlık</span><input class="girdi" id="sqBaslik" maxlength="60" value="${U.kacis(S.baslik)}" placeholder="örn. İkizkenar üçgende açı"></label>
        <label class="alan"><span>Soru metni</span><textarea class="girdi" id="sqMetin" rows="3" maxlength="600" placeholder="ABC üçgeninde …  Buna göre x kaç derecedir?">${U.kacis(S.metin)}</textarea></label>
        <div class="satir" style="flex-wrap:nowrap;align-items:flex-end"><label class="alan" style="flex:1"><span>Doğru cevap</span><input class="girdi mono" id="sqCevap" maxlength="20" value="${U.kacis(S.cevapMetin)}" placeholder="30 · 2√3 · 3/2"></label>
          <label class="alan" style="width:110px"><span>Birim</span><select class="girdi" id="sqBirim">${[["°", "derece"], ["birim", "birim"], ["birim²", "birim²"], ["cm", "cm"], ["cm²", "cm²"], ["", "yok"]].map(([v, a]) => `<option value="${v}" ${S.birim === v ? "selected" : ""}>${a}</option>`).join("")}</select></label></div>
        <label class="alan"><span>İpuçları (her satıra bir ipucu, sırayla açılır)</span><textarea class="girdi" id="sqIpucu" rows="3" maxlength="900">${U.kacis(S.ipuclari.join("\n"))}</textarea></label>
        <label class="alan"><span>Çözüm (öğrenci doğru cevabı bulunca görünür)</span><textarea class="girdi" id="sqCozum" rows="3" maxlength="900">${U.kacis(S.cozum)}</textarea></label></div>
      <div class="panel"><span class="etiket" style="color:var(--turkuaz)">4 · Kaydet ve paylaş</span>
        <div class="satir"><button class="btn btn-ana btn-kucuk" id="sqKaydet">Kaydet</button><button class="btn btn-ikinci btn-kucuk" id="sqDene">Öğrenci gibi dene</button></div>
        <div class="satir"><button class="btn btn-hayalet btn-kucuk" id="sqBaglanti">Bağlantı kopyala</button><button class="btn btn-hayalet btn-kucuk" id="sqIndir">Dosya indir</button>
          <label class="btn btn-hayalet btn-kucuk sq-dosya">Dosya aç<input type="file" accept=".json,application/json" id="sqDosyaAc" hidden></label></div>
        ${S.gorsel ? `<label class="anahtar"><input type="checkbox" id="sqGorselSakla" ${S.gorselSakla ? "checked" : ""}><span>Görseli kayda ve dosyaya ekle</span></label>
        <label class="anahtar"><input type="checkbox" id="sqGorselOgr" ${S.gorselOgrenci ? "checked" : ""}><span>Öğrenci de soluk görseli görsün</span></label>
        <p class="soluk" style="font-size:12.5px">Test kitabı görselleri telif hakkıyla korunur: sınıf içinde kullanabilirsin ama herkese açık paylaşma. Bağlantıya görsel hiçbir zaman eklenmez; yalnızca senin kurduğun çizim gider.</p>` : ""}
        <button class="btn btn-hayalet btn-kucuk" id="sqYeni">Yeni boş soru</button></div>
      ${l.length ? `<div class="panel"><span class="etiket soluk">Bu cihazdaki sorular</span><div class="gorev-liste">${l.map((q) => `<div class="sq-kayit"><button class="gorev" data-ac="${q.id}"><b>${U.kacis(q.baslik || "Başlıksız soru")}</b><small>Cevap: ${U.kacis(q.cevapMetin)}${q.birim === "°" ? "°" : " " + U.kacis(q.birim || "")}</small></button><button class="mini-btn" data-sil="${q.id}" title="Sil" aria-label="Sil">×</button></div>`).join("")}</div></div>` : ""}`;
    veriListesi(); uydurSonucu();
    if (STUDYO() && MC.studyo) MC.studyo.ciz(U.$("#sqStudyo", k));
    const bag = (id, olay, f) => { const x = U.$(id, k); if (x) x.addEventListener(olay, f); };
    bag("#sqGorselDosya", "change", (e) => gorselOku(e.target.files[0]));
    bag("#sqGorselSil", "click", () => { S.gorsel = null; hazirlaPanel(); yenile(); });
    bag("#sqOpak", "input", (e) => { S.opaklik = +e.target.value; ciz(); });
    bag("#sqGorselK", "input", (e) => { S.gorselKonum = S.gorselKonum || { k: 1, dx: 0, dy: 0 }; const eski = S.gorselKonum.k, yeni = +e.target.value; S.gorselKonum.dx *= yeni / eski; S.gorselKonum.dy *= yeni / eski; S.gorselKonum.k = yeni; ciz(); });
    bag("#sqGorselGoster", "change", (e) => { S.gorselGoster = e.target.checked; ciz(); });
    bag("#sqGorselSakla", "change", (e) => { S.gorselSakla = e.target.checked; });
    bag("#sqGorselOgr", "change", (e) => { S.gorselOgrenci = e.target.checked; if (e.target.checked) { S.gorselSakla = true; U.$("#sqGorselSakla", k).checked = true; } });
    bag("#sqUydur", "click", () => uydur());
    bag("#sqIstenen", "input", (e) => { S.istenen = e.target.value; const v = e.target.value.trim(); e.target.style.borderColor = !v || H.formulDerle(v) ? "" : "var(--kirmizi)"; });
    bag("#sqOlceksiz", "change", (e) => { S.olceksizGoster = e.target.checked; U.bildir(e.target.checked ? "Öğrenci senin çizdiğin şekli görecek; ölçüm araçları kapalı kalacak. Cevap yine ölçekli hesapla denetlenir." : "Öğrenci ölçekli şekli görecek."); });
    bag("#sqBaslik", "input", (e) => (S.baslik = e.target.value));
    bag("#sqMetin", "input", (e) => (S.metin = e.target.value));
    bag("#sqCevap", "input", (e) => (S.cevapMetin = e.target.value));
    bag("#sqBirim", "change", (e) => (S.birim = e.target.value));
    bag("#sqIpucu", "input", (e) => (S.ipuclari = e.target.value.split("\n").map((x) => x.trim()).filter(Boolean)));
    bag("#sqCozum", "input", (e) => (S.cozum = e.target.value));
    bag("#sqKaydet", "click", kaydet);
    bag("#sqDene", "click", () => { if (!isFinite(H.cevapOku(S.cevapMetin))) { U.bildir("Önce doğru cevabı yaz."); return; } cozBaslat(JSON.parse(JSON.stringify(S))); });
    bag("#sqBaglanti", "click", baglantiKopyala);
    bag("#sqIndir", "click", dosyaIndir);
    bag("#sqDosyaAc", "change", (e) => e.target.files[0] && dosyaAc(e.target.files[0]));
    bag("#sqYeni", "click", () => { taslak = bosSoru(); S = taslak; gecmis = []; ileri = []; sonUydur = null; hazirlaPanel(); degisti(); });
    k.onclick = (e) => {
      const ac = e.target.closest("[data-ac]"), sil = e.target.closest("[data-sil]");
      if (ac) { const q = kayitlar().find((x) => x.id === ac.dataset.ac); if (q) taslakYukle(q); }
      if (sil) { if (sil.dataset.emin) { U.depoYaz(DEPO_KAYIT(), kayitlar().filter((x) => x.id !== sil.dataset.sil)); hazirlaPanel(); } else { sil.dataset.emin = "1"; sil.textContent = "Sil?"; setTimeout(() => { if (sil.isConnected) { delete sil.dataset.emin; sil.textContent = "×"; } }, 3000); } }
    };
  }

  /* ---------------- Çöz ---------------- */
  function cozBaslat(q) {
    q = Object.assign(bosSoru(), q);
    q.nesne = q.nesne.filter((o) => !o.ogr);
    if (!q.uyduruldu && !q.olceksizGoster) { const s = H.uydur(q.nesne, { olcek: q.olcek || undefined }); if (s.basarili) { q.nesne = s.nesne; q.olcek = s.olcek; q.uyduruldu = true; } }
    coz = { soru: q, deneme: 0, ipucu: 0, cozuldu: false, adim: -1 };
    vurgu = new Set(); gizli = new Set();
    kipSec("coz", true);
  }

  /* ---------------- Çözüm adımları: ek çizimlerle sentetik çözüm ----------------
     q.adimlar = [{ baslik, metin (HTML), ekle: [nesne…], vurgu: [id…], bolge: [[A,B,C]…] }]
     Her adım öncekilerin üstüne kurulur; yeni eklenenler ve vurgulananlar altın renkte görünür. */
  function adimNesneleri(q, k) {
    const ek = [], yeni = new Set(), gizle = new Set(((q.adimlar || [])[k] || {}).gizle || []);
    (q.adimlar || []).slice(0, k + 1).forEach((a, i) => {
      for (const o of a.ekle || []) { ek.push({ ...o, ogr: true, adim: true }); if (i === k) yeni.add(o.id); }
      if (i === k) { (a.vurgu || []).forEach((id) => yeni.add(id)); (a.bolge || []).forEach((n, j) => ek.push({ id: `bolge${i}_${j}`, tur: "bolge", noktalar: n, adim: true, renk: Array.isArray(a.bolgeRenk) ? a.bolgeRenk[j] : undefined })); }
    });
    return { ek, yeni, gizle };
  }
  function adimGit(k) {
    const q = coz.soru, n = (q.adimlar || []).length;
    coz.adim = Math.max(-1, Math.min(n - 1, k));
    S.nesne = S.nesne.filter((o) => !o.adim);
    if (coz.adim >= 0) { const { ek, yeni, gizle } = adimNesneleri(q, coz.adim); S.nesne.push(...ek); vurgu = yeni; gizli = gizle; } else { vurgu = new Set(); gizli = new Set(); }
    secim = []; degisti(); cozPanel(); Ses.efekt(coz.adim >= 0 ? "dokun" : "sec");
    if (U.animasyon() && coz.adim >= 0) gsap.fromTo(U.$("#sqAdimKart", el), { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: .3, overwrite: true });
  }
  function adimPanel(q) {
    const n = (q.adimlar || []).length; if (!n) return "";
    if (coz.adim < 0) return `<div class="panel sq-adim"><span class="etiket" style="color:var(--altin)">Ek çizimlerle çözüm · ${n} adım</span>
        <p class="soluk" style="font-size:14px">${coz.cozuldu ? "Şimdi bir olimpiyatçının bu soruyu nasıl çözdüğünü izle: önce ek çizim, sonra şekil üzerinden akıl yürütme." : "Önce kendin dene. Takıldıysan ya da derste tahtada göstermek istiyorsan çözümü adım adım aç."}</p>
        <button class="btn ${coz.cozuldu ? "btn-ana" : "btn-ikinci"}" id="sqAdimBasla">${coz.cozuldu ? "Adım adım izle" : "Çözümü adım adım göster"}</button></div>`;
    const a = q.adimlar[coz.adim];
    return `<div class="panel sq-adim" id="sqAdimKart"><div class="satir" style="justify-content:space-between"><span class="etiket" style="color:var(--altin)">Adım ${coz.adim + 1} / ${n}</span>
        <span class="sq-adim-nokta">${q.adimlar.map((_, i) => `<i class="${i <= coz.adim ? "dolu" : ""}"></i>`).join("")}</span></div>
      ${a.baslik ? `<h3>${U.kacis(a.baslik)}</h3>` : ""}<div class="sq-adim-metin">${a.metin}</div>
      <div class="satir"><button class="btn btn-hayalet btn-kucuk" id="sqAdimGeri" ${coz.adim === 0 ? "disabled" : ""}>◀ Önceki</button>
        ${coz.adim < n - 1 ? '<button class="btn btn-ana btn-kucuk" id="sqAdimIleri">Sonraki ▶</button>' : '<button class="btn btn-ana btn-kucuk" id="sqAdimBitir">Şekli bırak</button>'}
        <button class="btn btn-hayalet btn-kucuk" id="sqAdimKapat">Çözümü kapat</button></div></div>`;
  }
  function cozPanel() {
    const k = U.$("#sqYan", el), q = coz && coz.soru;
    const liste = [...haftaGeo(), ...(MC.haftaninSorulari ? [] : MC.ayinSorulari || []), ...MC.soruOrnekleri, ...kayitlar()];
    const cozulen = U.depoAl("geo_soru_cozulen", {});
    if (!q) {
      k.innerHTML = `<div class="panel"><span class="etiket" style="color:var(--turkuaz)">Bir soru seç</span><div class="gorev-liste">${liste.map((x) => `<button class="gorev" data-coz="${x.id}"><b>${U.kacis(x.baslik || "Başlıksız soru")}</b><small>${x.hafta ? `<span style="color:var(--altin)">★ Haftanın sorusu · ${U.kacis(x.ay)}</span>` : x.ayin ? `<span style="color:var(--altin)">★ Ayın sorusu · ${U.kacis(x.ay)}</span>` : x.ornek ? "Örnek soru" : "Bu cihazda hazırlandı"}${cozulen[x.id] ? " · ✓ çözüldü" : ""}</small></button>`).join("")}</div></div>`;
    } else {
      const birim = q.birim === "°" ? "°" : q.birim;
      k.innerHTML = `
        ${coz.adim >= 0 ? adimPanel(q) : ""}
        <div class="panel"><span class="etiket" style="color:var(--turkuaz)">Soru</span><h3>${U.kacis(q.baslik || "Geometri sorusu")}</h3>
          <p class="sq-soru-metni">${U.kacis(q.metin || "Şekildeki verilere göre istenen değeri bul.")}</p>
          <p class="soluk" style="font-size:13px"><span style="color:var(--altin)">Sarı</span>: verilenler · <span style="color:#ff6fa0">Pembe</span>: istenen · <span style="color:var(--turkuaz)">Çentik ve yaylar</span>: eşitlikler</p></div>
        <div class="panel" id="sqCevapPanel"><span class="etiket" style="color:var(--turkuaz)">Cevabın</span>
          ${coz.cozuldu ? `<div class="basari"><b>Doğru! Cevap ${U.kacis(q.cevapMetin)}${U.kacis(birim)}.</b> ${coz.deneme === 1 ? "İlk denemede buldun." : `${coz.deneme}. denemede buldun.`}${q.cozum ? `<p style="margin-top:8px">${U.kacis(q.cozum)}</p>` : ""}
            <p class="soluk" style="margin-top:8px">${q.olceksizGoster ? "Bu şekil ölçeksiz çizildi; bu yüzden ölçüm araçları kapalı. Kâğıttaki gibi akıl yürütmeyle çözüldü." : "Ölçüm araçları açıldı: şekil ölçekli çizildiği için cevabını ölçerek de doğrulayabilirsin."}</p></div>`
          : `<form class="satir" id="sqCevapForm" style="flex-wrap:nowrap" novalidate><input class="girdi mono" id="sqOgrCevap" maxlength="20" autocomplete="off" placeholder="örn. 30 · 2√3 · 3/2" aria-label="Cevabın"><span class="mono soluk">${U.kacis(birim)}</span><button class="btn btn-ana" type="submit">Kontrol et</button></form>
             <p class="soluk" style="font-size:13px">Kök için √ ya da “kök” yaz: 2√3, 2 kök 3. Kesir: 3/2. Ölçüm araçları cevabı bulunca açılır.</p><div id="sqGeriBildirim" aria-live="polite"></div>`}
        </div>
        ${q.ipuclari.length && !coz.cozuldu ? `<div class="panel"><span class="etiket soluk">İpuçları</span>${q.ipuclari.slice(0, coz.ipucu).map((x, i) => `<div class="ipucu-kart">İpucu ${i + 1}: ${U.kacis(x)}</div>`).join("")}
          ${coz.ipucu < q.ipuclari.length ? `<button class="btn btn-ikinci btn-kucuk" id="sqIpucuAc">İpucu aç (${coz.ipucu}/${q.ipuclari.length})</button>` : ""}</div>` : ""}
        ${coz.adim < 0 ? adimPanel(q) : ""}
        <div class="satir"><button class="btn btn-hayalet btn-kucuk" id="sqBaska">Başka soru seç</button><button class="btn btn-hayalet btn-kucuk" id="sqTemizleOgr">Çizdiklerimi sil</button></div>`;
      U.tex(k);
    }
    k.onclick = (e) => {
      const b = e.target.closest("[data-coz]"); if (b) { const x = liste.find((y) => y.id === b.dataset.coz); if (x) { Ses.efekt("basla"); cozBaslat(JSON.parse(JSON.stringify(x))); } }
      if (e.target.closest("#sqIpucuAc")) { coz.ipucu++; Ses.efekt("dokun"); cozPanel(); }
      if (e.target.closest("#sqAdimBasla")) adimGit(0);
      if (e.target.closest("#sqAdimIleri")) adimGit(coz.adim + 1);
      if (e.target.closest("#sqAdimGeri")) adimGit(coz.adim - 1);
      if (e.target.closest("#sqAdimKapat")) adimGit(-1);
      if (e.target.closest("#sqAdimBitir")) { vurgu = new Set(); gizli = new Set(); S.nesne = S.nesne.filter((o) => o.tur !== "bolge"); S.nesne.forEach((o) => { if (o.adim) delete o.adim; }); coz.adim = -1; degisti(); cozPanel(); U.bildir("Ek çizimler şekilde kaldı; üzerine kendin de çizebilirsin."); }
      if (e.target.closest("#sqBaska")) { vurgu = new Set(); gizli = new Set(); coz = null; S = { nesne: [] }; olcumler = []; yenile(); cozPanel(); araclariCiz(); }
      if (e.target.closest("#sqTemizleOgr")) { anlik(); S.nesne = S.nesne.filter((o) => !o.ogr); olcumler = []; vurgu = new Set(); gizli = new Set(); coz.adim = -1; degisti(); cozPanel(); }
    };
    const f = U.$("#sqCevapForm", k);
    if (f) f.addEventListener("submit", (e) => {
      e.preventDefault();
      const g = U.$("#sqOgrCevap", k), gb = U.$("#sqGeriBildirim", k), v = H.cevapOku(g.value);
      if (!isFinite(v)) { gb.innerHTML = '<p class="hata-metin">Bunu sayı olarak okuyamadım. Örnek: 30, 2,5, 2√3, 3/2</p>'; return; }
      coz.deneme++;
      if (H.dogruMu(g.value, H.cevapOku(q.cevapMetin))) {
        coz.cozuldu = true; const c = U.depoAl("geo_soru_cozulen", {}); c[q.id] = Math.min(c[q.id] || 99, coz.deneme); U.depoYaz("geo_soru_cozulen", c);
        Ses.efekt("bitis"); araclariCiz(); cozPanel();
        if (U.animasyon()) gsap.fromTo(U.$("#sqCevapPanel .basari", el), { scale: .9, opacity: 0 }, { scale: 1, opacity: 1, duration: .45, ease: "back.out(2)", overwrite: true });
      } else {
        Ses.efekt("yanlis");
        const ipucuVar = q.ipuclari.length > coz.ipucu;
        gb.innerHTML = `<p class="hata-metin">${H.yuvarla(v)} değil. ${coz.deneme >= 2 && ipucuVar ? "Bir ipucu açmaya ne dersin?" : "Şekle yardımcı bir çizgi eklemeyi dene."}</p>`;
        if (U.animasyon()) gsap.fromTo(f, { x: -10 }, { x: 0, duration: .45, ease: "elastic.out(1,.3)" });
        g.select();
      }
    });
  }

  /* ---------------- Kip ---------------- */
  function kipSec(yeni, zorla) {
    if (kip === yeni && !zorla) return;
    kip = yeni; secim = []; olcumler = []; gecmis = []; ileri = []; vurgu = new Set(); gizli = new Set();
    U.$$("#sqKip button", el).forEach((b) => b.setAttribute("aria-pressed", b.dataset.d === kip));
    el.classList.toggle("sq-coz", kip === "coz");
    if (kip === "hazirla") { S = taslak; arac = S.nesne.length ? "parca" : "parca"; hazirlaPanel(); }
    else { S = coz ? coz.soru : { nesne: [] }; arac = "yardimci"; cozPanel(); }
    araclariCiz(); aracSec(arac); degisti();
  }

  /* ---------------- Kurulum ---------------- */
  function kur(e) {
    el = e;
    el.innerHTML = `
      <div class="bolum-basi"><span class="etiket" style="color:var(--turkuaz)">Soru Masası</span>
        <div class="satir" style="justify-content:space-between;align-items:flex-end"><h2>Sorunun şeklini kur, üzerinde çöz</h2><div id="sqKip"></div></div>
        <p>Öğretmen bir sorunun görselini koyar, şekli aydınger kâğıdındaki gibi üzerinden geçerek kurar ve verileri yazar. Uygulama şekli bu verilere göre ölçekli hâle getirir ve cevabı denetler. Öğrenci aynı şekil üzerinde yardımcı çizgilerle soruyu çözer.</p></div>
      <div class="masa">
        <div class="arac-kutusu" id="sqAraclar" role="toolbar" aria-label="Soru araçları"></div>
        <div class="tahta-kutu" id="sqKutu">
          <svg id="sqSvg" role="img" aria-label="Soru tahtası" viewBox="0 0 ${W} ${Y}" preserveAspectRatio="xMidYMid meet"></svg>
          <div class="tahta-ust">
            <div class="durum-cubugu" id="sqDurum"></div>
            <div class="mini-btnlar">
              <button class="mini-btn" id="sqGeri" title="Geri al (Ctrl+Z)">↶</button>
              <button class="mini-btn" id="sqIleri" title="Yinele (Ctrl+Y)">↷</button>
              <button class="mini-btn" id="sqIzgara" title="Izgarayı aç/kapat">▦</button>
            </div>
          </div>
          <div class="sq-birak" id="sqBirak" hidden>Görseli buraya bırak</div>
        </div>
        <div class="yan-panel yigin" id="sqYan"></div>
      </div>`;
    svg = U.$("#sqSvg", el); kutu = U.$("#sqKutu", el);
    const boyut = () => { const r = kutu.getBoundingClientRect(); if (!r.width) return; const yeni = Math.min(r.width / W, r.height / Y); if (Math.abs(yeni - ekran) > 1e-3) { ekran = yeni; ciz(); } };
    if (window.ResizeObserver) new ResizeObserver(boyut).observe(kutu); boyut();
    U.segment(U.$("#sqKip", el), [["hazirla", "Öğretmen: hazırla"], ["coz", "Öğrenci: çöz"]], kip, (d) => kipSec(d));
    U.$("#sqAraclar", el).addEventListener("click", (ev) => { const b = ev.target.closest(".arac"); if (b && !b.disabled) { Ses.efekt("dokun"); aracSec(b.dataset.a); } });
    svg.addEventListener("pointerdown", (ev) => { ev.preventDefault(); if (!S || (kip === "coz" && !coz)) return; tikla(ev); });
    svg.addEventListener("pointermove", (ev) => {
      fare = koordinat(ev);
      if (cizgiKalem) { const s = cizgiKalem.yol[cizgiKalem.yol.length - 1]; if (Math.hypot(s[0] - fare.x, s[1] - fare.y) > px(2.5)) { cizgiKalem.yol.push([+fare.x.toFixed(1), +fare.y.toFixed(1)]); ciz(false); } return; }
      if (gorselSuruk) { S.gorselKonum.dx = gorselSuruk.dx + fare.x - gorselSuruk.x; S.gorselKonum.dy = gorselSuruk.dy + fare.y - gorselSuruk.y; ciz(false); return; }
      if (surukle) {
        const o = bul(surukle);
        if (o.uzerinde) { const h = P(o.uzerinde); if (h) o.t = H.parametre(h, fare); } else { o.x = fare.x; o.y = fare.y; }
        hs = H.hesapla(S.nesne); ciz(false); return;
      }
      if (secim.length) ciz();
    });
    const birak = () => { gorselSuruk = null; if (surukle) { surukle = null; degisti(); } if (cizgiKalem) { cizgiKalem = null; degisti(); } };
    svg.addEventListener("pointerup", birak); svg.addEventListener("pointercancel", birak);
    svg.addEventListener("pointerleave", () => { fare = null; if (secim.length) ciz(); });
    U.$("#sqGeri", el).addEventListener("click", geriAl);
    U.$("#sqIleri", el).addEventListener("click", yinele);
    U.$("#sqIzgara", el).addEventListener("click", () => { izgara = !izgara; ciz(); });
    // Görsel: sürükle-bırak ve yapıştır
    const birakEl = U.$("#sqBirak", el);
    kutu.addEventListener("dragover", (ev) => { if (kip !== "hazirla") return; ev.preventDefault(); birakEl.hidden = false; });
    kutu.addEventListener("dragleave", () => (birakEl.hidden = true));
    kutu.addEventListener("drop", (ev) => { ev.preventDefault(); birakEl.hidden = true; if (kip === "hazirla" && ev.dataTransfer.files[0]) gorselOku(ev.dataTransfer.files[0]); });
    document.addEventListener("paste", (ev) => {
      if (!el.closest(".gorunum.aktif") || kip !== "hazirla" || ev.target.matches("input, textarea")) return;
      const f = [...(ev.clipboardData ? ev.clipboardData.files : [])].find((x) => /^image\//.test(x.type)); if (f) { ev.preventDefault(); gorselOku(f); }
    });
    document.addEventListener("keydown", (ev) => {
      if (!el.closest(".gorunum.aktif") || ev.target.matches("input, textarea, select") || document.querySelector(".perde")) return;
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "z") { ev.preventDefault(); geriAl(); }
      if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "y") { ev.preventDefault(); yinele(); }
      if (ev.key === "Escape") { secim = []; ciz(); durumYaz(); }
    });
    const eski = U.depoAl(DEPO_TASLAK(), null);
    taslak = Object.assign(bosSoru(), eski && Array.isArray(eski.nesne) ? eski : {});
    kipSec("hazirla", true);
  }
  MC.modul("soru", {
    baslik: "Soru Masası", kur,
    goster(kok, param) {
      if (!param) return;
      if (param.startsWith("coz.")) {
        try { const q = JSON.parse(b64.oku(param.slice(4))); if (!Array.isArray(q.nesne)) throw 0; history.replaceState(null, "", "#soru"); cozBaslat(q); U.bildir("Paylaşılan soru açıldı."); }
        catch (e) { U.bildir("Bu soru bağlantısı bozuk."); }
      } else if (param === "coz") kipSec("coz");
      else if (param.startsWith("hafta")) {
        const par = param.split(".").slice(1), adim = par[par.length - 1] === "adim" && par.pop(), id = par.join("."), q = haftaGeo().find((x) => !id || x.id === id);
        if (q) { history.replaceState(null, "", "#soru"); cozBaslat(JSON.parse(JSON.stringify(q))); if (adim && q.adimlar) adimGit(0); }
      }
      else if (param.startsWith("ayin")) {
        const id = param.split(".")[1], q = (MC.ayinSorulari || []).find((x) => !id || x.id === id);
        if (q) { history.replaceState(null, "", "#soru"); cozBaslat(JSON.parse(JSON.stringify(q))); }
      }
    },
  });
  /* Haftanın Soruları'ndaki yayımlanmış geometri soruları, Soru Masası biçiminde */
  function haftaGeo() {
    const V = MC.haftaninSorulari; if (!V) return [];
    const d = new Date(), bugun = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return V.sorular.filter((q) => q.tur === "geometri" && q.baslangic <= bugun).map((q) => ({
      ...q.sekil, id: q.id, baslik: q.baslik, metin: q.metin.replace(/<[^>]+>/g, ""), ipuclari: q.ipuclari, cozum: q.cozum ? q.cozum.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "",
      cevapMetin: q.cevapMetin, birim: q.birim, hafta: true, adimlar: q.cozum && q.adimlar ? q.adimlar.map(({ svg, ...a }) => a) : undefined, ay: q.etiket || q.baslangic.split("-").reverse().join("."),
    }));
  }
  /* Başka bölümler için durağan çizim (ör. Ayın Sorusu): mantıksal 1000×700 düzleminde SVG içeriği ve sınır kutusu */
  function statikSvg(q) {
    const yedek = { S, ekran, secim, olcumler, hs, konum, fare, vurgu, gizli };
    S = { ...q, gorsel: null }; ekran = 1; secim = []; olcumler = []; fare = null; vurgu = new Set(q.vurgu || []); gizli = new Set(q.gizle || []); hs = H.hesapla(S.nesne);
    const icerik = svgYaz(false).replace(/<rect x="0" y="0" width="1000" height="700"[^>]*\/>/, ""), nlar = S.nesne.filter((o) => o.tur === "nokta").map((o) => hs.P(o.id)).filter(Boolean);
    ({ S, ekran, secim, olcumler, hs, konum, fare, vurgu, gizli } = yedek);
    const x0 = Math.min(...nlar.map((p) => p.x)), x1 = Math.max(...nlar.map((p) => p.x)), y0 = Math.min(...nlar.map((p) => p.y)), y1 = Math.max(...nlar.map((p) => p.y));
    return { icerik, kutu: { x: x0 - 70, y: y0 - 70, w: x1 - x0 + 140, h: y1 - y0 + 140 } };
  }
  /* Bir sorunun k. çözüm adımının durağan çizimi (Haftanın Soruları sayfası ve yazdırma için) */
  function adimSvg(q, k) {
    const { ek, yeni, gizle } = adimNesneleri(q, k);
    return statikSvg({ ...q, nesne: q.nesne.filter((o) => !o.ogr).concat(ek), vurgu: [...yeni], gizle: [...gizle] });
  }
  /* Çözüm Stüdyosu için iç erişim */
  const ic = { S: () => S, kip: () => kip, degisti, anlik, ciz, yenile, ekle: (o) => ekle(o), yeniAd, P: (id) => P(id), bul: (id) => bul(id),
    uydur: (sessiz) => uydur(sessiz), sonUydur: () => sonUydur, cozBaslat: (q) => cozBaslat(q), adimGit: (k) => adimGit(k), taslakYukle, kipSec: (k) => kipSec(k, true),
    hazirlaPanel: () => hazirlaPanel(), vurgula: (ids) => { vurgu = new Set(ids || []); ciz(); }, araclariCiz: () => { araclariCiz(); aracSec(arac); }, aracSec: (a) => aracSec(a) };
  MC.geoSoru = { ic, statikSvg, adimSvg, cozBaslat: (q) => cozBaslat(JSON.parse(JSON.stringify(q))), durum: () => ({ kip, S, coz, sonUydur, arac, secim }), _test: { kipSec, aracSec, cozBaslat, uydur, taslakYukle, baglanti, b64, tiklaXY: (x, y) => { const r = svg.getBoundingClientRect(), s = Math.min(r.width / W, r.height / Y); return tikla({ clientX: r.left + (r.width - W * s) / 2 + x * s, clientY: r.top + (r.height - Y * s) / 2 + y * s, pointerId: 1 }); } } };
})();
