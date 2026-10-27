/* SIRALAMA — her oyun ve yarış türü için ayrı şeref kürsüsü.
   Adres örneği: #siralama-sayi-avi.orta-60 */
"use strict";
(function () {
  const U = MC.ui, B = MC.bulut;
  let el = null, secim = null, kapsam = "", donem = "", istekNo = 0;
  const ONBELLEK = new Map();
  const DONEM = [["", "Tüm zamanlar"], ["30", "Son 30 gün"], ["7", "Son 7 gün"], ["1", "Bugün"]];

  function varsayilan(oyunId) {
    const o = B.oyun(oyunId) || B.OYUNLAR[0];
    return { oyun: o.id, parca: o.boyut.map((b) => (b.s[1] || b.s[0])[0]) };
  }
  const varyant = () => { const o = B.oyun(secim.oyun); return o.boyut.length ? secim.parca.join("-") : o.sabit; };

  function kur(kok) {
    el = kok;
    el.innerHTML = `<div class="bolum-basi"><span class="etiket">Sıralama</span><h2>Şeref kürsüsü</h2>
        <p>Her oyunun ve yarış türünün kendi tablosu var: Kolay modda 60 saniyelik bir tur, Uzman modda 120 saniyelik turla yarışmaz. Her takma ad tabloda en iyi skoruyla bir kez yer alır.</p></div>
      <div id="srIcerik"></div>`;
    secim = varsayilan();
    if (!B.ayarli()) {
      U.$("#srIcerik", el).innerHTML = `<div class="panel"><h3>Sıralama tablosu henüz bağlanmadı</h3>
        <p class="soluk">Bu kopyada çevrim içi tablo kapalı. Öğretmen, kurulum rehberindeki adımları tamamlayınca takma adla yarışılabilecek. Bütün oyunlar bu arada normal çalışır ve rekorlar bu cihazda saklanır.</p></div>`;
      return;
    }
    U.$("#srIcerik", el).innerHTML = `
      <div id="srOyun"></div>
      <div class="panel" style="margin-top:16px">
        <div class="sr-filtre" id="srFiltre"></div>
        <p class="soluk" id="srNot"></p>
        <div id="srKursu" class="kursu" aria-label="İlk üç"></div>
        <div id="srTablo" aria-live="polite"></div>
        <div class="satir" style="justify-content:space-between">
          <span id="srBen" class="soluk"></span>
          <span class="satir"><button class="btn btn-hayalet" id="srYenile">Yenile</button><a class="btn btn-ana" id="srOyna" href="#">Bu tabloda yarış</a></span>
        </div>
      </div>
      <div class="panel" id="srGonderilen" style="margin-top:16px" hidden></div>`;
    U.sekmeler(U.$("#srOyun", el), B.OYUNLAR.map((o) => ({ id: o.id, ad: o.ad })), (id) => { if (!secim || secim.oyun !== id) secim = varsayilan(id); filtreCiz(); yukle(); }, secim.oyun);
    U.$("#srYenile", el).addEventListener("click", () => { ONBELLEK.clear(); yukle(); MC.Ses.efekt("dokun"); });
    document.addEventListener("mc:kimlik", () => { if (el) { benCiz(); yukle(); } });
  }

  function filtreCiz() {
    const o = B.oyun(secim.oyun), f = U.$("#srFiltre", el);
    const k = B.kimlik();
    f.innerHTML = o.boyut.map((b, i) => `<div class="secim-grup"><span>${b.ad}</span><div data-boyut="${i}"></div></div>`).join("") +
      `<div class="secim-grup"><span>Dönem</span><div id="srDonem"></div></div>
       <div class="secim-grup"><span>Sınıf</span><div class="satir"><input class="girdi" id="srSinif" maxlength="16" placeholder="Tüm sınıflar" value="${U.kacis(kapsam)}" style="max-width:190px">
       ${k && k.sinif ? `<button class="btn btn-hayalet" id="srSinifim" type="button">${U.kacis(k.sinif)}</button>` : ""}</div></div>`;
    o.boyut.forEach((b, i) => U.segment(U.$(`[data-boyut="${i}"]`, f), b.s, secim.parca[i], (d) => { secim.parca[i] = d; yukle(); }));
    U.segment(U.$("#srDonem", f), DONEM, donem, (d) => { donem = d; yukle(); });
    const sn = U.$("#srSinif", f);
    const uygula = () => { const yeni = B.sinifTemizle(sn.value); if (yeni !== kapsam) { kapsam = yeni; sn.value = yeni; yukle(); } };
    sn.addEventListener("change", uygula); sn.addEventListener("keydown", (e) => { if (e.key === "Enter") uygula(); });
    const sb = U.$("#srSinifim", f); if (sb) sb.addEventListener("click", () => { sn.value = sb.textContent; uygula(); });
    U.$("#srNot", el).textContent = o.not || "";
    const oyna = U.$("#srOyna", el); oyna.href = o.git;
    benCiz();
  }

  function benCiz() {
    const k = B.kimlik(), b = U.$("#srBen", el); if (!b) return;
    b.innerHTML = k ? `Takma adın: <b style="color:var(--metin)">${U.kacis(k.ad)}</b>${k.sinif ? " · " + U.kacis(k.sinif) : ""} · <a href="#" id="srAd">değiştir</a>`
      : `Henüz takma adın yok. <a href="#" id="srAd">Şimdi seç</a>`;
    U.$("#srAd", b).addEventListener("click", (e) => { e.preventDefault(); B.kimlikSor(); });
    gonderilenCiz();
  }

  function gonderilenCiz() {
    const g = U.depoAl("mc_gonderilen", []), p = U.$("#srGonderilen", el); if (!p) return;
    if (!g.length) { p.hidden = true; return; }
    p.hidden = false;
    p.innerHTML = `<span class="etiket soluk">Bu cihazdan gönderilen son skorlar</span>
      <div class="tablo-kutu"><table class="tablo"><tr><th>Oyun</th><th>Tür</th><th>Takma ad</th><th>Puan</th><th>Durum</th><th>Tarih</th></tr>
      ${g.slice(0, 8).map((x) => `<tr><td>${(B.oyun(x.oyun) || { ad: x.oyun }).ad}</td><td class="soluk">${B.varyantAdi(x.oyun, x.varyant) || "—"}</td><td>${U.kacis(x.ad)}</td><td class="mono"><b>${x.puan}</b></td>
        <td>${x.durum === "onayli" ? '<span class="durum durum-onay">Gönderildi</span>' : '<span class="durum durum-bekle">Onaya gönderildi</span>'}</td><td class="soluk">${x.tarih}</td></tr>`).join("")}</table></div>`;
  }

  async function yukle() {
    if (!el || !secim) return;
    const o = B.oyun(secim.oyun), v = varyant(), no = ++istekNo;
    const anahtar = [o.id, v, kapsam, donem].join("|");
    const tablo = U.$("#srTablo", el), kursu = U.$("#srKursu", el);
    if (location.hash.startsWith("#siralama")) history.replaceState(null, "", `#siralama-${o.id}.${v}`);
    if (navigator.onLine === false) { kursu.innerHTML = ""; tablo.innerHTML = '<p class="soluk">İnternet bağlantısı yok. Sıralama tablosu internet gerektirir; oyunların hepsi internetsiz çalışmaya devam eder.</p>'; return; }
    const ob = ONBELLEK.get(anahtar);
    let satirlar;
    if (ob && Date.now() - ob.t < 30000) satirlar = ob.v;
    else {
      tablo.innerHTML = '<p class="soluk yukleniyor">Tablo yükleniyor…</p>';
      try {
        satirlar = await B.rpc("siralama_getir", { p_oyun: o.id, p_varyant: v, p_sinif: kapsam, p_gun: donem ? +donem : null, p_limit: 50 });
        ONBELLEK.set(anahtar, { t: Date.now(), v: satirlar });
      } catch (e) {
        if (no !== istekNo) return;
        kursu.innerHTML = ""; tablo.innerHTML = `<p class="hata-metin">${B.hataMetni(e)}</p>`; return;
      }
    }
    if (no !== istekNo) return;
    ciz(o, satirlar || []);
  }

  function ciz(o, s) {
    const k = B.kimlik(), benim = (x) => k && x.takma_ad.toLocaleLowerCase("tr-TR") === k.ad.toLocaleLowerCase("tr-TR") && x.sinif === (k.sinif || "");
    const kursu = U.$("#srKursu", el), tablo = U.$("#srTablo", el);
    if (!s.length) {
      kursu.innerHTML = "";
      tablo.innerHTML = `<div class="bos-tablo"><b>Bu tablo henüz boş.</b><p class="soluk">İlk sıraya adını yazdırmak için bir tur oyna ve skorunu gönder.</p></div>`;
      return;
    }
    const ilk = s.slice(0, 3), sira = [ilk[1], ilk[0], ilk[2]];
    kursu.innerHTML = sira.map((x, i) => x ? `<div class="kursu-basamak k${x.sira <= 3 ? x.sira : 3}${benim(x) ? " ben" : ""}">
        <span class="kursu-ad">${U.kacis(x.takma_ad)}</span>${x.sinif ? `<small>${U.kacis(x.sinif)}</small>` : ""}
        <b class="mono">${x.puan}</b><span class="kursu-blok">${x.sira}</span></div>` : `<div class="kursu-basamak bos"></div>`).join("");
    tablo.innerHTML = `<div class="tablo-kutu"><table class="tablo sr-tablo"><tr><th>#</th><th>Takma ad</th><th>Sınıf</th><th>Puan</th>${o.ikincil ? `<th>${o.ikincil}</th>` : ""}<th>Tarih</th></tr>
      ${s.map((x) => `<tr class="${benim(x) ? "ben" : ""}"><td class="mono"><span class="sira-no s${Math.min(x.sira, 4)}">${x.sira}</span></td><td><b>${U.kacis(x.takma_ad)}</b>${benim(x) ? ' <span class="durum durum-onay">sen</span>' : ""}</td>
        <td class="soluk">${U.kacis(x.sinif || "—")}</td><td class="mono"><b>${x.puan}</b></td>${o.ikincil ? `<td class="mono soluk">${x.ikincil ?? "—"}</td>` : ""}
        <td class="soluk">${new Date(x.tarih + "T12:00:00").toLocaleDateString("tr-TR")}</td></tr>`).join("")}</table></div>`;
    if (U.animasyon()) gsap.fromTo(U.$$(".kursu-basamak:not(.bos)", kursu), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .09, ease: "back.out(1.6)", overwrite: true });
  }

  MC.modul("siralama", {
    baslik: "Sıralama",
    kur,
    goster(kok, param) {
      if (!B.ayarli() || !param) { if (B.ayarli()) { gonderilenCiz(); yukle(); } return; }
      const [oyun, v] = param.split(".");
      const o = B.oyun(oyun); if (!o) return;
      secim = varsayilan(oyun);
      if (v && o.boyut.length) { const p = v.split("-"); o.boyut.forEach((b, i) => { if (b.s.some((x) => x[0] === p[i])) secim.parca[i] = p[i]; }); }
      const sek = U.$(`#srOyun [data-id="${oyun}"]`, el);
      U.$$("#srOyun button", el).forEach((b) => b.setAttribute("aria-selected", b === sek));
      filtreCiz(); yukle();
    },
  });
})();
