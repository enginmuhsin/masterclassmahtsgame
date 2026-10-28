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
   "cozum": null,
   "cevapAcik": null,
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
   "cozum": null,
   "cevapAcik": null,
   "esin": "TÜBİTAK Ortaokul 1. aşama tarzında özgün soru",
   "hazirlayan": "Master Class",
   "svg": {
    "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><path d=\"M453.7610946345436 495.4024161941567 A34 34 0 0 0 510.64420477759575 510.64420477759575\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"472.10870311550326\" y=\"540.6944192633028\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"5.5\" fill=\"#ff4d61\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">F</text>",
    "kutu": {
     "x": 180,
     "y": 180,
     "w": 699.808,
     "h": 440
    }
   }
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
   "cozum": "m(PAC) = 20°, m(APB) = 40°. |AP| = a ise |AC| = |BP| = 2a·cos20°. APB üçgeninde sinüs teoremi: sin(140° − x) / sin x = 2cos20°. x = 30° bu eşitliği sağlar: sin110° / sin30° = 2cos20°.",
   "cevapAcik": "30",
   "neden": "Bu soruda iki eşitlik var: |AP| = |PC| bir ikizkenar üçgen kurar, |AC| = |BP| ise birbirinden uzak iki parçayı bağlar. Olimpiyat sorularının çoğu böyledir: bilgiler şeklin farklı köşelerine dağılmıştır ve onları buluşturan bir yardımcı çizgi ya da üçgen gerekir.",
   "elYazisi": "assets/img/ayin/2026-09.jpg",
   "esin": "Öğretmenin el yazısıyla hazırladığı soru",
   "hazirlayan": "Muhsin ENGİN",
   "svg": {
    "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text>",
    "kutu": {
     "x": 105.702,
     "y": 267.717,
     "w": 912.428,
     "h": 344.85
    }
   }
  }
 ]
};
