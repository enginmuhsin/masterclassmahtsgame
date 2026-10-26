# -*- coding: utf-8 -*-
"""
=====================================================================
 MASTER CLASS: SAYILAR VE DNA'LARI  —  Sürüm 2
 Oyunlaştırma Temelli İnteraktif Bir Hibrit Eğitim Materyali
 TÜBİTAK 2204-A  |  Matematik  |  Algoritma Tasarımı ve Uygulamaları
=====================================================================

Kurulum (internet yalnızca kurulumda gerekir):
    pip install "streamlit>=1.40" "plotly>=5.18"
    streamlit run app.py

Modüller
    🏠 Ana Sayfa          : Bugünün sayısı, 3B bölen dağları, modül kartları
    🎮 Oyun Arenası        : Sayı Avı (tek / takım), Sayı Izgarası, Sayı Bilmecesi
    🔬 Sayı Dedektörü      : İfade + dokunmatik tuş takımı, röntgen, 3B bölen küpü,
                             sayının mahallesi, kimlik kartı, EBOB–EKOK Venn şeması
    🏎️ Formula Sprint      : 11 konu, dokunmatik çoktan seçmeli hız yarışı
    🧪 Görsel Laboratuvar  : 3B bölen dağları, Ulam spirali, Eratosthenes kalburu,
                             (a+b)³ küpü, Fibonacci spirali, Collatz, asal sayma
    📚 Bilgi Köşesi        : Tanımlar, teoremler, ispatlar, yanılgılar, açık problemler

Algoritmalar
    n ≤ 10¹²  : 6k±1 deneme bölmesi — O(√n)  (öğretim amaçlı, adım adım gösterilir)
    n ≤ 10¹⁹  : Deterministik Miller–Rabin + Pollard–Brent rho
"""
from __future__ import annotations

import ast
import datetime as dt
import math
import random
import re
import time
from functools import lru_cache

import plotly.graph_objects as go
import streamlit as st

# =====================================================================
# 0) SAYFA AYARLARI VE RENK PALETİ
# =====================================================================
st.set_page_config(page_title="Master Class: Sayılar ve DNA'ları", page_icon="🔢",
                   layout="wide", initial_sidebar_state="expanded")

MAVI, KIRMIZI, YESIL = "#0d2b5b", "#dc3545", "#198754"
SARI, TURUNCU, MOR, TURKUAZ, PEMBE, CAMGOBEGI = "#ffc107", "#fd7e14", "#6f42c1", "#20c997", "#d63384", "#0dcaf0"
PALET = [MAVI, KIRMIZI, SARI, TURKUAZ, MOR, TURUNCU, PEMBE, CAMGOBEGI, YESIL]
DENEME_SINIRI = 10 ** 12      # bu sınıra kadar O(√n) deneme bölmesi
MAKS_SAYI = 10 ** 19          # Dedektörün kabul ettiği en büyük sayı

# =====================================================================
# 1) AKILLI TAHTA İÇİN CSS
# =====================================================================
CSS = """
<style>
.stApp { background: #f3f6fb; }
.stApp, .stApp p, .stApp li, .stApp label, .stApp span, .stApp td, .stApp th { color: #14213d; }
h1, h2, h3, h4 { color: MAVI !important; font-weight: 800 !important; }
.block-container { padding-top: 2rem; max-width: 1450px; }
section[data-testid="stSidebar"] { background: MAVI; }
section[data-testid="stSidebar"] * { color: #fff !important; }
section[data-testid="stSidebar"] [role="radiogroup"] label { font-size: 1.22rem; padding: .5rem .4rem; border-radius: 10px; }
section[data-testid="stSidebar"] [role="radiogroup"] label:hover { background: rgba(255,255,255,.12); }

div.stButton > button { min-height: 3.4rem; width: 100%; font-weight: 700; border-radius: 14px;
    border: 3px solid MAVI; background: #fff; color: MAVI; transition: transform .05s; }
div.stButton > button p { font-size: 1.25rem; font-weight: 700; color: inherit !important; }
div.stButton > button:hover { background: MAVI; color: #fff; }
div.stButton > button:active { transform: scale(.97); }
.st-key-btn_evet button { background: YESIL; border-color: #0f5132; color: #fff; min-height: 7rem; }
.st-key-btn_hayir button { background: KIRMIZI; border-color: #842029; color: #fff; min-height: 7rem; }
.st-key-btn_evet button p, .st-key-btn_hayir button p { font-size: 2.4rem !important; color: #fff !important; }
[class*="st-key-ana_"] button, .st-key-btn_basla button, .st-key-btn_sprint_basla button,
.st-key-btn_analiz button, .st-key-iz_kontrol button, .st-key-iz_yeni button, .st-key-bl_yeni button {
    background: MAVI; color: #fff; min-height: 4rem; }
[class*="st-key-ana_"] button p, .st-key-btn_basla button p, .st-key-btn_sprint_basla button p,
.st-key-btn_analiz button p, .st-key-iz_kontrol button p, .st-key-iz_yeni button p, .st-key-bl_yeni button p {
    font-size: 1.45rem !important; color: #fff !important; }
[class*="st-key-tus_"] button { min-height: 4rem; background: #e9eef8; }
[class*="st-key-tus_"] button p { font-size: 1.8rem !important; }
[class*="st-key-izt_"] button { min-height: 6rem; border-width: 4px; }
[class*="st-key-izt_"] button p { font-size: 2.3rem !important; font-weight: 900; }
[class*="st-key-blsec_"] button { min-height: 5rem; }
[class*="st-key-blsec_"] button p { font-size: 2rem !important; font-weight: 900; }

.yuzen-kutu { position: fixed; top: 4.2rem; right: 1.4rem; z-index: 9999; min-width: 240px; background: MAVI;
    border: 4px solid KIRMIZI; border-radius: 18px; padding: .8rem 1.1rem; box-shadow: 0 8px 24px rgba(13,43,91,.35); text-align: center; }
.yuzen-kutu * { color: #fff !important; }
.yk-baslik { font-size: .95rem; letter-spacing: .12em; opacity: .85; }
.yk-hedef { font-size: 1.65rem; font-weight: 800; line-height: 1.2; margin: .2rem 0 .4rem; }
.yk-satir { font-size: 1.3rem; font-weight: 700; }
.yk-acil { animation: nabiz 1s infinite; }
@keyframes nabiz { 50% { border-color: SARI; } }

.hero { background: linear-gradient(120deg, MAVI 0%, #1d4f9a 55%, KIRMIZI 130%); border-radius: 26px; padding: 2rem 2.2rem;
    margin-bottom: 1.2rem; box-shadow: 0 12px 30px rgba(13,43,91,.25); }
.hero * { color: #fff !important; }
.hero h1 { color: #fff !important; font-size: 2.6rem; margin: 0; }
.hero p { font-size: 1.25rem; opacity: .92; margin: .4rem 0 0; }
.kart { background: #fff; border-radius: 20px; padding: 1.1rem 1.2rem; border-top: 8px solid MAVI; height: 100%;
    box-shadow: 0 4px 14px rgba(13,43,91,.08); margin-bottom: .6rem; }
.kart h3 { margin: 0 0 .3rem; font-size: 1.35rem; }
.kart p { margin: 0; font-size: 1.02rem; color: #4a5568; }
.gunun-sayisi { background: #fff; border-radius: 22px; padding: 1.2rem 1.4rem; border: 4px dashed SARI; text-align: center; }
.gunun-sayisi .gs-sayi { font-size: 4.8rem; font-weight: 900; color: KIRMIZI; line-height: 1.05; }

.sayi-kart { background: #fff; border: 5px solid MAVI; border-radius: 24px; text-align: center; padding: 1.2rem 1rem; margin: .6rem 0 1.2rem; }
.sayi-kart .soru { font-size: 1.7rem; font-weight: 700; color: MAVI; }
.sayi-kart .sayi { font-size: 7rem; font-weight: 900; color: KIRMIZI; line-height: 1.1; }
.sayi-kart .odul { font-size: 1.05rem; color: #4a5568; }
.geri-bildirim { border-radius: 16px; padding: .9rem 1.2rem; font-size: 1.2rem; margin-top: .8rem; }
.gb-dogru { background: #d1e7dd; border-left: 10px solid YESIL; }
.gb-yanlis { background: #f8d7da; border-left: 10px solid KIRMIZI; }
.gb-bilgi { background: #e7f1ff; border-left: 10px solid MAVI; }
.durum { border-radius: 20px; padding: 1.1rem 1.5rem; font-size: 1.9rem; font-weight: 900; text-align: center; margin-bottom: 1rem; }
.durum * { color: #fff !important; }
.durum small { display: block; font-size: 1.05rem; font-weight: 600; opacity: .9; }
.durum-asal { background: YESIL; } .durum-yari { background: KIRMIZI; } .durum-bilesik { background: MAVI; } .durum-birim { background: #6c757d; }
.rozet { display:inline-block; padding:.32rem .75rem; margin:.18rem; border-radius:999px; background:MAVI; color:#fff !important; font-weight:700; font-size:1.02rem; }
.rozet-kirmizi { background: KIRMIZI; } .rozet-sari { background: SARI; color: #14213d !important; }
.ozellik-tablo { width:100%; border-collapse: collapse; font-size: 1.08rem; background:#fff; }
.ozellik-tablo th { background: MAVI; color:#fff !important; padding:.6rem; text-align:left; }
.ozellik-tablo td { border-bottom: 1px solid #d6dbe6; padding:.5rem .6rem; vertical-align: top; }
.ozellik-tablo tr.evet td { background: #eef7f1; }
.izgara { display:grid; gap:5px; padding:.6rem; background:#fff; border-radius:12px; width:max-content; max-width:100%; overflow-x:auto; }
.nokta { width:16px; height:16px; border-radius:50%; display:inline-block; }
.iz-kutu { background:#fff; border-radius:12px; padding:.8rem 1rem; font-family: ui-monospace, Menlo, Consolas, monospace; font-size:1.02rem; line-height:1.9; }
.iz-bolen { background: KIRMIZI; color:#fff !important; padding:.1rem .45rem; border-radius:6px; font-weight:800; }
.iz-deneme { background:#e2e8f0; padding:.1rem .45rem; border-radius:6px; }
.kimlik { display:grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: .7rem; }
.kimlik div { background:#fff; border-radius:14px; padding:.7rem .9rem; border-left: 6px solid MAVI; }
.kimlik b { display:block; font-size:.92rem; color:#4a5568 !important; font-weight:600; }
.kimlik span { font-size:1.3rem; font-weight:800; color: MAVI !important; word-break: break-all; }
.bilgi-kutu { background:#fff; border-left: 8px solid MAVI; border-radius: 12px; padding: .9rem 1.2rem; margin:.6rem 0; }
.benzetme { background:#fff4e5; border-left: 8px solid TURUNCU; border-radius: 12px; padding: .8rem 1.1rem; margin:.6rem 0; }
.ipucu { background:#fff; border-radius: 14px; padding: .7rem 1rem; margin: .35rem 0; font-size: 1.35rem; border-left: 8px solid SARI; }
.ifade-ekran { background: #14213d; border-radius: 14px; padding: .6rem 1rem; font-family: ui-monospace, Menlo, monospace;
    font-size: 2rem; color: #7CFC9A !important; min-height: 3.6rem; text-align: right; overflow-x: auto; }
div[data-testid="stMetricValue"] { font-size: 2.3rem; color: MAVI; font-weight: 800; }
</style>
"""
for _ad, _renk in {"MAVI": MAVI, "KIRMIZI": KIRMIZI, "YESIL": YESIL, "SARI": SARI, "TURUNCU": TURUNCU}.items():
    CSS = CSS.replace(_ad, _renk)
st.markdown(CSS, unsafe_allow_html=True)

# =====================================================================
# 2) MATEMATİK ÇEKİRDEĞİ
# =====================================================================
UST = str.maketrans("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹")


def us(e: int) -> str:
    return str(e).translate(UST)


def tr_sayi(n: int) -> str:
    """Türkçe binlik ayıracı: 1234567 -> 1.234.567"""
    return f"{n:,}".replace(",", ".")


def tr_ondalik(x: float, basamak: int = 2) -> str:
    return f"{x:,.{basamak}f}".replace(",", "X").replace(".", ",").replace("X", ".")


def is_tam_kare(n: int) -> bool:
    if n < 0:
        return False
    r = math.isqrt(n)
    return r * r == n


def kup_kok(n: int) -> int:
    """n >= 0 için ⌊∛n⌋ — kayan nokta hatası tamsayı düzeltmesiyle giderilir."""
    if n <= 0:
        return 0
    r = int(round(n ** (1.0 / 3.0)))
    while r ** 3 > n:
        r -= 1
    while (r + 1) ** 3 <= n:
        r += 1
    return r


def elek(n: int) -> list:
    """Eratosthenes kalburu: n'e kadar asalların listesi."""
    if n < 2:
        return []
    isaret = bytearray([1]) * (n + 1)
    isaret[0] = isaret[1] = 0
    for p in range(2, math.isqrt(n) + 1):
        if isaret[p]:
            isaret[p * p::p] = bytearray(len(range(p * p, n + 1, p)))
    return [i for i, v in enumerate(isaret) if v]


KUCUK_ASALLAR = elek(10_000)
MR_TABANLARI = (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37)


def miller_rabin(n: int) -> bool:
    """Deterministik Miller–Rabin: bu 12 taban n < 3,3·10²⁴ için kesin sonuç verir."""
    if n < 2:
        return False
    for p in MR_TABANLARI:
        if n % p == 0:
            return n == p
    d, s = n - 1, 0
    while d % 2 == 0:
        d //= 2
        s += 1
    for a in MR_TABANLARI:
        x = pow(a, d, n)
        if x in (1, n - 1):
            continue
        for _ in range(s - 1):
            x = x * x % n
            if x == n - 1:
                break
        else:
            return False
    return True


def is_asal(n: int) -> bool:
    """n ≤ 10¹²: 6k±1 deneme bölmesi O(√n).  Daha büyükler: Miller–Rabin."""
    if n < 2:
        return False
    if n > DENEME_SINIRI:
        return miller_rabin(n)
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    sinir, i = math.isqrt(n), 5
    while i <= sinir:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def asallik_izi(n: int, gosterim_siniri: int = 80):
    """Deneme bölmesinin adım adım izi: (gösterilen denemeler, bulunan bölen | None, toplam deneme)."""
    if n < 4:
        return [], None, 0
    denenen, sayac = [], 0
    for d in (2, 3):
        sayac += 1
        denenen.append(d)
        if n % d == 0:
            return denenen, d, sayac
    sinir, i = math.isqrt(n), 5
    while i <= sinir:
        for d in (i, i + 2):
            if d > sinir:
                break
            sayac += 1
            if len(denenen) < gosterim_siniri:
                denenen.append(d)
            if n % d == 0:
                return denenen, d, sayac
        i += 6
    return denenen, None, sayac


def pollard_brent(n: int) -> int:
    """Pollard rho (Brent sürümü): bileşik n'in asal olmak zorunda olmayan bir bölenini bulur."""
    if n % 2 == 0:
        return 2
    if n % 3 == 0:
        return 3
    while True:
        y, c, m = random.randrange(1, n), random.randrange(1, n), 128
        g = r = q = 1
        x = ys = y
        while g == 1:
            x = y
            for _ in range(r):
                y = (y * y + c) % n
            k = 0
            while k < r and g == 1:
                ys = y
                for _ in range(min(m, r - k)):
                    y = (y * y + c) % n
                    q = q * abs(x - y) % n
                g = math.gcd(q, n)
                k += m
            r *= 2
        if g == n:
            g = 1
            while g == 1:
                ys = (ys * ys + c) % n
                g = math.gcd(abs(x - ys), n)
        if g != n:
            return g


def _rho_ile_ayir(n: int, cikti: list):
    if n == 1:
        return
    if miller_rabin(n):
        cikti.append(n)
        return
    d = pollard_brent(n)
    _rho_ile_ayir(d, cikti)
    _rho_ile_ayir(n // d, cikti)


@lru_cache(maxsize=8192)
def get_asal_carpanlar(n: int) -> tuple:
    """Asal çarpanlar (tekrarlı, sıralı).  n ≤ 10¹²: deneme bölmesi O(√n); üstü: deneme + Pollard rho."""
    carpanlar = []
    if n < 2:
        return tuple()
    if n <= DENEME_SINIRI:
        for p in (2, 3):
            while n % p == 0:
                carpanlar.append(p)
                n //= p
        i = 5
        while i * i <= n:
            while n % i == 0:
                carpanlar.append(i)
                n //= i
            while n % (i + 2) == 0:
                carpanlar.append(i + 2)
                n //= i + 2
            i += 6
        if n > 1:
            carpanlar.append(n)
        return tuple(carpanlar)
    for p in KUCUK_ASALLAR:
        if p * p > n:
            break
        while n % p == 0:
            carpanlar.append(p)
            n //= p
    if n > 1:
        _rho_ile_ayir(n, carpanlar)
    return tuple(sorted(carpanlar))


def carpan_ussu(n: int) -> dict:
    sozluk: dict = {}
    for p in get_asal_carpanlar(n):
        sozluk[p] = sozluk.get(p, 0) + 1
    return sozluk


def carpim_yazisi(n: int) -> str:
    return " × ".join(f"{tr_sayi(p)}{us(e) if e > 1 else ''}" for p, e in carpan_ussu(n).items())


def carpim_latex(n: int) -> str:
    return r" \cdot ".join(f"{p}^{{{e}}}" if e > 1 else f"{p}" for p, e in carpan_ussu(n).items())


@lru_cache(maxsize=4096)
def get_bolenler(n: int) -> tuple:
    """Tüm bölenler.  n ≤ 10¹²: 1..√n tarama + ayna (n/d) — O(√n).  Üstü: asal çarpanlardan üretim."""
    if n < 1:
        return tuple()
    if n <= DENEME_SINIRI:
        kucuk, buyuk = [], []
        for d in range(1, math.isqrt(n) + 1):
            if n % d == 0:
                kucuk.append(d)
                if d != n // d:
                    buyuk.append(n // d)
        return tuple(kucuk + buyuk[::-1])
    bolenler = [1]
    for p, e in carpan_ussu(n).items():
        bolenler = [d * p ** k for d in bolenler for k in range(e + 1)]
    return tuple(sorted(bolenler))


def tau(n: int) -> int:
    return math.prod(e + 1 for e in carpan_ussu(n).values()) if n > 1 else 1


def sigma(n: int) -> int:
    return math.prod((p ** (e + 1) - 1) // (p - 1) for p, e in carpan_ussu(n).items()) if n > 1 else 1


def euler_phi(n: int) -> int:
    sonuc = n
    for p in carpan_ussu(n):
        sonuc -= sonuc // p
    return sonuc


def mobius(n: int) -> int:
    if n == 1:
        return 1
    ussler = carpan_ussu(n).values()
    return 0 if any(e > 1 for e in ussler) else (-1) ** len(ussler)


def rakam_toplami(n: int) -> int:
    return sum(int(c) for c in str(abs(n)))


def dijital_kok(n: int) -> int:
    return 0 if n == 0 else 1 + (n - 1) % 9


# ---- Sayı türü testleri ----
def is_cift(n): return n % 2 == 0
def is_tek(n): return n % 2 == 1
def is_yari_asal(n): return len(get_asal_carpanlar(n)) == 2
def is_tam_kup(n): return n >= 0 and kup_kok(n) ** 3 == n
def is_mukemmel(n): return n > 1 and sigma(n) == 2 * n
def is_fibonacci(n): return n >= 0 and (is_tam_kare(5 * n * n + 4) or is_tam_kare(5 * n * n - 4))
def is_palindromik(n): return n >= 0 and str(n) == str(n)[::-1]
def is_harshad(n): return n > 0 and n % rakam_toplami(n) == 0
def is_ucgensel(n): return n >= 1 and is_tam_kare(8 * n + 1)
def is_ikinin_kuvveti(n): return n >= 1 and (n & (n - 1)) == 0


def is_armstrong(n: int) -> bool:
    s = str(n)
    return n >= 1 and sum(int(c) ** len(s) for c in s) == n


RAMANUJAN_SINIRI = 10 ** 15


def ramanujan_temsilleri(n: int) -> list:
    """n = a³ + b³ (1 ≤ a ≤ b) yazılışları; iki işaretçi yöntemi, O(∛n)."""
    temsiller = []
    a, b = 1, kup_kok(n)
    while a <= b:
        s = a ** 3 + b ** 3
        if s == n:
            temsiller.append((a, b))
            a += 1
            b -= 1
        elif s < n:
            a += 1
        else:
            b -= 1
    return temsiller


def is_ramanujan(n: int) -> bool:
    return n <= RAMANUJAN_SINIRI and len(ramanujan_temsilleri(n)) >= 2


def fibonacci_komsulari(n: int):
    a, b = 0, 1
    while b < n:
        a, b = b, a + b
    return a, b


def collatz(n: int, sinir: int = 100_000) -> list:
    yol = [n]
    while n != 1 and len(yol) < sinir:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        yol.append(n)
    return yol


def iki_kare_mi(n: int) -> bool:
    """Fermat: n iki karenin toplamı ⇔ 4k+3 biçimli her asal çift kuvvette görünür."""
    return all(e % 2 == 0 for p, e in carpan_ussu(n).items() if p % 4 == 3)


def iki_kare_temsili(n: int):
    if not iki_kare_mi(n) or n > 10 ** 10:
        return None
    for a in range(0, math.isqrt(n // 2) + 1):
        b2 = n - a * a
        if is_tam_kare(b2):
            return a, math.isqrt(b2)
    return None


def goldbach(n: int):
    if n < 4 or n % 2:
        return None
    for p in KUCUK_ASALLAR:
        if p > n // 2:
            break
        if is_asal(n - p):
            return p, n - p
    p = KUCUK_ASALLAR[-1]
    while p <= n // 2:
        if is_asal(p) and is_asal(n - p):
            return p, n - p
        p += 2
    return None


def onceki_asal(n: int):
    m = n - 1
    while m >= 2:
        if is_asal(m):
            return m
        m -= 1
    return None


def sonraki_asal(n: int) -> int:
    m = n + 1
    while not is_asal(m):
        m += 1
    return m


def roma(n: int) -> str:
    if not 1 <= n <= 3999:
        return "—"
    tablo = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"),
             (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]
    s = ""
    for deger, harf in tablo:
        while n >= deger:
            s += harf
            n -= deger
    return s


# ---- Güvenli ifade çözümleyici (Dedektör girişi: 7*13, 2^31-1, 10!, 1.000.003) ----
def ifade_coz(metin: str) -> int:
    s = metin.strip().replace(" ", "").replace(".", "").replace(",", "")
    for eski, yeni in {"×": "*", "x": "*", "X": "*", "·": "*", "^": "**", "÷": "//", "−": "-", "–": "-"}.items():
        s = s.replace(eski, yeni)
    s = re.sub(r"(\d+)!", r"fakt(\1)", s)
    if not s:
        raise ValueError("Boş ifade")
    if not re.fullmatch(r"[0-9+\-*/%()fakt]+", s):
        raise ValueError("Yalnızca rakam ve + − × ^ ! ( ) kullanılabilir")

    def deger(dugum):
        if isinstance(dugum, ast.Expression):
            return deger(dugum.body)
        if isinstance(dugum, ast.Constant) and isinstance(dugum.value, int):
            return dugum.value
        if isinstance(dugum, ast.UnaryOp) and isinstance(dugum.op, (ast.USub, ast.UAdd)):
            v = deger(dugum.operand)
            return -v if isinstance(dugum.op, ast.USub) else v
        if isinstance(dugum, ast.BinOp):
            a, b = deger(dugum.left), deger(dugum.right)
            if isinstance(dugum.op, ast.Pow):
                if b < 0 or b > 400 or (abs(a) > 1 and b * math.log10(abs(a)) > 40):
                    raise ValueError("Üs çok büyük")
                return a ** b
            if isinstance(dugum.op, ast.Add):
                return a + b
            if isinstance(dugum.op, ast.Sub):
                return a - b
            if isinstance(dugum.op, ast.Mult):
                if abs(a) > 10 ** 40 or abs(b) > 10 ** 40:
                    raise ValueError("Sayı çok büyük")
                return a * b
            if isinstance(dugum.op, (ast.FloorDiv, ast.Div)):
                if b == 0:
                    raise ValueError("Sıfıra bölme")
                if a % b:
                    raise ValueError("Bölme tam sonuç vermiyor")
                return a // b
            if isinstance(dugum.op, ast.Mod):
                return a % b
        if (isinstance(dugum, ast.Call) and isinstance(dugum.func, ast.Name) and dugum.func.id == "fakt"
                and len(dugum.args) == 1):
            v = deger(dugum.args[0])
            if not 0 <= v <= 30:
                raise ValueError("Faktöriyel 0–30 arasında olmalı")
            return math.factorial(v)
        raise ValueError("Geçersiz ifade")

    try:
        agac = ast.parse(s, mode="eval")
    except SyntaxError as e:
        raise ValueError("İfade anlaşılamadı") from e
    return int(deger(agac))


# =====================================================================
# 3) SAYI TÜRÜ KAYIT DEFTERİ + KANIT ÜRETİCİ
# =====================================================================
KATEGORILER = {
    "cift":           {"ad": "Çift Sayı",        "f": is_cift,           "puan": 20,  "agirlik": 0.5},
    "tek":            {"ad": "Tek Sayı",         "f": is_tek,            "puan": 20,  "agirlik": 0.5},
    "asal":           {"ad": "Asal Sayı",        "f": is_asal,           "puan": 40,  "agirlik": 2.0},
    "yari_asal":      {"ad": "Yarı Asal",        "f": is_yari_asal,      "puan": 60,  "agirlik": 3.0},
    "tam_kare":       {"ad": "Tam Kare",         "f": is_tam_kare,       "puan": 40,  "agirlik": 1.2},
    "tam_kup":        {"ad": "Tam Küp",          "f": is_tam_kup,        "puan": 90,  "agirlik": 1.0},
    "ucgensel":       {"ad": "Üçgensel Sayı",    "f": is_ucgensel,       "puan": 50,  "agirlik": 1.0},
    "fibonacci":      {"ad": "Fibonacci Sayısı", "f": is_fibonacci,      "puan": 80,  "agirlik": 1.0},
    "ikinin_kuvveti": {"ad": "2'nin Kuvveti",    "f": is_ikinin_kuvveti, "puan": 70,  "agirlik": 1.0},
    "palindromik":    {"ad": "Palindromik",      "f": is_palindromik,    "puan": 40,  "agirlik": 1.0},
    "harshad":        {"ad": "Harshad Sayısı",   "f": is_harshad,        "puan": 30,  "agirlik": 1.0},
    "armstrong":      {"ad": "Armstrong Sayısı", "f": is_armstrong,      "puan": 150, "agirlik": 0.8},
    "mukemmel":       {"ad": "Mükemmel Sayı",    "f": is_mukemmel,       "puan": 200, "agirlik": 0.6},
    "ramanujan":      {"ad": "Ramanujan Sayısı", "f": is_ramanujan,      "puan": 200, "agirlik": 0.6},
}


def kanit(n: int, k: str) -> str:
    """Bir sayının bir kategoriye ait olup olmadığının öğrenci dostu, kısa kanıtı."""
    r = math.isqrt(max(n, 0))
    N = tr_sayi(n)
    if k == "cift":
        return f"{N} ÷ 2 → kalan {n % 2}. " + ("Çifttir." if n % 2 == 0 else "Çift değildir (tektir).")
    if k == "tek":
        return f"{N} ÷ 2 → kalan {n % 2}. " + ("Tektir." if n % 2 == 1 else "Tek değildir (çifttir).")
    if k == "asal":
        if n < 2:
            return f"{n} asal değildir: asal sayılar 2'den başlar."
        if is_asal(n):
            if n > DENEME_SINIRI:
                return f"{N} asaldır: deterministik Miller–Rabin testi 12 tabanın hepsinde geçti."
            return f"{N} asaldır: 2'den ⌊√{N}⌋ = {tr_sayi(r)} sayısına kadar hiçbir bölen yoktur."
        c = get_asal_carpanlar(n)
        if len(c) == 2:
            return f"{N} asal DEĞİLDİR, yarı asaldır: {N} = {tr_sayi(c[0])} × {tr_sayi(c[1])}."
        return f"{N} asal değildir: {N} = {carpim_yazisi(n)}."
    if k == "yari_asal":
        c = get_asal_carpanlar(n)
        if len(c) == 2:
            return f"{N} = {tr_sayi(c[0])} × {tr_sayi(c[1])} → tam iki asalın çarpımı: yarı asaldır."
        if len(c) == 1:
            return f"{N} asaldır; tek bir asal çarpanı var, yarı asal değildir."
        if len(c) == 0:
            return f"{n} sayısının asal çarpanı yoktur."
        return f"{N} = {carpim_yazisi(n)} → {len(c)} asal çarpan (tekrarlarıyla); yarı asal değildir."
    if k == "tam_kare":
        if r * r == n:
            return f"{N} = {tr_sayi(r)}² → tam karedir."
        return f"{tr_sayi(r)}² = {tr_sayi(r * r)} < {N} < {tr_sayi((r + 1) ** 2)} = {tr_sayi(r + 1)}² → tam kare değildir."
    if k == "tam_kup":
        c = kup_kok(n)
        if c ** 3 == n:
            return f"{N} = {tr_sayi(c)}³ → tam küptür."
        return f"{tr_sayi(c)}³ = {tr_sayi(c ** 3)} < {N} < {tr_sayi((c + 1) ** 3)} = {tr_sayi(c + 1)}³ → tam küp değildir."
    if k == "mukemmel":
        s = sigma(n) - n
        if n > 1 and s == n:
            return f"Kendisi hariç bölenlerinin toplamı {tr_sayi(s)} = {N} → mükemmeldir."
        tur = "bol (zengin)" if s > n else "eksik"
        return f"Kendisi hariç bölenlerinin toplamı {tr_sayi(s)} ≠ {N} → mükemmel değildir ({tur} sayı)."
    if k == "fibonacci":
        if n in (0, 1):
            return f"{n} Fibonacci dizisinin ilk terimlerindendir."
        a, b = fibonacci_komsulari(n)
        if b == n:
            return f"Dizide … {tr_sayi(a)}, {N} … → Fibonacci sayısıdır (5n²±4 testi tam kare verir)."
        return f"Dizide {tr_sayi(a)} ile {tr_sayi(b)} arasında kalır → Fibonacci değildir."
    if k == "palindromik":
        ters = str(n)[::-1]
        return f"{n} tersten {ters} okunur → " + ("palindromiktir." if ters == str(n) else "palindromik değildir.")
    if k == "harshad":
        s = rakam_toplami(n)
        if n % s == 0:
            return f"Rakam toplamı {s}; {N} ÷ {s} = {tr_sayi(n // s)} → Harshad sayısıdır."
        return f"Rakam toplamı {s}; {N} ÷ {s} kalan {n % s} → Harshad değildir."
    if k == "ramanujan":
        if n > RAMANUJAN_SINIRI:
            return "10¹⁵'ten büyük sayılarda bu test hız nedeniyle yapılmaz."
        t = ramanujan_temsilleri(n)
        if len(t) >= 2:
            return f"{N} = " + " = ".join(f"{a}³ + {b}³" for a, b in t) + " → iki farklı küp toplamı: Ramanujan sayısıdır."
        if len(t) == 1:
            a, b = t[0]
            return f"{N} = {a}³ + {b}³ yalnızca tek yolla yazılır; iki farklı yol gerekir → değildir."
        return f"{N} iki pozitif küpün toplamı olarak yazılamaz → Ramanujan sayısı değildir."
    if k == "ucgensel":
        m = (math.isqrt(8 * n + 1) - 1) // 2 if n >= 1 else 0
        t = m * (m + 1) // 2
        if n >= 1 and t == n:
            return f"{N} = {tr_sayi(m)}·{tr_sayi(m + 1)}/2 = T{m} → üçgensel sayıdır."
        return f"T{m} = {tr_sayi(t)} < {N} < T{m + 1} = {tr_sayi((m + 1) * (m + 2) // 2)} → üçgensel değildir."
    if k == "ikinin_kuvveti":
        if n < 1:
            return "Pozitif olmayan sayılar 2'nin kuvveti değildir."
        e = n.bit_length() - 1
        if (1 << e) == n:
            return f"{N} = 2{us(e)} (ikili tabanda 1 ve ardından {e} sıfır) → 2'nin kuvvetidir."
        return f"2{us(e)} = {tr_sayi(1 << e)} < {N} < 2{us(e + 1)} = {tr_sayi(1 << (e + 1))} → 2'nin kuvveti değildir."
    if k == "armstrong":
        s = str(n)
        toplam = sum(int(c) ** len(s) for c in s)
        ifade = " + ".join(f"{c}{us(len(s))}" for c in s)
        return f"{ifade} = {tr_sayi(toplam)} " + ("= n → Armstrong sayısıdır." if toplam == n else f"≠ {N} → Armstrong değildir.")
    return ""


# =====================================================================
# 4) GRAFİK YARDIMCILARI (Plotly — çevrimdışı çalışır)
# =====================================================================
_SURUM = tuple(int(x) for x in re.findall(r"\d+", st.__version__)[:2])
PLOTLY_AYAR = {"displaylogo": False, "modeBarButtonsToRemove": ["lasso2d", "select2d"]}


def grafik(fig: go.Figure, anahtar: str, yukseklik: int = 520):
    fig.update_layout(height=yukseklik, paper_bgcolor="white", plot_bgcolor="white",
                      font=dict(family="Segoe UI, Helvetica, Arial", size=15, color="#14213d"),
                      margin=dict(l=10, r=10, t=60, b=10), title_font=dict(size=20, color=MAVI))
    if _SURUM >= (1, 50):
        st.plotly_chart(fig, config=PLOTLY_AYAR, key=anahtar)
    else:
        st.plotly_chart(fig, use_container_width=True, config=PLOTLY_AYAR, key=anahtar)


def ulam_koordinatlari(N: int) -> list:
    """Ulam spirali: 1 merkezde, sayılar saat yönünün tersine dönerek dizilir."""
    x = y = 0
    dx, dy = 1, 0
    koordinat, n, adim = [(0, 0)], 1, 1
    while n < N:
        for _ in range(2):
            for _ in range(adim):
                if n >= N:
                    break
                x, y, n = x + dx, y + dy, n + 1
                koordinat.append((x, y))
            dx, dy = -dy, dx
        adim += 1
    return koordinat


@st.cache_data(show_spinner=False)
def bolen_sayilari_dizisi(N: int) -> list:
    """1..N için τ(n) — elek benzeri O(N log N)."""
    t = [0] * (N + 1)
    for d in range(1, N + 1):
        for k in range(d, N + 1, d):
            t[k] += 1
    return t


def fig_bolen_daglari(N: int, olcut: str) -> go.Figure:
    koordinat = ulam_koordinatlari(N)
    ts = bolen_sayilari_dizisi(N)
    if olcut.startswith("Bölen"):
        z = [ts[n] for n in range(1, N + 1)]
        ad = "τ(n)"
    elif olcut.startswith("Asal çarpan"):
        z = [len(get_asal_carpanlar(n)) for n in range(1, N + 1)]
        ad = "Ω(n)"
    else:
        z = [sigma(n) / n for n in range(1, N + 1)]
        ad = "σ(n)/n"
    xs, ys = [c[0] for c in koordinat], [c[1] for c in koordinat]
    cx, cy, cz = [], [], []
    for x, y, h in zip(xs, ys, z):
        cx += [x, x, None]
        cy += [y, y, None]
        cz += [0, h, None]
    metin = [f"n = {n}<br>{ad} = {tr_ondalik(h) if isinstance(h, float) else h}" for n, h in zip(range(1, N + 1), z)]
    asal_i = [i for i in range(N) if ts[i + 1] == 2]
    fig = go.Figure()
    fig.add_trace(go.Scatter3d(x=cx, y=cy, z=cz, mode="lines", line=dict(color="rgba(13,43,91,.18)", width=2),
                               hoverinfo="skip", showlegend=False))
    fig.add_trace(go.Scatter3d(x=xs, y=ys, z=z, mode="markers", text=metin, hoverinfo="text", name="Bileşik sayılar",
                               marker=dict(size=4.5, color=z, colorscale="Turbo", opacity=.95,
                                           colorbar=dict(title=ad, thickness=14))))
    fig.add_trace(go.Scatter3d(x=[xs[i] for i in asal_i], y=[ys[i] for i in asal_i], z=[z[i] for i in asal_i],
                               mode="markers", name="Asal sayılar (vadiler)", hoverinfo="skip",
                               marker=dict(size=4, color=KIRMIZI, symbol="diamond")))
    fig.update_layout(title=f"Bölen Dağları: Ulam spiralinde yükseklik = {ad}",
                      legend=dict(orientation="h", y=-0.02),
                      scene=dict(xaxis_title="", yaxis_title="", zaxis_title=ad, aspectmode="manual",
                                 aspectratio=dict(x=1, y=1, z=.6), camera=dict(eye=dict(x=1.5, y=1.5, z=1.0)),
                                 xaxis=dict(showticklabels=False), yaxis=dict(showticklabels=False)))
    return fig


def fig_bolen_kupu(n: int) -> tuple:
    """Bölen kafesi: n = p^a q^b r^c ise her bölen (i, j, k) noktasıdır; nokta sayısı (a+1)(b+1)(c+1) = τ(n)."""
    cu = carpan_ussu(n)
    secili = sorted(cu.items(), key=lambda t: -t[1])[:3]
    secili = sorted(secili)
    while len(secili) < 3:
        secili.append((1, 0))
    (p, a), (q, b), (r, c) = secili
    xs, ys, zs, deger, metin = [], [], [], [], []
    for i in range(a + 1):
        for j in range(b + 1):
            for k in range(c + 1):
                d = p ** i * q ** j * r ** k
                xs.append(i), ys.append(j), zs.append(k), deger.append(math.log10(d) if d > 0 else 0)
                metin.append(f"bölen = {tr_sayi(d)}")
    kenar_x, kenar_y, kenar_z = [], [], []
    for i in range(a + 1):
        for j in range(b + 1):
            for k in range(c + 1):
                for di, dj, dk in ((1, 0, 0), (0, 1, 0), (0, 0, 1)):
                    if i + di <= a and j + dj <= b and k + dk <= c:
                        kenar_x += [i, i + di, None]
                        kenar_y += [j, j + dj, None]
                        kenar_z += [k, k + dk, None]
    fig = go.Figure()
    fig.add_trace(go.Scatter3d(x=kenar_x, y=kenar_y, z=kenar_z, mode="lines", hoverinfo="skip", showlegend=False,
                               line=dict(color="rgba(13,43,91,.35)", width=3)))
    fig.add_trace(go.Scatter3d(x=xs, y=ys, z=zs, mode="markers", text=metin, hoverinfo="text", showlegend=False,
                               marker=dict(size=9 if len(xs) < 200 else 5, color=deger, colorscale="Plasma",
                                           line=dict(color="white", width=1),
                                           colorbar=dict(title="log₁₀(bölen)", thickness=14))))
    eksen = lambda pr, e: f"{pr} üssü (0–{e})" if pr > 1 else "—"
    fig.update_layout(title=f"{tr_sayi(n)} sayısının Bölen Küpü",
                      scene=dict(xaxis_title=eksen(p, a), yaxis_title=eksen(q, b), zaxis_title=eksen(r, c),
                                 camera=dict(eye=dict(x=1.6, y=1.4, z=1.1)), aspectmode="cube"))
    kalan = len(cu) - len([s for s in secili if s[0] > 1])
    return fig, (p, a), (q, b), (r, c), kalan


def fig_mahalle(n: int) -> go.Figure:
    bas = max(1, n - 12)
    sayilar = list(range(bas, bas + 25))
    renk, boyut, metin = [], [], []
    for m in sayilar:
        if m == n:
            renk.append(SARI)
        elif is_asal(m):
            renk.append(KIRMIZI)
        elif is_yari_asal(m):
            renk.append(TURUNCU)
        else:
            renk.append("#9aa5b8")
        boyut.append(46 if m == n else 30)
        metin.append(kanit(m, "asal"))
    fig = go.Figure(go.Scatter(x=list(range(25)), y=[0] * 25, mode="markers+text", text=[tr_sayi(m) for m in sayilar],
                               textposition="middle center", hovertext=metin, hoverinfo="text",
                               textfont=dict(color="white", size=12),
                               marker=dict(size=boyut, color=renk, line=dict(color=MAVI, width=2))))
    fig.update_layout(title="Sayının mahallesi — kırmızı: asal · turuncu: yarı asal · sarı: seçilen sayı",
                      xaxis=dict(visible=False), yaxis=dict(visible=False, range=[-1, 1]), showlegend=False)
    return fig


def fig_venn(a: int, b: int) -> go.Figure:
    ca, cb = list(get_asal_carpanlar(a)), list(get_asal_carpanlar(b))
    ortak, kalan_b = [], cb.copy()
    sadece_a = []
    for p in ca:
        if p in kalan_b:
            ortak.append(p)
            kalan_b.remove(p)
        else:
            sadece_a.append(p)
    sadece_b = kalan_b

    def yaz(liste):
        if not liste:
            return "—"
        parcalar = [tr_sayi(x) for x in liste]
        return "<br>".join(" · ".join(parcalar[i:i + 4]) for i in range(0, len(parcalar), 4))

    fig = go.Figure()
    fig.add_shape(type="circle", x0=0, y0=0, x1=6, y1=6, fillcolor="rgba(13,43,91,.18)", line=dict(color=MAVI, width=4))
    fig.add_shape(type="circle", x0=4, y0=0, x1=10, y1=6, fillcolor="rgba(220,53,69,.18)", line=dict(color=KIRMIZI, width=4))
    for x, liste in ((2.2, sadece_a), (5, ortak), (7.8, sadece_b)):
        fig.add_annotation(x=x, y=3, text=f"<b>{yaz(liste)}</b>", showarrow=False, font=dict(size=20, color="#14213d"))
    fig.add_annotation(x=3, y=6.6, text=f"<b>{tr_sayi(a)}</b>", showarrow=False, font=dict(size=22, color=MAVI))
    fig.add_annotation(x=7, y=6.6, text=f"<b>{tr_sayi(b)}</b>", showarrow=False, font=dict(size=22, color=KIRMIZI))
    fig.add_annotation(x=5, y=-0.6, text="Ortak bölge = EBOB · Tüm bölgeler = EKOK", showarrow=False,
                       font=dict(size=15, color="#4a5568"))
    fig.update_layout(title="Asal çarpan Venn şeması", xaxis=dict(visible=False, range=[-0.5, 10.5]),
                      yaxis=dict(visible=False, range=[-1.2, 7.2], scaleanchor="x"), showlegend=False)
    return fig


def fig_ulam(N: int, kat: str) -> go.Figure:
    koordinat = ulam_koordinatlari(N)
    f = KATEGORILER[kat]["f"]
    ic = [(x, y, n) for n, (x, y) in enumerate(koordinat, start=1) if f(n)]
    fig = go.Figure()
    fig.add_trace(go.Scattergl(x=[c[0] for c in koordinat], y=[c[1] for c in koordinat], mode="markers",
                               marker=dict(size=3, color="#d6dbe6"), hoverinfo="skip", name="Diğer sayılar"))
    fig.add_trace(go.Scattergl(x=[c[0] for c in ic], y=[c[1] for c in ic], mode="markers",
                               text=[f"n = {tr_sayi(c[2])}" for c in ic], hoverinfo="text",
                               marker=dict(size=5 if N > 3000 else 7, color=[c[2] for c in ic], colorscale="Turbo"),
                               name=KATEGORILER[kat]["ad"]))
    fig.update_layout(title=f"Ulam Spirali — {KATEGORILER[kat]['ad']} ({len(ic)} tane, n ≤ {tr_sayi(N)})",
                      xaxis=dict(visible=False), yaxis=dict(visible=False, scaleanchor="x"),
                      legend=dict(orientation="h", y=-0.02))
    return fig


ELEK_RENKLERI = {2: CAMGOBEGI, 3: MOR, 5: TURUNCU, 7: TURKUAZ, 11: PEMBE, 13: "#6610f2"}


def fig_eratosthenes(N: int, adim: int) -> tuple:
    """adim = elemede kullanılan asal sayısı (0 = başlangıç)."""
    kullanilacak = [p for p in KUCUK_ASALLAR if p * p <= N]
    aktif = kullanilacak[:adim]
    en_kucuk = {}
    for m in range(2, N + 1):
        for p in kullanilacak:
            if p * p > m:
                break
            if m % p == 0:
                en_kucuk[m] = p
                break
    gruplar = {}
    for m in range(1, N + 1):
        if m == 1:
            g = "1 (asal değil)"
        elif m in en_kucuk and en_kucuk[m] in aktif:
            g = f"{en_kucuk[m]}'nin katı (elendi)"
        elif m in aktif:
            g = "Eleyici asal"
        elif adim == len(kullanilacak) and m not in en_kucuk:
            g = "Asal (kalburdan geçti)"
        else:
            g = "Henüz bilinmiyor"
        gruplar.setdefault(g, []).append(m)
    renk = {"1 (asal değil)": "#6c757d", "Eleyici asal": SARI, "Asal (kalburdan geçti)": KIRMIZI,
            "Henüz bilinmiyor": "#ffffff"}
    for p, c in ELEK_RENKLERI.items():
        renk[f"{p}'nin katı (elendi)"] = c
    sutun = 10
    fig = go.Figure()
    for g, liste in gruplar.items():
        fig.add_trace(go.Scatter(
            x=[(m - 1) % sutun for m in liste], y=[-((m - 1) // sutun) for m in liste], mode="markers+text",
            text=[str(m) for m in liste], name=g, hoverinfo="name+text",
            textfont=dict(size=15, color="#14213d" if g in ("Henüz bilinmiyor", "Eleyici asal") else "white"),
            marker=dict(symbol="square", size=44, color=renk.get(g, "#adb5bd"), line=dict(color=MAVI, width=1.5))))
    fig.update_layout(title=f"Eratosthenes Kalburu (1–{N})", xaxis=dict(visible=False, range=[-0.7, sutun - 0.3]),
                      yaxis=dict(visible=False, scaleanchor="x"), legend=dict(orientation="h", y=-0.04))
    return fig, kullanilacak


def _kutu(x0, y0, z0, dx, dy, dz, renk, ad, goster):
    X = [x0, x0 + dx, x0 + dx, x0, x0, x0 + dx, x0 + dx, x0]
    Y = [y0, y0, y0 + dy, y0 + dy, y0, y0, y0 + dy, y0 + dy]
    Z = [z0, z0, z0, z0, z0 + dz, z0 + dz, z0 + dz, z0 + dz]
    yuzey = go.Mesh3d(x=X, y=Y, z=Z, i=[7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2], j=[3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
                      k=[0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6], color=renk, opacity=1, flatshading=True,
                      name=ad, showlegend=goster, legendgroup=ad, hovertext=ad, hoverinfo="text",
                      lighting=dict(ambient=.55, diffuse=.8, specular=.3))
    kx, ky, kz = [], [], []
    for a1, a2 in ((0, 1), (1, 2), (2, 3), (3, 0), (4, 5), (5, 6), (6, 7), (7, 4), (0, 4), (1, 5), (2, 6), (3, 7)):
        kx += [X[a1], X[a2], None]
        ky += [Y[a1], Y[a2], None]
        kz += [Z[a1], Z[a2], None]
    kenar = go.Scatter3d(x=kx, y=ky, z=kz, mode="lines", line=dict(color="#14213d", width=3), hoverinfo="skip",
                         showlegend=False, legendgroup=ad)
    return [yuzey, kenar]


def fig_kup_acilimi(a: float, b: float, patlat: float) -> go.Figure:
    parcalar = [
        ((0, 0, 0), (a, a, a), MAVI, "a³"),
        ((a, 0, 0), (b, a, a), KIRMIZI, "a²b (3 tane)"), ((0, a, 0), (a, b, a), KIRMIZI, "a²b (3 tane)"),
        ((0, 0, a), (a, a, b), KIRMIZI, "a²b (3 tane)"),
        ((a, a, 0), (b, b, a), SARI, "ab² (3 tane)"), ((a, 0, a), (b, a, b), SARI, "ab² (3 tane)"),
        ((0, a, a), (a, b, b), SARI, "ab² (3 tane)"),
        ((a, a, a), (b, b, b), TURKUAZ, "b³"),
    ]
    fig, gorulen = go.Figure(), set()
    for (x0, y0, z0), (dx, dy, dz), renk, ad in parcalar:
        ox = x0 + (patlat if x0 > 0 else 0)
        oy = y0 + (patlat if y0 > 0 else 0)
        oz = z0 + (patlat if z0 > 0 else 0)
        for iz in _kutu(ox, oy, oz, dx, dy, dz, renk, ad, ad not in gorulen):
            fig.add_trace(iz)
        gorulen.add(ad)
    s = a + b + patlat
    fig.update_layout(title="(a + b)³ = a³ + 3a²b + 3ab² + b³",
                      scene=dict(xaxis=dict(range=[0, s], title="a + b"), yaxis=dict(range=[0, s], title="a + b"),
                                 zaxis=dict(range=[0, s], title="a + b"), aspectmode="cube",
                                 camera=dict(eye=dict(x=1.7, y=1.5, z=1.2))),
                      legend=dict(orientation="h", y=-0.02))
    return fig


def fig_kare_acilimi(a: float, b: float) -> go.Figure:
    fig = go.Figure()
    for (x0, y0, x1, y1, renk, ad) in ((0, 0, a, a, MAVI, "a²"), (a, 0, a + b, a, KIRMIZI, "ab"),
                                       (0, a, a, a + b, KIRMIZI, "ab"), (a, a, a + b, a + b, TURKUAZ, "b²")):
        fig.add_shape(type="rect", x0=x0, y0=y0, x1=x1, y1=y1, fillcolor=renk, line=dict(color="white", width=4))
        fig.add_annotation(x=(x0 + x1) / 2, y=(y0 + y1) / 2, text=f"<b>{ad}</b>", showarrow=False,
                           font=dict(size=26, color="white"))
    fig.update_layout(title="(a + b)² = a² + 2ab + b²", xaxis=dict(range=[-0.2, a + b + 0.2], title="a + b"),
                      yaxis=dict(range=[-0.2, a + b + 0.2], scaleanchor="x", title="a + b"), showlegend=False)
    return fig


def fig_fibonacci_spirali(adet: int) -> go.Figure:
    fib = [1, 1]
    while len(fib) < adet:
        fib.append(fib[-1] + fib[-2])
    fib = fib[:adet]
    fig = go.Figure()
    xmin = ymin = 0
    xmax = ymax = 1
    for i, s in enumerate(fib):
        yon = (i + 3) % 4  # 0 sağ, 1 yukarı, 2 sol, 3 aşağı
        if i == 0:
            x0, y0 = 0, 0
        elif yon == 0:
            x0, y0 = xmax, ymin
        elif yon == 1:
            x0, y0 = xmin, ymax
        elif yon == 2:
            x0, y0 = xmin - s, ymax - s
        else:
            x0, y0 = xmax - s, ymin - s
        xmin, ymin = min(xmin, x0), min(ymin, y0)
        xmax, ymax = max(xmax, x0 + s), max(ymax, y0 + s)
        renk = PALET[i % len(PALET)]
        fig.add_shape(type="rect", x0=x0, y0=y0, x1=x0 + s, y1=y0 + s, fillcolor=renk, opacity=.35,
                      line=dict(color=renk, width=2))
        if s >= 2:
            fig.add_annotation(x=x0 + s / 2, y=y0 + s / 2, text=f"<b>{s}</b>", showarrow=False,
                               font=dict(size=max(11, min(30, 6 + s // 2)), color="#14213d"))
        merkez, aci = {0: ((x0, y0 + s), (-90, 0)), 1: ((x0, y0), (0, 90)),
                       2: ((x0 + s, y0), (90, 180)), 3: ((x0 + s, y0 + s), (180, 270))}[yon]
        tlar = [math.radians(aci[0] + (aci[1] - aci[0]) * t / 30) for t in range(31)]
        fig.add_trace(go.Scatter(x=[merkez[0] + s * math.cos(t) for t in tlar],
                                 y=[merkez[1] + s * math.sin(t) for t in tlar],
                                 mode="lines", line=dict(color=KIRMIZI, width=4), hoverinfo="skip", showlegend=False))
    fig.update_layout(title=f"Fibonacci (altın) spirali — {adet} kare",
                      xaxis=dict(visible=False), yaxis=dict(visible=False, scaleanchor="x"))
    return fig


def fig_collatz(sayilar: list, log: bool) -> go.Figure:
    fig = go.Figure()
    for i, n in enumerate(sayilar):
        yol = collatz(n)
        fig.add_trace(go.Scatter(y=yol, mode="lines+markers", name=f"{tr_sayi(n)} ({len(yol) - 1} adım)",
                                 line=dict(width=3, color=PALET[i % len(PALET)]), marker=dict(size=5)))
    fig.update_layout(title="Collatz yolculuğu: çiftse ikiye böl, tekse 3n + 1", xaxis_title="Adım",
                      yaxis_title="Değer", yaxis_type="log" if log else "linear", legend=dict(orientation="h", y=-0.15))
    return fig


@st.cache_data(show_spinner=False)
def asal_sayma_verisi(N: int):
    asallar = set(elek(N))
    xs, pi, sayac = [], [], 0
    adim = max(1, N // 400)
    li, li_x, li_deger, onceki = [], 2.0, 0.0, 2.0
    for x in range(1, N + 1):
        if x in asallar:
            sayac += 1
        if x % adim == 0 or x == N:
            xs.append(x)
            pi.append(sayac)
            if x > 2:
                parca = 200
                h = (x - onceki) / parca
                li_deger += sum(h / math.log(onceki + (k + 0.5) * h) for k in range(parca))
                onceki = x
            li.append(li_deger)
    return xs, pi, li


def fig_asal_sayma(N: int) -> go.Figure:
    xs, pi, li = asal_sayma_verisi(N)
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=xs, y=pi, name="π(x): gerçek asal sayısı", line=dict(color=KIRMIZI, width=4, shape="hv")))
    fig.add_trace(go.Scatter(x=xs, y=[x / math.log(x) if x > 1 else 0 for x in xs], name="x / ln x",
                             line=dict(color=MAVI, width=3, dash="dash")))
    fig.add_trace(go.Scatter(x=xs, y=li, name="Li(x) (logaritmik integral)", line=dict(color=TURKUAZ, width=3, dash="dot")))
    fig.update_layout(title="Asal Sayı Teoremi: π(x) ≈ x / ln x", xaxis_title="x", yaxis_title="x'e kadar asal sayısı",
                      legend=dict(orientation="h", y=-0.15))
    return fig


# =====================================================================
# 5) OYUN MOTORU: DENGELİ RNG + ASİMETRİK PUANLAMA
# =====================================================================
ARALIKLAR = {"Kolay (10 – 200)": (10, 200), "Orta (10 – 2.000)": (10, 2000), "Uzman (10 – 20.000)": (10, 20000)}
P_EVET, P_TUZAK = 0.45, 0.60


@st.cache_data(show_spinner="Sayı havuzları hazırlanıyor…")
def havuzlari_hazirla(lo: int, hi: int):
    uyeler = {k: [n for n in range(lo, hi + 1) if v["f"](n)] for k, v in KATEGORILER.items()}
    aralikta = lambda xs: sorted({x for x in xs if lo <= x <= hi})
    tuzak = {
        "asal": [n for n in uyeler["yari_asal"] if n % 2 == 1 and n % 5 != 0],
        "yari_asal": uyeler["asal"] + [n for n in range(lo, hi + 1) if len(get_asal_carpanlar(n)) == 3],
        "tam_kare": aralikta([k * k + d for k in range(2, math.isqrt(hi) + 2) for d in (-1, 1)]),
        "tam_kup": aralikta([k ** 3 + d for k in range(2, kup_kok(hi) + 2) for d in (-1, 1)]),
        "ikinin_kuvveti": aralikta([(1 << e) + d for e in range(2, hi.bit_length() + 1) for d in (-1, 1, 2)]),
        "ucgensel": aralikta([k * (k + 1) // 2 + d for k in range(2, math.isqrt(2 * hi) + 2) for d in (-1, 1)]),
        "fibonacci": aralikta([f + d for f in uyeler["fibonacci"] for d in (-1, 1)]),
        "mukemmel": aralikta([1 << e for e in range(3, hi.bit_length() + 1)] + [12, 18, 20, 24, 30]),
        "ramanujan": aralikta([a ** 3 + b ** 3 for a in range(1, kup_kok(hi) + 1) for b in range(a, kup_kok(hi) + 1)
                               if len(ramanujan_temsilleri(a ** 3 + b ** 3)) == 1]),
    }
    for k, liste in tuzak.items():
        f = KATEGORILER[k]["f"]
        tuzak[k] = [x for x in liste if not f(x)]
    return uyeler, tuzak


def soru_uret(lo: int, hi: int, onceki: int | None = None) -> dict:
    uyeler, tuzaklar = havuzlari_hazirla(lo, hi)
    uygun = [k for k in KATEGORILER if uyeler[k]]
    k = random.choices(uygun, weights=[KATEGORILER[x]["agirlik"] for x in uygun])[0]
    f = KATEGORILER[k]["f"]
    for _ in range(50):
        if random.random() < P_EVET:
            n, evet, tuzak = random.choice(uyeler[k]), True, False
        elif tuzaklar.get(k) and random.random() < P_TUZAK:
            n, evet, tuzak = random.choice(tuzaklar[k]), False, True
        else:
            n = random.randint(lo, hi)
            while f(n):
                n = random.randint(lo, hi)
            evet, tuzak = False, False
        if n != onceki:
            break
    return {"n": n, "kat": k, "evet": evet, "tuzak": tuzak}


def puan_degisimi(evet_dedi: bool, gercek_evet: bool, odul: int, tuzak: bool, mod: str) -> int:
    """Doğru EVET +ödül · Doğru HAYIR +2 (tuzakta +5) · Yanlış HAYIR −5 · Yanlış EVET: Dengeli −ödül, Yönerge −5"""
    if evet_dedi and gercek_evet:
        return odul
    if not evet_dedi and not gercek_evet:
        return 5 if tuzak else 2
    if not evet_dedi and gercek_evet:
        return -5
    return -odul if mod == "Dengeli (önerilen)" else -5


def canli(saniye: float):
    if hasattr(st, "fragment"):
        return st.fragment(run_every=saniye)
    return lambda fonk: fonk


def uygulamayi_yenile():
    try:
        st.rerun(scope="app")
    except TypeError:
        st.rerun()


SAYFALAR = ["🏠 Ana Sayfa", "🎮 Oyun Arenası", "🔬 Sayı Dedektörü", "🏎️ Formula Sprint",
            "🧪 Görsel Laboratuvar", "📚 Bilgi Köşesi"]


def durum_baslat():
    ss = st.session_state
    ss.setdefault("sayfa", SAYFALAR[0])
    ss.setdefault("oyun", {"aktif": False, "bitti": False})
    ss.setdefault("sprint", {"aktif": False, "bitti": False})
    ss.setdefault("izgara", None)
    ss.setdefault("bilmece", None)
    ss.setdefault("dedektor_n", 91)
    ss.setdefault("ifade_girdi", "91")
    ss.setdefault("ifade_hata", "")
    ss.setdefault("rekorlar", [])


durum_baslat()


def sayfaya_git(sayfa: str, n: int | None = None):
    st.session_state.sayfa = sayfa
    if n is not None:
        st.session_state.dedektor_n = n
        st.session_state.ifade_girdi = str(n)


# =====================================================================
# 6) OYUN ARENASI
# =====================================================================
# ---------- 6.1 Sayı Avı (tek oyuncu / takım) ----------
TAKIMLAR = [("🔴 Kırmızı Takım", KIRMIZI), ("🔵 Mavi Takım", "#0d6efd")]


def oyunu_baslat(sure: int, aralik_adi: str, mod: str, takim: bool):
    lo, hi = ARALIKLAR[aralik_adi]
    st.session_state.oyun = {
        "aktif": True, "bitti": False, "sure": sure, "bitis": time.time() + sure, "lo": lo, "hi": hi, "mod": mod,
        "takim": takim, "sira": 0, "takim_puan": [0, 0], "puan": 0, "dogru": 0, "yanlis": 0, "tuzak_yakalanan": 0,
        "seri": 0, "en_iyi_seri": 0, "soru": soru_uret(lo, hi), "geri": None, "gecmis": [], "aralik": aralik_adi,
    }


def oyun_cevapla(evet_dedi: bool):
    o = st.session_state.oyun
    if not o.get("aktif"):
        return
    if time.time() >= o["bitis"]:
        oyunu_bitir(o)
        return
    s = o["soru"]
    dogru = evet_dedi == s["evet"]
    delta = puan_degisimi(evet_dedi, s["evet"], KATEGORILER[s["kat"]]["puan"], s["tuzak"], o["mod"])
    o["puan"] += delta
    if o["takim"]:
        o["takim_puan"][o["sira"]] += delta
    if dogru:
        o["dogru"] += 1
        o["seri"] += 1
        o["en_iyi_seri"] = max(o["en_iyi_seri"], o["seri"])
        o["tuzak_yakalanan"] += int(s["tuzak"])
    else:
        o["yanlis"] += 1
        o["seri"] = 0
    kayit = {**s, "evet_dedi": evet_dedi, "dogru": dogru, "delta": delta, "aciklama": kanit(s["n"], s["kat"]),
             "takim_adi": TAKIMLAR[o["sira"]][0] if o["takim"] else ""}
    o["geri"] = kayit
    o["gecmis"].append(kayit)
    if o["takim"]:
        o["sira"] ^= 1
    o["soru"] = soru_uret(o["lo"], o["hi"], onceki=s["n"])


def oyunu_bitir(o: dict):
    if not o.get("aktif"):
        return
    o["aktif"], o["bitti"] = False, True
    if not o["takim"]:
        st.session_state.rekorlar.append({"puan": o["puan"], "dogru": o["dogru"], "yanlis": o["yanlis"],
                                          "aralik": o["aralik"], "saat": dt.datetime.now().strftime("%H:%M")})


@canli(1)
def oyun_sayaci():
    o = st.session_state.oyun
    if not o.get("aktif"):
        return
    kalan = max(0, int(math.ceil(o["bitis"] - time.time())))
    hedef = KATEGORILER[o["soru"]["kat"]]["ad"]
    acil = " yk-acil" if kalan <= 10 else ""
    if o["takim"]:
        ad, renk = TAKIMLAR[o["sira"]]
        satir = f"⏱️ {kalan} sn<br>{ad}<br>🔴 {o['takim_puan'][0]} &nbsp;|&nbsp; 🔵 {o['takim_puan'][1]}"
        stil = f' style="border-color:{renk}"'
    else:
        satir, stil = f"⏱️ {kalan} sn &nbsp;|&nbsp; ⭐ {o['puan']}", ""
    st.markdown(f'<div class="yuzen-kutu{acil}"{stil}><div class="yk-baslik">🎯 HEDEF</div>'
                f'<div class="yk-hedef">{hedef}</div><div class="yk-satir">{satir}</div></div>', unsafe_allow_html=True)
    st.progress(kalan / o["sure"], text=f"Kalan süre: {kalan} saniye")
    if kalan <= 0:
        oyunu_bitir(o)
        uygulamayi_yenile()


def oyun_sayi_avi():
    o = st.session_state.oyun
    if not o.get("aktif") and not o.get("bitti"):
        st.markdown('<div class="benzetme">🎣 <b>Benzetme:</b> Bu oyun bir balık avıdır. Sıradan balıkları tanımak '
                    '(doğru “HAYIR”) az puan getirir; nadir balığı yakalamak büyük ödüldür. Ama her kıpırtıya '
                    '“EVET” diye atılan oltayı boşa atar.</div>', unsafe_allow_html=True)
        c1, c2, c3, c4 = st.columns(4)
        sure = c1.radio("⏱️ Süre", [60, 90, 120], index=1, format_func=lambda x: f"{x} sn")
        aralik = c2.radio("📏 Aralık", list(ARALIKLAR), index=1)
        mod = c3.radio("⚖️ Puanlama", ["Dengeli (önerilen)", "Yönerge (sabit −5)"],
                       help="Dengeli modda yanlış EVET, sayının ödülü kadar puan kaybettirir.")
        takim = c4.radio("👥 Oyuncu", ["Tek oyuncu", "Takım yarışı (sırayla)"]) != "Tek oyuncu"
        with st.expander("📋 Puan tablosu"):
            st.markdown("| Durum | Puan |\n|---|---|\n| Doğru **EVET** | **+20 … +200** (nadirliğe göre) |\n"
                        "| Doğru **HAYIR** | **+2** (tuzak sayıda **+5**) |\n| Yanlış **HAYIR** | **−5** |\n"
                        "| Yanlış **EVET** | Dengeli: **−ödül** · Yönerge: **−5** |")
            st.markdown(" ".join(f'<span class="rozet">{v["ad"]}: {v["puan"]}</span>' for v in KATEGORILER.values()),
                        unsafe_allow_html=True)
        st.button("▶️  OYUNU BAŞLAT", key="btn_basla", on_click=oyunu_baslat, args=(sure, aralik, mod, takim))
        if st.session_state.rekorlar:
            st.markdown("#### 🏆 Bu oturumun rekorları")
            enler = sorted(st.session_state.rekorlar, key=lambda r: -r["puan"])[:5]
            st.markdown("| # | Puan | Doğru/Yanlış | Aralık | Saat |\n|---|---|---|---|---|\n" + "\n".join(
                f"| {i + 1} | **{r['puan']}** | {r['dogru']}/{r['yanlis']} | {r['aralik']} | {r['saat']} |"
                for i, r in enumerate(enler)))
        return
    if o.get("bitti"):
        oyun_sonu_ekrani(o)
        return

    oyun_sayaci()
    s = o["soru"]
    kat = KATEGORILER[s["kat"]]
    sira = (f'<div style="font-size:1.4rem;font-weight:800;color:{TAKIMLAR[o["sira"]][1]}">Sıra: '
            f'{TAKIMLAR[o["sira"]][0]}</div>') if o["takim"] else ""
    st.markdown(f'<div class="sayi-kart">{sira}<div class="soru">Bu sayı bir <span style="color:{KIRMIZI}">'
                f'{kat["ad"]}</span> mı?</div><div class="sayi">{tr_sayi(s["n"])}</div><div class="odul">'
                f'Doğru EVET: <b>+{kat["puan"]}</b> · Doğru HAYIR: <b>+2 / +5</b> · Seri: <b>{o["seri"]}</b></div></div>',
                unsafe_allow_html=True)
    c1, c2 = st.columns(2, gap="large")
    c1.button("✅  EVET", key="btn_evet", on_click=oyun_cevapla, args=(True,))
    c2.button("❌  HAYIR", key="btn_hayir", on_click=oyun_cevapla, args=(False,))
    g = o.get("geri")
    if g:
        sinif = "gb-dogru" if g["dogru"] else "gb-yanlis"
        isaret = f"+{g['delta']}" if g["delta"] > 0 else str(g["delta"])
        tuzak = " 🪤 <b>Tuzak sayı!</b>" if g["tuzak"] else ""
        kim = f"{g['takim_adi']} · " if g["takim_adi"] else ""
        st.markdown(f'<div class="geri-bildirim {sinif}"><b>{kim}{"✔️ Doğru!" if g["dogru"] else "✖️ Yanlış!"} '
                    f'({isaret})</b>{tuzak}<br><b>{tr_sayi(g["n"])}</b> → {KATEGORILER[g["kat"]]["ad"]}? '
                    f'&nbsp; {g["aciklama"]}</div>', unsafe_allow_html=True)
    st.button("⏹️ Oyunu bitir", key="btn_bitir", on_click=oyunu_bitir, args=(o,))


def oyun_sonu_ekrani(o: dict):
    st.balloons()
    toplam = o["dogru"] + o["yanlis"]
    if o["takim"]:
        k, m = o["takim_puan"]
        kazanan = "🤝 Berabere!" if k == m else (f"🏆 Kazanan: {TAKIMLAR[0][0]}" if k > m else f"🏆 Kazanan: {TAKIMLAR[1][0]}")
        st.subheader(kazanan)
        c = st.columns(2)
        c[0].metric(TAKIMLAR[0][0], k)
        c[1].metric(TAKIMLAR[1][0], m)
    else:
        st.subheader("🏁 Süre doldu!")
        c = st.columns(5)
        c[0].metric("⭐ Puan", o["puan"])
        c[1].metric("✅ Doğru", o["dogru"])
        c[2].metric("❌ Yanlış", o["yanlis"])
        c[3].metric("🎯 İsabet", f"%{(100 * o['dogru'] / toplam) if toplam else 0:.0f}")
        c[4].metric("🪤 Tuzak", o["tuzak_yakalanan"])
    hatalar = [g for g in o["gecmis"] if not g["dogru"]]
    if hatalar:
        st.markdown("### 🩻 Hata Röntgeni — yanlışlardan öğrenelim")
        for g in hatalar:
            kim = f"{g['takim_adi']} · " if g["takim_adi"] else ""
            st.markdown(f'<div class="geri-bildirim gb-yanlis">{kim}<b>{tr_sayi(g["n"])}</b> → '
                        f'{KATEGORILER[g["kat"]]["ad"]}? Cevap: <b>{"EVET" if g["evet_dedi"] else "HAYIR"}</b> '
                        f'({g["delta"]})<br>{g["aciklama"]}</div>', unsafe_allow_html=True)
    elif toplam:
        st.success("Kusursuz tur! Tek bir hata bile yok. 🏆")
    st.button("🔁  YENİ OYUN", key="btn_basla",
              on_click=lambda: st.session_state.update(oyun={"aktif": False, "bitti": False}))


# ---------- 6.2 Sayı Izgarası: hedef türdeki tüm sayıları bul ----------
IZGARA_KATEGORILERI = ["yari_asal", "asal", "tam_kare", "ucgensel", "fibonacci", "harshad", "palindromik", "tam_kup"]


def izgara_olustur(kat: str, aralik_adi: str, tur: int = 1, puan: int = 0):
    lo, hi = ARALIKLAR[aralik_adi]
    uyeler, tuzaklar = havuzlari_hazirla(lo, hi)
    hedefler = random.sample(uyeler[kat], min(len(uyeler[kat]), random.randint(5, 7)))
    f = KATEGORILER[kat]["f"]
    digerleri = set()
    tuz = [x for x in tuzaklar.get(kat, []) if x not in hedefler]
    while len(hedefler) + len(digerleri) < 16:
        if tuz and random.random() < 0.5:
            digerleri.add(random.choice(tuz))
        else:
            m = random.randint(lo, hi)
            if not f(m):
                digerleri.add(m)
    sayilar = hedefler + list(digerleri)
    random.shuffle(sayilar)
    st.session_state.izgara = {"kat": kat, "aralik": aralik_adi, "sayilar": sayilar, "secili": [],
                               "kontrol": False, "tur": tur, "puan": puan, "son": 0}


def izgara_sec(i: int):
    iz = st.session_state.izgara
    if iz["kontrol"]:
        return
    if i in iz["secili"]:
        iz["secili"].remove(i)
    else:
        iz["secili"].append(i)


def izgara_kontrol():
    iz = st.session_state.izgara
    f = KATEGORILER[iz["kat"]]["f"]
    son = 0
    for i, n in enumerate(iz["sayilar"]):
        if i in iz["secili"]:
            son += 10 if f(n) else -10
        elif f(n):
            son -= 5
    iz["kontrol"], iz["son"] = True, son
    iz["puan"] += son


def oyun_izgara():
    iz = st.session_state.izgara
    st.markdown('<div class="benzetme">🕵️ <b>Benzetme:</b> Kalabalığın içinde kılık değiştirmiş casusları arıyorsun. '
                'Doğru casus <b>+10</b>, masumu suçlamak <b>−10</b>, gözden kaçan casus <b>−5</b>.</div>',
                unsafe_allow_html=True)
    c1, c2 = st.columns(2)
    kat = c1.selectbox("🎯 Aranan tür", IZGARA_KATEGORILERI, format_func=lambda k: KATEGORILER[k]["ad"])
    aralik = c2.selectbox("📏 Aralık", list(ARALIKLAR)[:2], key="iz_aralik")
    if iz is None or iz["kat"] != kat or iz["aralik"] != aralik:
        izgara_olustur(kat, aralik)
        iz = st.session_state.izgara
    f = KATEGORILER[kat]["f"]
    st.markdown(f"### Tur {iz['tur']} · Toplam puan: **{iz['puan']}** — Tüm **{KATEGORILER[kat]['ad']}** "
                f"sayılarına dokun ({len(iz['secili'])} seçili)")
    stiller = []
    for i, n in enumerate(iz["sayilar"]):
        anahtar = f"izt_{iz['tur']}_{i}"
        if iz["kontrol"]:
            if i in iz["secili"] and f(n):
                stiller.append(f".st-key-{anahtar} button {{background:{YESIL};color:#fff;border-color:{YESIL};}}")
            elif i in iz["secili"]:
                stiller.append(f".st-key-{anahtar} button {{background:{KIRMIZI};color:#fff;border-color:{KIRMIZI};}}")
            elif f(n):
                stiller.append(f".st-key-{anahtar} button {{background:#fff3cd;border:5px dashed {TURUNCU};}}")
        elif i in iz["secili"]:
            stiller.append(f".st-key-{anahtar} button {{background:{SARI};border-color:{MAVI};}}")
    if stiller:
        st.markdown("<style>" + "\n".join(stiller) + "</style>", unsafe_allow_html=True)
    for satir in range(4):
        kol = st.columns(4)
        for sutun in range(4):
            i = satir * 4 + sutun
            kol[sutun].button(tr_sayi(iz["sayilar"][i]), key=f"izt_{iz['tur']}_{i}", on_click=izgara_sec, args=(i,))
    if not iz["kontrol"]:
        st.button("✔️ KONTROL ET", key="iz_kontrol", on_click=izgara_kontrol)
    else:
        sinif = "gb-dogru" if iz["son"] > 0 else "gb-yanlis"
        st.markdown(f'<div class="geri-bildirim {sinif}"><b>Bu tur: {iz["son"]:+d} puan.</b> '
                    f'Yeşil = doğru bulduğun · Kırmızı = yanlış seçtiğin · Kesik çizgili = kaçırdığın</div>',
                    unsafe_allow_html=True)
        with st.expander("🩻 Her sayının kanıtı", expanded=True):
            for i, n in enumerate(iz["sayilar"]):
                if (i in iz["secili"]) != f(n):
                    st.markdown(f"- **{tr_sayi(n)}**: {kanit(n, kat)}")
            st.caption("Yalnızca hatalı sayılar listelenir.")
        st.button("➡️ SONRAKİ TUR", key="iz_yeni", on_click=izgara_olustur, args=(kat, aralik, iz["tur"] + 1, iz["puan"]))


# ---------- 6.3 Sayı Bilmecesi: ipuçlarından gizli sayıyı bul ----------
def ipucu_havuzu(n: int) -> list:
    """(metin, koşul, düzey) — düzey küçükse ipucu daha genel."""
    havuz = []
    for k, v in KATEGORILER.items():
        if k not in ("tek", "cift") and v["f"](n):
            havuz.append((f"Özelliğim: <b>{v['ad']}</b>.", v["f"], 2))
    if not is_asal(n):
        havuz.append(("Asal <b>değilim</b>.", lambda m: not is_asal(m), 1))
    havuz.append(("Tek sayıyım." if n % 2 else "Çift sayıyım.", lambda m, r=n % 2: m % 2 == r, 1))
    for d in (3, 4, 5, 6, 7, 9, 11):
        if n % d == 0 and n != d:
            havuz.append((f"{d} ile tam bölünürüm.", lambda m, d=d: m % d == 0, 2))
    t = tau(n)
    havuz.append((f"Tam olarak <b>{t}</b> pozitif bölenim var.", lambda m, t=t: tau(m) == t, 3))
    s = rakam_toplami(n)
    havuz.append((f"Rakamlarımın toplamı <b>{s}</b>.", lambda m, s=s: rakam_toplami(m) == s, 3))
    havuz.append((f"Birler basamağım <b>{n % 10}</b>.", lambda m, b=n % 10: m % 10 == b, 3))
    onluk = n // 10 * 10
    havuz.append((f"{onluk} ile {onluk + 9} arasındayım.", lambda m, o=onluk: o <= m <= o + 9, 4))
    return havuz


def bilmece_olustur(toplam: int = 0, tur: int = 1):
    aday_aralik = range(10, 201)
    for _ in range(200):
        n = random.choice(aday_aralik)
        havuz = ipucu_havuzu(n)
        random.shuffle(havuz)
        havuz.sort(key=lambda t: t[2])
        adaylar, secilen, kosullar = set(aday_aralik), [], []
        for metin, kosul, _ in havuz:
            yeni = {m for m in adaylar if kosul(m)}
            if len(yeni) < len(adaylar):
                secilen.append(metin)
                kosullar.append(kosul)
                adaylar = yeni
            if len(adaylar) == 1:
                break
        if len(adaylar) == 1 and 3 <= len(secilen) <= 6:
            ilk = kosullar[0]
            celdirici = [m for m in aday_aralik if m != n and ilk(m)]
            secenekler = random.sample(celdirici, min(5, len(celdirici))) + [n]
            random.shuffle(secenekler)
            st.session_state.bilmece = {"gizli": n, "ipuclari": secilen, "acik": 1, "secenekler": secenekler,
                                        "elenen": [], "bitti": False, "toplam": toplam, "tur": tur, "kazanc": 0}
            return


def bilmece_ipucu_ac():
    b = st.session_state.bilmece
    b["acik"] = min(len(b["ipuclari"]), b["acik"] + 1)


def bilmece_tahmin(m: int):
    b = st.session_state.bilmece
    if b["bitti"]:
        return
    if m == b["gizli"]:
        b["kazanc"] = max(10, 60 - 10 * (b["acik"] - 1) - 5 * len(b["elenen"]))
        b["toplam"] += b["kazanc"]
        b["bitti"] = True
        b["acik"] = len(b["ipuclari"])
    else:
        b["elenen"].append(m)
        bilmece_ipucu_ac()


def oyun_bilmece():
    if st.session_state.bilmece is None:
        bilmece_olustur()
    b = st.session_state.bilmece
    st.markdown('<div class="benzetme">🔎 <b>Benzetme:</b> Bir dedektif gibi düşün. Her ipucu şüpheli listesini '
                'daraltır; <b>son ipucunda tek bir sayı kalacak şekilde</b> tasarlanmıştır. Ne kadar az ipucuyla '
                'bulursan o kadar çok puan: 60 → 50 → 40 …</div>', unsafe_allow_html=True)
    st.markdown(f"### Bilmece {b['tur']} · Toplam puan: **{b['toplam']}**")
    for i, ip in enumerate(b["ipuclari"][:b["acik"]]):
        st.markdown(f'<div class="ipucu">🔹 İpucu {i + 1}: {ip}</div>', unsafe_allow_html=True)
    if not b["bitti"]:
        st.markdown("**Gizli sayı hangisi?**")
        kol = st.columns(3)
        for i, m in enumerate(b["secenekler"]):
            if m in b["elenen"]:
                kol[i % 3].markdown(f'<div style="text-align:center;font-size:1.8rem;color:#adb5bd;'
                                    f'text-decoration:line-through;padding:1rem">{m}</div>', unsafe_allow_html=True)
            else:
                kol[i % 3].button(str(m), key=f"blsec_{b['tur']}_{m}", on_click=bilmece_tahmin, args=(m,))
        if b["acik"] < len(b["ipuclari"]):
            st.button(f"💡 Yeni ipucu aç ({b['acik']}/{len(b['ipuclari'])})", key="bl_ipucu", on_click=bilmece_ipucu_ac)
    else:
        st.markdown(f'<div class="geri-bildirim gb-dogru"><b>🎉 Buldun! Gizli sayı {b["gizli"]}.</b> '
                    f'Kazanılan puan: +{b["kazanc"]}<br>{kanit(b["gizli"], "asal")}</div>', unsafe_allow_html=True)
        st.button("➡️ YENİ BİLMECE", key="bl_yeni", on_click=bilmece_olustur, args=(b["toplam"], b["tur"] + 1))


def modul_oyun():
    st.title("🎮 Oyun Arenası")
    secim = st.radio("Oyun seç", ["🎣 Sayı Avı", "🟦 Sayı Izgarası", "🔎 Sayı Bilmecesi"], horizontal=True,
                     key="oyun_secimi", label_visibility="collapsed")
    if st.session_state.oyun.get("aktif") and not secim.startswith("🎣"):
        st.info("Devam eden bir Sayı Avı turu var; süre işlemeye devam ediyor.")
    if secim.startswith("🎣"):
        oyun_sayi_avi()
    elif secim.startswith("🟦"):
        oyun_izgara()
    else:
        oyun_bilmece()


# =====================================================================
# 7) SAYI DEDEKTÖRÜ
# =====================================================================
def carpan_agaci_dot(n: int) -> str:
    satirlar = ["digraph G {", "bgcolor=transparent;", "rankdir=TB;",
                'node [fontname="Helvetica", fontsize=18, style=filled, penwidth=0];',
                'edge [color="#0d2b5b", penwidth=2];']
    sayac = 0

    def dugum(deger: int) -> str:
        nonlocal sayac
        sayac += 1
        ad = f"n{sayac}"
        if is_asal(deger):
            satirlar.append(f'{ad} [label="{deger}", shape=circle, fillcolor="{KIRMIZI}", fontcolor="white"];')
        else:
            satirlar.append(f'{ad} [label="{deger}", shape=box, fillcolor="{MAVI}", fontcolor="white"];')
        return ad

    kalan = n
    ust = dugum(kalan)
    for p in get_asal_carpanlar(n)[:-1]:
        sol = dugum(p)
        kalan //= p
        sag = dugum(kalan)
        satirlar += [f"{ust} -> {sol};", f"{ust} -> {sag};"]
        ust = sag
    satirlar.append("}")
    return "\n".join(satirlar)


def nokta_izgarasi(satir: int, sutun: int, renk: str) -> str:
    noktalar = "".join(f'<span class="nokta" style="background:{renk}"></span>' for _ in range(satir * sutun))
    return f'<div class="izgara" style="grid-template-columns: repeat({sutun}, 16px);">{noktalar}</div>'


def ifadeyi_analiz_et():
    try:
        n = ifade_coz(st.session_state.ifade_girdi)
        if not 1 <= n <= MAKS_SAYI:
            raise ValueError("Sayı 1 ile 10¹⁹ arasında olmalı")
        st.session_state.dedektor_n = n
        st.session_state.ifade_hata = ""
    except ValueError as e:
        st.session_state.ifade_hata = str(e)


def tus_bas(tus: str):
    s = st.session_state.ifade_girdi
    if tus == "⌫":
        s = s[:-1]
    elif tus == "C":
        s = ""
    else:
        s += {"×": "×", "^": "^"}.get(tus, tus)
    st.session_state.ifade_girdi = s
    if tus == "=":
        st.session_state.ifade_girdi = s[:-1]
        ifadeyi_analiz_et()


def hazir_sayi_sec(n: int):
    st.session_state.ifade_girdi = str(n)
    st.session_state.dedektor_n = n
    st.session_state.ifade_hata = ""


def dedektor_girdi():
    sol, sag = st.columns([3, 2], gap="large")
    with sol:
        st.text_input("İncelemek istediğin sayıyı veya ifadeyi yaz (örnek: 91 · 7×13 · 2^31−1 · 10! · 1.000.003)",
                      key="ifade_girdi", on_change=ifadeyi_analiz_et)
        st.button("🔍  RÖNTGEN ÇEK", key="btn_analiz", on_click=ifadeyi_analiz_et)
        if st.session_state.ifade_hata:
            st.error(f"⚠️ {st.session_state.ifade_hata}")
        st.markdown("**Hazır örnekler:**")
        ornekler = [91, 51, 1729, 496, 153, 2047, 8128, 65537, 561, 2 ** 61 - 1, 600851475143, 10 ** 18]
        for satir in range(2):
            kol = st.columns(6)
            for j in range(6):
                d = ornekler[satir * 6 + j]
                etiket = {2 ** 61 - 1: "2⁶¹−1", 10 ** 18: "10¹⁸", 600851475143: "600851475143"}.get(d, tr_sayi(d))
                kol[j].button(etiket, key=f"hazir_{d}", on_click=hazir_sayi_sec, args=(d,))
    with sag:
        st.markdown(f'<div class="ifade-ekran">{st.session_state.ifade_girdi or "&nbsp;"}</div>', unsafe_allow_html=True)
        tuslar = [["7", "8", "9", "⌫"], ["4", "5", "6", "×"], ["1", "2", "3", "^"], ["C", "0", "!", "="]]
        for satir in tuslar:
            kol = st.columns(4)
            for j, t in enumerate(satir):
                kol[j].button(t, key=f"tus_{t}", on_click=tus_bas, args=(t,))
        st.caption("Dokunmatik tuş takımı: akıllı tahtada klavye açmadan sayı ve ifade yazılır. “=” analiz eder.")


def dedektor_rontgen(n: int, carpanlar: tuple, bolenler: tuple):
    sol, sag = st.columns(2, gap="large")
    with sol:
        st.subheader("🧬 Asal Çarpan DNA'sı")
        if n > 1:
            st.latex(f"{n} = {carpim_latex(n)}")
            st.markdown(" ".join(f'<span class="rozet rozet-kirmizi">{tr_sayi(p)}</span>' for p in carpanlar),
                        unsafe_allow_html=True)
            st.markdown("**Çarpan ağacı**")
            st.graphviz_chart(carpan_agaci_dot(n))
        else:
            st.info("1'in asal çarpanı yoktur.")
        if 1 < n <= 400:
            st.subheader("▦ Dikdörtgen Testi")
            st.markdown('<div class="benzetme">🧱 <b>Benzetme:</b> n bilyeyi <b>dolu bir dikdörtgen</b> olarak '
                        'dizebiliyorsan sayı bileşiktir. Asallar yalnızca tek sıra hâlinde dizilebilir.</div>',
                        unsafe_allow_html=True)
            ciftler = [(d, n // d) for d in bolenler if 1 < d <= math.isqrt(n)]
            if not ciftler:
                st.markdown(f"**{n}** bilyeden 1 × {n} dışında dikdörtgen kurulamaz → asaldır.")
                if n <= 60:
                    st.markdown(nokta_izgarasi(1, n, YESIL), unsafe_allow_html=True)
            else:
                if len(carpanlar) == 2:
                    st.markdown(f"Yarı asalların **tek bir** gerçek dikdörtgeni vardır: **{ciftler[0][0]} × {ciftler[0][1]}**")
                for a, b in ciftler[::-1][:3]:
                    st.markdown(f"**{a} satır × {b} sütun**")
                    st.markdown(nokta_izgarasi(a, b, MAVI if len(carpanlar) > 2 else KIRMIZI), unsafe_allow_html=True)
    with sag:
        st.subheader("🛰️ Algoritma İzi")
        if 4 <= n <= DENEME_SINIRI:
            denenen, bulunan, sayac = asallik_izi(n)
            parcalar = [f'<span class="iz-bolen">{d}</span>' if d == bulunan else f'<span class="iz-deneme">{d}</span>'
                        for d in denenen]
            if sayac > len(denenen):
                parcalar.append(f"… (+{tr_sayi(sayac - len(denenen))} deneme)")
            st.markdown(f'<div class="iz-kutu">√{tr_sayi(n)} ≈ {tr_ondalik(math.sqrt(n))} sınırına kadar denenen '
                        f'bölenler:<br>{" ".join(parcalar)}</div>', unsafe_allow_html=True)
            if bulunan:
                st.markdown(f"➡️ **{bulunan}** sayısı {tr_sayi(n)}'i böldü: {tr_sayi(n)} = {bulunan} × "
                            f"{tr_sayi(n // bulunan)}. Toplam **{tr_sayi(sayac)}** deneme yapıldı.")
            else:
                st.markdown(f"➡️ √n sınırına kadar bölen yok → **asal**. Toplam **{tr_sayi(sayac)}** deneme. "
                            f"🐢 Naif yöntem **{tr_sayi(n - 2)}** deneme yapardı (yaklaşık "
                            f"**{tr_sayi(round((n - 2) / max(sayac, 1)))} kat** fazla).")
        elif n > DENEME_SINIRI:
            st.markdown('<div class="bilgi-kutu">Bu sayı 10¹²\'den büyük. √n\'ye kadar deneme bölmesi milyonlarca '
                        'adım süreceğinden <b>Miller–Rabin</b> asallık testi ve <b>Pollard rho</b> çarpanlara ayırma '
                        'yöntemi kullanıldı. İkisi de okul tahtasında saniyenin altında çalışır.</div>',
                        unsafe_allow_html=True)
        else:
            st.markdown("n < 4 için test doğrudan sonuç verir.")
        st.subheader(f"🧮 Bölenler — τ(n) = {tr_sayi(len(bolenler))}")
        if n > 1:
            st.latex(r"\tau(n) = " + r" \cdot ".join(f"({e}+1)" for e in carpan_ussu(n).values()) +
                     f" = {len(bolenler)}" + r"\qquad \sigma(n) = " + tr_sayi(sum(bolenler)).replace(".", "{.}"))
        if len(bolenler) <= 120:
            st.markdown(" ".join(f'<span class="rozet">{tr_sayi(d)}</span>' for d in bolenler), unsafe_allow_html=True)
        else:
            st.markdown(f"İlk 60 bölen: {', '.join(tr_sayi(d) for d in bolenler[:60])} …")
        ciftler = [(d, n // d) for d in bolenler if d * d <= n]
        with st.expander(f"🪞 Bölen çiftleri (ayna √n ≈ {tr_ondalik(math.sqrt(n))})"):
            st.markdown("Her bölen çifti √n'nin iki yanında durur; bu yüzden √n'ye kadar aramak yeter.")
            st.markdown("\n".join(f"- {tr_sayi(a)} × {tr_sayi(b)}" for a, b in ciftler[:60]))
    st.subheader("🏅 Master Class Özellikleri")
    satirlar = "".join(f'<tr class="{"evet" if v["f"](n) else ""}"><td><b>{v["ad"]}</b></td>'
                       f'<td style="font-size:1.4rem">{"✅" if v["f"](n) else "❌"}</td><td>{kanit(n, k)}</td></tr>'
                       for k, v in KATEGORILER.items())
    st.markdown(f'<table class="ozellik-tablo"><tr><th>Özellik</th><th>Durum</th><th>Kanıt</th></tr>{satirlar}</table>',
                unsafe_allow_html=True)


def dedektor_kup(n: int):
    if n == 1:
        st.info("1'in tek böleni vardır; küp tek bir noktadır.")
        return
    fig, (p, a), (q, b), (r, c), kalan = fig_bolen_kupu(n)
    st.markdown('<div class="benzetme">🧊 <b>Benzetme:</b> Bir böleni kurmak bir tarif seçmektir: her asal '
                '“malzemeden” kaç tane kullanacağına karar verirsin. Her tarif kafeste bir noktadır. '
                'Noktaların sayısı = bölen sayısı.</div>', unsafe_allow_html=True)
    grafik(fig, "kup_" + str(n), 600)
    eksenler = [f"({e}+1)" for pr, e in ((p, a), (q, b), (r, c)) if pr > 1]
    st.latex(r"\text{Nokta sayısı} = " + r" \cdot ".join(eksenler) + f" = {math.prod(e + 1 for pr, e in ((p, a), (q, b), (r, c)) if pr > 1)}")
    if kalan > 0:
        st.caption(f"Bu sayının {len(carpan_ussu(n))} farklı asal çarpanı var; küpte en yüksek üslü üçü gösterildi.")
    st.caption("Grafiği parmağınızla döndürüp yakınlaştırabilirsiniz. Her noktanın üzerine gelince o bölen görünür.")


def dedektor_mahalle(n: int):
    grafik(fig_mahalle(n), "mahalle_" + str(n), 260)
    once, sonra = onceki_asal(n), sonraki_asal(n)
    c = st.columns(3)
    c[0].metric("⬅️ Önceki asal", tr_sayi(once) if once else "—")
    c[1].metric("➡️ Sonraki asal", tr_sayi(sonra))
    c[2].metric("↔️ Asal boşluğu", tr_sayi(sonra - once) if once else "—")
    if is_asal(n):
        ikiz = [m for m in (n - 2, n + 2) if is_asal(m)]
        sg = is_asal(2 * n + 1)
        st.markdown(f'<div class="bilgi-kutu">👯 İkiz asal: {"Evet, eşi " + ", ".join(tr_sayi(m) for m in ikiz) if ikiz else "Hayır"} '
                    f'&nbsp;·&nbsp; 🛡️ Sophie Germain asalı (2p+1 de asal): {"Evet → " + tr_sayi(2 * n + 1) if sg else "Hayır"}</div>',
                    unsafe_allow_html=True)
    sol, sag = st.columns(2)
    with sol:
        st.markdown("#### 🧩 Goldbach Ayrışımı")
        if n % 2 == 0 and n >= 4:
            g = goldbach(n)
            st.markdown(f"**{tr_sayi(n)} = {tr_sayi(g[0])} + {tr_sayi(g[1])}** (iki asalın toplamı)")
            st.caption("Goldbach Sanısı: 2'den büyük her çift sayı iki asalın toplamıdır. Henüz ispatlanmadı!")
        else:
            st.markdown("Goldbach ayrışımı yalnızca 4 ve daha büyük çift sayılar için aranır.")
        st.markdown("#### 🟩 İki Karenin Toplamı")
        if iki_kare_mi(n):
            t = iki_kare_temsili(n)
            st.markdown(f"**{tr_sayi(n)} = {t[0]}² + {tr_sayi(t[1])}²**" if t else "Evet, iki karenin toplamı olarak yazılabilir.")
        else:
            kotu = [p for p, e in carpan_ussu(n).items() if p % 4 == 3 and e % 2]
            st.markdown(f"Yazılamaz: {', '.join(map(str, kotu))} asalı (4k+3 biçimli) tek kuvvette geçiyor (Fermat).")
    with sag:
        st.markdown("#### 🌀 Collatz Yolculuğu")
        yol = collatz(n)
        st.markdown(f"**{len(yol) - 1}** adımda 1'e ulaşır · en yüksek değer **{tr_sayi(max(yol))}**")
        fig = go.Figure(go.Scatter(y=yol, mode="lines+markers", line=dict(color=MOR, width=3), marker=dict(size=4)))
        fig.update_layout(yaxis_type="log" if max(yol) > 1000 else "linear", xaxis_title="Adım", yaxis_title="Değer")
        grafik(fig, "collatz_mini_" + str(n), 280)


def dedektor_kimlik(n: int):
    s = sigma(n) - n
    tur = "Mükemmel" if s == n and n > 1 else ("Bol (zengin)" if s > n else "Eksik")
    mers = n + 1 if is_ikinin_kuvveti(n + 1) else None
    alanlar = [
        ("Basamak sayısı", len(str(n))), ("Rakam toplamı", rakam_toplami(n)), ("Dijital kök", dijital_kok(n)),
        ("İkili (taban 2)", bin(n)[2:]), ("Sekizli (taban 8)", oct(n)[2:]), ("Onaltılı (taban 16)", hex(n)[2:].upper()),
        ("Roma rakamı", roma(n)), ("τ(n) bölen sayısı", tr_sayi(tau(n))), ("σ(n) bölen toplamı", tr_sayi(sigma(n))),
        ("φ(n) Euler fonksiyonu", tr_sayi(euler_phi(n))), ("μ(n) Möbius", mobius(n)),
        ("Ω(n) asal çarpan (tekrarlı)", len(get_asal_carpanlar(n))), ("ω(n) farklı asal", len(carpan_ussu(n))),
        ("Bolluk sınıfı", tur), ("Kare-serbest mi?", "Evet" if mobius(n) != 0 else "Hayır"),
        ("Mersenne biçimi 2ᵏ−1", f"Evet: 2{us(mers.bit_length() - 1)}−1" + (" (asal!)" if is_asal(n) else "") if mers and n > 1 else "Hayır"),
    ]
    st.markdown('<div class="kimlik">' + "".join(f"<div><b>{a}</b><span>{d}</span></div>" for a, d in alanlar) + "</div>",
                unsafe_allow_html=True)
    with st.expander("📖 Bu kavramlar ne anlama geliyor?"):
        st.markdown("- **φ(n)**: 1'den n'e kadar, n ile ortak böleni olmayan sayıların adedi (şifrelemede, RSA'da kullanılır).\n"
                    "- **μ(n)**: Kare çarpanı varsa 0; farklı asal sayısı çiftse +1, tekse −1.\n"
                    "- **Dijital kök**: Tek basamak kalana kadar rakamları toplamak; 9'a bölümden kalanla ilişkilidir.\n"
                    "- **Bol / eksik**: Kendisi hariç bölenleri toplamı sayıdan büyükse bol, küçükse eksiktir.")


def dedektor_karsilastir(n: int):
    m = st.number_input("Karşılaştırılacak ikinci sayı", min_value=1, max_value=10 ** 12, value=84, step=1, key="ikinci_sayi")
    m = int(m)
    ebob, ekok = math.gcd(n, m), n * m // math.gcd(n, m)
    c = st.columns(3)
    c[0].metric("EBOB", tr_sayi(ebob))
    c[1].metric("EKOK", tr_sayi(ekok))
    c[2].metric("Aralarında asal mı?", "Evet" if ebob == 1 else "Hayır")
    grafik(fig_venn(n, m), f"venn_{n}_{m}", 460)
    st.markdown("#### Öklid Algoritması (adım adım)")
    a, b, adimlar = max(n, m), min(n, m), []
    while b:
        adimlar.append(f"{tr_sayi(a)} = {tr_sayi(a // b)} × {tr_sayi(b)} + {tr_sayi(a % b)}")
        a, b = b, a % b
    st.markdown('<div class="iz-kutu">' + "<br>".join(adimlar[:25]) + f"<br>➡️ EBOB = <b>{tr_sayi(a)}</b></div>",
                unsafe_allow_html=True)
    st.latex(r"\text{EBOB}(a,b)\cdot\text{EKOK}(a,b) = a \cdot b")


def modul_dedektor():
    st.title("🔬 Sayı Dedektörü")
    st.markdown('<div class="benzetme">🧬 <b>Benzetme:</b> Asal sayılar sayıların <b>DNA harfleridir</b>. Her sayı '
                'bu harflerin tek bir diziliminden oluşur (Aritmetiğin Temel Teoremi). Dedektör bir röntgen cihazı '
                'gibi sayının içine bakar.</div>', unsafe_allow_html=True)
    dedektor_girdi()
    n = st.session_state.dedektor_n
    t0 = time.perf_counter()
    carpanlar, bolenler = get_asal_carpanlar(n), get_bolenler(n)
    gecen = (time.perf_counter() - t0) * 1000
    if n == 1:
        st.markdown('<div class="durum durum-birim">1 ne asaldır ne bileşiktir<small>1 birimdir.</small></div>',
                    unsafe_allow_html=True)
    elif len(carpanlar) == 1:
        st.markdown(f'<div class="durum durum-asal">{tr_sayi(n)} ASALDIR<small>Yalnızca 1 ve kendisiyle bölünür.</small></div>',
                    unsafe_allow_html=True)
    elif len(carpanlar) == 2:
        p, q = carpanlar
        st.markdown(f'<div class="durum durum-yari">{tr_sayi(n)} — Asal Değildir, Yarı Asaldır: {tr_sayi(p)} × {tr_sayi(q)}'
                    f'<small>Görünüşe aldanma! İki asal sayının çarpımıdır.</small></div>', unsafe_allow_html=True)
    else:
        st.markdown(f'<div class="durum durum-bilesik">{tr_sayi(n)} — Asal Değildir, Bileşiktir: {carpim_yazisi(n)}'
                    f'<small>{len(carpanlar)} asal çarpandan (tekrarlarıyla) oluşur.</small></div>', unsafe_allow_html=True)
    st.caption(f"Çarpanlara ayırma ve bölen listesi {tr_ondalik(gecen)} ms sürdü.")
    sekme = st.tabs(["🩻 Röntgen", "🧊 3B Bölen Küpü", "🧭 Sayının Mahallesi", "🪪 Kimlik Kartı", "⚖️ İki Sayıyı Karşılaştır"])
    with sekme[0]:
        dedektor_rontgen(n, carpanlar, bolenler)
    with sekme[1]:
        dedektor_kup(n)
    with sekme[2]:
        dedektor_mahalle(n)
    with sekme[3]:
        dedektor_kimlik(n)
    with sekme[4]:
        dedektor_karsilastir(n)


# =====================================================================
# 8) FORMULA SPRINT
# =====================================================================
OZDESLIKLER = [
    (r"a^2 - b^2 = \square", "(a − b)(a + b)", ["(a − b)²", "a² − 2ab + b²", "(a + b)²"]),
    (r"(a+b)^2 = \square", "a² + 2ab + b²", ["a² + b²", "a² + ab + b²", "2a² + 2b²"]),
    (r"(a-b)^2 = \square", "a² − 2ab + b²", ["a² − b²", "a² + 2ab − b²", "a² − ab + b²"]),
    (r"(a+b)^3 = \square", "a³ + 3a²b + 3ab² + b³", ["a³ + b³", "a³ + 3ab + b³", "a³ + 2a²b + 2ab² + b³"]),
    (r"(a-b)^3 = \square", "a³ − 3a²b + 3ab² − b³", ["a³ − b³", "a³ − 3a²b − 3ab² − b³", "a³ + 3a²b − 3ab² − b³"]),
    (r"a^3 + b^3 = \square", "(a + b)(a² − ab + b²)", ["(a + b)(a² + ab + b²)", "(a + b)³", "(a − b)(a² + ab + b²)"]),
    (r"a^3 - b^3 = \square", "(a − b)(a² + ab + b²)", ["(a − b)(a² − ab + b²)", "(a − b)³", "(a + b)(a² − ab + b²)"]),
    (r"(a+b+c)^2 = \square", "a² + b² + c² + 2(ab + bc + ca)", ["a² + b² + c²", "a² + b² + c² + ab + bc + ca", "(a + b)² + c²"]),
    (r"x^2 + \dfrac{1}{x^2} = \square", "(x + 1/x)² − 2", ["(x + 1/x)²", "(x − 1/x)² − 2", "(x + 1/x)² + 2"]),
    (r"a^4 - b^4 = \square", "(a − b)(a + b)(a² + b²)", ["(a² − b²)²", "(a − b)⁴", "(a − b)(a + b)(a² − b²)"]),
]
TRIGONOMETRI = [
    (r"\sin^2 x + \cos^2 x = \square", "1", ["0", "2", "sin 2x"]),
    (r"1 + \tan^2 x = \square", "1 / cos²x", ["1 / sin²x", "cot²x", "sin²x"]),
    (r"1 + \cot^2 x = \square", "1 / sin²x", ["1 / cos²x", "tan²x", "cos²x"]),
    (r"\sin 2x = \square", "2 sin x · cos x", ["2 sin x", "sin²x − cos²x", "sin x · cos x"]),
    (r"\cos 2x = \cos^2 x - \square", "sin²x", ["cos²x", "2 sin x", "1"]),
    (r"\cos 2x = 1 - \square", "2 sin²x", ["sin²x", "2 cos²x", "cos²x"]),
    (r"\tan 2x = \square", "2 tan x / (1 − tan²x)", ["2 tan x", "2 tan x / (1 + tan²x)", "tan²x − 1"]),
    (r"\sin^2 \tfrac{x}{2} = \square", "(1 − cos x) / 2", ["(1 + cos x) / 2", "(1 − sin x) / 2", "1 − cos x"]),
    (r"\cos^2 \tfrac{x}{2} = \square", "(1 + cos x) / 2", ["(1 − cos x) / 2", "(1 + sin x) / 2", "1 + cos x"]),
    (r"\tan \tfrac{x}{2} = \square", "sin x / (1 + cos x)", ["cos x / (1 + sin x)", "sin x / (1 − sin x)", "(1 + cos x) / sin x"]),
    (r"\sin(a+b) = \square", "sin a cos b + cos a sin b", ["sin a + sin b", "sin a sin b + cos a cos b", "sin a cos b − cos a sin b"]),
    (r"\sin(a-b) = \square", "sin a cos b − cos a sin b", ["sin a − sin b", "cos a cos b − sin a sin b", "sin a cos b + cos a sin b"]),
    (r"\cos(a+b) = \square", "cos a cos b − sin a sin b", ["cos a cos b + sin a sin b", "cos a + cos b", "sin a cos b + cos a sin b"]),
    (r"\cos(a-b) = \square", "cos a cos b + sin a sin b", ["cos a cos b − sin a sin b", "cos a − cos b", "sin a sin b − cos a cos b"]),
    (r"\tan(a+b) = \square", "(tan a + tan b) / (1 − tan a tan b)", ["tan a + tan b", "(tan a + tan b) / (1 + tan a tan b)", "(tan a − tan b) / (1 + tan a tan b)"]),
    (r"\sin A + \sin B = \square", "2 sin((A+B)/2) cos((A−B)/2)", ["2 cos((A+B)/2) cos((A−B)/2)", "sin(A + B)", "2 sin((A−B)/2) cos((A+B)/2)"]),
]
USLU_KURALLAR = [
    (r"a^m \cdot a^n = \square", "a^(m+n)", ["a^(m·n)", "(2a)^(m+n)", "a^(m−n)"]),
    (r"\dfrac{a^m}{a^n} = \square", "a^(m−n)", ["a^(m/n)", "a^(n−m)", "a^(m+n)"]),
    (r"(a^m)^n = \square", "a^(m·n)", ["a^(m+n)", "a^(mⁿ)", "m·aⁿ"]),
    (r"a^0 = \square \quad (a \neq 0)", "1", ["0", "a", "tanımsız"]),
    (r"a^{-n} = \square", "1 / aⁿ", ["−aⁿ", "a / n", "−n · a"]),
    (r"(a\,b)^n = \square", "aⁿ · bⁿ", ["a · bⁿ", "(a + b)ⁿ", "aⁿ + bⁿ"]),
]
LOG_KURALLAR = [
    (r"\log(x\,y) = \square", "log x + log y", ["log x · log y", "log(x + y)", "x · log y"]),
    (r"\log\!\left(\dfrac{x}{y}\right) = \square", "log x − log y", ["log x / log y", "log(x − y)", "log y − log x"]),
    (r"\log(x^n) = \square", "n · log x", ["(log x)ⁿ", "log n + log x", "x · log n"]),
    (r"\log_b b = \square", "1", ["0", "b", "10"]),
    (r"\log_a b = \square", "log b / log a", ["log a / log b", "log(b − a)", "log b − log a"]),
]
TRIG_DEGER = {
    "sin": {0: "0", 30: "1/2", 45: "√2/2", 60: "√3/2", 90: "1"},
    "cos": {0: "1", 30: "√3/2", 45: "√2/2", 60: "1/2", 90: "0"},
    "tan": {0: "0", 30: "√3/3", 45: "1", 60: "√3", 90: "tanımsız"},
}
BOLUNEBILME_KURALI = {
    3: "Rakamları toplamı 3'ün katıysa 3'e bölünür.", 4: "Son iki basamağı 4'ün katıysa 4'e bölünür.",
    6: "Hem 2'ye hem 3'e bölünüyorsa 6'ya bölünür.", 8: "Son üç basamağı 8'in katıysa 8'e bölünür.",
    9: "Rakamları toplamı 9'un katıysa 9'a bölünür.",
    11: "Rakamları sağdan başlayarak +, −, + … işaretleriyle toplanır; sonuç 11'in katıysa 11'e bölünür.",
}
SPRINT_TURLERI = ["Çarpım Tablosu", "Tam Kareler", "Tam Küpler", "Üslü Sayılar", "Köklü Sayılar", "Bölünebilme",
                  "Asal mı?", "Özdeşlikler", "Trigonometri", "Trigonometri Değerleri", "Logaritma"]


def sayisal_celdiriciler(dogru: int, adaylar: list) -> list:
    secilen = []
    for a in adaylar:
        if a > 0 and a != dogru and a not in secilen:
            secilen.append(a)
    while len(secilen) < 3:
        a = dogru + random.choice([-1, 1]) * random.randint(1, max(3, dogru // 5))
        if a > 0 and a != dogru and a not in secilen:
            secilen.append(a)
    random.shuffle(secilen)
    return secilen[:3]


def sprint_soru_uret(turler: list) -> dict:
    tur = random.choice(turler)
    latex, metin, aciklama = None, None, ""
    if tur == "Çarpım Tablosu":
        a, b = random.randint(2, 12), random.randint(2, 12)
        latex, d = rf"{a} \times {b} = \square", a * b
        y = sayisal_celdiriciler(d, [a * (b + 1), a * (b - 1), (a + 1) * b, (a - 1) * b, d + 10, d - 10])
        dogru, yanlis = str(d), [str(v) for v in y]
    elif tur == "Tam Kareler":
        k = random.randint(2, 30)
        latex, d = rf"{k}^2 = \square", k * k
        dogru, yanlis = str(d), [str(v) for v in sayisal_celdiriciler(d, [(k - 1) ** 2, (k + 1) ** 2, 2 * k, d + 10])]
    elif tur == "Tam Küpler":
        k = random.randint(2, 15)
        latex, d = rf"{k}^3 = \square", k ** 3
        dogru, yanlis = str(d), [str(v) for v in sayisal_celdiriciler(d, [(k - 1) ** 3, (k + 1) ** 3, 3 * k, k * k])]
    elif tur == "Üslü Sayılar":
        if random.random() < 0.5:
            b = random.choice([2, 3, 5])
            e = random.randint(2, {2: 12, 3: 7, 5: 5}[b])
            latex, d = rf"{b}^{{{e}}} = \square", b ** e
            dogru, yanlis = str(d), [str(v) for v in sayisal_celdiriciler(d, [b ** (e - 1), b ** (e + 1), b * e, d + b])]
        else:
            latex, dogru, yanlis = random.choice(USLU_KURALLAR)
    elif tur == "Köklü Sayılar":
        if random.random() < 0.4:
            k = random.randint(11, 25)
            latex, dogru = rf"\sqrt{{{k * k}}} = \square", str(k)
            yanlis = [str(v) for v in sayisal_celdiriciler(k, [k - 1, k + 1, k + 2, k * 2])]
        else:
            k, b = random.randint(2, 9), random.choice([2, 3, 5, 6, 7, 10, 11])
            latex, dogru = rf"\sqrt{{{k * k * b}}} = \square", f"{k}√{b}"
            yanlis = list(dict.fromkeys([f"{b}√{k}", f"{k * k}√{b}", f"{k + 1}√{b}", f"{k}√{b * 2}"]))
            yanlis = [y for y in yanlis if y != dogru][:3]
            aciklama = f"√{k * k * b} = √({k * k} · {b}) = {k}√{b}"
    elif tur == "Bölünebilme":
        d = random.choice([3, 4, 6, 8, 9, 11])
        dogru_s = random.randrange(100 // d + 1, 9999 // d) * d
        yanlis_s = []
        while len(yanlis_s) < 3:
            m = random.randint(100, 9999)
            if m % d and m not in yanlis_s:
                yanlis_s.append(m)
        metin, dogru, yanlis = f"Hangisi {d} ile tam bölünür?", str(dogru_s), [str(v) for v in yanlis_s]
        aciklama = BOLUNEBILME_KURALI[d]
    elif tur == "Asal mı?":
        uyeler, tuzaklar = havuzlari_hazirla(10, 2000)
        p = random.choice([x for x in uyeler["asal"] if x > 50])
        bilesik = random.sample(tuzaklar["asal"], 3)
        metin, dogru, yanlis = "Hangisi asal sayıdır?", str(p), [str(v) for v in bilesik]
        aciklama = " · ".join(f"{v} = {carpim_yazisi(v)}" for v in bilesik)
    elif tur == "Trigonometri Değerleri":
        fn, aci = random.choice(list(TRIG_DEGER)), random.choice([0, 30, 45, 60, 90])
        latex, dogru = rf"\{fn}\,{aci}^\circ = \square", TRIG_DEGER[fn][aci]
        havuz = ["0", "1/2", "√2/2", "√3/2", "1", "√3/3", "√3", "tanımsız"]
        yanlis = random.sample([h for h in havuz if h != dogru], 3)
    elif tur == "Logaritma":
        if random.random() < 0.5:
            b = random.choice([2, 3, 5, 10])
            k = random.randint(2, {2: 12, 3: 8, 5: 6, 10: 6}[b])
            latex, dogru = rf"\log_{{{b}}} {b ** k} = \square", str(k)
            yanlis = [str(v) for v in sayisal_celdiriciler(k, [k - 1, k + 1, b * k, k + 2])]
        else:
            latex, dogru, yanlis = random.choice(LOG_KURALLAR)
    else:
        latex, dogru, yanlis = random.choice(OZDESLIKLER if tur == "Özdeşlikler" else TRIGONOMETRI)
    secenekler = [dogru] + list(yanlis)[:3]
    random.shuffle(secenekler)
    return {"tur": tur, "latex": latex, "metin": metin, "secenekler": secenekler, "dogru": dogru,
            "aciklama": aciklama, "id": random.getrandbits(32)}


def sprinti_baslat(sure: int, turler: list):
    st.session_state.sprint = {"aktif": True, "bitti": False, "sure": sure, "bitis": time.time() + sure,
                               "turler": turler, "puan": 0, "dogru": 0, "yanlis": 0, "seri": 0,
                               "soru": sprint_soru_uret(turler), "geri": None, "hatalar": [], "konu": {}}


def sprint_cevapla(secim: str):
    s = st.session_state.sprint
    if not s.get("aktif"):
        return
    if time.time() >= s["bitis"]:
        s["aktif"], s["bitti"] = False, True
        return
    q = s["soru"]
    istatistik = s["konu"].setdefault(q["tur"], [0, 0])
    if secim == q["dogru"]:
        s["seri"] += 1
        bonus = 5 if s["seri"] % 5 == 0 else 0
        s["puan"] += 10 + bonus
        s["dogru"] += 1
        istatistik[0] += 1
        s["geri"] = (True, q, bonus)
    else:
        s["seri"] = 0
        s["puan"] -= 5
        s["yanlis"] += 1
        istatistik[1] += 1
        s["geri"] = (False, q, 0)
        s["hatalar"].append((q, secim))
    s["soru"] = sprint_soru_uret(s["turler"])


@canli(1)
def sprint_sayaci():
    s = st.session_state.sprint
    if not s.get("aktif"):
        return
    kalan = max(0, int(math.ceil(s["bitis"] - time.time())))
    acil = " yk-acil" if kalan <= 10 else ""
    st.markdown(f'<div class="yuzen-kutu{acil}"><div class="yk-baslik">🏎️ FORMULA SPRINT</div>'
                f'<div class="yk-hedef">{s["soru"]["tur"]}</div><div class="yk-satir">⏱️ {kalan} sn &nbsp;|&nbsp; '
                f'⭐ {s["puan"]}</div></div>', unsafe_allow_html=True)
    st.progress(kalan / s["sure"], text=f"Kalan süre: {kalan} saniye · Seri: {s['seri']}")
    if kalan <= 0:
        s["aktif"], s["bitti"] = False, True
        uygulamayi_yenile()


def soru_goster(q: dict, buyuk: bool = True):
    if q["latex"]:
        st.latex((r"\Huge " if buyuk else "") + q["latex"].replace(r"\square", r"\boxed{\;?\;}"))
    else:
        st.markdown(f'<div style="font-size:{2.4 if buyuk else 1.4}rem;font-weight:800;color:{MAVI};text-align:center;'
                    f'padding:.6rem">{q["metin"]}</div>', unsafe_allow_html=True)


def modul_sprint():
    st.title("🏎️ Formula Sprint")
    s = st.session_state.sprint
    if not s.get("aktif") and not s.get("bitti"):
        st.markdown('<div class="benzetme">🏁 <b>Benzetme:</b> Formüller pilotun vites geçişleri gibidir: '
                    'refleksle yapılmalıdır ki akıl virajda, yani asıl problemde kalsın.</div>', unsafe_allow_html=True)
        turler = st.multiselect("Yarış pisti (konu seç)", SPRINT_TURLERI, default=SPRINT_TURLERI[:4])
        sure = st.radio("⏱️ Süre", [60, 90, 120], format_func=lambda x: f"{x} saniye", horizontal=True)
        st.caption("Doğru +10 · Her 5'li seride +5 bonus · Yanlış −5 · Tüm cevaplar dokunmatik butonlarla.")
        st.button("🏁  SPRİNTİ BAŞLAT", key="btn_sprint_basla", on_click=sprinti_baslat,
                  args=(sure, turler or SPRINT_TURLERI))
        return
    if s.get("bitti"):
        st.balloons()
        st.subheader("🏁 Bitiş çizgisi!")
        c = st.columns(3)
        c[0].metric("⭐ Puan", s["puan"])
        c[1].metric("✅ Doğru", s["dogru"])
        c[2].metric("❌ Yanlış", s["yanlis"])
        if s["konu"]:
            konular = list(s["konu"])
            fig = go.Figure([go.Bar(name="Doğru", x=konular, y=[s["konu"][k][0] for k in konular], marker_color=YESIL),
                             go.Bar(name="Yanlış", x=konular, y=[s["konu"][k][1] for k in konular], marker_color=KIRMIZI)])
            fig.update_layout(barmode="group", title="Konu karnesi", legend=dict(orientation="h", y=-0.2))
            grafik(fig, "sprint_karne", 360)
        if s["hatalar"]:
            st.markdown("### 🔧 Pit Stop — doğrularıyla tekrar et")
            for q, secim in s["hatalar"]:
                soru_goster(q, buyuk=False)
                st.markdown(f"Senin cevabın: ~~{secim}~~ → Doğrusu: **{q['dogru']}**"
                            + (f"  \n💡 {q['aciklama']}" if q["aciklama"] else ""))
        st.button("🔁  YENİ SPRİNT", key="btn_sprint_basla",
                  on_click=lambda: st.session_state.update(sprint={"aktif": False, "bitti": False}))
        return
    sprint_sayaci()
    q = s["soru"]
    st.markdown(f"#### {q['tur']}")
    soru_goster(q)
    kol = st.columns(2, gap="large")
    for i, secenek in enumerate(q["secenekler"]):
        kol[i % 2].button(secenek, key=f"sp_{q['id']}_{i}", on_click=sprint_cevapla, args=(secenek,))
    if s.get("geri"):
        dogru_mu, eski, bonus = s["geri"]
        if dogru_mu:
            st.markdown(f'<div class="geri-bildirim gb-dogru">✔️ Doğru! (+{10 + bonus}{" · 5’li seri bonusu!" if bonus else ""})</div>',
                        unsafe_allow_html=True)
        else:
            ek = f"<br>💡 {eski['aciklama']}" if eski["aciklama"] else ""
            st.markdown(f'<div class="geri-bildirim gb-yanlis">✖️ Yanlış (−5) — doğru cevap: <b>{eski["dogru"]}</b>{ek}</div>',
                        unsafe_allow_html=True)


# =====================================================================
# 9) GÖRSEL LABORATUVAR
# =====================================================================
def benzetme(metin: str):
    st.markdown(f'<div class="benzetme">💡 <b>Benzetme:</b> {metin}</div>', unsafe_allow_html=True)


def bilgi(metin: str):
    st.markdown(f'<div class="bilgi-kutu">{metin}</div>', unsafe_allow_html=True)


def modul_lab():
    st.title("🧪 Görsel Laboratuvar")
    st.caption("Tüm 3B grafikler parmakla döndürülür, iki parmakla yakınlaştırılır. Noktaların üzerine gelince bilgi çıkar.")
    sekme = st.tabs(["⛰️ Bölen Dağları (3B)", "🌀 Ulam Spirali", "🧺 Eratosthenes Kalburu", "🧊 (a+b)³ Küpü (3B)",
                     "🐚 Fibonacci Spirali", "🔁 Collatz", "📈 Asal Sayma"])
    with sekme[0]:
        c1, c2 = st.columns(2)
        N = c1.slider("Kaç sayı?", 100, 1600, 600, step=100)
        olcut = c2.radio("Yükseklik", ["Bölen sayısı τ(n)", "Asal çarpan sayısı Ω(n)", "Bolluk oranı σ(n)/n"], horizontal=True)
        grafik(fig_bolen_daglari(N, olcut), "lab_daglar", 680)
        benzetme("Sayılar spiral bir şehre yerleşmiş. Her binanın yüksekliği, o sayının kaç böleni olduğunu gösterir. "
                 "<b>Asallar en alçak evlerdir</b> (yalnızca 2 bölen); 360, 720 gibi sayılar gökdelenleri oluşturur.")
        st.markdown("**Keşif soruları:** En yüksek gökdelen hangi sayı? Neden tam kareler tek sayıda bölene sahip? "
                    "(İpucu: bölen çiftlerinden biri kendisiyle eşleşir.)")
    with sekme[1]:
        c1, c2 = st.columns(2)
        N = c1.slider("Sayı adedi", 400, 20000, 4000, step=400, key="ulam_n")
        kat = c2.selectbox("Vurgulanacak tür", [k for k in KATEGORILER if k not in ("tek", "cift")],
                           format_func=lambda k: KATEGORILER[k]["ad"], key="ulam_kat")
        grafik(fig_ulam(N, kat), "lab_ulam", 680)
        bilgi("1963'te Stanisław Ulam sıkıcı bir toplantıda sayıları spiral biçiminde karalarken asalların "
              "<b>çapraz çizgiler</b> üzerinde yoğunlaştığını fark etti. Bu çizgiler n² + n + 41 gibi asal üreten "
              "polinomlara karşılık gelir. Tam kareler ise tek bir çapraz üzerinde dizilir.")
    with sekme[2]:
        N = st.radio("Tablo", [100, 200], horizontal=True, format_func=lambda x: f"1–{x}")
        kullanilacak = [p for p in KUCUK_ASALLAR if p * p <= N]
        adim = st.slider("Adım (kaçıncı asalın katları elendi?)", 0, len(kullanilacak), 0,
                         help="Her adımda bir sonraki asalın katları renklenerek elenir.")
        fig, _ = fig_eratosthenes(N, adim)
        grafik(fig, f"lab_elek_{N}_{adim}", 640 if N == 100 else 1100)
        if adim == 0:
            st.markdown("👉 Kaydırıcıyı sağa çek: önce 2'nin, sonra 3'ün katları elenecek.")
        elif adim < len(kullanilacak):
            p = kullanilacak[adim - 1]
            st.markdown(f"**{p}**'nin katları **{p}² = {p * p}**'den başlayarak elendi. Neden {p}²? Çünkü daha küçük "
                        f"katları ({p}·2, {p}·3 …) daha küçük bir asal tarafından zaten elenmişti.")
        else:
            st.success(f"Bitti! √{N} ≈ {tr_ondalik(math.sqrt(N), 1)} olduğundan {kullanilacak[-1]}'den sonraki asalları "
                       f"denemeye gerek yok. Kalan kırmızı kareler 1–{N} arasındaki {len(elek(N))} asaldır.")
        benzetme("Kalbur, unu taneden ayırır. Burada her asal, kendi katlarını tutan bir delik boyutudur; "
                 "hiçbir delikte takılmadan geçenler asallardır.")
    with sekme[3]:
        c1, c2, c3 = st.columns(3)
        a = c1.slider("a", 1.0, 5.0, 3.0, 0.5)
        b = c2.slider("b", 1.0, 5.0, 2.0, 0.5)
        patlat = c3.slider("Parçaları ayır", 0.0, 2.5, 0.8, 0.1)
        grafik(fig_kup_acilimi(a, b, patlat), "lab_kup", 640)
        st.latex(rf"({tr_ondalik(a, 1)} + {tr_ondalik(b, 1)})^3 = {tr_ondalik(a ** 3, 1)} + 3\cdot{tr_ondalik(a * a * b, 1)}"
                 rf" + 3\cdot{tr_ondalik(a * b * b, 1)} + {tr_ondalik(b ** 3, 1)} = {tr_ondalik((a + b) ** 3, 1)}")
        benzetme("Kenarı a + b olan bir küp pastayı iki düz kesimle sekiz parçaya böl: 1 büyük küp (a³), 1 küçük küp (b³), "
                 "3 kalın dilim (a²b) ve 3 ince çubuk (ab²). Formül, bu parçaların hacimlerinin toplamıdır.")
        with st.expander("2B karşılığı: (a + b)²"):
            grafik(fig_kare_acilimi(a, b), "lab_kare", 460)
    with sekme[4]:
        adet = st.slider("Kare sayısı", 4, 14, 10)
        grafik(fig_fibonacci_spirali(adet), "lab_fib", 620)
        fib = [1, 1]
        while len(fib) < 25:
            fib.append(fib[-1] + fib[-2])
        oran = [fib[i + 1] / fib[i] for i in range(len(fib) - 1)]
        fig = go.Figure([go.Scatter(y=oran, mode="lines+markers", name="Fₙ₊₁ / Fₙ", line=dict(color=MOR, width=3)),
                         go.Scatter(y=[(1 + 5 ** .5) / 2] * len(oran), name="φ ≈ 1,618", line=dict(color=KIRMIZI, dash="dash"))])
        fig.update_layout(title="Ardışık Fibonacci oranları altın orana yaklaşır", xaxis_title="n",
                          legend=dict(orientation="h", y=-0.2))
        grafik(fig, "lab_fib_oran", 340)
    with sekme[5]:
        c1, c2, c3 = st.columns(3)
        n1 = c1.number_input("1. sayı", 1, 10 ** 9, 27, key="col1")
        n2 = c2.number_input("2. sayı (karşılaştır)", 0, 10 ** 9, 97, key="col2")
        log = c3.toggle("Logaritmik eksen", value=True)
        grafik(fig_collatz([int(n1)] + ([int(n2)] if n2 else []), log), "lab_collatz", 520)
        bilgi("Collatz Sanısı: hangi sayıdan başlarsan başla, sonunda 1'e ulaşırsın. 2⁶⁸'e kadar bütün sayılar "
              "bilgisayarla denenmiş, ama ispat hâlâ yok. 27 sayısı 111 adımda ve 9.232'ye kadar tırmanarak 1'e iner.")
        benzetme("Sayılar dağlara tırmanıp inen yolculardır: tek sayıda fırtına (3n + 1) onları yukarı fırlatır, "
                 "çift sayıda yokuş aşağı (÷2) inerler. Hepsinin aynı vadiye (1) indiği sanılıyor.")
    with sekme[6]:
        N = st.select_slider("x üst sınırı", [1000, 10_000, 50_000, 100_000], value=10_000)
        grafik(fig_asal_sayma(N), f"lab_pi_{N}", 520)
        pi_N = len(elek(N))
        st.markdown(f"x = {tr_sayi(N)} için gerçek asal sayısı **{tr_sayi(pi_N)}**, x / ln x tahmini "
                    f"**{tr_sayi(round(N / math.log(N)))}** (hata %{tr_ondalik(100 * abs(pi_N - N / math.log(N)) / pi_N, 1)}).")
        bilgi("Gauss 15 yaşında asal sayı tablolarını inceleyerek asalların x civarında yaklaşık 1 / ln x sıklıkla "
              "göründüğünü tahmin etti. Bu tahmin 1896'da Hadamard ve de la Vallée Poussin tarafından ispatlandı.")


# =====================================================================
# 10) BİLGİ KÖŞESİ
# =====================================================================
def modul_bilgi():
    st.title("📚 Bilgi Köşesi")
    sekme = st.tabs(["Asal & Yarı Asal", "Kavram Yanılgıları", "Mersenne", "Fermat", "Mükemmel", "Ramanujan",
                     "Fibonacci & Üçgensel", "Diğer Türler", "Bölen Fonksiyonları", "Çözülmemiş Problemler", "Algoritmalar"])
    with sekme[0]:
        st.subheader("Asal Sayılar")
        bilgi("1'den büyük olup yalnızca 1'e ve kendisine bölünebilen doğal sayılara <b>asal sayı</b> denir.")
        st.latex(r"p \text{ asal} \iff p > 1 \;\text{ve}\; d \mid p \Rightarrow d \in \{1, p\}")
        st.markdown("**Aritmetiğin Temel Teoremi:** 1'den büyük her doğal sayı, asalların çarpımı olarak sıralama dışında **tek** biçimde yazılır.")
        st.latex(r"n = p_1^{e_1}\, p_2^{e_2} \cdots p_k^{e_k}")
        benzetme("Asallar sayıların <b>kimyasal elementleri</b>dir. Su her zaman H₂O'dur; 360 da her zaman 2³·3²·5'tir.")
        st.markdown("**Öklid'in ispatı (asallar sonsuzdur):** Sonlu sayıda asal olduğunu varsayalım: p₁, p₂, …, pₖ. "
                    "N = p₁·p₂·…·pₖ + 1 sayısı hiçbir pᵢ'ye bölünmez (kalan hep 1'dir). O hâlde N'nin listede olmayan "
                    "bir asal böleni vardır. Çelişki. ∎")
        st.subheader("Yarı Asallar ve 91 Yanılgısı")
        bilgi("Tam olarak iki asal sayının (eşit olabilir) çarpımı olan sayılara <b>yarı asal</b> denir: 4, 6, 9, 15, 49, 91 …")
        st.latex(r"91 = 7 \times 13 \qquad 51 = 3 \times 17 \qquad 119 = 7 \times 17")
        benzetme("Yarı asallar <b>maskeli asallardır</b>. Uzaktan asal gibi görünürler; maskeyi indiren şey 7 gibi küçük bir böleni denemektir.")
        st.markdown("Yarı asallar **RSA şifrelemesinin** temelidir: iki büyük asalı çarpmak kolaydır, ama çarpımdan "
                    "asalları geri bulmak çok zordur. İnternetteki güvenli bağlantılar bu zorluğa dayanır.")
        st.subheader("√n Teoremi")
        st.latex(r"n>1 \text{ bileşik} \;\Longrightarrow\; \exists\, p \text{ asal},\; p \mid n,\; p \le \sqrt{n}")
        st.markdown("**İspat:** n = a·b ve 1 < a ≤ b ise a² ≤ a·b = n, yani a ≤ √n. a'nın her asal böleni p ≤ √n'dir ve p | n. ∎")
    with sekme[1]:
        st.subheader("Sık Karşılaşılan Kavram Yanılgıları")
        st.markdown(
            "| Yanılgı | Doğrusu | Neden? |\n|---|---|---|\n"
            "| “1 asal sayıdır.” | 1 asal değildir. | Asal olsaydı çarpanlara ayırma tek olmazdı: 6 = 2·3 = 1·2·3 = 1·1·2·3 … |\n"
            "| “Bütün asallar tektir.” | 2 asaldır ve çifttir. | 2 tek çift asaldır; diğer çift sayılar 2'ye bölünür. |\n"
            "| “91 / 51 / 57 asaldır.” | 91 = 7·13, 51 = 3·17, 57 = 3·19 | Tek ve “yabancı” görünmeleri yanıltır; √n'ye kadar denemek gerekir. |\n"
            "| “Tek sayılar asaldır.” | 9, 15, 21, 25 … tek ama bileşiktir. | Teklik yalnızca 2'ye bölünmemeyi garanti eder. |\n"
            "| “0 çift sayı değildir.” | 0 çifttir. | 0 = 2·0, yani 2'ye kalansız bölünür. |\n"
            "| “Asal sayılar bir yerde biter.” | Asallar sonsuzdur. | Öklid'in ispatı (Asal & Yarı Asal sekmesi). |\n"
            "| “Büyük sayıda daha çok bölen olur.” | 97'nin 2, 96'nın 12 böleni vardır. | Bölen sayısı büyüklüğe değil, asal çarpan yapısına bağlıdır. |\n"
            "| “(a + b)² = a² + b²” | (a + b)² = a² + 2ab + b² | Görsel Laboratuvar'daki karede iki ab dikdörtgeni unutulmuştur. |\n"
            "| “2ⁿ − 1 her zaman asaldır.” | 2¹¹ − 1 = 2047 = 23·89 | n asal olsa bile 2ⁿ − 1 bileşik olabilir. |")
        benzetme("Yanılgılar, haritada yanlış çizilmiş yollar gibidir: kişi kaybolana kadar fark etmez. Bu yüzden oyunda "
                 "tuzak sayılar bilerek karşınıza çıkarılır.")
    with sekme[2]:
        st.subheader("Mersenne Sayıları")
        st.latex(r"M_p = 2^p - 1")
        st.markdown("p bileşikse M_p de bileşiktir. Tersi doğru değildir:")
        st.latex(r"M_{11} = 2^{11} - 1 = 2047 = 23 \times 89")
        st.markdown("Asal olan Mersenne sayılarına **Mersenne asalı** denir: 3, 7, 31, 127, 8191 … Bilinen en büyük "
                    "asalların çoğu, gönüllü bilgisayarların ortak çalıştığı **GIMPS** projesiyle bulunmuştur. "
                    "Bu asallar Lucas–Lehmer testiyle doğrulanır:")
        st.latex(r"s_0 = 4,\quad s_{i+1} = s_i^2 - 2 \pmod{M_p};\qquad M_p \text{ asal} \iff s_{p-2} \equiv 0")
        benzetme("GIMPS, dünyadaki bilgisayarların aynı yapbozun farklı parçalarını çözdüğü bir <b>imece</b>dir.")
    with sekme[3]:
        st.subheader("Fermat Sayıları")
        st.latex(r"F_k = 2^{2^k} + 1")
        st.markdown("F₀ = 3, F₁ = 5, F₂ = 17, F₃ = 257, F₄ = 65537 asaldır. Euler (1732) Fermat'nın tahminini çürüttü:")
        st.latex(r"F_5 = 2^{32} + 1 = 4\,294\,967\,297 = 641 \times 6\,700\,417")
        st.markdown("Gauss: düzgün n-gen cetvel ve pergelle ancak n, 2'nin kuvveti ile farklı Fermat asallarının çarpımıysa çizilebilir (ör. 17-gen).")
        benzetme("İlk beş kuğuyu beyaz görüp “bütün kuğular beyazdır” demek gibi. Altıncı sayı siyah kuğu çıktı.")
    with sekme[4]:
        st.subheader("Mükemmel Sayılar")
        st.latex(r"\sigma(n) = 2n \qquad 6 = 1+2+3 \qquad 28 = 1+2+4+7+14")
        st.markdown("**Öklid–Euler Teoremi:** 2ᵖ − 1 asal ise aşağıdaki sayı mükemmeldir ve her çift mükemmel sayı bu biçimdedir:")
        st.latex(r"N = 2^{p-1}\,(2^p - 1) \qquad (6,\ 28,\ 496,\ 8128,\ \dots)")
        benzetme("Mükemmel sayı, parçalarının toplamı bütüne <b>tam</b> eşit olan bir yapbozdur.")
    with sekme[5]:
        st.subheader("Ramanujan (Taksi) Sayıları")
        st.latex(r"1729 = 1^3 + 12^3 = 9^3 + 10^3")
        st.markdown("Hardy, hastanedeki Ramanujan'ı ziyarete giderken bindiği taksinin numarasının (1729) sıkıcı olduğunu "
                    "söyler. Ramanujan hemen itiraz eder: 1729, iki küpün toplamı olarak **iki farklı yolla** yazılabilen en küçük sayıdır.")
        st.latex(r"4104 = 2^3 + 16^3 = 9^3 + 15^3 \qquad 13832 = 2^3 + 24^3 = 18^3 + 20^3")
    with sekme[6]:
        st.subheader("Fibonacci Sayıları")
        st.latex(r"F_{n+1} = F_n + F_{n-1} \qquad F_n = \frac{\varphi^n - \psi^n}{\sqrt 5},\; \varphi = \frac{1+\sqrt5}{2}")
        st.markdown("**Hızlı test (Gessel, 1972):** n Fibonacci sayısıdır ⇔ 5n² + 4 veya 5n² − 4 tam karedir.")
        st.subheader("Üçgensel Sayılar")
        st.latex(r"T_k = \frac{k(k+1)}{2} \qquad 8T_k + 1 = (2k+1)^2")
        st.markdown("Gauss'un okul anekdotu: 1'den 100'e kadar toplam, 50 tane (1 + 100) çiftinden oluşur: T₁₀₀ = 5050.")
        benzetme("Üçgensel sayılar <b>bowling labutları</b>dır: 1, 3, 6, 10 … her sıra bir fazla labut ekler.")
    with sekme[7]:
        st.subheader("2'nin Kuvvetleri")
        st.latex(r"n = 2^k \iff n \,\&\, (n-1) = 0")
        benzetme("2'nin kuvveti, <b>tek bir lambası yanan</b> bir evdir. n − 1, o lambayı söndürüp alttakilerin hepsini yakar.")
        st.subheader("Armstrong (Narsisistik) Sayılar")
        st.latex(r"153 = 1^3 + 5^3 + 3^3 \qquad 9474 = 9^4 + 4^4 + 7^4 + 4^4")
        st.markdown("10 tabanında yalnızca 88 Armstrong sayısı vardır.")
        st.subheader("Harshad (Niven) Sayılar")
        st.latex(r"18:\; 1+8 = 9,\; 18 \div 9 = 2")
        st.markdown("Sanskritçe ‘büyük sevinç’ anlamına gelir; D. R. Kaprekar adlandırmıştır.")
        st.subheader("Carmichael Sayıları")
        st.latex(r"561 = 3 \cdot 11 \cdot 17")
        st.markdown("Fermat testini (aⁿ ≡ a) her a için geçen ama asal olmayan “sahtekâr” sayılardır. Bu yüzden "
                    "uygulamada Fermat testi yerine Miller–Rabin testi kullanılır.")
    with sekme[8]:
        st.subheader("Bölen Sayısı, Bölen Toplamı, Euler Fonksiyonu")
        st.latex(r"\tau(n) = \prod (e_i + 1), \qquad \sigma(n) = \prod \frac{p_i^{e_i+1} - 1}{p_i - 1}, \qquad "
                 r"\varphi(n) = n \prod \left(1 - \frac{1}{p_i}\right)")
        st.latex(r"360 = 2^3 \cdot 3^2 \cdot 5 \;\Rightarrow\; \tau(360) = 4 \cdot 3 \cdot 2 = 24")
        benzetme("Bölen kurmak tarif seçmektir: 2'den 0–3, 3'ten 0–2, 5'ten 0–1 tane. 4·3·2 = 24 tarif. "
                 "Sayı Dedektörü'ndeki 3B Bölen Küpü bu tarifleri nokta olarak gösterir.")
    with sekme[9]:
        st.subheader("Hâlâ Çözülmemiş Problemler")
        st.markdown(
            "| Problem | Soru | Durum |\n|---|---|---|\n"
            "| **Goldbach Sanısı** (1742) | 2'den büyük her çift sayı iki asalın toplamı mıdır? | 4·10¹⁸'e kadar bilgisayarla doğrulandı; ispat yok. |\n"
            "| **İkiz Asal Sanısı** | p ve p + 2'nin ikisinin de asal olduğu sonsuz sayıda çift var mı? | 2013'te Yitang Zhang aradaki boşluğun sonlu olduğu sonsuz çift bulunduğunu ispatladı; boşluk 246'ya indirildi. |\n"
            "| **Collatz Sanısı** | 3n + 1 süreci her sayıda 1'e ulaşır mı? | 2⁶⁸'e kadar doğrulandı; ispat yok. |\n"
            "| **Tek Mükemmel Sayı** | Tek bir mükemmel sayı var mı? | Bilinmiyor; varsa çok büyük olmalı. |\n"
            "| **Mersenne Asalları** | Sonsuz sayıda Mersenne asalı var mı? | Bilinmiyor; GIMPS aramaya devam ediyor. |\n"
            "| **Riemann Hipotezi** | ζ(s) fonksiyonunun önemsiz olmayan sıfırları Re(s) = ½ doğrusunda mı? | Asalların dağılımıyla ilgili en önemli açık problem; 1 milyon dolar ödüllü. |")
        benzetme("Bu problemler, haritanın hâlâ beyaz kalan bölgeleridir. Bazıları ilkokul öğrencisinin anlayacağı kadar "
                 "basit sorulur, ama en büyük matematikçiler yüzyıllardır çözemedi.")
    with sekme[10]:
        st.subheader("Kullanılan Algoritmalar")
        st.markdown(
            "| Fonksiyon | Yöntem | Karmaşıklık |\n|---|---|---|\n"
            "| `is_asal` (n ≤ 10¹²) | 6k ± 1 deneme bölmesi, √n'de durma | O(√n) |\n"
            "| `is_asal` (n > 10¹²) | Deterministik Miller–Rabin (12 taban) | O(log³ n) |\n"
            "| `get_asal_carpanlar` | Deneme bölmesi; büyük sayılarda Pollard–Brent rho | O(√n) / ≈ O(n¹ᐟ⁴) |\n"
            "| `get_bolenler` | 1..√n tarama + ayna (n/d); büyüklerde çarpanlardan üretim | O(√n) |\n"
            "| `is_ramanujan` | İki işaretçi: a artar, b azalır | O(∛n) |\n"
            "| `is_fibonacci` | 5n² ± 4 tam kare testi | O(log n) |\n"
            "| `is_ikinin_kuvveti` | n & (n − 1) = 0 | O(1) |\n"
            "| `elek` | Eratosthenes kalburu | O(N log log N) |\n"
            "| EBOB | Öklid algoritması | O(log min(a, b)) |")
        benzetme("Kayıp eşi bulmak için ayakkabı dolabının yalnızca <b>yarısını</b> aramak yeter; çünkü her bölen "
                 "çiftinin bir teki √n'nin altındadır.")


# =====================================================================
# 11) ANA SAYFA
# =====================================================================
GUNUN_SAYILARI = [
    (1729, "Ramanujan'ın taksi sayısı: iki küp toplamı olarak iki farklı yolla yazılabilen en küçük sayı."),
    (496, "Üçüncü mükemmel sayı: kendisi hariç bölenlerinin toplamı tam olarak 496."),
    (91, "Asal sanılan en ünlü yarı asal: 7 × 13."),
    (153, "Armstrong sayısı: 1³ + 5³ + 3³ = 153. Aynı zamanda 17. üçgensel sayı."),
    (2047, "2¹¹ − 1: üs asal olduğu hâlde asal olmayan ilk Mersenne sayısı (23 × 89)."),
    (6174, "Kaprekar sabiti: rakamları büyükten küçüğe ve küçükten büyüğe dizip çıkarmaya devam et; hep 6174'e ulaşırsın."),
    (142857, "Döngüsel sayı: 2, 3, 4, 5 ve 6 ile çarpınca aynı rakamlar dönerek gelir."),
    (561, "İlk Carmichael sayısı: Fermat testini kandıran sahte asal (3 × 11 × 17)."),
    (65537, "Bilinen en büyük Fermat asalı: 2¹⁶ + 1."),
    (8128, "Dördüncü mükemmel sayı: 2⁶ · (2⁷ − 1)."),
    (360, "Bölen şampiyonu: 24 böleni var. Belki de bu yüzden bir tam tur 360 derece."),
    (1001, "7 × 11 × 13: üç basamaklı her sayıyı 1001 ile çarpınca sayı kendini iki kez tekrarlar (abc·1001 = abcabc)."),
    (2026, "Bu yılın sayısı: 2 × 1013. Yani bir yarı asal!"),
    (5050, "Gauss'un çocukken bulduğu toplam: 1 + 2 + … + 100 = 5050."),
]


def modul_ana():
    st.markdown('<div class="hero"><h1>🔢 Master Class: Sayılar ve DNA\'ları</h1>'
                '<p>Asal sayıların gizli dünyasını oyunlarla, röntgenlerle ve 3B görsellerle keşfet.</p></div>',
                unsafe_allow_html=True)
    sol, sag = st.columns([2, 3], gap="large")
    with sol:
        n, aciklama = GUNUN_SAYILARI[dt.date.today().toordinal() % len(GUNUN_SAYILARI)]
        st.markdown(f'<div class="gunun-sayisi"><div style="font-size:1.1rem;font-weight:700;letter-spacing:.1em">'
                    f'⭐ BUGÜNÜN SAYISI</div><div class="gs-sayi">{tr_sayi(n)}</div><div style="font-size:1.15rem">'
                    f'{aciklama}</div><div style="margin-top:.5rem;font-size:1.1rem"><b>DNA:</b> {carpim_yazisi(n)}</div></div>',
                    unsafe_allow_html=True)
        st.button("🔬 Bu sayının röntgenini çek", key="ana_gunun", on_click=sayfaya_git, args=(SAYFALAR[2], n))
    with sag:
        grafik(fig_bolen_daglari(400, "Bölen sayısı τ(n)"), "ana_daglar", 430)
    st.markdown("### Modüller")
    kartlar = [
        (SAYFALAR[1], "Sayı Avı (tek oyuncu ya da takım yarışı), Sayı Izgarası ve ipuçlarıyla Sayı Bilmecesi.", KIRMIZI),
        (SAYFALAR[2], "İstediğin sayıyı ya da 2^61−1 gibi bir ifadeyi yaz; çarpan ağacı, 3B bölen küpü, kimlik kartı ve EBOB–EKOK.", MAVI),
        (SAYFALAR[3], "11 konuda dokunmatik hız yarışı: kuvvetler, kökler, bölünebilme, trigonometri, logaritma…", SARI),
        (SAYFALAR[4], "3B bölen dağları, Ulam spirali, Eratosthenes kalburu, (a+b)³ küpü, Fibonacci ve Collatz.", TURKUAZ),
        (SAYFALAR[5], "Tanımlar, ispatlar, kavram yanılgıları ve hâlâ çözülmemiş ünlü problemler.", MOR),
    ]
    for satir in (kartlar[:3], kartlar[3:]):
        kol = st.columns(3)
        for k, (sayfa, metin, renk) in zip(kol, satir):
            with k:
                st.markdown(f'<div class="kart" style="border-top-color:{renk}"><h3>{sayfa}</h3><p>{metin}</p></div>',
                            unsafe_allow_html=True)
                st.button("Aç →", key=f"ana_{SAYFALAR.index(sayfa)}", on_click=sayfaya_git, args=(sayfa,))


# =====================================================================
# 12) YÖNLENDİRİCİ
# =====================================================================
with st.sidebar:
    st.markdown("## 🔢 MASTER CLASS")
    st.markdown("### Sayılar ve DNA'ları")
    st.radio("Modül", SAYFALAR, key="sayfa", label_visibility="collapsed")
    st.markdown("---")
    st.markdown("TÜBİTAK 2204-A · Matematik<br>Algoritma Tasarımı ve Uygulamaları", unsafe_allow_html=True)
    st.caption("Çevrimdışı çalışır · Akıllı tahta uyumlu · Sürüm 2")

{
    SAYFALAR[0]: modul_ana, SAYFALAR[1]: modul_oyun, SAYFALAR[2]: modul_dedektor,
    SAYFALAR[3]: modul_sprint, SAYFALAR[4]: modul_lab, SAYFALAR[5]: modul_bilgi,
}[st.session_state.sayfa]()
