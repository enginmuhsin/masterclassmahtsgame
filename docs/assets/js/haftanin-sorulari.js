/* =====================================================================
   HAFTANIN SORULARI — soru bankası (en yeni en üstte)
   Her hafta pazartesi bir matematik ve bir geometri sorusu yayımlanır; çözüm pazar akşamı
   "cozum" ve "cevapAcik" alanlarına yazılır. Eski sorular silinmez: bu dosya aynı zamanda
   ileride yeniden kullanılacak soru bankasıdır.
   · matematik: cevapOzet = SHA-256("<id>|<cevap>") — cevap kodda açık durmaz.
   · geometri : Soru Masası biçiminde şekil (sekil.nesne); svg alanı araclar/haftanin-sorulari.js ile üretilir.
   Düzenleme ve kontrol için: node araclar/haftanin-sorulari.js kontrol
   ===================================================================== */
"use strict";
window.MC = window.MC || {};
MC.haftaninSorulari = {
 "aciklama": "Haftanın Soruları ve soru bankası. En yeni soru en üstte. cozum alanı pazar akşamı doldurulur.",
 "sorular": [
  {
   "id": "2026-H45-mat",
   "hafta": "2026-H45",
   "tur": "matematik",
   "baslik": "2ⁿ + n² ve 5",
   "seviye": "Ortaokul 7–8 · Lise 9",
   "konu": [
    "Sayılar",
    "Modüler aritmetik"
   ],
   "zorluk": 2,
   "baslangic": "2026-11-02",
   "cozumTarihi": "2026-11-08",
   "metin": "1 ≤ n ≤ 2026 olmak üzere, 2<sup>n</sup> + n<sup>2</sup> sayısı 5 ile tam bölünecek biçimde kaç tane n tam sayısı vardır? (Örneğin n = 6 için 2<sup>6</sup> + 6<sup>2</sup> = 64 + 36 = 100, 5 ile bölünür.)",
   "ipuclari": [
    "2<sup>n</sup> ve n<sup>2</sup> sayılarının 5'e bölümünden kalanlarına bak. Her ikisi de belirli aralıklarla tekrar eder.",
    "2<sup>n</sup>'nin kalanları 4 adımda bir, n<sup>2</sup>'nin kalanları 5 adımda bir tekrar eder. İkisi birlikte kaç adımda bir tekrar eder?",
    "n = 1, 2, …, 20 için tablo yap, uygun n'leri işaretle; sonra 2026'yı 20'ye böl ve artan kısmı ayrıca say."
   ],
   "birim": "",
   "esin": "TÜBİTAK Ortaokul 1. aşama tarzında özgün soru",
   "hazirlayan": "Master Class",
   "cevapOzet": "7976ce62fe80a9a743a1cfc4346bb7a90c37cd9736e968e11b10289696db5463",
   "cozum": null,
   "cevapAcik": null
  },
  {
   "id": "2026-H45-geo",
   "hafta": "2026-H45",
   "tur": "geometri",
   "baslik": "Eşkenar üçgende 30° açı",
   "seviye": "Ortaokul 7–8 · Lise 9",
   "konu": [
    "Geometri",
    "Uzunluk",
    "Döndürme"
   ],
   "zorluk": 2,
   "baslangic": "2026-11-02",
   "cozumTarihi": "2026-11-08",
   "metin": "ABC bir eşkenar üçgen olmak üzere D ve E noktaları [BC] kenarı üzerinde, B, D, E, C sırasıyla yer alıyor. s(DAE) = 30°, |BD| = 3 ve |EC| = 5 olduğuna göre |DE| = x kaç birimdir?",
   "ipuclari": [
    "|BD| ve |EC| parçaları şeklin iki ucunda duruyor. Onları tek bir üçgende buluşturmanın yolunu ara.",
    "s(BAD) + s(EAC) = 60° − 30° = 30°, yani s(DAE)'ye eşit. Bu eşitlik bir eşlik kurmaya yarar.",
    "ABD üçgenini A etrafında 60° döndürüp [AC] kenarının üzerine taşı. D'nin yeni yeri ile E ve C bir üçgen oluşturur; bu üçgenin C açısına bak."
   ],
   "cevapMetin": "7",
   "birim": "",
   "sekil": {
    "nesne": [
     {
      "id": "A",
      "tur": "nokta",
      "ad": "A",
      "x": 500,
      "y": 102.346
     },
     {
      "id": "B",
      "tur": "nokta",
      "ad": "B",
      "x": 230,
      "y": 570
     },
     {
      "id": "C",
      "tur": "nokta",
      "ad": "C",
      "x": 770,
      "y": 570
     },
     {
      "id": "D",
      "tur": "nokta",
      "ad": "D",
      "x": 338,
      "y": 570
     },
     {
      "id": "E",
      "tur": "nokta",
      "ad": "E",
      "x": 590,
      "y": 570
     },
     {
      "id": "AB",
      "tur": "parca",
      "p": "A",
      "q": "B"
     },
     {
      "id": "BC",
      "tur": "parca",
      "p": "B",
      "q": "C"
     },
     {
      "id": "AC",
      "tur": "parca",
      "p": "A",
      "q": "C"
     },
     {
      "id": "AD",
      "tur": "parca",
      "p": "A",
      "q": "D"
     },
     {
      "id": "AE",
      "tur": "parca",
      "p": "A",
      "q": "E"
     },
     {
      "id": "cAB",
      "tur": "centik",
      "a": "A",
      "b": "B",
      "n": 1
     },
     {
      "id": "cAC",
      "tur": "centik",
      "a": "A",
      "b": "C",
      "n": 1
     },
     {
      "id": "aDAE",
      "tur": "aci",
      "a": "D",
      "v": "A",
      "c": "E",
      "metin": "30"
     },
     {
      "id": "uBD",
      "tur": "uz",
      "a": "B",
      "b": "D",
      "metin": "3"
     },
     {
      "id": "uEC",
      "tur": "uz",
      "a": "E",
      "b": "C",
      "metin": "5"
     },
     {
      "id": "uDE",
      "tur": "uz",
      "a": "D",
      "b": "E",
      "metin": "x"
     }
    ],
    "olcek": 36,
    "uyduruldu": true
   },
   "esin": "TÜBİTAK Ortaokul 1. aşama tarzında özgün soru",
   "hazirlayan": "Master Class",
   "cozum": null,
   "cevapAcik": null,
   "svg": {
    "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><line x1=\"500\" y1=\"102.346\" x2=\"230\" y2=\"570\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"230\" y1=\"570\" x2=\"770\" y2=\"570\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"500\" y1=\"102.346\" x2=\"770\" y2=\"570\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"500\" y1=\"102.346\" x2=\"338\" y2=\"570\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"500\" y1=\"102.346\" x2=\"590\" y2=\"570\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"371.79423026106514\" y1=\"342.4050490337952\" x2=\"358.20576973893486\" y2=\"329.9409509662048\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"643.7942293566899\" y1=\"333.40505310348374\" x2=\"626.2057706433101\" y2=\"338.94094689651627\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M483.3063308707732 150.53650088246556 A51.000029061746744 51.000029061746744 0 0 0 509.63809395045257 152.4270354256106\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"494.77229295690626\" y=\"175.15860414301537\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">30°</text><text x=\"284\" y=\"590\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">3</text><text x=\"680\" y=\"590\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">5</text><text x=\"464\" y=\"590\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><circle cx=\"500\" cy=\"102.346\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"500.7692303061348\" y=\"82.3607983563807\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"230\" cy=\"570\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"211.21798412000442\" y=\"576.8728363492515\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"770\" cy=\"570\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"788.9989486566482\" y=\"576.248195734934\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"338\" cy=\"570\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"321.1062472278596\" y=\"580.7051911367242\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">D</text><circle cx=\"590\" cy=\"570\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"604.8962954122884\" y=\"583.3454255454757\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text>",
    "kutu": {
     "x": 160,
     "y": 32.346000000000004,
     "w": 680,
     "h": 607.654
    }
   }
  },
  {
   "id": "2026-H44-mat",
   "hafta": "2026-H44",
   "tur": "matematik",
   "baslik": "Artan rakamlar ve 9",
   "seviye": "Ortaokul 6–8 · Lise 9",
   "konu": [
    "Sayılar",
    "Kombinatorik"
   ],
   "zorluk": 2,
   "baslangic": "2026-10-26",
   "cozumTarihi": "2026-11-01",
   "metin": "Rakamları soldan sağa doğru kesin olarak artan dört basamaklı sayılara <b>artan sayı</b> diyelim (örneğin 1358 bir artan sayıdır, 1338 ve 1385 değildir). Kaç tane artan sayı 9 ile tam bölünür?",
   "ipuclari": [
    "Bir artan sayı, hangi rakamları kullandığını bildiğinde tek türlü yazılır. 0 rakamı neden hiç kullanılamaz?",
    "9 ile bölünebilme kuralını hatırla. Dört farklı rakamın toplamı en az ve en çok kaç olabilir?",
    "Toplamı 18 olan dörtlüleri en küçük rakama göre sistemli listele."
   ],
   "cevapOzet": "72233becc7b7d1ade9d4ff5c1929896305652161194189fe57813c68600dd397",
   "birim": "",
   "cozum": "<p>Rakamları kesin artan bir sayıda hiçbir rakam tekrar etmez ve 0 kullanılamaz: 0 ilk basamağa yazılamaz, sonraki bir basamakta da kendinden önceki rakamdan büyük olamaz. Bu yüzden her artan sayı, {1, 2, …, 9} kümesinden seçilen 4 rakama karşılık gelir; rakamları seçip küçükten büyüğe dizmek sayıyı tek türlü verir.</p>\n<p>Bir sayı 9 ile bölünür ⇔ rakamları toplamı 9 ile bölünür. Dört farklı rakamın toplamı en az 1+2+3+4 = 10, en çok 6+7+8+9 = 30'dur. Bu aralıktaki 9'un katları yalnızca <b>18</b> ve <b>27</b>.</p>\n<p><b>Toplam 27:</b> 9 rakamı kullanılmazsa en büyük toplam 5+6+7+8 = 26'dır, yetmez. Demek ki 9 var ve kalan üç rakamın toplamı 18: {3, 7, 8}, {4, 6, 8}, {5, 6, 7}. Üç sayı: 3789, 4689, 5679.</p>\n<p><b>Toplam 18:</b> En küçük rakama göre sayalım. En küçük rakam 1 ise kalan üçün toplamı 17: {2,6,9}, {2,7,8}, {3,5,9}, {3,6,8}, {4,5,8}, {4,6,7} → 6 tane. En küçük 2 ise kalan toplam 16 ve rakamlar en az 3: {3,4,9}, {3,5,8}, {3,6,7}, {4,5,7} → 4 tane. En küçük 3 ise kalan 15 ve rakamlar en az 4: {4,5,6} → 1 tane. En küçük rakam 4 olursa toplam en az 4+5+6+7 = 22 olur. Toplam 6 + 4 + 1 = 11.</p>\n<p>Cevap: 11 + 3 = <b>14</b>.</p>\n<p><i>Bir adım ileri:</i> Bütün artan sayılar C(9, 4) = 126 tanedir ve bunların tam üçte biri, 42 tanesi, 3 ile bölünür. Neden tam üçte bir? Rakamları 3'e bölümünden kalana göre {1, 4, 7}, {2, 5, 8}, {3, 6, 9} gruplarına ayırıp düşün.</p>",
   "cevapAcik": "14",
   "esin": "TÜBİTAK Ortaokul 1. aşama tarzında özgün soru",
   "hazirlayan": "Master Class"
  },
  {
   "id": "2026-H44-geo",
   "hafta": "2026-H44",
   "tur": "geometri",
   "baslik": "Karenin yanındaki eşkenar üçgen",
   "seviye": "Ortaokul 6–8",
   "konu": [
    "Geometri",
    "Açı"
   ],
   "zorluk": 2,
   "baslangic": "2026-10-26",
   "cozumTarihi": "2026-11-01",
   "metin": "ABCD bir kare ve BCE, karenin dışında kalan bir eşkenar üçgendir. [AE] doğru parçası [BD] köşegenini F noktasında kesiyor. s(AFB) = x kaç derecedir?",
   "ipuclari": [
    "|AB| ile |BE| arasında nasıl bir ilişki var?",
    "s(ABE) kaç derecedir? Buna göre ABE üçgeni nasıl bir üçgen?",
    "ABF üçgeninde iki açıyı bulduysan üçüncüsü hazır."
   ],
   "cevapMetin": "120",
   "birim": "°",
   "sekil": {
    "nesne": [
     {
      "id": "A",
      "tur": "nokta",
      "ad": "A",
      "x": 250,
      "y": 550
     },
     {
      "id": "B",
      "tur": "nokta",
      "ad": "B",
      "x": 550,
      "y": 550
     },
     {
      "id": "C",
      "tur": "nokta",
      "ad": "C",
      "x": 550,
      "y": 250
     },
     {
      "id": "D",
      "tur": "nokta",
      "ad": "D",
      "x": 250,
      "y": 250
     },
     {
      "id": "E",
      "tur": "nokta",
      "ad": "E",
      "x": 809.808,
      "y": 400
     },
     {
      "id": "AB",
      "tur": "parca",
      "p": "A",
      "q": "B"
     },
     {
      "id": "BC",
      "tur": "parca",
      "p": "B",
      "q": "C"
     },
     {
      "id": "CD",
      "tur": "parca",
      "p": "C",
      "q": "D"
     },
     {
      "id": "DA",
      "tur": "parca",
      "p": "D",
      "q": "A"
     },
     {
      "id": "CE",
      "tur": "parca",
      "p": "C",
      "q": "E"
     },
     {
      "id": "BE",
      "tur": "parca",
      "p": "B",
      "q": "E"
     },
     {
      "id": "BD",
      "tur": "parca",
      "p": "B",
      "q": "D"
     },
     {
      "id": "AE",
      "tur": "parca",
      "p": "A",
      "q": "E"
     },
     {
      "id": "F",
      "tur": "nokta",
      "ad": "F",
      "turet": "kesisim",
      "a": "AE",
      "b": "BD",
      "i": 0
     },
     {
      "id": "cAB",
      "tur": "centik",
      "a": "A",
      "b": "B",
      "n": 1
     },
     {
      "id": "cBC",
      "tur": "centik",
      "a": "B",
      "b": "C",
      "n": 1
     },
     {
      "id": "cCD",
      "tur": "centik",
      "a": "C",
      "b": "D",
      "n": 1
     },
     {
      "id": "cDA",
      "tur": "centik",
      "a": "D",
      "b": "A",
      "n": 1
     },
     {
      "id": "cCE",
      "tur": "centik",
      "a": "C",
      "b": "E",
      "n": 1
     },
     {
      "id": "cBE",
      "tur": "centik",
      "a": "B",
      "b": "E",
      "n": 1
     },
     {
      "id": "aDAB",
      "tur": "aci",
      "a": "D",
      "v": "A",
      "c": "B",
      "metin": "90"
     },
     {
      "id": "aAFB",
      "tur": "aci",
      "a": "A",
      "v": "F",
      "c": "B",
      "metin": "x"
     }
    ],
    "olcek": null,
    "uyduruldu": true
   },
   "cozum": "<p>Karenin ve eşkenar üçgenin kenarları ortak BC kenarı üzerinden eşittir: |AB| = |BC| = |BE|. Yani <b>ABE üçgeni ikizkenardır</b>.</p>\n<p>B köşesindeki açı: s(ABE) = s(ABC) + s(CBE) = 90° + 60° = 150°. İkizkenar üçgende taban açıları eşit olduğundan s(BAE) = s(BEA) = (180° − 150°) / 2 = 15°.</p>\n<p>[BD] karenin köşegeni, B açısını ikiye böler: s(ABD) = 45°.</p>\n<p>ABF üçgeninde: x = 180° − s(FAB) − s(ABF) = 180° − 15° − 45° = <b>120°</b>.</p>\n<p><i>Bir adım ileri:</i> Eşkenar üçgeni karenin <b>içine</b> çizseydik s(BAE) = 75° olurdu. O zaman [AE] ile [BD] arasındaki s(AFB) kaç derece olur? (Cevap: 60°)</p>",
   "cevapAcik": "120",
   "esin": "TÜBİTAK Ortaokul 1. aşama tarzında özgün soru",
   "hazirlayan": "Master Class",
   "svg": {
    "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><path d=\"M461.971464530221 493.2024556999308 A25.5 25.5 0 0 0 504.63379713751004 504.63379713751004\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"476.12039958116617\" y=\"525.7225692951998\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"5.5\" fill=\"#ff7a72\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">F</text>",
    "kutu": {
     "x": 180,
     "y": 180,
     "w": 699.808,
     "h": 440
    }
   },
   "adimlar": [
    {
     "baslik": "Eşit kenarları birleştir",
     "metin": "<p>Kare ile eşkenar üçgen [BC] kenarını paylaşır: |AB| = |BC| = |BE|. Yani <b>ABE ikizkenar</b>. B köşesinde s(ABE) = 90° + 60° = <b>150°</b>.</p>",
     "ekle": [
      {
       "id": "n_ABE",
       "tur": "aci",
       "a": "A",
       "v": "B",
       "c": "E",
       "metin": "150"
      }
     ],
     "vurgu": [
      "cAB",
      "cBC",
      "cBE"
     ],
     "bolge": [
      [
       "A",
       "B",
       "E"
      ]
     ],
     "gizle": [
      "aAFB"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"250,550 550,550 809.808,400\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><path d=\"M520 550 A30 30 0 0 1 575.9807715851343 535.0000164053064\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"538.353156693691\" y=\"506.5333341398459\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">150°</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"5.5\" fill=\"#ff7a72\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">F</text>",
      "kutu": {
       "x": 180,
       "y": 180,
       "w": 699.808,
       "h": 440
      }
     }
    },
    {
     "baslik": "Taban açıları",
     "metin": "<p>İkizkenar üçgende taban açıları eşittir: s(BAE) = s(BEA) = (180° − 150°) / 2 = <b>15°</b>.</p>",
     "ekle": [
      {
       "id": "n_BAE",
       "tur": "aci",
       "a": "B",
       "v": "A",
       "c": "E",
       "metin": "15"
      },
      {
       "id": "n_BEA",
       "tur": "aci",
       "a": "B",
       "v": "E",
       "c": "A",
       "metin": "15"
      }
     ],
     "vurgu": [
      "AE"
     ],
     "bolge": [
      [
       "A",
       "B",
       "E"
      ]
     ],
     "gizle": [
      "aAFB"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"250,550 550,550 809.808,400\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><path d=\"M520 550 A30 30 0 0 1 575.9807715851343 535.0000164053064\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"538.353156693691\" y=\"506.5333341398459\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">150°</text><path d=\"M322 550 A72 72 0 0 0 319.5466626457378 531.3650405194984\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"343.1958180070977\" y=\"537.730545815403\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">15°</text><path d=\"M747.4541481956776 435.9999606272646 A72 72 0 0 1 740.2613373542622 418.63495948050166\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"722.9633095436376\" y=\"435.9722078768957\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">15°</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"5.5\" fill=\"#ff7a72\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">F</text>",
      "kutu": {
       "x": 180,
       "y": 180,
       "w": 699.808,
       "h": 440
      }
     }
    },
    {
     "baslik": "Köşegen açıyı ikiye böler",
     "metin": "<p>[BD] karenin köşegenidir ve B açısını ikiye böler: s(ABD) = <b>45°</b>.</p>",
     "ekle": [
      {
       "id": "n_ABD",
       "tur": "aci",
       "a": "A",
       "v": "B",
       "c": "D",
       "metin": "45"
      }
     ],
     "vurgu": [
      "BD"
     ],
     "gizle": [
      "n_ABE",
      "n_BEA",
      "aAFB"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><path d=\"M322 550 A72 72 0 0 0 319.5466626457378 531.3650405194984\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"343.1958180070977\" y=\"537.730545815403\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">15°</text><path d=\"M510 550 A40 40 0 0 1 521.7157287525381 521.7157287525381\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"492.7194689843002\" y=\"526.2736271933644\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">45°</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"5.5\" fill=\"#ff7a72\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">F</text>",
      "kutu": {
       "x": 180,
       "y": 180,
       "w": 699.808,
       "h": 440
      }
     }
    },
    {
     "baslik": "ABF üçgeni",
     "metin": "<p>ABF üçgeninde iki açı biliniyor: x = 180° − 15° − 45° = <b>120°</b>.</p>",
     "ekle": [
      {
       "id": "n_x",
       "tur": "aci",
       "a": "A",
       "v": "F",
       "c": "B",
       "metin": "120"
      }
     ],
     "vurgu": [
      "F"
     ],
     "gizle": [
      "n_ABE",
      "n_BEA",
      "aAFB",
      "n_ABD"
     ],
     "bolge": [
      [
       "A",
       "B",
       "F"
      ]
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"250,550 550,550 486.6025742172531,486.6025742172531\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><path d=\"M322 550 A72 72 0 0 0 319.5466626457378 531.3650405194984\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"343.1958180070977\" y=\"537.730545815403\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">15°</text><path d=\"M457.62479811486236 494.36714066746214 A30 30 0 0 0 507.81577765284953 507.81577765284953\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"474.95571351048983\" y=\"530.0692354149717\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">120°</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"8\" fill=\"#ffb04a\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">F</text>",
      "kutu": {
       "x": 180,
       "y": 180,
       "w": 699.808,
       "h": 440
      }
     }
    }
   ]
  },
  {
   "id": "ayin-2026-09",
   "hafta": "2026-09",
   "tur": "geometri",
   "baslik": "Ayın Olimpiyat Sorusu",
   "seviye": "Ortaokul 7–8 · Lise",
   "konu": [
    "Geometri",
    "Açı",
    "Sinüs teoremi"
   ],
   "zorluk": 3,
   "baslangic": "2026-09-29",
   "cozumTarihi": "2026-09-29",
   "etiket": "Eylül 2026 · Ayın sorusu",
   "metin": "ABC bir üçgen; B, P, C noktaları doğrusal. |AP| = |PC| ve |AC| = |BP|, m(ACB) = 20° olmak üzere m(ABC) = x kaç derecedir?",
   "ipuclari": [
    "APC üçgeni ikizkenar: m(PAC) kaç derece?",
    "m(APB) dış açıdır. Kaç derece?",
    "APB üçgeninde |BP| = |AC| bilgisini kullan: sinüs teoremi ya da uygun bir yardımcı üçgen."
   ],
   "cevapMetin": "30",
   "birim": "°",
   "sekil": {
    "nesne": [
     {
      "id": "A",
      "tur": "nokta",
      "ad": "A",
      "x": 486.167,
      "y": 337.717
     },
     {
      "id": "B",
      "tur": "nokta",
      "ad": "B",
      "x": 175.702,
      "y": 489.717
     },
     {
      "id": "C",
      "tur": "nokta",
      "ad": "C",
      "x": 948.13,
      "y": 542.567
     },
     {
      "id": "AB",
      "tur": "parca",
      "p": "A",
      "q": "B"
     },
     {
      "id": "BC",
      "tur": "parca",
      "p": "B",
      "q": "C"
     },
     {
      "id": "AC",
      "tur": "parca",
      "p": "A",
      "q": "C"
     },
     {
      "id": "P",
      "tur": "nokta",
      "ad": "P",
      "uzerinde": "BC",
      "t": 0.652703644664925
     },
     {
      "id": "AP",
      "tur": "parca",
      "p": "A",
      "q": "P"
     },
     {
      "id": "cAP",
      "tur": "centik",
      "a": "A",
      "b": "P",
      "n": 1
     },
     {
      "id": "cPC",
      "tur": "centik",
      "a": "P",
      "b": "C",
      "n": 1
     },
     {
      "id": "cAC",
      "tur": "centik",
      "a": "A",
      "b": "C",
      "n": 2
     },
     {
      "id": "cBP",
      "tur": "centik",
      "a": "B",
      "b": "P",
      "n": 2
     },
     {
      "id": "aACB",
      "tur": "aci",
      "a": "A",
      "v": "C",
      "c": "B",
      "metin": "20"
     },
     {
      "id": "aABC",
      "tur": "aci",
      "a": "A",
      "v": "B",
      "c": "C",
      "metin": "x"
     }
    ],
    "olcek": 40,
    "uyduruldu": true
   },
   "cozum": "<p><b>1. Verilenlerden açılar.</b> |AP| = |PC| olduğundan APC ikizkenardır: m(PAC) = m(PCA) = 20°. APB açısı APC üçgeninin dış açısıdır: m(APB) = 20° + 20° = 40°.</p>\n<p><b>2. Ek çizim.</b> |BP| = |AC| eşitliği birbirinden uzak iki parçayı bağlıyor. Onları buluşturmak için CAP üçgeninin bir kopyasını [BP] kenarının üzerine kuralım: BC doğrusunun altında, m(BPE) = 20° ve |PE| = |PA| olacak biçimde bir E noktası alalım.</p>\n<p><b>3. Eşlik.</b> BPE ve CAP üçgenlerinde |BP| = |CA|, |PE| = |AP| ve aradaki açılar m(BPE) = m(CAP) = 20°. Kenar-açı-kenar eşliğinden BPE ≅ CAP. Buradan |BE| = |CP|, m(PBE) = m(ACP) = 20° ve m(BEP) = m(CPA) = 140°.</p>\n<p><b>4. Eşkenar üçgen.</b> m(APE) = m(APB) + m(BPE) = 40° + 20° = 60° ve |PA| = |PE|. Tepe açısı 60° olan ikizkenar üçgen eşkenardır: APE eşkenar, |EA| = |AP| ve m(AEP) = 60°.</p>\n<p><b>5. İkizkenar üçgen.</b> |EB| = |CP| = |AP| = |EA| olduğundan EAB ikizkenardır. Tepe açısı m(BEA) = m(BEP) − m(AEP) = 140° − 60° = 80°; taban açıları m(EBA) = m(EAB) = (180° − 80°) / 2 = 50°.</p>\n<p><b>6. Sonuç.</b> x = m(ABC) = m(EBA) − m(EBP) = 50° − 20° = <b>30°</b>.</p>\n<p><i>Neden bu ek çizim?</i> Eşit iki parça (|BP| ve |AC|) şeklin iki ucunda duruyordu. Birini taşıyıp ötekinin yanına koymak, yani bir üçgeni kopyalamak, olimpiyat geometrisinin en sık kullanılan hamlesidir. E noktası aslında A'nın P etrafında 60° döndürülmüş hâlidir; eşkenar üçgenin ortaya çıkması bu yüzden sürpriz değildir.</p>\n<p><i>Başka bir yol (trigonometri):</i> |AP| = a ise |AC| = |BP| = 2a·cos20°. APB üçgeninde sinüs teoremi sin(140° − x) / sin x = 2cos20° verir; x = 30° bu eşitliği sağlar, çünkü sin110° / sin30° = 2cos20°.</p>\n<p><i>Bir adım ileri:</i> Aynı şekilde m(ACB) = 20° yerine m(ACB) = α alınırsa ek çizim hangi α değerlerinde yine işe yarar? (İpucu: m(APE) = 3α olur; eşkenarlık için 3α = 60° gerekir.)</p>",
   "cevapAcik": "30",
   "neden": "Bu soruda iki eşitlik var: |AP| = |PC| bir ikizkenar üçgen kurar, |AC| = |BP| ise birbirinden uzak iki parçayı bağlar. Olimpiyat sorularının çoğu böyledir: bilgiler şeklin farklı köşelerine dağılmıştır ve onları buluşturan bir yardımcı çizgi ya da üçgen gerekir.",
   "elYazisi": "assets/img/ayin/2026-09.jpg",
   "esin": "Öğretmenin el yazısıyla hazırladığı soru",
   "hazirlayan": "Muhsin ENGİN",
   "svg": {
    "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text>",
    "kutu": {
     "x": 105.702,
     "y": 267.717,
     "w": 912.428,
     "h": 344.85
    }
   },
   "adimlar": [
    {
     "baslik": "Verilenlerden açılar",
     "metin": "<p>|AP| = |PC| olduğundan <b>APC ikizkenar</b>: m(PAC) = m(PCA) = 20°.</p><p>APB açısı bu üçgenin dış açısıdır: m(APB) = 20° + 20° = <b>40°</b>.</p>",
     "ekle": [
      {
       "id": "n_PAC",
       "tur": "aci",
       "a": "P",
       "v": "A",
       "c": "C",
       "metin": "20"
      },
      {
       "id": "n_APB",
       "tur": "aci",
       "a": "A",
       "v": "P",
       "c": "B",
       "metin": "40"
      }
     ],
     "vurgu": [
      "cAP",
      "cPC"
     ],
     "bolge": [
      [
       "A",
       "P",
       "C"
      ]
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"486.167,337.717 679.8685708412388,524.2123876205413 948.13,542.567\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M647.4515169633185 493.00132927845993 A44.99995049949276 44.99995049949276 0 0 0 634.9735829093067 521.1406448662618\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"618.6202992542432\" y=\"497.0528111411464\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">40°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text>",
      "kutu": {
       "x": 105.702,
       "y": 267.717,
       "w": 912.428,
       "h": 400.9981749117345
      }
     }
    },
    {
     "baslik": "Ek çizim: üçgeni kopyala",
     "metin": "<p>|BP| = |AC| eşitliği iki uzak parçayı bağlıyor. CAP üçgeninin bir kopyasını [BP] üzerine kuralım: BC'nin altında <b>m(BPE) = 20°</b> ve <b>|PE| = |PA|</b> olacak biçimde E noktasını al; E'yi B'ye birleştir.</p>",
     "ekle": [
      {
       "id": "E",
       "tur": "nokta",
       "ad": "E",
       "turet": "dondur",
       "m": "P",
       "a": "A",
       "derece": 60
      },
      {
       "id": "PE",
       "tur": "parca",
       "p": "P",
       "q": "E"
      },
      {
       "id": "BE",
       "tur": "parca",
       "p": "B",
       "q": "E"
      },
      {
       "id": "n_BPE",
       "tur": "aci",
       "a": "B",
       "v": "P",
       "c": "E",
       "metin": "20"
      },
      {
       "id": "cPE",
       "tur": "centik",
       "a": "P",
       "b": "E",
       "n": 1
      }
     ],
     "bolge": [
      [
       "B",
       "P",
       "E"
      ],
      [
       "C",
       "A",
       "P"
      ]
     ],
     "bolgeRenk": [
      "#ffb04a",
      "#5fd39d"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"175.702,489.717 679.8685708412388,524.2123876205413 421.50804205260465,598.7151749117345\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><polygon points=\"948.13,542.567 486.167,337.717 679.8685708412388,524.2123876205413\" fill=\"#5fd39d\" fill-opacity=\".22\" stroke=\"#5fd39d\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M647.4515169633185 493.00132927845993 A44.99995049949276 44.99995049949276 0 0 0 634.9735829093067 521.1406448662618\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"618.6202992542432\" y=\"497.0528111411464\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">40°</text><path d=\"M608.036511134072 519.2975938073655 A72 72 0 0 0 610.6875405938043 544.1619503702246\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"586.3983427847525\" y=\"534.1781523713482\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"8\" fill=\"#ffb04a\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text>",
      "kutu": {
       "x": 105.702,
       "y": 267.717,
       "w": 912.428,
       "h": 400.9981749117345
      }
     }
    },
    {
     "baslik": "Eşlik: BPE ≅ CAP",
     "metin": "<p>|BP| = |CA|, |PE| = |AP| ve aradaki açılar 20°: <b>kenar-açı-kenar</b> eşliği. Buradan |BE| = |CP|, m(PBE) = 20° ve m(BEP) = 140°.</p>",
     "ekle": [
      {
       "id": "cBE",
       "tur": "centik",
       "a": "B",
       "b": "E",
       "n": 1
      },
      {
       "id": "n_PBE",
       "tur": "aci",
       "a": "P",
       "v": "B",
       "c": "E",
       "metin": "20"
      }
     ],
     "vurgu": [
      "BE",
      "cPC"
     ],
     "bolge": [
      [
       "B",
       "P",
       "E"
      ],
      [
       "C",
       "A",
       "P"
      ]
     ],
     "bolgeRenk": [
      "#ffb04a",
      "#5fd39d"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"175.702,489.717 679.8685708412388,524.2123876205413 421.50804205260465,598.7151749117345\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><polygon points=\"948.13,542.567 486.167,337.717 679.8685708412388,524.2123876205413\" fill=\"#5fd39d\" fill-opacity=\".22\" stroke=\"#5fd39d\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#5fd39d\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M647.4515169633185 493.00132927845993 A44.99995049949276 44.99995049949276 0 0 0 634.9735829093067 521.1406448662618\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"618.6202992542432\" y=\"497.0528111411464\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">40°</text><path d=\"M608.036511134072 519.2975938073655 A72 72 0 0 0 610.6875405938043 544.1619503702246\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"586.3983427847525\" y=\"534.1781523713482\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#5fd39d\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#5fd39d\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text>",
      "kutu": {
       "x": 105.702,
       "y": 267.717,
       "w": 912.428,
       "h": 400.9981749117345
      }
     }
    },
    {
     "baslik": "Eşkenar üçgen",
     "metin": "<p>m(APE) = 40° + 20° = 60° ve |PA| = |PE|. Tepe açısı 60° olan ikizkenar üçgen eşkenardır: <b>APE eşkenar</b>, |EA| = |AP| ve m(AEP) = 60°.</p>",
     "ekle": [
      {
       "id": "EA",
       "tur": "parca",
       "p": "E",
       "q": "A"
      },
      {
       "id": "cEA",
       "tur": "centik",
       "a": "E",
       "b": "A",
       "n": 1
      },
      {
       "id": "n_APE",
       "tur": "aci",
       "a": "A",
       "v": "P",
       "c": "E",
       "metin": "60"
      }
     ],
     "vurgu": [
      "PE",
      "cAP",
      "cPE"
     ],
     "bolge": [
      [
       "A",
       "P",
       "E"
      ]
     ],
     "gizle": [
      "n_APB",
      "n_BPE"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"486.167,337.717 679.8685708412388,524.2123876205413 421.50804205260465,598.7151749117345\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#5fd39d\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"421.50804205260465\" y1=\"598.7151749117345\" x2=\"486.167\" y2=\"337.717\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"445.58254289733424\" y1=\"464.11056238710205\" x2=\"462.09249915527033\" y2=\"472.3216125246324\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M651.0533801416084 496.46919413197674 A40 40 0 0 0 641.4346651482197 535.295478037032\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"619.6878307884031\" y=\"509.3033793807887\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">60°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#5fd39d\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#5fd39d\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text>",
      "kutu": {
       "x": 105.702,
       "y": 267.717,
       "w": 912.428,
       "h": 400.9981749117345
      }
     }
    },
    {
     "baslik": "İkizkenar EAB",
     "metin": "<p>|EB| = |AP| = |EA|: <b>EAB ikizkenar</b>. m(BEA) = 140° − 60° = 80°, taban açıları (180° − 80°) / 2 = <b>50°</b>.</p>",
     "ekle": [
      {
       "id": "n_BEA",
       "tur": "aci",
       "a": "B",
       "v": "E",
       "c": "A",
       "metin": "80"
      },
      {
       "id": "n_EBA",
       "tur": "aci",
       "a": "E",
       "v": "B",
       "c": "A",
       "metin": "50"
      },
      {
       "id": "n_AEP",
       "tur": "aci",
       "a": "A",
       "v": "E",
       "c": "P",
       "metin": "60"
      }
     ],
     "vurgu": [
      "cBE",
      "cEA",
      "BE",
      "EA"
     ],
     "bolge": [
      [
       "A",
       "B",
       "E"
      ]
     ],
     "gizle": [
      "aABC",
      "n_APE",
      "n_APB"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><polygon points=\"486.167,337.717 175.702,489.717 421.50804205260465,598.7151749117345\" fill=\"#ffb04a\" fill-opacity=\".22\" stroke=\"#ffb04a\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#5fd39d\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"421.50804205260465\" y1=\"598.7151749117345\" x2=\"486.167\" y2=\"337.717\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"445.58254289733424\" y1=\"464.11056238710205\" x2=\"462.09249915527033\" y2=\"472.3216125246324\" stroke=\"#ffb04a\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M608.036511134072 519.2975938073655 A72 72 0 0 0 610.6875405938043 544.1619503702246\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"586.3983427847525\" y=\"534.1781523713482\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M384.94184838401833 582.5005678985677 A40 40 0 0 1 431.12675704599343 559.8888910066792\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"394.24550122503695\" y=\"543.0307617638418\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">80°</text><path d=\"M212.26819366858632 505.93160701316674 A40 40 0 0 0 211.62745569073496 472.1283208735551\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"237.6908650627326\" y=\"488.5420071343492\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">50°</text><path d=\"M431.12675704599343 559.8888910066792 A40 40 0 0 1 459.9419477456238 587.6320844952438\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"464.5099919598798\" y=\"554.0516293273074\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">60°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#5fd39d\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#5fd39d\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text>",
      "kutu": {
       "x": 105.702,
       "y": 267.717,
       "w": 912.428,
       "h": 400.9981749117345
      }
     }
    },
    {
     "baslik": "Sonuç",
     "metin": "<p>x = m(EBA) − m(EBP) = 50° − 20° = <b>30°</b>.</p><p class=\"soluk\">E noktası, A'nın P etrafında 60° döndürülmüş hâlidir. Bu yüzden eşkenar üçgen ortaya çıktı.</p>",
     "ekle": [
      {
       "id": "n_x",
       "tur": "aci",
       "a": "A",
       "v": "B",
       "c": "C",
       "metin": "30"
      }
     ],
     "vurgu": [
      "n_x",
      "n_PBE",
      "BE"
     ],
     "gizle": [
      "aABC",
      "n_BEA",
      "n_AEP",
      "n_APE",
      "n_APB",
      "n_BPE",
      "n_EBA"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#0a1416\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ee\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#5fd39d\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffb04a\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"421.50804205260465\" y1=\"598.7151749117345\" x2=\"486.167\" y2=\"337.717\" stroke=\"#5fd39d\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"445.58254289733424\" y1=\"464.11056238710205\" x2=\"462.09249915527033\" y2=\"472.3216125246324\" stroke=\"#5fd39d\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff9a4d\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff9a4d\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">20°</text><path d=\"M229.5902967423423 463.3339258858936 A60.00012604571069 60.00012604571069 0 0 1 235.56217550768085 493.81267011498926\" fill=\"none\" stroke=\"#ffb04a\" stroke-width=\"2.4\"/><text x=\"256.1720167707385\" y=\"473.95003857969124\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffb04a\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">30°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ee\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#8fb3ff\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ee\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#5fd39d\" stroke=\"#0a1416\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#5fd39d\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#0a1416\" stroke-width=\"4\">E</text>",
      "kutu": {
       "x": 105.702,
       "y": 267.717,
       "w": 912.428,
       "h": 400.9981749117345
      }
     }
    }
   ]
  }
 ]
};
