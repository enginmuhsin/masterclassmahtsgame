import streamlit as st
import math
import random
import time

# --- SAYFA AYARLARI ---
st.set_page_config(
    page_title="Master Class",
    page_icon="∑",
    layout="wide"
)

# --- GİZLİ MENÜ VE ALT BİLGİ AYARLARI ---
hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# =============================================================================
# MATEMATİK FONKSİYONLARI
# =============================================================================
def is_tek(n):
    return n % 2 != 0

def is_tam_kare(n):
    if n < 0: return False
    return int(math.isqrt(n))**2 == n

def is_tam_kup(n):
    if n < 0: return False
    return round(n**(1/3))**3 == n

def is_asal(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(math.isqrt(n)) + 1, 2):
        if n % i == 0: return False
    return True

def is_mukemmel(n):
    if n < 2: return False
    toplam = 1
    for i in range(2, int(math.isqrt(n)) + 1):
        if n % i == 0:
            toplam += i
            if i*i != n: toplam += n // i
    return toplam == n

def is_fibonacci(n):
    def is_sq(x): return int(math.isqrt(x))**2 == x
    return is_sq(5*n*n + 4) or is_sq(5*n*n - 4)

def is_palindromik(n):
    return str(n) == str(n)[::-1]

def is_harshad(n):
    if n <= 0: return False
    return n % sum(int(d) for d in str(n)) == 0

def is_ucgensel(n):
    if n < 0: return False
    return is_tam_kare(8 * n + 1)

def is_iki_kuvveti(n):
    return n > 0 and (n & (n - 1)) == 0

def is_armstrong(n): 
    s = str(n)
    return sum(int(d) ** len(s) for d in s) == n

def is_ramanujan(n):
    if n < 1729: return False 
    ways = 0
    limit = int(n**(1/3)) + 1
    for a in range(1, limit):
        b3 = n - a**3
        if b3 <= a**3: break
        b = round(b3**(1/3))
        if b**3 == b3: ways += 1
    return ways >= 2

# ÖZELLİK LİSTESİ
OZELLIKLER = [
    ("Sayı TEK mi yoksa ÇİFT mi?", is_tek, 5, 5, "TEK", "ÇİFT"),
    ("Sayı ASAL mı?", is_asal, 20, 2, "EVET", "HAYIR"),
    ("Sayı TAM KARE mi?", is_tam_kare, 15, 2, "EVET", "HAYIR"),
    ("Sayı TAM KÜP mü?", is_tam_kup, 20, 2, "EVET", "HAYIR"),
    ("Sayı MÜKEMMEL sayı mı?", is_mukemmel, 100, 5, "EVET", "HAYIR"),
    ("Sayı FIBONACCI dizisinde mi?", is_fibonacci, 25, 2, "EVET", "HAYIR"),
    ("Sayı PALİNDROMİK mi?", is_palindromik, 10, 1, "EVET", "HAYIR"),
    ("Sayı HARSHAD sayısı mı?", is_harshad, 15, 1, "EVET", "HAYIR"),
    ("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR"),
    ("Sayı ÜÇGENSEL sayı mı?", is_ucgensel, 20, 2, "EVET", "HAYIR"),
    ("Sayı 2'nin KUVVETİ mi?", is_iki_kuvveti, 15, 2, "EVET", "HAYIR"),
    ("Sayı ARMSTRONG sayısı mı?", is_armstrong, 30, 2, "EVET", "HAYIR"),
]

# =============================================================================
# WEB ARAYÜZÜ
# =============================================================================

st.sidebar.title("🧮 Menü")
secim = st.sidebar.radio("Mod:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü"])
st.sidebar.markdown("---")

# --- KURUM İSMİ İÇİN ÖZEL HTML STİLİ ---
kurum_html = """
    <h3 style='text-align: center; color: #dc3545; font-weight: bold; font-family: sans-serif; padding-bottom: 20px;'>
    (ANKARA KAHRAMANKAZAN BİLİM ve SANAT MERKEZİ)
    </h3>
    """

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik Oyunu")
    # Kurum ismini renkli ve ortalı yazdırıyoruz
    st.markdown(kurum_html, unsafe_allow_html=True)
    
    # Hafıza
    if 'hedef_sayi' not in st.session_state:
        st.session_state.hedef_sayi = 0
        st.session_state.puan = 0
        st.session_state.gizli = True
        st.session_state.sorular_cevaplandi = [False] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = 0
        st.session_state.oyun_suresi = 60
        st.session_state.oyun_aktif = False

    # Skor Tablosu
    st.sidebar.header("📊 SKOR")
    
    kalan_sure = 0
    if st.session_state.oyun_aktif:
        gecen = time.time() - st.session_state.baslangic_zamani
        kalan_sure = int(st.session_state.oyun_suresi - gecen)
        if kalan_sure <= 0:
            kalan_sure = 0
            st.session_state.oyun_aktif = False
            st.toast("⏰ SÜRE DOLDU!", icon="⚠️")
    
    c1, c2 = st.sidebar.columns(2)
    c1.metric("PUAN", st.session_state.puan)
    c2.metric("SÜRE", f"{kalan_sure} sn")
    
    st.sidebar.subheader("Gizli Sayı")
    if st.session_state.gizli:
        txt = "???"
    else:
        txt = str(st.session_state.hedef_sayi)
    st.sidebar.code(txt)
    
    if st.session_state.hedef_sayi != 0:
        if st.sidebar.button("👁️ Göster/Gizle", use_container_width=True):
            st.session_state.gizli = not st.session_state.gizli
            st.rerun()

    st.sidebar