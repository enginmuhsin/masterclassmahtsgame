/* =====================================================================
   BİLGİ KÖŞESİ — tanımlar, teoremler, ispatlar, yanılgılar, açık problemler (KaTeX ile)
   ===================================================================== */
"use strict";
(function () {
  const U = MC.ui;
  const B = (m) => `<div class="benzetme"><b>Benzetme:</b> ${m}</div>`;
  const K = (m) => `<div class="bilgi-kutu">${m}</div>`;
  const KONU = [
    { id: "asal", ad: "Asal ve Yarı Asal", h: String.raw`
      <h3>Asal sayılar</h3>${K("1'den büyük olup yalnızca 1'e ve kendisine bölünebilen doğal sayılara <b>asal sayı</b> denir: 2, 3, 5, 7, 11, 13 …")}
      $$p \text{ asal} \iff p > 1 \;\text{ve}\; d \mid p \Rightarrow d \in \{1, p\}$$
      <p><b>Aritmetiğin Temel Teoremi:</b> 1'den büyük her doğal sayı, asalların çarpımı olarak sıralama dışında <b>tek</b> biçimde yazılır.</p>
      $$n = p_1^{e_1}\, p_2^{e_2} \cdots p_k^{e_k}$$
      ${B("Asallar sayıların <b>kimyasal elementleri</b>dir. Su her zaman H₂O'dur; 360 da her zaman 2³·3²·5'tir.")}
      <h3>Asallar sonsuzdur (Öklid)</h3>
      <p>Sonlu sayıda asal olduğunu varsayalım: $p_1, p_2, \dots, p_k$. $N = p_1 p_2 \cdots p_k + 1$ sayısı hiçbir $p_i$'ye bölünmez, çünkü kalan hep 1'dir. O hâlde $N$'nin listede olmayan bir asal böleni vardır. Bu bir çelişkidir. ∎</p>
      <h3>Yarı asallar ve 91 yanılgısı</h3>${K("Tam olarak iki asal sayının (eşit olabilir) çarpımı olan sayılara <b>yarı asal</b> denir: 4, 6, 9, 15, 49, 91 …")}
      $$91 = 7 \times 13 \qquad 51 = 3 \times 17 \qquad 119 = 7 \times 17$$
      <p>91 tektir; 2'ye, 3'e, 5'e bölünmez ve çarpım tablosunda görünmez. Bu yüzden asal sanılır. Oysa $\sqrt{91} \approx 9{,}5$ olduğundan 7'ye kadar denemek yeter ve 7 sayıyı böler.</p>
      ${B("Yarı asallar <b>maskeli asallardır</b>. Uzaktan asal gibi görünürler; maskeyi indiren şey 7 gibi küçük bir böleni denemektir.")}
      <p>Yarı asallar <b>RSA şifrelemesinin</b> temelidir. İki büyük asalı çarpmak kolaydır, ama çarpımdan asalları geri bulmak çok zordur. İnternetteki güvenli bağlantılar bu zorluğa dayanır.</p>
      <h3>√n teoremi</h3>
      $$n>1 \text{ bileşik} \;\Longrightarrow\; \exists\, p \text{ asal},\; p \mid n,\; p \le \sqrt{n}$$
      <p><b>İspat:</b> $n = a\cdot b$ ve $1 < a \le b$ ise $a^2 \le a\,b = n$, yani $a \le \sqrt n$. $a$'nın her asal böleni $p \le \sqrt n$'dir ve $p \mid n$. ∎</p>` },
    { id: "yanilgi", ad: "Kavram Yanılgıları", h: String.raw`
      <h3>Sık karşılaşılan kavram yanılgıları</h3>
      <div class="tablo-kutu"><table class="tablo"><tr><th>Yanılgı</th><th>Doğrusu</th><th>Neden?</th></tr>
        <tr><td>“1 asal sayıdır.”</td><td>1 asal değildir.</td><td>Asal olsaydı çarpanlara ayırma tek olmazdı: 6 = 2·3 = 1·2·3 = 1·1·2·3 …</td></tr>
        <tr><td>“Bütün asallar tektir.”</td><td>2 asaldır ve çifttir.</td><td>2 tek çift asaldır; diğer çift sayılar 2'ye bölünür.</td></tr>
        <tr><td>“91, 51, 57 asaldır.”</td><td>91 = 7·13, 51 = 3·17, 57 = 3·19</td><td>Tek ve “yabancı” görünmeleri yanıltır; √n'ye kadar denemek gerekir.</td></tr>
        <tr><td>“Tek sayılar asaldır.”</td><td>9, 15, 21, 25 … tek ama bileşiktir.</td><td>Teklik yalnızca 2'ye bölünmemeyi garanti eder.</td></tr>
        <tr><td>“0 çift sayı değildir.”</td><td>0 çifttir.</td><td>0 = 2·0, yani 2'ye kalansız bölünür.</td></tr>
        <tr><td>“Asal sayılar bir yerde biter.”</td><td>Asallar sonsuzdur.</td><td>Öklid'in ispatı (Asal ve Yarı Asal bölümü).</td></tr>
        <tr><td>“Büyük sayının daha çok böleni olur.”</td><td>97'nin 2, 96'nın 12 böleni var.</td><td>Bölen sayısı büyüklüğe değil, asal çarpan yapısına bağlıdır.</td></tr>
        <tr><td>“(a + b)² = a² + b²”</td><td>(a + b)² = a² + 2ab + b²</td><td>Görsel Laboratuvar'daki karede iki ab dikdörtgeni unutulmuştur.</td></tr>
        <tr><td>“2ⁿ − 1 her zaman asaldır.”</td><td>2¹¹ − 1 = 2047 = 23·89</td><td>n asal olsa bile 2ⁿ − 1 bileşik olabilir.</td></tr>
        <tr><td>“Üstel fonksiyon her zaman polinomdan büyüktür.”</td><td>n = 2–15 için n⁴ > 2ⁿ</td><td>Üstel fonksiyon ancak bir noktadan sonra geçer (n = 16). Fonksiyon Yarışı'nda görebilirsin.</td></tr>
      </table></div>
      ${B("Yanılgılar, haritada yanlış çizilmiş yollar gibidir: kişi kaybolana kadar fark etmez. Bu yüzden oyunlarda tuzak sayılar bilerek karşınıza çıkarılır.")}` },
    { id: "mersenne", ad: "Mersenne Sayıları", h: String.raw`
      <h3>Mersenne sayıları</h3>$$M_p = 2^p - 1$$
      <p>$p$ bileşikse $M_p$ de bileşiktir. Tersi doğru değildir:</p>$$M_{11} = 2^{11} - 1 = 2047 = 23 \times 89$$
      <p>Asal olan Mersenne sayılarına <b>Mersenne asalı</b> denir: 3, 7, 31, 127, 8191 … Bilinen en büyük asal sayıların çoğu, dünyanın dört bir yanındaki gönüllü bilgisayarların ortak çalıştığı <b>GIMPS</b> (Great Internet Mersenne Prime Search) projesiyle bulunmuştur. Bu asallar Lucas–Lehmer testiyle doğrulanır:</p>
      $$s_0 = 4,\quad s_{i+1} = s_i^2 - 2 \pmod{M_p};\qquad M_p \text{ asal} \iff s_{p-2} \equiv 0$$
      ${B("GIMPS, dünyadaki bilgisayarların aynı yapbozun farklı parçalarını çözdüğü bir <b>imece</b>dir.")}` },
    { id: "fermat", ad: "Fermat Sayıları", h: String.raw`
      <h3>Fermat sayıları</h3>$$F_k = 2^{2^k} + 1$$
      <p>$F_0 = 3$, $F_1 = 5$, $F_2 = 17$, $F_3 = 257$, $F_4 = 65537$ asaldır. Fermat hepsinin asal olduğunu tahmin etti. Euler 1732'de bu tahmini çürüttü:</p>
      $$F_5 = 2^{32} + 1 = 4\,294\,967\,297 = 641 \times 6\,700\,417$$
      <p>Gauss'a göre düzgün n-gen cetvel ve pergelle ancak n, 2'nin bir kuvveti ile farklı Fermat asallarının çarpımıysa çizilebilir. Gauss 19 yaşında düzgün 17-genin çizilebildiğini gösterdi.</p>
      ${B("Fermat'nın tahmini, ilk beş kuğuyu beyaz görüp “bütün kuğular beyazdır” demek gibidir. Altıncı sayı siyah kuğu çıktı.")}` },
    { id: "mukemmel", ad: "Mükemmel Sayılar", h: String.raw`
      <h3>Mükemmel sayılar</h3>$$\sigma(n) = 2n \qquad 6 = 1+2+3 \qquad 28 = 1+2+4+7+14$$
      <p><b>Öklid–Euler Teoremi:</b> $2^p - 1$ asal ise aşağıdaki sayı mükemmeldir ve her çift mükemmel sayı bu biçimdedir:</p>
      $$N = 2^{p-1}\,(2^p - 1) \qquad (6,\ 28,\ 496,\ 8128,\ \dots)$$
      <p>Böylece her Mersenne asalı bir mükemmel sayı doğurur. Tek mükemmel sayı olup olmadığı hâlâ bilinmiyor.</p>
      ${B("Mükemmel sayı, parçalarının toplamı bütüne <b>tam</b> eşit olan bir yapbozdur: ne parça artar ne eksik kalır.")}` },
    { id: "ramanujan", ad: "Ramanujan Sayıları", h: String.raw`
      <h3>Ramanujan (taksi) sayıları</h3>$$1729 = 1^3 + 12^3 = 9^3 + 10^3$$
      <p>Hardy, hastanedeki Ramanujan'ı ziyarete giderken bindiği taksinin numarasının (1729) sıkıcı olduğunu söyler. Ramanujan hemen itiraz eder: 1729, iki küpün toplamı olarak <b>iki farklı yolla</b> yazılabilen en küçük sayıdır.</p>
      $$4104 = 2^3 + 16^3 = 9^3 + 15^3 \qquad 13832 = 2^3 + 24^3 = 18^3 + 20^3$$` },
    { id: "fib", ad: "Fibonacci ve Üçgensel", h: String.raw`
      <h3>Fibonacci sayıları</h3>$$F_{n+1} = F_n + F_{n-1} \qquad F_n = \frac{\varphi^n - \psi^n}{\sqrt 5},\quad \varphi = \frac{1+\sqrt5}{2}$$
      <p><b>Hızlı test (Gessel, 1972):</b> $n$ Fibonacci sayısıdır ancak ve ancak $5n^2 + 4$ veya $5n^2 - 4$ tam karedir.</p>
      <h3>Üçgensel sayılar</h3>$$T_k = 1 + 2 + \dots + k = \frac{k(k+1)}{2} \qquad 8T_k + 1 = (2k+1)^2$$
      <p>Gauss'un okul anekdotu: 1'den 100'e kadar toplam, 50 tane (1 + 100) çiftinden oluşur, yani $T_{100} = 5050$.</p>
      ${B("Üçgensel sayılar <b>bowling labutları</b>dır: 1, 3, 6, 10 … Her yeni sıra bir fazla labut ekler.")}` },
    { id: "diger", ad: "Diğer Türler", h: String.raw`
      <h3>2'nin kuvvetleri</h3>$$n = 2^k \iff n \,\&\, (n-1) = 0$$
      ${B("2'nin kuvveti, <b>tek bir lambası yanan</b> bir evdir. n − 1, o lambayı söndürüp alttakilerin hepsini yakar.")}
      <h3>Armstrong (narsisistik) sayılar</h3>$$153 = 1^3 + 5^3 + 3^3 \qquad 9474 = 9^4 + 4^4 + 7^4 + 4^4$$<p>10 tabanında yalnızca 88 Armstrong sayısı vardır.</p>
      <h3>Harshad (Niven) sayılar</h3><p>Rakamları toplamına bölünen sayılar: $18 \to 1 + 8 = 9,\; 18 \div 9 = 2$. Adı Sanskritçede “büyük sevinç” anlamına gelir; D. R. Kaprekar koymuştur.</p>
      <h3>Carmichael sayıları</h3>$$561 = 3 \cdot 11 \cdot 17$$<p>Fermat testini her taban için geçen ama asal olmayan “sahtekâr” sayılardır. Bu yüzden uygulamada Miller–Rabin testi kullanılır.</p>
      <h3>Palindromik, tam kare, tam küp</h3>$$12321 \;(\text{tersi aynı}) \qquad 144 = 12^2 \qquad 343 = 7^3$$` },
    { id: "bolen", ad: "Bölen Fonksiyonları", h: String.raw`
      <h3>Bölen sayısı, bölen toplamı, Euler fonksiyonu</h3>
      $$\tau(n) = \prod (e_i + 1), \qquad \sigma(n) = \prod \frac{p_i^{e_i+1} - 1}{p_i - 1}, \qquad \varphi(n) = n \prod \left(1 - \frac{1}{p_i}\right)$$
      $$360 = 2^3 \cdot 3^2 \cdot 5 \;\Rightarrow\; \tau(360) = 4 \cdot 3 \cdot 2 = 24$$
      ${B("Bir bölen kurmak tarif seçmektir: 2'den 0–3, 3'ten 0–2, 5'ten 0–1 tane. 4·3·2 = 24 tarif. Sayı Dedektörü'ndeki 3B Bölen Küpü bu tarifleri nokta olarak gösterir.")}` },
    { id: "buyume", ad: "Fonksiyonların Büyümesi", h: String.raw`
      <h3>Büyüme sıralaması</h3>
      <p>Yeterince büyük $n$ için şu sıralama geçerlidir. Her fonksiyon, sağındakine er geç yetişilemeyecek biçimde geride kalır:</p>
      $$\log n \;\ll\; \sqrt n \;\ll\; n \;\ll\; n^2 \;\ll\; n^4 \;\ll\; 2^n \;\ll\; 3^n \;\ll\; n! \;\ll\; n^n$$
      <p><b>Oran testi:</b> $f(n+1)/f(n)$ oranına bakılır. Polinomlarda bu oran 1'e yaklaşır, $2^n$'de hep 2'dir, $n!$'de ise $n+1$ olup sınırsız büyür.</p>
      $$\frac{(n+1)^4}{n^4} \to 1, \qquad \frac{2^{n+1}}{2^n} = 2, \qquad \frac{(n+1)!}{n!} = n+1$$
      <p><b>Stirling yaklaşımı:</b> $n! \approx \sqrt{2\pi n}\,(n/e)^n$. Buna göre $n^n$ faktöriyelden kabaca $e^n$ kat hızlı büyür.</p>
      ${B("Merdiven: $(n+2)!$ her basamakta çarpanı küçülen bir merdivenden inen biri gibidir; $n^n$ hep en üst basamakta durur. Fonksiyon Yarışı'nda bu yarışı izleyebilirsin.")}` },
    { id: "acik", ad: "Çözülmemiş Problemler", h: String.raw`
      <h3>Hâlâ çözülmemiş problemler</h3>
      <div class="tablo-kutu"><table class="tablo"><tr><th>Problem</th><th>Soru</th><th>Durum</th></tr>
        <tr><td><b>Goldbach Sanısı</b> (1742)</td><td>2'den büyük her çift sayı iki asalın toplamı mıdır?</td><td>4·10¹⁸'e kadar bilgisayarla doğrulandı; ispat yok.</td></tr>
        <tr><td><b>İkiz Asal Sanısı</b></td><td>p ve p + 2'nin ikisinin de asal olduğu sonsuz sayıda çift var mı?</td><td>2013'te Yitang Zhang aradaki farkın sınırlı kaldığı sonsuz çift olduğunu ispatladı; sınır 246'ya indirildi.</td></tr>
        <tr><td><b>Collatz Sanısı</b></td><td>3n + 1 süreci her sayıda 1'e ulaşır mı?</td><td>2⁶⁸'e kadar doğrulandı; ispat yok.</td></tr>
        <tr><td><b>Tek Mükemmel Sayı</b></td><td>Tek bir mükemmel sayı var mı?</td><td>Bilinmiyor; varsa çok büyük olmalı.</td></tr>
        <tr><td><b>Mersenne Asalları</b></td><td>Sonsuz sayıda Mersenne asalı var mı?</td><td>Bilinmiyor; GIMPS aramaya devam ediyor.</td></tr>
        <tr><td><b>Riemann Hipotezi</b></td><td>ζ(s)'nin önemsiz olmayan sıfırları Re(s) = ½ doğrusunda mı?</td><td>Asalların dağılımıyla ilgili en önemli açık problem; Clay Enstitüsü 1 milyon dolar ödül koydu.</td></tr>
      </table></div>
      ${B("Bu problemler haritanın hâlâ beyaz kalan bölgeleridir. Bazıları ilkokul öğrencisinin anlayacağı kadar basit sorulur, ama en büyük matematikçiler yüzyıllardır çözemedi.")}` },
    { id: "algoritma", ad: "Algoritmalar", h: String.raw`
      <h3>Bu sitede kullanılan algoritmalar</h3>
      <div class="tablo-kutu"><table class="tablo"><tr><th>İşlem</th><th>Yöntem</th><th>Karmaşıklık</th></tr>
        <tr><td>Asallık (n ≤ 10¹²)</td><td>6k ± 1 deneme bölmesi, √n'de durma</td><td>O(√n)</td></tr>
        <tr><td>Asallık (n > 10¹²)</td><td>Deterministik Miller–Rabin, 12 taban</td><td>O(log³ n)</td></tr>
        <tr><td>Çarpanlara ayırma</td><td>Küçük asallarla deneme + Pollard–Brent rho</td><td>yaklaşık O(n¹ᐟ⁴)</td></tr>
        <tr><td>Bölenler</td><td>Asal çarpanlardan tüm bileşimleri üretme</td><td>O(τ(n))</td></tr>
        <tr><td>Ramanujan testi</td><td>İki işaretçi: a artar, b azalır</td><td>O(∛n)</td></tr>
        <tr><td>Fibonacci testi</td><td>5n² ± 4 tam kare mi?</td><td>O(log n)</td></tr>
        <tr><td>2'nin kuvveti</td><td>n & (n − 1) = 0</td><td>O(1)</td></tr>
        <tr><td>Asal listesi</td><td>Eratosthenes kalburu</td><td>O(N log log N)</td></tr>
        <tr><td>EBOB</td><td>Öklid algoritması</td><td>O(log min(a, b))</td></tr>
      </table></div>
      <h3>Miller–Rabin testi</h3>
      <p>$n - 1 = 2^s \cdot d$ yazılır ($d$ tek). Asal $n$ için her $a$ tabanında ya $a^d \equiv 1$ olur ya da $a^{2^r d} \equiv -1 \pmod n$ olacak bir $r$ bulunur. Bu koşulu sağlamayan bir taban, sayının bileşik olduğunun kesin kanıtıdır. İlk 12 asal taban, $3{,}3 \cdot 10^{24}$'e kadar her sayı için kesin sonuç verir.</p>
      <h3>Pollard rho</h3>
      <p>$x \mapsto x^2 + c \pmod n$ dizisi bir süre sonra döngüye girer. $n$'nin gizli bir asal böleni $p$ için bu döngü mod $p$'de çok daha erken kapanır (doğum günü problemi: yaklaşık $\sqrt p$ adımda). Ardışık farkların EBOB'u bu anı yakalar ve $p$'yi ortaya çıkarır.</p>
      ${B("Ayakkabı dolabında kayıp eşi bulmak için dolabın yalnızca <b>yarısını</b> aramak yeter, çünkü her bölen çiftinin bir teki √n'nin altındadır. Pollard rho ise dolabı hiç açmadan, iki kişinin aynı ayakkabıyı ne zaman seçtiğine bakarak çifti bulur.")}` },
  ];
  MC.modul("bilgi", {
    baslik: "Bilgi Köşesi",
    kur(el) {
      el.innerHTML = `<div class="bolum-basi"><span class="etiket">Bilgi Köşesi</span><h2>Tanımlar, ispatlar ve açık problemler</h2></div>
        <div class="bilgi-duzen"><div class="bilgi-menu" role="tablist">${KONU.map((k) => `<button role="tab" data-id="${k.id}">${k.ad}</button>`).join("")}</div><article class="panel bilgi-metin" id="bilgiMetin"></article></div>`;
      const metin = U.$("#bilgiMetin", el);
      const sec = (id) => {
        const k = KONU.find((x) => x.id === id) || KONU[0];
        U.$$(".bilgi-menu button", el).forEach((b) => b.setAttribute("aria-selected", b.dataset.id === k.id));
        U.html(metin, k.h);
        if (U.animasyon()) gsap.from(metin, { y: 10, opacity: 0, duration: .3 });
      };
      U.$(".bilgi-menu", el).addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { MC.Ses.efekt("dokun"); sec(b.dataset.id); } });
      sec("asal");
    },
  });
})();
