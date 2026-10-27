/* AYIN GEOMETRİ SORUSU — en yenisi en üstte. Yeni ay için listenin başına bir soru eklenir.
   Şekiller Soru Masası biçimindedir ve verilere uydurulmuştur (ölçekli). */
"use strict";
window.MC = window.MC || {};
MC.ayinSorulari = [
 {
  "id": "ayin-2026-09",
  "baslik": "Ayın Olimpiyat Sorusu",
  "birim": "°",
  "ornek": false,
  "cevapMetin": "30",
  "metin": "ABC bir üçgen; B, P, C noktaları doğrusal. |AP| = |PC| ve |AC| = |BP|, m(ACB) = 20° olmak üzere m(ABC) = x kaç derecedir?",
  "ipuclari": [
   "APC üçgeni ikizkenar: m(PAC) kaç derece?",
   "m(APB) dış açıdır. Kaç derece?",
   "APB üçgeninde |BP| = |AC| bilgisini kullan: sinüs teoremi ya da uygun bir yardımcı üçgen."
  ],
  "cozum": "m(PAC) = 20°, m(APB) = 40°. |AP| = a ise |AC| = |BP| = 2a·cos20°. APB üçgeninde sinüs teoremi: sin(140° − x) / sin x = 2cos20°. x = 30° bu eşitliği sağlar: sin110° / sin30° = 2cos20°.",
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
  "uyduruldu": true,
  "ayin": true,
  "ay": "Eylül 2026",
  "tarih": "29.09.2026",
  "hazirlayan": "Muhsin ENGİN",
  "neden": "Bu soruda iki eşitlik var: |AP| = |PC| bir ikizkenar üçgen kurar, |AC| = |BP| ise birbirinden uzak iki parçayı bağlar. Olimpiyat sorularının çoğu böyledir: bilgiler şeklin farklı köşelerine dağılmıştır ve onları buluşturan bir yardımcı çizgi ya da üçgen gerekir.",
  "elYazisi": "assets/img/ayin/2026-09.jpg"
 }
];
