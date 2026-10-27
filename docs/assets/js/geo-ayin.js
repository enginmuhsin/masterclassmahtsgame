/* =====================================================================
   AYIN GEOMETRİ SORUSU — öğretmenin her ay hazırladığı soru.
   Şekil Soru Masası biçimindedir: ölçekli çizilir, öğrenci Soru Masası'nda çözer.
   Yeni soru için assets/js/ayin-sorulari.js listesinin başına ekleme yapılır.
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui, Ses = MC.Ses;
  const kok = /\/geometri\//.test(location.pathname) ? "../" : "";

  function cizim(q) {
    const { icerik, kutu } = MC.geoSoru.statikSvg(q);
    return `<svg class="ayin-svg" viewBox="${kutu.x} ${kutu.y} ${kutu.w} ${kutu.h}" role="img" aria-label="${U.kacis(q.baslik)} şekli">${icerik}</svg>`;
  }
  function kur(el) {
    const liste = MC.ayinSorulari || [];
    if (!liste.length) { el.innerHTML = '<div class="panel"><h2>Ayın sorusu yakında</h2></div>'; return; }
    const q = liste[0], cozulen = U.depoAl("geo_soru_cozulen", {})[q.id];
    el.innerHTML = `
      <div class="bolum-basi"><span class="etiket" style="color:var(--altin)">★ Ayın Geometri Sorusu · ${U.kacis(q.ay)}</span>
        <h2>${U.kacis(q.baslik)}</h2>
        <p>Her ay bir olimpiyat tadında geometri sorusu. Şekli incele, defterinde dene, sonra Soru Masası'nda yardımcı çizgilerle çöz ve cevabını kontrol et.</p></div>
      <div class="ayin-duzen">
        <div class="panel ayin-sahne">
          <div class="ayin-ust"><span class="etiket soluk">Ölçekli çizim</span>
            <div class="segment" id="ayGorunum"></div></div>
          <div class="ayin-tuval" id="ayTuval">${cizim(q)}</div>
          <p class="soluk" style="font-size:13px"><span style="color:var(--altin)">Sarı</span>: verilenler · <span style="color:#ff6fa0">Pembe</span>: istenen · <span style="color:var(--turkuaz)">Çentikler</span>: eşit uzunluklar</p>
        </div>
        <div class="yigin">
          <div class="panel ayin-kart">
            <span class="etiket soluk">Soru</span>
            <p class="sq-soru-metni">${U.kacis(q.metin)}</p>
            <div class="ayin-imza"><span>Hazırlayan</span><b>${U.kacis(q.hazirlayan || "")}</b><small>${U.kacis(q.tarih || "")}</small></div>
            ${cozulen ? `<div class="basari"><b>Bu soruyu çözdün.</b> ${cozulen === 1 ? "İlk denemede!" : `${cozulen}. denemede.`}</div>` : ""}
            <div class="satir"><a class="btn btn-ana btn-buyuk" href="#soru-ayin.${q.id}" id="ayCoz">${cozulen ? "Yeniden çöz" : "Çözmeye başla"}</a></div>
            <p class="soluk" style="font-size:13px">Soru Masası'nda yardımcı çizgi, paralel, dik ve kalem araçları açık; ${q.ipuclari.length} ipucu sırayla açılabilir. Ölçüm araçları cevabı bulunca açılır.</p>
          </div>
          ${q.neden ? `<div class="panel"><span class="etiket soluk">Neden bu soru?</span><p>${U.kacis(q.neden)}</p></div>` : ""}
          ${liste.length > 1 ? `<div class="panel"><span class="etiket soluk">Geçmiş ayların soruları</span><div class="gorev-liste">${liste.slice(1).map((x) => `<a class="gorev" href="#soru-ayin.${x.id}"><b>${U.kacis(x.baslik)}</b><small>${U.kacis(x.ay)}</small></a>`).join("")}</div></div>` : ""}
        </div>
      </div>`;
    U.segment(U.$("#ayGorunum", el), [["cizim", "Ölçekli çizim"], ["el", "El yazısı aslı"]], "cizim", (d) => {
      const t = U.$("#ayTuval", el);
      t.innerHTML = d === "el" && q.elYazisi ? `<img class="ayin-foto" src="${kok + q.elYazisi}" alt="${U.kacis(q.hazirlayan)} tarafından el yazısıyla hazırlanan soru kâğıdı">` : cizim(q);
      U.$(".ayin-ust .etiket", el).textContent = d === "el" ? "Öğretmenin kâğıdı" : "Ölçekli çizim";
    });
    U.$("#ayCoz", el).addEventListener("click", () => Ses.efekt("basla"));
    if (U.animasyon()) gsap.fromTo(U.$$(".ayin-svg line, .ayin-svg circle", el), { opacity: 0 }, { opacity: 1, duration: .5, stagger: .02, overwrite: true });
  }
  MC.modul("ayin", { baslik: "Ayın Geometri Sorusu", kur });
})();
