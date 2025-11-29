import streamlit as st
import math
import random
import time

# --- SAYFA AYARLARI ---
st.set_page_config(
    page_title="Master Class Matematik",
    page_icon="🎓",
    layout="wide"
)

# =============================================================================
# TASARIM VE GÖRSELLİK (CSS KODLARI)
# =============================================================================
st.markdown("""
    <style>
    /* Menü ve Alt Bilgi Gizleme */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* Arka Plan Görseli */
    .stApp {
        background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
        background-color: #0e1117;
    }
    
    /* Kurum İsmi Stili */
    .bilsem-header {
        text-align: center;
        color: #dc3545; /* BİLSEM Kırmızısı */
        font-weight: 900;
        font-size: 1.5rem;
        font-family: 'Verdana', sans-serif;
        padding: 15px;
        border-bottom: 3px solid #dc3545;
        margin-bottom: 20px;
        background-color: rgba(220, 53, 69, 0.1);
        border-radius: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    /* Butonları Güzelleştirme */
    .stButton>button {
        font-weight: bold;
        border-radius: 8px;
        border: 1px solid #dc3545;
        transition: all 0.3s;
    }
    .stButton>button:hover {
        background-color: #dc3545;
        color: white;
        border-color: white;
    }
    </style>
    """, unsafe_allow_html=True)

# =============================================================================
# MATEMATİK FONKSİYONLARI
# =============================================================================
def is_tek(n): return n % 2 != 0
def is_tam_kare(n): return n >= 0 and int(math.isqrt(n))**2 == n
def is_tam_kup(n): return n >= 0 and round(n**(1/3))**3 == n
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
def is_palindromik(n): return str(n) == str(n)[::-1]
def is_harshad(n): return n > 0 and n % sum(int(d) for d in str(n)) == 0
def is_ucgensel(n): return n >= 0 and is_tam_kare(8 * n + 1)
def is_iki_kuvveti(n): return n > 0 and (n & (n - 1)) == 0
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

OVGULER = ["Harikasın! 🚀", "Matematik Dehası! 🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# WEB ARAYÜZÜ
# =============================================================================

# Yan menü
st.sidebar.title("🧮 Menü")
secim = st.sidebar.radio("Mod Seçiniz:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü"])
st.sidebar.markdown("---")

# KURUM İSMİ (HTML KODU)
kurum_kodu = """
<div class="bilsem-header">
    ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    if 'hedef_sayi' not in st.session_state:
        st.session_state.hedef_sayi = 0
        st.session_state.puan = 0
        st.session_state.gizli = True
        st.session_state.sorular_cevaplandi = [False] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = 0
        st.session_state.oyun_suresi = 60
        st.session_state.oyun_aktif = False

    # ZAMANLAYICI VE PROGRESS BAR
    kalan_sure = 0
    progress_degeri = 0.0
    
    if st.session_state.oyun_aktif:
        gecen = time.time() - st.session_state.baslangic_zamani
        kalan_sure = int(st.session_state.oyun_suresi - gecen)
        if st.session_state.oyun_suresi > 0:
            progress_degeri = kalan_sure / st.session_state.oyun_suresi
            if progress_degeri < 0: progress_degeri = 0.0
            
        if kalan_sure <= 0:
            kalan_sure = 0
            st.session_state.oyun_aktif = False
            st.toast("⏰ SÜRE DOLDU!", icon="⚠️")

    # SKOR PANOSU
    col_score1, col_score2, col_score3 = st.columns(3)
    col_score1.metric("PUAN", st.session_state.puan)
    col_score2.metric("SÜRE", f"{kalan_sure} sn")
    
    if st.session_state.gizli:
        gosterim = "???"
    else:
        gosterim = str(st.session_state.hedef_sayi)
    col_score3.metric("GİZLİ SAYI", gosterim)
    
    if st.session_state.oyun_aktif:
        st.progress(progress_degeri, text="Kalan Süre")

    if st.session_state.hedef_sayi != 0:
        if st.button("👁️ Gizli Sayıyı Göster/Gizle", use_container_width=True):
            st.session_state.gizli = not st.session_state.gizli
            st.rerun()

    # AYARLAR
    st.sidebar.subheader("⚙️ Oyun Ayarları")
    mn = st.sidebar.number_input("Min Sayı", 1, 1000, 1)
    mx = st.sidebar.number_input("Max Sayı", 1, 2000, 1000)
    sure_secimi = st.sidebar.selectbox("Süre Seçin", [60, 120, 180])
    
    if st.sidebar.button("🎲 YENİ OYUN BAŞLAT", type="primary", use_container_width=True):
        bulundu = False; deneme = 0; aday = 0
        while not bulundu and deneme < 200:
            aday = random.randint(mn, mx); score = 0
            if is_asal(aday): score += 1
            if is_tam_kare(aday): score += 1
            if is_fibonacci(aday): score += 1
            if is_mukemmel(aday): score += 5
            if is_ramanujan(aday): score += 10
            if score > 0: bulundu = True
            else: deneme += 1
        
        st.session_state.hedef_sayi = aday
        st.session_state.puan = 0
        st.session_state.gizli = True
        st.session_state.sorular_cevaplandi = [False] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = time.time()
        st.session_state.oyun_suresi = sure_secimi
        st.session_state.oyun_aktif = True
        st.rerun()

    st.markdown("---")

    # OYUN ALANI
    if st.session_state.hedef_sayi != 0:
        if not st.session_state.oyun_aktif and kalan_sure <= 0:
            st.error("⏰ OYUN BİTTİ! Yeni oyun başlatın.")
        
        for i, (soru, func, p_d, p_y, sol_txt, sag_txt) in enumerate(OZELLIKLER):
            # Cevaplanmamış soru ise butonları göster
            if not st.session_state.sorular_cevaplandi[i]:
                with st.container():
                    st.info(f"**{soru}** (D: {p_d}p / Y: {p_y}p)")
                    col_btn1, col_btn2 = st.columns(2)
                    buton_aktif = st.session_state.oyun_aktif
                    
                    if col_btn1.button(sol_txt, key=f"btn_sol_{i}", disabled=not buton_aktif, use_container_width=True):
                        dogru_cevap = func(st.session_state.hedef_sayi)
                        if dogru_cevap:
                            st.session_state.puan += p_d
                            st.toast(f"{random.choice(OVGULER)} +{p_d} Puan", icon="✅")
                        else:
                            st.session_state.puan -= 5
                            st.toast("Yanlış! -5 Puan", icon="❌")
                        st.session_state.sorular_cevaplandi[i] = True
                        st.rerun()
                        
                    if col_btn2.button(sag_txt, key=f"btn_sag_{i}", disabled=not buton_aktif, use_container_width=True):
                        dogru_cevap = func(st.session_state.hedef_sayi)
                        if not dogru_cevap:
                            st.session_state.puan += p_y
                            st.toast(f"{random.choice(OVGULER)} +{p_y} Puan", icon="✅")
                        else:
                            st.session_state.puan -= 5
                            st.toast("Yanlış! -5 Puan", icon="❌")
                        st.session_state.sorular_cevaplandi[i] = True
                        st.rerun()
            
            # CEVAPLANMIŞ SORU (DÜZELTİLEN KISIM)
            else:
                dogru_mu = func(st.session_state.hedef_sayi)
                
                # Metni Temizle (Örn: "Sayı ASAL mı?" -> "ASAL")
                kavram = soru.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "")
                kavram = kavram.replace("yoksa", "").strip()

                # ÖZEL DURUM: TEK/ÇİFT
                if "TEK" in soru:
                    cevap_metni = "TEK" if dogru_mu else "ÇİFT"
                    # Tek/Çift için renk nötr kalabilir veya çift yeşil, tek yeşil yapılabilir.
                    # Burada standart yeşil yapıyoruz.
                    st.success(f"✅ {soru} -> **{cevap_metni}**")
                
                # DİĞER DURUMLAR (ASAL, MÜKEMMEL VB.)
                else:
                    if dogru_mu:
                        # Sayı o özelliğe SAHİP (Yeşil)
                        st.success(f"✅ {soru} -> **EVET ({kavram})**")
                    else:
                        # Sayı o özelliğe SAHİP DEĞİL (Kırmızı/Turuncu)
                        st.error(f"❌ {soru} -> **