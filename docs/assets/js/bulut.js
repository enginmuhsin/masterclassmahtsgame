/* =====================================================================
   BULUT — Supabase ile konuşan küçük katman (kütüphane gerektirmez).
   · Takma ad ve isteğe bağlı sınıf kodu (yalnızca bu cihazda saklanır)
   · Skor gönderme kutusu (oyun bitince görünür)
   · Ziyaret ve görüntülenme sayacı
   Bağlantı bilgisi bulut-ayar.js içindedir; boşsa bu özelliklerin hepsi gizlenir.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, A = window.MC_BULUT || {}, B = {};

  /* ---------- Sıralama tabloları: her oyun ve yarış türü ayrı ---------- */
  const SURE = [["60", "60 sn"], ["90", "90 sn"], ["120", "120 sn"]];
  B.OYUNLAR = [
    { id: "sayi-avi", ad: "Sayı Avı", git: "#oyunlar", ikincil: "Yanlış",
      boyut: [{ ad: "Zorluk", s: [["kolay", "Kolay"], ["orta", "Orta"], ["uzman", "Uzman"]] }, { ad: "Süre", s: SURE }],
      not: "Tek oyunculu ve Dengeli puanlamalı turlar. Eşitlikte daha az yanlış yapan önde." },
    { id: "formula-sprint", ad: "Formula Sprint", git: "#sprint", ikincil: "Yanlış", boyut: [{ ad: "Süre", s: SURE }],
      not: "Eşitlikte daha az yanlış yapan önde." },
    { id: "sayi-izgarasi", ad: "Sayı Izgarası", git: "#oyunlar", boyut: [{ ad: "Aralık", s: [["200", "10–200"], ["2000", "10–2.000"]] }],
      not: "Aynı sayı türünde art arda oynanan 5 turun toplam puanı." },
    { id: "sayi-bilmecesi", ad: "Sayı Bilmecesi", git: "#oyunlar", boyut: [], sabit: "5-tur",
      not: "Art arda çözülen 5 bilmecenin toplam puanı (en çok 300)." },
    { id: "fonksiyon-yarisi", ad: "Fonksiyon Yarışı", git: "#fonksiyon", ikincil: "Yanlış", boyut: [], sabit: "tahmin",
      not: "15 hazır etkinlikte İLK tahminde doğru bilinen yarış sayısı. Her etkinlikte yalnızca ilk tahmin sayılır." },
    { id: "oklid", ad: "Öklid Görevleri", git: "geometri/index.html#cizim", ikincil: "Adım", boyut: [], sabit: "toplam",
      not: "Geometri Atölyesi'ndeki 5 cetvel-pergel görevinden toplanan yıldız (en çok 15). Eşitlikte toplam adımı az olan önde." },
  ];
  B.oyun = (id) => B.OYUNLAR.find((o) => o.id === id);

  /* ---------- Bağlantı ---------- */
  B.ayarli = () => !!(A.url && A.anahtar);
  B.hazir = () => B.ayarli() && navigator.onLine !== false;
  const kok = () => String(A.url).replace(/\/+$/, "");
  function basliklar(token) {
    const h = { "Content-Type": "application/json", apikey: A.anahtar };
    if (token) h.Authorization = "Bearer " + token;
    else if (/^eyJ/.test(A.anahtar)) h.Authorization = "Bearer " + A.anahtar; // eski tip "anon" anahtar
    return h;
  }
  B.istek = async function (yol, { yontem = "GET", govde, token, ek = {} } = {}) {
    if (!B.ayarli()) throw new Error("bagli_degil");
    const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    const zaman = setTimeout(() => ctrl && ctrl.abort(), 12000);
    try {
      const r = await fetch(kok() + yol, { method: yontem, headers: { ...basliklar(token), ...ek },
        body: govde === undefined ? undefined : JSON.stringify(govde), signal: ctrl ? ctrl.signal : undefined });
      const metin = await r.text(); let veri = null;
      try { veri = metin ? JSON.parse(metin) : null; } catch (e) { veri = metin; }
      if (!r.ok) {
        const e = new Error((veri && (veri.message || veri.msg || veri.error_description || veri.error)) || "HTTP " + r.status);
        e.durum = r.status; e.veri = veri; throw e;
      }
      return veri;
    } finally { clearTimeout(zaman); }
  };
  B.rpc = (ad, arg, token) => B.istek("/rest/v1/rpc/" + ad, { yontem: "POST", govde: arg || {}, token });

  const HATA = {
    kayit_kapali: "Sıralama şu an yeni skor kabul etmiyor (öğretmen kapattı).",
    ad_gecersiz: "Takma ad 2–20 karakter olmalı. Harf, rakam, boşluk, nokta ve tire kullanabilirsin.",
    sinif_gecersiz: "Sınıf kodu en çok 16 karakter olabilir: harf, rakam ve tire.",
    cok_hizli: "Biraz yavaş: aynı cihazdan 15 saniyede bir skor gönderilebilir.",
    kuyruk_dolu: "Onay bekleyen skor çok fazla. Öğretmenin onaylamasını bekle.",
    puan_gecersiz: "Bu puan kabul edilmedi.", varyant_yok: "Bu yarış türünün tablosu yok.", oyun_yok: "Bu oyunun tablosu yok.",
    bagli_degil: "Sıralama tablosu bu kopyada bağlı değil.",
    "Invalid login credentials": "E-posta ya da şifre hatalı.",
    "Email not confirmed": "Bu e-posta adresi henüz doğrulanmamış.",
  };
  B.hataMetni = function (e) {
    const m = String((e && e.message) || e);
    for (const k in HATA) if (m.includes(k)) return HATA[k];
    if (/abort|fetch|network|load failed/i.test(m)) return "İnternete ulaşılamadı. Bağlantını kontrol edip yeniden dene.";
    return "Bir sorun çıktı: " + m;
  };

  /* ---------- Takma ad ---------- */
  B.AD_DESEN = /^[A-Za-z0-9ÇĞİÖŞÜçğıöşüÂâÎîÛû _.-]{2,20}$/;
  B.SINIF_DESEN = /^[A-Z0-9ÇĞİÖŞÜ-]{0,16}$/;
  B.adTemizle = (s) => String(s || "").trim().replace(/\s+/g, " ");
  B.sinifTemizle = (s) => String(s || "").replace(/\s+/g, "").toLocaleUpperCase("tr-TR");
  B.kimlik = () => U.depoAl("mc_kimlik", null);
  B.kimlikYaz = (k) => { U.depoYaz("mc_kimlik", k); document.dispatchEvent(new CustomEvent("mc:kimlik", { detail: k })); };
  B.cihaz = function () {
    let c = U.depoAl("mc_cihaz", null);
    if (!c) { c = (window.crypto && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36)).slice(0, 36); U.depoYaz("mc_cihaz", c); }
    return c;
  };
  const AD1 = ["Asal", "Pergel", "Kesir", "Sonsuz", "Euler", "Fibonacci", "Pi", "Vektör", "Prizma", "Altın", "Gauss", "Öklid", "Fraktal", "Kuantum", "Logaritma"];
  const AD2 = ["Kartal", "Kaplan", "Yunus", "Şahin", "Tilki", "Panda", "Ejder", "Kurt", "Baykuş", "Aslan", "Atlas", "Kunduz"];
  B.adOner = function () {
    for (;;) { const a = `${U.sec(AD1)} ${U.sec(AD2)} ${10 + Math.floor(Math.random() * 90)}`; if (a.length <= 20) return a; }
  };

  /* Takma ad penceresi: Promise<kimlik | null> */
  B.kimlikSor = function (baslik) {
    return new Promise((coz) => {
      const eski = B.kimlik() || { ad: "", sinif: "" };
      const perde = document.createElement("div");
      perde.className = "perde"; perde.setAttribute("role", "dialog"); perde.setAttribute("aria-modal", "true"); perde.setAttribute("aria-labelledby", "kmBaslik");
      perde.innerHTML = `<form class="panel pencere" novalidate>
          <span class="etiket">Sıralama kimliği</span>
          <h3 id="kmBaslik">${baslik || "Takma adını seç"}</h3>
          <div class="benzetme"><b>Benzetme:</b> Takma ad bir forma numarası gibidir. Tribündeki herkes seni tanır ama kim olduğunu bilmez. Bu yüzden <b>gerçek adını ve soyadını yazma</b>.</div>
          <label class="alan"><span>Takma ad (2–20 karakter)</span>
            <div class="satir" style="flex-wrap:nowrap"><input class="girdi" id="kmAd" maxlength="20" autocomplete="off" spellcheck="false" value="${U.kacis(eski.ad)}" placeholder="örn. Asal Kartal 42">
            <button type="button" class="btn btn-ikinci" id="kmOner" title="Rastgele takma ad öner">Öner</button></div></label>
          <label class="alan"><span>Sınıf kodu (isteğe bağlı, öğretmenin verir)</span>
            <input class="girdi" id="kmSinif" maxlength="16" autocomplete="off" spellcheck="false" value="${U.kacis(eski.sinif)}" placeholder="örn. 7A ya da BILSEM-6"></label>
          <p class="soluk" style="font-size:14px">Bu bilgiler yalnızca bu cihazda saklanır. Sıralamaya gönderdiğinde takma ad, sınıf kodu ve puan tabloya yazılır; e-posta ya da gerçek ad istenmez.</p>
          <p class="hata-metin" id="kmHata" role="alert"></p>
          <div class="satir"><button class="btn btn-ana" type="submit">Kaydet</button><button class="btn btn-hayalet" type="button" id="kmVazgec">Vazgeç</button></div>
        </form>`;
      document.body.appendChild(perde);
      const f = U.$("form", perde), ad = U.$("#kmAd", perde), sn = U.$("#kmSinif", perde), hata = U.$("#kmHata", perde);
      const onceki = document.activeElement;
      const kapat = (sonuc) => { document.removeEventListener("keydown", tus); perde.remove(); if (onceki && onceki.focus) onceki.focus(); coz(sonuc); };
      const tus = (e) => { if (e.key === "Escape") kapat(null); };
      document.addEventListener("keydown", tus);
      U.$("#kmOner", perde).addEventListener("click", () => { ad.value = B.adOner(); ad.focus(); MC.Ses.efekt("sec"); });
      U.$("#kmVazgec", perde).addEventListener("click", () => kapat(null));
      perde.addEventListener("click", (e) => { if (e.target === perde) kapat(null); });
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        const k = { ad: B.adTemizle(ad.value), sinif: B.sinifTemizle(sn.value) };
        if (!B.AD_DESEN.test(k.ad)) { hata.textContent = HATA.ad_gecersiz; ad.focus(); return; }
        if (!B.SINIF_DESEN.test(k.sinif)) { hata.textContent = HATA.sinif_gecersiz; sn.focus(); return; }
        B.kimlikYaz(k); MC.Ses.efekt("dogru"); kapat(k);
      });
      setTimeout(() => ad.focus(), 30);
    });
  };

  /* ---------- Skor gönderme ---------- */
  B.gonder = async function (v) {
    let k = B.kimlik();
    if (!k) { k = await B.kimlikSor("Sıralamaya girmek için bir takma ad seç"); if (!k) return null; }
    const sonuc = await B.rpc("skor_gonder", { p_oyun: v.oyun, p_varyant: v.varyant, p_takma_ad: k.ad, p_sinif: k.sinif || "",
      p_puan: Math.round(v.puan), p_ikincil: v.ikincil == null ? null : Math.round(v.ikincil), p_ayrinti: v.ayrinti || {}, p_cihaz: B.cihaz() });
    const g = U.depoAl("mc_gonderilen", []);
    g.unshift({ id: sonuc.id, oyun: v.oyun, varyant: v.varyant, puan: Math.round(v.puan), durum: sonuc.durum, ad: sonuc.takma_ad, tarih: new Date().toLocaleDateString("tr-TR") });
    U.depoYaz("mc_gonderilen", g.slice(0, 20));
    return sonuc;
  };
  B.tabloAdresi = (oyun, varyant) => {
    const ana = /\/geometri\//.test(location.pathname) ? "../index.html" : "";
    return `${ana}#siralama-${oyun}.${varyant}`;
  };
  B.varyantAdi = function (oyun, varyant) {
    const o = B.oyun(oyun); if (!o || !o.boyut.length) return "";
    const p = String(varyant).split("-");
    return o.boyut.map((b, i) => (b.s.find((x) => x[0] === p[i]) || [0, p[i]])[1]).join(" · ");
  };

  /* Oyun sonu kutusu: v = {oyun, varyant, puan, ikincil, ayrinti, engel} */
  B.gonderKutusu = function (kap, v) {
    if (!kap) return;
    if (!B.ayarli()) { kap.innerHTML = ""; return; }
    const o = B.oyun(v.oyun), vAd = B.varyantAdi(v.oyun, v.varyant);
    const tablo = B.tabloAdresi(v.oyun, v.varyant);
    let gonderildi = false;
    const ciz = (icerik) => {
      kap.innerHTML = `<div class="sr-gonder"><div class="sr-gonder-metin"><span class="etiket">Sıralama · ${o.ad}${vAd ? " · " + vAd : ""}</span>${icerik}</div></div>`;
      U.tex(kap);
    };
    const hazirCiz = () => {
      const k = B.kimlik();
      if (v.engel) { ciz(`<p class="soluk">${v.engel}</p>`); return; }
      if (navigator.onLine === false) { ciz(`<p class="soluk">İnternet bağlantısı yok. Sıralamaya göndermek için internet gerekir.</p><div class="satir"><button class="btn btn-ikinci" data-k="tekrar">Yeniden dene</button></div>`); return; }
      ciz(`<p><b class="mono">${v.puan}</b> puanını tabloya gönder.${k ? ` Takma ad: <b>${U.kacis(k.ad)}</b>${k.sinif ? ` · ${U.kacis(k.sinif)}` : ""}` : ""}</p>
        <div class="satir"><button class="btn btn-ana" data-k="gonder">Sıralamaya gönder</button>
        ${k ? '<button class="btn btn-hayalet" data-k="ad">Takma adı değiştir</button>' : ""}
        <a class="btn btn-hayalet" href="${tablo}">Tabloyu gör</a></div>`);
    };
    kap.onclick = async (e) => {
      const b = e.target.closest("[data-k]"); if (!b) return;
      if (b.dataset.k === "tekrar") { hazirCiz(); return; }
      if (b.dataset.k === "ad") { await B.kimlikSor(); hazirCiz(); return; }
      if (b.dataset.k !== "gonder" || gonderildi) return;
      b.disabled = true; b.textContent = "Gönderiliyor…";
      try {
        const s = await B.gonder(v);
        if (!s) { hazirCiz(); return; }
        gonderildi = true; MC.Ses.efekt("seri");
        const rekor = s.rekor ? "" : ` Bu tablodaki en iyi puanın hâlâ <b>${s.en_iyi}</b>.`;
        ciz(s.durum === "onayli"
          ? `<p class="sr-basari">Tabloya girdin! <b>${U.kacis(s.takma_ad)}</b> şu an <b>${s.sira}.</b> sırada.${rekor}</p><div class="satir"><a class="btn btn-ana" href="${tablo}">Tabloyu gör</a></div>`
          : `<p class="sr-basari">Skorun öğretmen onayına gönderildi. Onaylanınca tabloda görünecek${s.sira ? ` (şimdiki tabloya göre <b>${s.sira}.</b> sıraya denk geliyor)` : ""}.${rekor}</p><div class="satir"><a class="btn btn-ikinci" href="${tablo}">Tabloyu gör</a></div>`);
      } catch (err) {
        ciz(`<p class="hata-metin">${B.hataMetni(err)}</p><div class="satir"><button class="btn btn-ikinci" data-k="tekrar">Yeniden dene</button></div>`);
      }
    };
    hazirCiz();
  };

  /* ---------- Ziyaret sayacı ---------- */
  let sonSayfa = null, sayacSozu = null;
  const bugun = () => { try { return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" }); } catch (e) { return new Date().toISOString().slice(0, 10); } };
  B.sayfa = function (ad) {
    ad = String(ad || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30);
    if (!B.hazir() || !ad || ad === sonSayfa) return sayacSozu;
    sonSayfa = ad;
    const g = bugun(), yeni = U.depoAl("mc_ziyaret_gun", "") !== g;
    if (yeni) U.depoYaz("mc_ziyaret_gun", g);
    sayacSozu = B.rpc("ziyaret_kaydet", { p_sayfa: ad, p_yeni: yeni }).catch(() => { if (yeni) U.depoYaz("mc_ziyaret_gun", ""); });
    return sayacSozu;
  };
  B.sayacGoster = async function (el) {
    if (!el || !B.hazir()) return;
    try {
      await sayacSozu;
      const o = await B.rpc("ziyaret_ozet");
      const t = (n) => Number(n || 0).toLocaleString("tr-TR");
      el.innerHTML = `<span class="sayac-nokta" aria-hidden="true"></span><span>Bugün <b>${t(o.bugun_ziyaret)}</b> ziyaretçi · <b>${t(o.bugun_goruntulenme)}</b> görüntülenme · Toplam <b>${t(o.toplam_ziyaret)}</b> ziyaret</span>`;
      el.hidden = false;
    } catch (e) { el.hidden = true; }
  };

  /* ---------- Üst bardaki takma ad düğmesi ---------- */
  B.kur = function () {
    if (!B.ayarli()) { U.$$("[data-bulut]").forEach((x) => (x.hidden = true)); return; }
    U.$$("[data-bulut]").forEach((x) => (x.hidden = false));
    const grup = U.$(".ses-grup");
    if (grup && !U.$("#kimlikBtn")) {
      const b = document.createElement("button");
      b.className = "ses-btn"; b.id = "kimlikBtn"; b.type = "button"; b.title = "Sıralama için takma adın";
      const yaz = () => { const k = B.kimlik(); b.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg><span class="yazi">${k ? U.kacis(k.ad) : "Takma ad"}</span>`; };
      yaz(); b.addEventListener("click", () => B.kimlikSor()); document.addEventListener("mc:kimlik", yaz);
      grup.insertBefore(b, grup.firstChild);
    }
    const sayac = U.$("#ziyaretSayac");
    if (sayac) setTimeout(() => B.sayacGoster(sayac), 400);
  };

  MC.bulut = B;
})();
