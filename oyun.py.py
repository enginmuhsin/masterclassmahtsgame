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

    st.sidebar.markdown("---")
    mn = st.sidebar.number_input("Min", 1, 1000, 1)
    mx = st.sidebar.number_input("Max", 1, 2000, 1000)
    sure = st.sidebar.selectbox("Süre", [60, 120, 180])
    
    if st.sidebar.button("🎲 YENİ OYUN", type="primary", use_container_width=True):
        bulundu = False
        deneme = 0
        aday = 0
        while not bulundu and deneme < 200:
            aday = random.randint(mn, mx)
            sc = 0
            if is_asal(aday): sc += 1
            if is_tam_kare(aday): sc += 1
            if is_fibonacci(aday): sc += 1
            if is_mukemmel(aday): sc += 5
            if is_ramanujan(aday): sc += 10
            if sc > 0: bulundu = True
            else: deneme += 1
        
        st.session_state.hedef_sayi = aday
        st.session_state.puan = 0
        st.session_state.gizli = True
        st.session_state.sorular_cevaplandi = [False] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = time.time()
        st.session_state.oyun_suresi = sure
        st.session_state.oyun_aktif = True
        st.rerun()

    if st.session_state.hedef_sayi != 0:
        if not st.session_state.oyun_aktif and kalan_sure <= 0:
            st.error("⏰ SÜRE DOLDU!")
        
        st.write(f"### Sorular ({mn}-{mx} Arası)")
        
        for i, (soru, func, p_d, p_y, sol, sag) in enumerate(OZELLIKLER):
            if not st.session_state.sorular_cevaplandi[i]:
                with st.container():
                    col_txt, col_b1, col_b2 = st.columns([5, 1, 1])
                    col_txt.info(f"**{soru}**")
                    
                    aktif = st.session_state.oyun_aktif
                    
                    if col_b1.button(sol, key=f"b1_{i}", disabled=not aktif):
                        res = func(st.session_state.hedef_sayi)
                        if res:
                            st.session_state.puan += p_d
                            st.toast(f"Doğru! +{p_d}", icon="✅")
                        else:
                            st.session_state.puan -= 5
                            st.toast("Yanlış! -5", icon="❌")
                        st.session_state.sorular_cevaplandi[i] = True
                        st.rerun()
                        
                    if col_b2.button(sag, key=f"b2_{i}", disabled=not aktif):
                        res = func(st.session_state.hedef_sayi)
                        if not res:
                            st.session_state.puan += p_y
                            st.toast(f"Doğru! +{p_y}", icon="✅")
                        else:
                            st.session_state.puan -= 5
                            st.toast("Yanlış! -5", icon="❌")
                        st.session_state.sorular_cevaplandi[i] = True
                        st.rerun()
            else:
                res = func(st.session_state.hedef_sayi)
                cevap = "EVET" if res else "HAYIR"
                st.success(f"✅ {soru} -> **{cevap}**")
    else:
        st.info("👈 Menüden 'YENİ OYUN' butonuna basın.")

# --- MOD 2: SAYI DEDEKTÖRÜ ---
elif secim == "🔍 Sayı Dedektörü":
    st.title("🔍 Master Class Sayı Dedektörü")
    # Kurum ismini burada da gösteriyoruz
    st.markdown(kurum_html, unsafe_allow_html=True)
    
    st.markdown("Merak ettiğiniz bir sayıyı girin, **yapay zeka** özelliklerini bulsun!")

    col1, col2 = st.columns([3, 1])
    with col1:
        val = st.number_input("Sayı Girin:", 0, 1000000, 0, 1)
    with col2:
        st.write(""); st.write("") 
        btn = st.button("🚀 ANALİZ ET", use_container_width=True, type="primary")

    if btn and val > 0:
        st.divider()
        st.subheader(f"📊 {val} Analiz Raporu")
        
        c_sol, c_sag = st.columns(2)
        ozel = False
        
        d = "ÇİFT" if val % 2 == 0 else "TEK"
        c_sol.info(f"👉 Bu sayı bir **{d}** sayıdır.")
        
        idx = 0
        for ad, func, _, _, _, _ in OZELLIKLER:
            if "TEK" in ad: continue
            kisa = ad.replace("Sayı ", "").replace(" sayısı mı?", "")
            kisa = kisa.replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "")
            
            if func(val):
                hedef = c_sol if idx % 2 == 0 else c_sag
                with hedef:
                    st.success(f"✅ {kisa}")
                    
                    if "FIBONACCI" in kisa:
                        with st.expander("Fibonacci Bilgisi"):
                            st.write("Altın oranın temeli olan Fibonacci dizisindedir.")
                            fibo_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/1024px-Fibonacci_Spiral.svg.png"
                            st.image(fibo_url, caption="Fibonacci Sarmalı")

                if "PALİNDROMİK" not in kisa or val > 10:
                    ozel = True
            idx += 1

        st.divider()
        if ozel:
            st.balloons()
            st.success("🌟 SONUÇ: **MASTER CLASS** (Özel) bir sayı! 🌟")
        else:
            st.warning("💡 SONUÇ: Sıradan bir sayı.")