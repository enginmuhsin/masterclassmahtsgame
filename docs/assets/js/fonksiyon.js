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
    },
  });
})();
