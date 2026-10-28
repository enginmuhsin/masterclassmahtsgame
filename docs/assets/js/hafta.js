/* =====================================================================
   HAFTANIN SORULARI — sayfa modülleri
   #hafta  : bu haftanın matematik ve geometri sorusu (ipucu, cevap kontrolü, pazar akşamı çözüm)
   #arsiv  : soru bankası (süzme, seçip yazdırma / PDF, .json indirme)
   #nasil  : işleyiş
   Veri: MC.haftaninSorulari (haftanin-sorulari.js). Yayın tarihi gelmemiş soru gösterilmez.
   ===================================================================== */
"use strict";
(function () {
  MC.uc = MC.uc || { AZ_HAREKET: matchMedia("(prefers-reduced-motion: reduce)").matches };
  const U = MC.ui, Ses = MC.Ses, H = MC.soruHesap, V = MC.haftaninSorulari;
  const AY = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const GUN = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const gun = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const tarih = (s, gunAdi) => { const d = gun(s); return `${d.getDate()} ${AY[d.getMonth()]}${gunAdi ? " " + GUN[d.getDay()] : ""}`; };
  const bugun = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const yayinda = () => V.sorular.filter((q) => q.baslangic <= bugun());
  const COZULEN = "hafta_cozulen";
  const zorluk = (z) => { z = z || 1; return `<span title="Zorluk ${z}/3" aria-label="Zorluk ${z}/3">${"★".repeat(z)}<span style="opacity:.28">${"★".repeat(3 - z)}</span></span>`; };
  const normal = (c) => String(c).trim().replace(/\s+/g, "").replace(",", ".").toLowerCase();
  async function ozet(id, c) {
    if (!(window.crypto && crypto.subtle)) return null;
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${id}|${normal(c)}`));
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
  async function dogruMu(q, girilen) {
    if (q.tur === "geometri") return H.dogruMu(girilen, H.cevapOku(q.cevapMetin));
    const o = await ozet(q.id, girilen); if (o === null) return null;
    return o === q.cevapOzet;
  }
  const sekilHtml = (q, sinif = "hs-svg") => (q.svg ? `<svg class="${sinif}" viewBox="${q.svg.kutu.x} ${q.svg.kutu.y} ${q.svg.kutu.w} ${q.svg.kutu.h}" role="img" aria-label="${U.kacis(q.baslik)} şekli">${q.svg.icerik}</svg>` : "");
  const cozumHtml = (q) => `<div class="hs-cozum"><span class="etiket" style="color:var(--turkuaz)">Çözüm · cevap ${U.kacis(q.cevapAcik)}${q.birim === "°" ? "°" : q.birim ? " " + U.kacis(q.birim) : ""}</span><div class="hs-cozum-metin">${q.cozum}</div></div>`;

  /* ===================================================================
     BU HAFTA
     =================================================================== */
  function kart(q) {
    const coz = U.depoAl(COZULEN, {})[q.id], acik = !!q.cozum;
    const kalan = Math.ceil((gun(q.cozumTarihi) - gun(bugun())) / 864e5);
    return `<article class="panel hs-kart ${q.tur}" id="k-${q.id}" style="--renk:${q.tur === "matematik" ? "var(--altin)" : "var(--turkuaz)"}">
      <div class="hs-ust"><span class="etiket" style="color:var(--renk)">${q.tur === "matematik" ? "Matematik sorusu" : "Geometri sorusu"}</span>
        <button class="btn btn-hayalet hs-tahta" data-tahta="${q.id}" title="Soruyu tam ekranda aç">⛶ Tahtaya aç</button></div>
      <h2>${U.kacis(q.baslik)}</h2>
      <div class="cipler"><span class="cip">${U.kacis(q.seviye || "")}</span>${(q.konu || []).map((k) => `<span class="cip">${U.kacis(k)}</span>`).join("")}<span class="cip">${zorluk(q.zorluk)}</span></div>
      ${sekilHtml(q)}
      <p class="hs-metin">${q.metin}</p>
      <div class="hs-ipuclari" data-ipucu="${q.id}"></div>
      ${coz ? `<div class="basari"><b>Bu soruyu çözdün.</b> ${coz === 1 ? "İlk denemede!" : coz + ". denemede."}</div>` : ""}
      <form class="hs-cevap" data-cevap="${q.id}"><label class="alan"><span>Cevabın${q.birim === "°" ? " (derece)" : ""}</span><input class="girdi mono" name="c" maxlength="24" autocomplete="off" placeholder="${q.tur === "geometri" ? "30 · 2√3 · 3/2" : "Sayı yaz"}"></label><button class="btn btn-ana">Kontrol et</button></form>
      <p class="hs-sonuc" aria-live="polite"></p>
      <div class="satir">${q.ipuclari.length ? `<button class="btn btn-ikinci" data-ipucu-ac="${q.id}">İpucu aç (0/${q.ipuclari.length})</button>` : ""}
        ${q.tur === "geometri" ? `<a class="btn btn-ikinci" href="../geometri/#soru-hafta.${q.id}">Soru Masası'nda çiz ve çöz →</a>` : ""}</div>
      ${acik ? cozumHtml(q) : `<p class="hs-bekle">Çözüm <b>${tarih(q.cozumTarihi, true)} akşamı</b> burada yayımlanacak${kalan > 0 ? ` · ${kalan} gün kaldı` : ""}.</p>`}
      ${q.elYazisi ? `<details><summary>Öğretmenin el yazısı aslı</summary><img class="hs-foto" src="../${q.elYazisi}" alt="El yazısıyla hazırlanmış soru kâğıdı"></details>` : ""}
    </article>`;
  }
  function haftaCiz(el) {
    const l = yayinda();
    const son = (t) => l.find((q) => q.tur === t);
    const mat = son("matematik"), geo = son("geometri"), bu = [mat, geo].filter(Boolean);
    const bas = bu.length ? bu.map((q) => q.baslangic).sort().pop() : null;
    const gecen = l.filter((q) => !bu.includes(q) && q.cozum).slice(0, 2);
    el.innerHTML = `<div class="bolum-basi"><span class="etiket">Haftanın Soruları${bas ? " · " + tarih(bas) + " haftası" : ""}</span>
        <h2>Bir matematik, bir geometri: haftalık olimpiyat antrenmanı</h2>
        <p>Her pazartesi iki yeni soru, her pazar akşamı tam çözüm. Cevabını hemen kontrol edebilirsin; ipuçları sırayla açılır.</p></div>
      <div class="hs-izgara">${bu.map(kart).join("") || '<div class="panel"><p>Bu hafta için soru yayımlanmadı.</p></div>'}</div>
      ${gecen.length ? `<section class="hs-gecen"><h3>Son yayımlanan çözümler</h3><div class="hs-izgara">${gecen.map((q) => `<article class="panel"><span class="etiket soluk">${q.tur === "matematik" ? "Matematik" : "Geometri"} · ${tarih(q.baslangic)}</span><h3>${U.kacis(q.baslik)}</h3>${sekilHtml(q, "hs-svg kucuk")}<p class="hs-metin">${q.metin}</p>${cozumHtml(q)}</article>`).join("")}</div></section>` : ""}
      <p class="e-not" style="margin-top:18px">Önceki bütün sorular <a href="#arsiv">Soru Bankası</a>'nda.</p>`;
    U.tex(el);
    U.$$("[data-ipucu-ac]", el).forEach((b) => b.addEventListener("click", () => {
      const q = V.sorular.find((x) => x.id === b.dataset.ipucuAc), kutu = U.$(`[data-ipucu="${q.id}"]`, el), n = kutu.children.length;
      if (n >= q.ipuclari.length) return;
      kutu.insertAdjacentHTML("beforeend", `<div class="ipucu-kart">İpucu ${n + 1}: ${q.ipuclari[n]}</div>`); U.tex(kutu);
      b.textContent = n + 1 < q.ipuclari.length ? `İpucu aç (${n + 1}/${q.ipuclari.length})` : "Bütün ipuçları açık"; Ses.efekt("dokun");
    }));
    U.$$("[data-cevap]", el).forEach((f) => f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const q = V.sorular.find((x) => x.id === f.dataset.cevap), g = f.c.value.trim(), sonuc = f.nextElementSibling;
      if (!g) return;
      const k = `hafta_deneme_${q.id}`, deneme = (U.depoAl(k, 0) || 0) + 1; U.depoYaz(k, deneme);
      const d = await dogruMu(q, g);
      if (d === null) { sonuc.textContent = "Bu tarayıcı cevap kontrolünü desteklemiyor."; return; }
      if (d) {
        sonuc.innerHTML = `<b style="color:var(--turkuaz)">Doğru!</b> ${deneme === 1 ? "İlk denemede buldun." : deneme + ". denemede buldun."} Çözümünü defterine yaz; pazar akşamı kendi yolunu bizimkiyle karşılaştır.`;
        const c = U.depoAl(COZULEN, {}); if (!c[q.id]) { c[q.id] = deneme; U.depoYaz(COZULEN, c); }
        Ses.efekt("seri"); f.closest(".hs-kart").classList.add("cozuldu");
      } else { sonuc.innerHTML = `<b style="color:var(--kirmizi)">Henüz değil.</b> ${q.ipuclari.length ? "Bir ipucu açmayı dene." : "Bir kez daha dene."}`; Ses.efekt("yanlis"); f.c.select(); }
    }));
    U.$$("[data-tahta]", el).forEach((b) => b.addEventListener("click", () => {
      const k = U.$("#k-" + b.dataset.tahta, el);
      if (document.fullscreenElement) document.exitFullscreen(); else if (k.requestFullscreen) k.requestFullscreen().catch(() => U.bildir("Tarayıcı tam ekranı açmadı."));
    }));
    if (U.animasyon()) gsap.fromTo(U.$$(".hs-kart", el), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .08, overwrite: true });
  }
  MC.modul("hafta", { baslik: "Bu Haftanın Soruları", kur() {}, goster: (el) => haftaCiz(el) });

  /* ===================================================================
     SORU BANKASI
     =================================================================== */
  MC.modul("arsiv", {
    baslik: "Soru Bankası",
    kur(el) {
      let tur = "hepsi", konu = "hepsi", sadeceCozumlu = false;
      const secili = new Set();
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Soru Bankası</span><h2>Bütün haftaların soruları</h2>
          <p>Çözümü yayımlanmış sorular burada birikir. Derste kullanmak için soruları seç, tek tuşla yazdır ya da PDF olarak kaydet.</p></div>
        <div class="panel hs-suzgec"><div class="segment" id="arTur"></div><div class="segment" id="arKonu"></div>
          <div class="satir"><label class="satir"><input type="checkbox" id="arCoz"> Yalnızca çözümü yayımlanmış</label>
          <button class="btn btn-ikinci" id="arYaz">Seçilenleri yazdır / PDF</button><button class="btn btn-hayalet" id="arCozYaz">Çözümleriyle yazdır</button><button class="btn btn-hayalet" id="arIndir">Bankayı indir (.json)</button></div>
          <p class="e-not" id="arDurum"></p></div>
        <div class="hs-liste" id="arListe"></div>`;
      const konular = [...new Set(yayinda().flatMap((q) => q.konu || []))].sort((a, b) => a.localeCompare(b, "tr"));
      U.segment(U.$("#arTur", el), [["hepsi", "Hepsi"], ["matematik", "Matematik"], ["geometri", "Geometri"]], "hepsi", (v) => { tur = v; ciz(); });
      U.segment(U.$("#arKonu", el), [["hepsi", "Bütün konular"], ...konular.map((k) => [k, k])], "hepsi", (v) => { konu = v; ciz(); });
      U.$("#arCoz", el).onchange = (e) => { sadeceCozumlu = e.target.checked; ciz(); };
      function ciz() {
        const l = yayinda().filter((q) => (tur === "hepsi" || q.tur === tur) && (konu === "hepsi" || (q.konu || []).includes(konu)) && (!sadeceCozumlu || q.cozum));
        U.$("#arListe", el).innerHTML = l.map((q) => `<article class="panel hs-arsiv ${secili.has(q.id) ? "secili" : ""}" data-id="${q.id}">
            <label class="hs-sec"><input type="checkbox" data-sec="${q.id}" ${secili.has(q.id) ? "checked" : ""}> Seç</label>
            <span class="etiket soluk">${q.tur === "matematik" ? "Matematik" : "Geometri"} · ${U.kacis(q.etiket || tarih(q.baslangic) + " haftası")} · ${zorluk(q.zorluk)}</span>
            <h3>${U.kacis(q.baslik)}</h3><div class="cipler">${(q.konu || []).map((k) => `<span class="cip">${U.kacis(k)}</span>`).join("")}<span class="cip">${U.kacis(q.seviye || "")}</span></div>
            ${sekilHtml(q, "hs-svg kucuk")}<p class="hs-metin">${q.metin}</p>
            ${q.cozum ? `<details class="hs-ac"><summary>Çözümü göster</summary>${cozumHtml(q)}</details>` : `<p class="hs-bekle">Çözüm ${tarih(q.cozumTarihi, true)} akşamı yayımlanacak.</p>`}
          </article>`).join("") || '<div class="panel"><p>Bu süzgece uyan soru yok.</p></div>';
        U.$("#arDurum", el).textContent = `${l.length} soru · ${secili.size} seçili${secili.size ? "" : " (seçim yoksa listedekilerin hepsi yazdırılır)"}`;
        U.tex(U.$("#arListe", el));
      }
      U.$("#arListe", el).addEventListener("change", (e) => { const c = e.target.closest("[data-sec]"); if (!c) return; c.checked ? secili.add(c.dataset.sec) : secili.delete(c.dataset.sec); ciz(); });
      const yazdir = (cozumlu) => {
        document.body.classList.toggle("yazdir-cozumlu", cozumlu);
        if (secili.size) document.body.classList.add("yazdir-secili"); else document.body.classList.remove("yazdir-secili");
        if (cozumlu) U.$$("#arListe details", el).forEach((d) => (d.open = true));
        setTimeout(() => window.print(), 50);
      };
      U.$("#arYaz", el).onclick = () => yazdir(false); U.$("#arCozYaz", el).onclick = () => yazdir(true);
      window.addEventListener("afterprint", () => document.body.classList.remove("yazdir-cozumlu", "yazdir-secili"));
      U.$("#arIndir", el).onclick = () => {
        const veri = yayinda().filter((q) => q.cozum).map(({ svg, sekil, cevapOzet, ...q }) => q);
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify({ tur: "master-class-soru-bankasi", tarih: bugun(), sorular: veri }, null, 1)], { type: "application/json" })); a.download = "haftanin-sorulari-bankasi.json"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      };
      ciz();
    },
  });

  /* ===================================================================
     NASIL İŞLER
     =================================================================== */
  MC.modul("nasil", {
    baslik: "Nasıl İşler?",
    kur(el) {
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Nasıl İşler?</span><h2>Haftalık ritim</h2></div>
        <div class="hs-izgara">
          <section class="panel"><span class="etiket soluk">Öğrenci için</span><ol class="hs-liste-sade">
            <li><b>Pazartesi</b> iki yeni soru yayımlanır: biri matematik (sayılar, cebir, kombinatorik), biri geometri.</li>
            <li>Soruyu defterinde çöz. Takılırsan ipuçlarını <b>sırayla</b> aç; her ipucu bir adım ileri götürür.</li>
            <li>Cevabını kutuya yaz, hemen kontrol et. Geometri sorusunu Soru Masası'nda yardımcı çizgilerle çizebilirsin.</li>
            <li><b>Pazar akşamı</b> tam çözüm yayımlanır. Kendi yolunu çözümle karşılaştır: farklı ama doğru bir yol bulduysan öğretmenine göster!</li></ol></section>
          <section class="panel"><span class="etiket soluk">Öğretmen için</span><ol class="hs-liste-sade">
            <li>Sorular TÜBİTAK Bilim Olimpiyatları birinci aşama sorularının tarzında ve zorluğunda <b>özgün</b> olarak hazırlanır.</li>
            <li>Her sorunun cevabı yayımlanmadan önce bilgisayarla doğrulanır.</li>
            <li><b>Soru Bankası</b>'nda soruları konuya göre süz, seç ve çalışma kâğıdı olarak yazdır.</li>
            <li>Derste <b>Tahtaya aç</b> ile soruyu akıllı tahtada tam ekran göster.</li></ol></section>
        </div>`;
    },
  });
})();
