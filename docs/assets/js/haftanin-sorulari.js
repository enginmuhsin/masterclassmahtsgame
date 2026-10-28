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
    "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><line x1=\"250\" y1=\"550\" x2=\"550\" y2=\"550\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"550\" y2=\"250\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"250\" y2=\"250\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"550\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"250\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"550\" y1=\"550\" x2=\"250\" y2=\"250\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"250\" y1=\"550\" x2=\"809.808\" y2=\"400\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"402\" y1=\"541\" x2=\"398\" y2=\"559\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"541\" y1=\"398\" x2=\"559\" y2=\"402\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"398\" y1=\"259\" x2=\"402\" y2=\"241\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"259\" y1=\"402\" x2=\"241\" y2=\"398\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"686.1360465174171\" y1=\"318.2057674307726\" x2=\"673.6719534825829\" y2=\"331.7942325692274\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"677.1360563606008\" y1=\"466.2057696181468\" x2=\"682.6719436393992\" y2=\"483.7942303818532\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M250 534 L266 534 L266 550\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><path d=\"M461.971464530221 493.2024556999308 A25.5 25.5 0 0 0 504.63379713751004 504.63379713751004\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"476.12039958116617\" y=\"525.7225692951998\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><circle cx=\"250\" cy=\"550\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"232.7180941400443\" y=\"560.0665649477678\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"550\" cy=\"550\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"558.8894419487407\" y=\"567.9158539243869\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"550\" cy=\"250\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"557.5723239174596\" y=\"231.48892465335769\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"250\" cy=\"250\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"233.66560963708753\" y=\"238.45930281690084\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">D</text><circle cx=\"809.808\" cy=\"400\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"829.7885537348808\" y=\"399.11825601927836\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text><circle cx=\"486.6025742172531\" cy=\"486.6025742172531\" r=\"5.5\" fill=\"#ff4d61\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"487.6728252033783\" y=\"506.5739177581043\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">F</text>",
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
   "cozum": "<p><b>1. Verilenlerden açılar.</b> |AP| = |PC| olduğundan APC ikizkenardır: m(PAC) = m(PCA) = 20°. APB açısı APC üçgeninin dış açısıdır: m(APB) = 20° + 20° = 40°.</p>\n<p><b>2. Ek çizim.</b> |BP| = |AC| eşitliği birbirinden uzak iki parçayı bağlıyor. Onları buluşturmak için CAP üçgeninin bir kopyasını [BP] kenarının üzerine kuralım: BC doğrusunun altında, m(BPE) = 20° ve |PE| = |PA| olacak biçimde bir E noktası alalım.</p>\n<p><b>3. Eşlik.</b> BPE ve CAP üçgenlerinde |BP| = |CA|, |PE| = |AP| ve aradaki açılar m(BPE) = m(CAP) = 20°. Kenar-açı-kenar eşliğinden BPE ≅ CAP. Buradan |BE| = |CP|, m(PBE) = m(ACP) = 20° ve m(BEP) = m(CPA) = 140°.</p>\n<p><b>4. Eşkenar üçgen.</b> m(APE) = m(APB) + m(BPE) = 40° + 20° = 60° ve |PA| = |PE|. Tepe açısı 60° olan ikizkenar üçgen eşkenardır: APE eşkenar, |EA| = |AP| ve m(AEP) = 60°.</p>\n<p><b>5. İkizkenar üçgen.</b> |EB| = |CP| = |AP| = |EA| olduğundan EAB ikizkenardır. Tepe açısı m(BEA) = m(BEP) − m(AEP) = 140° − 60° = 80°; taban açıları m(EBA) = m(EAB) = (180° − 80°) / 2 = 50°.</p>\n<p><b>6. Sonuç.</b> x = m(ABC) = m(EBA) − m(EBP) = 50° − 20° = <b>30°</b>.</p>\n<p><i>Neden bu ek çizim?</i> Eşit iki parça (|BP| ve |AC|) şeklin iki ucunda duruyordu. Birini taşıyıp ötekinin yanına koymak, yani bir üçgeni kopyalamak, olimpiyat geometrisinin en sık kullanılan hamlesidir. E noktası aslında A'nın P etrafında 60° döndürülmüş hâlidir; eşkenar üçgenin ortaya çıkması bu yüzden sürpriz değildir.</p>\n<p><i>Başka bir yol (trigonometri):</i> |AP| = a ise |AC| = |BP| = 2a·cos20°. APB üçgeninde sinüs teoremi sin(140° − x) / sin x = 2cos20° verir; x = 30° bu eşitliği sağlar, çünkü sin110° / sin30° = 2cos20°.</p>\n<p><i>Bir adım ileri:</i> Aynı şekilde m(ACB) = 20° yerine m(ACB) = α alınırsa ek çizim hangi α değerlerinde yine işe yarar? (İpucu: m(APE) = 3α olur; eşkenarlık için 3α = 60° gerekir.)</p>",
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
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><polygon points=\"486.167,337.717 679.8685708412388,524.2123876205413 948.13,542.567\" fill=\"#ffc657\" fill-opacity=\".22\" stroke=\"#ffc657\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M647.4515169633185 493.00132927845993 A44.99995049949276 44.99995049949276 0 0 0 634.9735829093067 521.1406448662618\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"618.6202992542432\" y=\"497.0528111411464\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">40°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text>",
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
      "#ffc657",
      "#35e0b0"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><polygon points=\"175.702,489.717 679.8685708412388,524.2123876205413 421.50804205260465,598.7151749117345\" fill=\"#ffc657\" fill-opacity=\".22\" stroke=\"#ffc657\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><polygon points=\"948.13,542.567 486.167,337.717 679.8685708412388,524.2123876205413\" fill=\"#35e0b0\" fill-opacity=\".22\" stroke=\"#35e0b0\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M647.4515169633185 493.00132927845993 A44.99995049949276 44.99995049949276 0 0 0 634.9735829093067 521.1406448662618\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"618.6202992542432\" y=\"497.0528111411464\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">40°</text><path d=\"M608.036511134072 519.2975938073655 A72 72 0 0 0 610.6875405938043 544.1619503702246\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"586.3983427847525\" y=\"534.1781523713482\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"8\" fill=\"#ffc657\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text>",
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
      "#ffc657",
      "#35e0b0"
     ],
     "svg": {
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><polygon points=\"175.702,489.717 679.8685708412388,524.2123876205413 421.50804205260465,598.7151749117345\" fill=\"#ffc657\" fill-opacity=\".22\" stroke=\"#ffc657\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><polygon points=\"948.13,542.567 486.167,337.717 679.8685708412388,524.2123876205413\" fill=\"#35e0b0\" fill-opacity=\".22\" stroke=\"#35e0b0\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#35e0b0\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M647.4515169633185 493.00132927845993 A44.99995049949276 44.99995049949276 0 0 0 634.9735829093067 521.1406448662618\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"618.6202992542432\" y=\"497.0528111411464\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">40°</text><path d=\"M608.036511134072 519.2975938073655 A72 72 0 0 0 610.6875405938043 544.1619503702246\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"586.3983427847525\" y=\"534.1781523713482\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#35e0b0\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#35e0b0\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text>",
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
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><polygon points=\"486.167,337.717 679.8685708412388,524.2123876205413 421.50804205260465,598.7151749117345\" fill=\"#ffc657\" fill-opacity=\".22\" stroke=\"#ffc657\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#35e0b0\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"421.50804205260465\" y1=\"598.7151749117345\" x2=\"486.167\" y2=\"337.717\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"445.58254289733424\" y1=\"464.11056238710205\" x2=\"462.09249915527033\" y2=\"472.3216125246324\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M221.50705223099095 467.29138700300956 A51.000107138854084 51.000107138854084 0 0 1 226.5831491815287 493.19831959774086\" fill=\"none\" stroke=\"#ff6fa0\" stroke-width=\"2.4\"/><text x=\"247.33993678139805\" y=\"475.6805597109314\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff6fa0\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">x</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M651.0533801416084 496.46919413197674 A40 40 0 0 0 641.4346651482197 535.295478037032\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"619.6878307884031\" y=\"509.3033793807887\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">60°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#35e0b0\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#35e0b0\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text>",
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
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><polygon points=\"486.167,337.717 175.702,489.717 421.50804205260465,598.7151749117345\" fill=\"#ffc657\" fill-opacity=\".22\" stroke=\"#ffc657\" stroke-opacity=\".7\" stroke-width=\"2\" stroke-dasharray=\"6 5\" stroke-linejoin=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#35e0b0\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"421.50804205260465\" y1=\"598.7151749117345\" x2=\"486.167\" y2=\"337.717\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"445.58254289733424\" y1=\"464.11056238710205\" x2=\"462.09249915527033\" y2=\"472.3216125246324\" stroke=\"#ffc657\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M608.036511134072 519.2975938073655 A72 72 0 0 0 610.6875405938043 544.1619503702246\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"586.3983427847525\" y=\"534.1781523713482\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M384.94184838401833 582.5005678985677 A40 40 0 0 1 431.12675704599343 559.8888910066792\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"394.24550122503695\" y=\"543.0307617638418\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">80°</text><path d=\"M212.26819366858632 505.93160701316674 A40 40 0 0 0 211.62745569073496 472.1283208735551\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"237.6908650627326\" y=\"488.5420071343492\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">50°</text><path d=\"M431.12675704599343 559.8888910066792 A40 40 0 0 1 459.9419477456238 587.6320844952438\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"464.5099919598798\" y=\"554.0516293273074\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">60°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#35e0b0\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#35e0b0\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text>",
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
      "icerik": "<rect x=\"-2000\" y=\"-2000\" width=\"5000\" height=\"4700\" fill=\"#06122a\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"175.702\" y2=\"489.717\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"948.13\" y2=\"542.567\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"486.167\" y1=\"337.717\" x2=\"679.8685708412388\" y2=\"524.2123876205413\" stroke=\"#eef3ff\" stroke-width=\"3.2\" stroke-linecap=\"round\"/><line x1=\"679.8685708412388\" y1=\"524.2123876205413\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#35e0b0\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"175.702\" y1=\"489.717\" x2=\"421.50804205260465\" y2=\"598.7151749117345\" stroke=\"#ffc657\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"421.50804205260465\" y1=\"598.7151749117345\" x2=\"486.167\" y2=\"337.717\" stroke=\"#35e0b0\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-dasharray=\"10 7\"/><line x1=\"590.700763490528\" y1=\"425.86843557728207\" x2=\"575.3348073507108\" y2=\"436.06095204325925\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"816.608969639132\" y1=\"524.5472083972409\" x2=\"811.3896012021066\" y2=\"542.2321792233006\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"719.8826472276176\" y1=\"431.50924615561684\" x2=\"708.9294280866388\" y2=\"446.3425529497777\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"725.3675719133612\" y1=\"433.9414470502223\" x2=\"714.4143527723825\" y2=\"448.77475384438316\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"427.4019671513335\" y1=\"497.9174253216918\" x2=\"422.1825987143081\" y2=\"515.6023961477515\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"433.3879721269307\" y1=\"498.3269914727898\" x2=\"428.1686036899053\" y2=\"516.0119622988495\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"551.2603065059812\" y1=\"570.6655645678917\" x2=\"550.1163063878622\" y2=\"552.261997964384\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"304.0816172876942\" y1=\"536.7994242310936\" x2=\"293.12842476491045\" y2=\"551.6327506806408\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><line x1=\"445.58254289733424\" y1=\"464.11056238710205\" x2=\"462.09249915527033\" y2=\"472.3216125246324\" stroke=\"#35e0b0\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><path d=\"M892.1837682054143 517.7585508750249 A61.2 61.2 0 0 0 887.0727492489083 538.3894252588005\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"867.3713147058412\" y=\"522.5601324401091\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M538.0343432593347 387.65474827941625 A72 72 0 0 0 551.9860962289245 366.90341073526486\" fill=\"none\" stroke=\"#ff8a1f\" stroke-width=\"2.4\"/><text x=\"564.1752173488\" y=\"390.1642880715712\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ff8a1f\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M247.53405970716676 494.6317938131758 A72 72 0 0 1 241.5211486034554 518.9032926237002\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"266.94380414717483\" y=\"512.3208310020357\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">20°</text><path d=\"M229.5902967423423 463.3339258858936 A60.00012604571069 60.00012604571069 0 0 1 235.56217550768085 493.81267011498926\" fill=\"none\" stroke=\"#ffc657\" stroke-width=\"2.4\"/><text x=\"256.1720167707385\" y=\"473.95003857969124\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#ffc657\" font-family=\"Onest, sans-serif\" font-weight=\"700\" font-size=\"17\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">30°</text><circle cx=\"486.167\" cy=\"337.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"475.4420023498884\" y=\"320.83581445498857\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">A</text><circle cx=\"175.702\" cy=\"489.717\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"155.71857571995724\" y=\"490.53109707271136\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">B</text><circle cx=\"948.13\" cy=\"542.567\" r=\"5.5\" fill=\"#eef3ff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"967.8008102031006\" y=\"546.1807551042638\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">C</text><circle cx=\"679.8685708412388\" cy=\"524.2123876205413\" r=\"5.5\" fill=\"#5b8cff\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"697.9573409912368\" y=\"532.7444679331345\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#eef3ff\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">P</text><circle cx=\"421.50804205260465\" cy=\"598.7151749117345\" r=\"5.5\" fill=\"#35e0b0\" stroke=\"#06122a\" stroke-width=\"2\"/><text x=\"406.11170219860094\" y=\"611.4804684492924\" text-anchor=\"middle\" dominant-baseline=\"central\" fill=\"#35e0b0\" font-family=\"Onest, sans-serif\" font-weight=\"800\" font-size=\"18\" paint-order=\"stroke\" stroke=\"#06122a\" stroke-width=\"4\">E</text>",
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
