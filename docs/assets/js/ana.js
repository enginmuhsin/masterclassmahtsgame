/* ANA SAYFA — 3B sayı galaksisi, bugünün sayısı, modül kartları */
"use strict";
(function () {
  const S = MC.sayi, U = MC.ui;
  const GUNUN = [
    [1729n, "Ramanujan'ın taksi sayısı: iki küp toplamı olarak iki farklı yolla yazılabilen en küçük sayı (1³ + 12³ = 9³ + 10³)."],
    [496n, "Üçüncü mükemmel sayı: kendisi hariç bölenlerinin toplamı tam olarak 496."],
    [91n, "Asal sanılan en ünlü yarı asal. Tek, 2'ye, 3'e, 5'e bölünmüyor ama 7 × 13."],
    [153n, "Armstrong sayısı: 1³ + 5³ + 3³ = 153. Aynı zamanda 17. üçgensel sayı."],
    [2047n, "2¹¹ − 1: üssü asal olduğu hâlde asal olmayan ilk Mersenne sayısı."],
    [6174n, "Kaprekar sabiti: rakamları büyükten küçüğe ve küçükten büyüğe dizip çıkarmaya devam et; hep 6174'e ulaşırsın."],
    [142857n, "Döngüsel sayı: 2, 3, 4, 5 ve 6 ile çarpınca aynı rakamlar dönerek gelir."],
    [561n, "İlk Carmichael sayısı: Fermat testini kandıran sahte asal."],
    [65537n, "Bilinen en büyük Fermat asalı: 2¹⁶ + 1."],
    [8128n, "Dördüncü mükemmel sayı: 2⁶ · (2⁷ − 1)."],
    [360n, "Bölen şampiyonu: 24 böleni var. Bir tam turun 360 derece olması rastlantı değil."],
    [1001n, "7 × 11 × 13: üç basamaklı her sayıyı 1001 ile çarpınca sayı kendini tekrarlar (abc · 1001 = abcabc)."],
    [2026n, "Bu yılın sayısı: 2 × 1013. Yani bir yarı asal."],
    [5050n, "Gauss'un çocukken bulduğu toplam: 1 + 2 + … + 100 = 5050."],
  ];
  const MODULLER = [
    ["oyunlar", "OA", "var(--kirmizi)", "Oyun Arenası", "Sayı Avı (tek oyuncu ya da takım), Sayı Izgarası ve ipuçlarıyla Sayı Bilmecesi.", "3 oyun"],
    ["fonksiyon", "fx", "var(--turuncu)", "Fonksiyon Yarışı", "İki fonksiyon engel kırma yarışında. Önce tahmin et, sonra büyüme hızının nedenini grafiklerle gör.", "16 etkinlik"],
    ["dedektor", "SD", "var(--mavi)", "Sayı Dedektörü", "10¹⁹'a kadar her sayı ya da 2⁶¹−1 gibi bir ifade. Çarpan ağacı, 3B bölen küpü, EBOB–EKOK.", "5 sekme"],
    ["sprint", "FS", "var(--altin)", "Formula Sprint", "Kuvvetler, kökler, bölünebilme, özdeşlikler, trigonometri ve logaritmada hız yarışı.", "11 konu"],
    ["laboratuvar", "GL", "var(--turkuaz)", "Görsel Laboratuvar", "Bölen dağları, Ulam spirali, Eratosthenes kalburu, (a+b)³ küpü, Fibonacci ve Collatz.", "7 deney"],
    ["bilgi", "BK", "var(--mor)", "Bilgi Köşesi", "Tanımlar, ispatlar, kavram yanılgıları ve hâlâ çözülmemiş ünlü problemler.", "11 konu"],
  ];
  MC.modul("ana", {
    kur(el) {
      const gun = Math.floor(Date.now() / 864e5), [n, metin] = GUNUN[gun % GUNUN.length];
      el.innerHTML = `
        <div class="hero">
          <div class="hero-metin">
            <span class="etiket">TÜBİTAK 2204-A · Sayılar Teorisi ve Algoritmalar</span>
            <h1>Sayıların <em>DNA'sını</em> çöz.</h1>
            <p>Her sayı, asal sayılardan yazılmış tek bir şifredir. Yandaki galakside 900 sayı dolaşıyor: kırmızılar asal, altınlar yarı asal. Yükselen kuleler en çok böleni olan sayılar.</p>
            <div class="satir">
              <a class="btn btn-ana btn-buyuk" href="#oyunlar" data-git="oyunlar">Sayı Avına Başla</a>
              <a class="btn btn-ikinci btn-buyuk" href="#dedektor-91" data-git="dedektor">91'in röntgenini çek</a>
            </div>
          </div>
          <div class="sahne-kutu galaksi" id="anaGalaksi">
            <span class="ipucu-surukle">Sürükle · döndür · yakınlaştır</span>
            <div class="lejant"><span><i style="background:var(--kirmizi)"></i>Asal</span><span><i style="background:var(--altin)"></i>Yarı asal</span><span><i style="background:var(--turkuaz)"></i>Bileşik · yükseklik = bölen sayısı</span></div>
            <div class="etiket-yuzen" id="anaEtiket" hidden></div>
          </div>
        </div>
        <div class="alt-izgara">
          <div class="gunun">
            <span class="etiket">Bugünün sayısı</span>
            <div class="sayi">${S.tr(n)}</div>
            <p class="soluk">${metin}</p>
            <div class="mono">DNA: ${S.carpimYazi(n)}</div>
            <div><a class="btn btn-ikinci" href="#dedektor-${n}">Röntgenini çek</a></div>
          </div>
          <div class="moduller">
            ${MODULLER.map(([id, k, r, ad, ac, say]) => `
              <a class="modul" href="#${id}" data-git="${id}">
                <span class="simge" style="background:${r};color:#081227">${k}</span>
                <h3>${ad}</h3><p>${ac}</p><span class="sayac">${say}</span>
              </a>`).join("")}
          </div>
        </div>`;
      MC.uc.galaksi(U.$("#anaGalaksi"), { N: 900, etiket: U.$("#anaEtiket") });
    },
  });
})();
