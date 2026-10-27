/* FONKSİYON YARIŞI — ayrı sayfada çalışan oyunu sitenin içine yerleştirir.
   Menü ve müzik sitede kalır; oyun kendi çerçevesinde çalışır. */
"use strict";
(function () {
  const U = MC.ui;
  MC.modul("fonksiyon", {
    baslik: "Fonksiyon Yarışı",
    kur(el) {
      el.innerHTML = `
        <div class="bolum-basi">
          <span class="etiket">Fonksiyon Yarışı</span>
          <div class="satir" style="justify-content:space-between;align-items:flex-end">
            <h2>Hangi fonksiyon daha hızlı büyür?</h2>
            <a class="btn btn-hayalet" href="fonksiyon-yarisi.html" target="_blank" rel="noopener">Tek başına aç</a>
          </div>
          <p>İki top, canı giderek artan engellere çarpar. Her vuruş engelin canından f(n) kadar götürür. İlkokuldan liseye 16 hazır etkinlik var; kendi fonksiyonlarını da yazabilirsin. Ekran kaydı için oyunun içindeki “Sahne modu”nu kullan.</p>
        </div>
        <iframe class="fy-cerceve" id="fyCerceve" title="Fonksiyon Yarışı" src="fonksiyon-yarisi.html?gomulu=1" loading="lazy"></iframe>`;
      const cer = U.$("#fyCerceve", el);
      cer.addEventListener("load", () => { try { cer.contentWindow.postMessage({ mc: "ses", acik: MC.Ses.efektAcik }, "*"); } catch (e) {} });
      /* Sıralama: her etkinlikte ilk tahmin (oyun sayfası fy_tahminler anahtarına yazar) */
      const bar = document.createElement("div"); bar.id = "fySiralama"; bar.style.marginTop = "16px"; el.appendChild(bar);
      let toplamEtkinlik = 15;
      const guncelle = () => {
        if (!MC.bulut || !MC.bulut.ayarli()) return;
        const k = U.depoAl("fy_tahminler", {}), denenen = Object.keys(k).length, dogru = Object.values(k).filter(Boolean).length;
        if (!denenen) { bar.innerHTML = `<div class="sr-gonder"><span class="etiket">Sıralama · Fonksiyon Yarışı</span><p class="soluk">Hazır etkinliklerde “Önce tahmin et” düğmesiyle yarışı başlat. Her etkinlikte yalnızca <b>ilk</b> tahminin sayılır; ilk tahminde doğru bildiklerin tabloya girer.</p></div>`; return; }
        MC.bulut.gonderKutusu(bar, { oyun: "fonksiyon-yarisi", varyant: "tahmin", puan: dogru, ikincil: denenen - dogru, ayrinti: { denenen, toplam: toplamEtkinlik } });
        const p = U.$(".sr-gonder-metin > p", bar);
        if (p && p.querySelector("b.mono")) p.insertAdjacentHTML("afterbegin", `İlk tahminde doğru: <b>${dogru} / ${toplamEtkinlik}</b> (denenen ${denenen}). `);
      };
      window.addEventListener("message", (e) => { if (e.data && e.data.mc === "fy-tahmin") { if (e.data.toplam) toplamEtkinlik = e.data.toplam; guncelle(); } });
      guncelle();
    },
  });
})();
