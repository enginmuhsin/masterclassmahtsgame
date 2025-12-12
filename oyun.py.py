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
# TASARIM: AYDINLIK & FERAH TEMA (CSS)
# =============================================================================
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    .stApp {
        background-color: #f8f9fa;
        background-image: radial-gradient(#dee2e6 1px, transparent 1px);
        background-size: 20px 20px;
    }
    
    h1 {
        color: #0d2b5b !important;
        text-shadow: 1px 1px 2px #b0b0b0;
        font-weight: 900 !important;
        font-family: 'Helvetica', sans-serif;
    }
    
    [data-testid="stMetricLabel"] {
        color: #495057 !important;
        font-size: 1.1rem !important;
        font-weight: bold !important;
    }
    [data-testid="stMetricValue"] {
        color: #dc3545 !important;
        font-size: 2.5rem !important;
        font-weight: 900 !important;
    }
    
    /* YÜZEN (STICKY) HEDEF SAYI KUTUSU */
    .floating-container {
        position: fixed;
        top: 60px; /* Masaüstü görünümde üstten 60px aşağıda (varsayılan) */
        right: 20px;
        z-index: 999999;
        background: linear-gradient(135deg, #dc3545, #a71d2a);
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        border: 3px solid white;
        text-align: center;
        min-width: 150px;
    }
    
    .floating-label {
        color: white;
        display: block;
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .floating-value {
        color: #ffffff;
        font-size: 3rem;
        font-weight: 900;
        line-height: 1;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
    }

    /* BURASI GÜNCELLENDİ */
    @media (max-width: 600px) {
        .floating-container {
            position: relative; /* Sabit konumdan çıkar, normal akışa girsin */
            margin-bottom: 20px; /* Altındaki elementlerle boşluk bırak */
            top: unset;
            right: unset;
            left: unset;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .floating-label { margin-bottom: 0; font-size: 0.9rem; }
        .floating-value { font-size: 2rem; }
        
        /* st.title ve diğer elementler için yukarıdan biraz boşluk bırakalım. */
        /* Bunu yapmanın en güvenli yolu, hedef sayıyı göstermeyi oyunun içine almaktır. */
        /* Ancak mevcut kodu korumak için, oyun modu içeriğinde bir düzenleme yapmalıyız. */
    }

    .bilsem-header {
        text-align: center;
        color: #ffffff; 
        font-weight: bold;
        font-size: 1.3rem;
        font-family: 'Verdana', sans-serif;
        padding: 15px;
        margin-bottom: 20px;
        background: linear-gradient(90deg, #0d2b5b 0%, #dc3545 100%);
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .stButton>button {
        font-weight: bold;
        border-radius: 12px;
        border: 2px solid #0d2b5b;
        color: #0d2b5b;
        background-color: #ffffff;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stButton>button:hover {
        background-color: #0d2b5b;
        color: white;
        border-color: #0d2b5b;
        transform: translateY(-2px);
    }
    
    .streamlit-expanderHeader { font-weight: bold; color: #0d2b5b; font-size: 1.1rem; }
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

# FORMULA SPRINT VERİLERİ
def get_carpim_tablosu(): return [(f"{i} x {j} = ...", str(i*j), 5) for i in range(2, 10) for j in range(2, 10)]
def get_tam_kareler(): return [(f"{i}² = ...", str(i**2), 10) for i in range(1, 31)]
def get_tam_kupler(): return [(f"{i}³ = ...", str(i**3), 15) for i in range(1, 16)]
def get_ileri_duzey():
    return [
        ("a² - b² = (a - b)(...)", "a+b", 30), ("(a + b)² = a² + 2ab + ...", "b²", 25),
        ("(a - b)² = a² - 2ab + ...", "b²", 25), ("x² - 16 = (x - 4)(...)", "x+4", 30),
        ("a³ - b³ = (a - b)(a² + ab + ...)", "b²", 80), ("a³ + b³ = (a + b)(a² - ab + ...)", "b²", 80),
        ("sin²x + cos²x = ...", "1", 20), ("tanx = sinx / ...", "cosx", 20),
        ("sin(2x) = 2 sinx ...", "cosx", 60), ("cos(2x) = cos²x - ...", "sin²x", 60),
        ("sin(x + y) = sinx cosy + ...", "cosx siny", 70), ("sin(90 - x) = ...", "cosx", 40),
    ]

OVGULER = ["Harikasın! 🚀", "Matematik Dehası! 🧠", "BİLSEM Yıldızı! ⭐", "Mükemmel Gidiyorsun! 🔥", "Durmak Yok! 💪", "Süper Zeka! ⚡"]

# =============================================================================
# YARDIMCI FONKSİYONLAR
# =============================================================================
def normalize_cevap(cevap):
    if not isinstance(cevap, str): cevap = str(cevap)
    normalized = cevap.replace(' ', '').lower()
    normalized = normalized.replace('²', '2').replace('³', '3')
    normalized = normalized.replace('^', '').replace('**', '').replace('*', '') 
    return normalized

def sonraki_soru_sprint(tab_key):
    liste = st.session_state[f"liste_{tab_key}"]
    yeni_idx = random.randint(0, len(liste) - 1)
    st.session_state[f"idx_{tab_key}"] = yeni_idx
    st.session_state[f"msg_{tab_key}"] = None 
    st.session_state[f"input_{tab_key}"] = "" 

def kontrol_et_sprint(cevap, tab_key):
    idx = st.session_state.get(f"idx_{tab_key}", 0)
    liste = st.session_state[f"liste_{tab_key}"]
    soru, dogru, puan = liste[idx]
    if normalize_cevap(cevap) == normalize_cevap(dogru):
        st.session_state[f"msg_{tab_key}"] = ("dogru", puan)
        st.session_state.ezber_puan += puan
        st.toast(f"✅ Doğru! +{puan} Puan", icon="🧠")
    else:
        st.session_state[f"msg_{tab_key}"] = ("yanlis", dogru)
        st.toast("❌ Yanlış Cevap", icon="🤔")

def cevap_ver(index, buton_tipi):
    if not st.session_state.oyun_aktif: return
    soru_data = OZELLIKLER[index]
    func = soru_data[1]
    p_d = soru_data[2]; p_y = soru_data[3]
    dogru_mu = func(st.session_state.hedef_sayi); kullanici_bildi_mi = False
    
    if buton_tipi == "sol":
        if dogru_mu: kullanici_bildi_mi = True
    elif buton_tipi == "sag":
        if not dogru_mu: kullanici_bildi_mi = True
            
    if kullanici_bildi_mi:
        st.session_state.sorular_cevaplandi[index] = "dogru"
        kazanc = p_d if buton_tipi == "sol" else p_y
        st.session_state.puan += kazanc
        st.toast(f"{random.choice(OVGULER)} +{kazanc} Puan", icon="✅")
    else:
        st.session_state.sorular_cevaplandi[index] = "yanlis"
        st.session_state.puan -= 5
        st.toast("Yanlış! -5 Puan", icon="❌")
        
    if None not in st.session_state.sorular_cevaplandi:
        st.session_state.oyun_aktif = False
        st.session_state.bitis_zamani = time.time()
        st.rerun()

def yeni_oyun_baslat():
    mn = st.session_state.get('ayar_min', 1)
    mx = st.session_state.get('ayar_max', 5000)
    sure = st.session_state.get('ayar_sure', 60)
    CHECK_FUNCTIONS = [is_asal, is_tam_kare, is_fibonacci, is_mukemmel, is_harshad, is_ucgensel, is_iki_kuvveti, is_armstrong]
    
    bulundu = False; deneme = 0; aday = 0
    while not bulundu and deneme < 200:
        if mx > 1000:
            min_val = min(100, mx)
            aday = random.randint(min_val, mx)
        else:
            aday = random.randint(mn, mx)
        has_property = any(func(aday) for func in CHECK_FUNCTIONS)
        if has_property: bulundu = True
        else: deneme += 1
    if not bulundu: aday = random.randint(mn, mx)
    st.session_state.hedef_sayi = aday
    st.session_state.puan = 0
    st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
    simdi = time.time()
    st.session_state.baslangic_zamani = simdi
    st.session_state.bitis_zamani = simdi + sure
    st.session_state.oyun_suresi = sure
    st.session_state.oyun_aktif = True

# =============================================================================
# ARAYÜZ BAŞLANGICI
# =============================================================================

st.sidebar.title("🧮 Menü")
secim = st.sidebar.radio("Seçim Yapınız:", ["🎮 Oyun Modu", "🔍 Sayı Dedektörü", "🧠 Formula Sprint", "📚 Bilgi Köşesi"])
st.sidebar.markdown("---")

kurum_kodu = """
<div class="bilsem-header">
    ANKARA KAHRAMANKAZAN<br>BİLİM ve SANAT MERKEZİ
</div>
"""

# GLOBAL STATE
if 'en_yuksek_puan' not in st.session_state: st.session_state.en_yuksek_puan = 0
if 'ezber_puan' not in st.session_state: st.session_state.ezber_puan = 0

# --- MOD 1: OYUN MODU ---
if secim == "🎮 Oyun Modu":
    st.title("🎮 Master Class Matematik")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    if 'hedef_sayi' not in st.session_state:
        st.session_state.hedef_sayi = 0
        st.session_state.puan = 0
        st.session_state.sorular_cevaplandi = [None] * len(OZELLIKLER)
        st.session_state.baslangic_zamani = 0
        st.session_state.bitis_zamani = 0
        st.session_state.oyun_suresi = 60
        st.session_state.oyun_aktif = False
        st.session_state.ayar_min = 1
        st.session_state.ayar_max = 5000
        st.session_state.ayar_sure = 60

    kalan_sure = 0
    progress_degeri = 0.0
    oyun_bitti_animasyonu = False
    
    if st.session_state.oyun_aktif:
        simdi = time.time()
        fark = st.session_state.bitis_zamani - simdi
        if fark <= 0:
            kalan_sure = 0
            st.session_state.oyun_aktif = False
            if st.session_state.puan > st.session_state.en_yuksek_puan:
                st.session_state.en_yuksek_puan = st.session_state.puan
                oyun_bitti_animasyonu = True 
        else:
            kalan_sure = int(fark)
            total_sure = st.session_state.bitis_zamani - st.session_state.baslangic_zamani
            progress_degeri = fark / total_sure
            if progress_degeri < 0: progress_degeri = 0.0
            if progress_degeri > 1: progress_degeri = 1.0

    st.sidebar.subheader("⚙️ Ayarlar")
    mn = st.sidebar.number_input("Min Sayı", 1, 5000, st.session_state.ayar_min)
    mx = st.sidebar.number_input("Max Sayı", 1, 10000, st.session_state.ayar_max)
    sure_secimi = st.sidebar.selectbox("Süre Seçin", [60, 120, 180], index=[60, 120, 180].index(st.session_state.ayar_sure))
    st.session_state.ayar_min = mn; st.session_state.ayar_max = mx; st.session_state.ayar_sure = sure_secimi
    
    if st.sidebar.button("🎲 YENİ OYUN BAŞLAT (SIFIRLA)", use_container_width=True):
        yeni_oyun_baslat()
        st.rerun()
    st.markdown("---")

    if st.session_state.hedef_sayi != 0 :
        st.markdown(f"""
            <div class="floating-container">
                <span class="floating-label">HEDEF SAYI</span>
                <span class="floating-value">{st.session_state.hedef_sayi}</span>
            </div>
        """, unsafe_allow_html=True)
        # ARTIK BU KODUN ALTINDAKİ ELEMENTLER MOBİLDE GÖRÜNEBİLİR.
        
        c1, c2, c3, c4 = st.columns([1, 1, 1, 1.5])
        c1.metric("PUAN", st.session_state.puan)

        with c2:
            st.markdown(f"""<div style="text-align: center;"><p style="margin:0; font-weight:bold; color:#495057;">REKOR</p><p style="margin:0; font-size: 2.5rem; font-weight:900; color: #d4af37; text-shadow: 1px 1px 1px black;">{st.session_state.en_yuksek_puan}</p></div>""", unsafe_allow_html=True)
        c3.metric("SÜRE", f"{kalan_sure} sn")
        
        st.progress(progress_degeri, text="Kalan Süre")
        
        if not st.session_state.oyun_aktif and kalan_sure <= 0:
            if oyun_bitti_animasyonu:
                st.balloons()
                st.success(f"🏆 TEBRİKLER! YENİ REKOR KIRDINIZ: {st.session_state.puan} PUAN!")
            else:
                if None not in st.session_state.sorular_cevaplandi:
                    st.success("Tebrikler! Tüm soruları zamanından önce bitirdiniz!")
                else:
                    st.error("⏰ SÜRE DOLDU!")
            st.markdown("---")
            col_tekrar1, col_tekrar2, col_tekrar3 = st.columns([1, 2, 1])
            with col_tekrar2:
                if st.button("🔄 TEKRAR OYNA (YENİ SORU)", type="primary", use_container_width=True):
                    yeni_oyun_baslat()
                    st.rerun()
            st.markdown("---")

        for i, (soru, func, p_d, p_y, sol_txt, sag_txt) in enumerate(OZELLIKLER):
            durum = st.session_state.sorular_cevaplandi[i]
            if durum is None:
                with st.container():
                    st.write(f"**{soru}** <span style='color:#6c757d; font-size:0.9em;'>(D: {p_d}p / Y: {p_y}p)</span>", unsafe_allow_html=True)
                    col_btn1, col_btn2 = st.columns(2)
                    buton_aktif = st.session_state.oyun_aktif
                    col_btn1.button(sol_txt, key=f"btn_sol_{i}", disabled=not buton_aktif, use_container_width=True, on_click=cevap_ver, args=(i, "sol"))
                    col_btn2.button(sag_txt, key=f"btn_sag_{i}", disabled=not buton_aktif, use_container_width=True, on_click=cevap_ver, args=(i, "sag"))
            else:
                dogru_mu = func(st.session_state.hedef_sayi)
                kavram = soru.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "").replace("yoksa", "").strip()
                gercek_cevap_metni = ("TEK" if dogru_mu else "ÇİFT") if "TEK" in soru else (f"EVET ({kavram})" if dogru_mu else f"HAYIR ({kavram} DEĞİL)")
                if durum == "dogru": st.success(f"✅ DOĞRU! -> **{gercek_cevap_metni}**")
                else: st.error(f"❌ YANLIŞ! Doğrusu -> **{gercek_cevap_metni}**")
        
        if st.session_state.oyun_aktif:
            time.sleep(0.5) 
            st.rerun()
    else:
        st.markdown("### Hazır mısın? Matematik Bilgini Test Etme Zamanı! 🧠")
        st.markdown("---")
        st.info("Oyun başlamadan önce sol menüden süre ve sayı aralığı ayarlarını kontrol edebilirsin.")
        col_start1, col_start2, col_start3 = st.columns([1, 2, 1])
        with col_start2:
            if st.button("🚀 OYUNU BAŞLAT", key="main_start_button", type="primary", use_container_width=True):
                yeni_oyun_baslat()
                st.rerun()

# --- MOD 2: SAYI DEDEKTÖRÜ ---
elif secim == "🔍 Sayı Dedektörü":
    st.title("🔍 Master Class Dedektör")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    st.markdown("Merak ettiğiniz bir sayıyı girin, **yapay zeka** özelliklerini bulsun!")

    col1, col2 = st.columns([3, 1])
    with col1: val = st.number_input("Sayı Girin:", 0, 1000000, 0, 1)
    with col2:
        st.write(""); st.write("") 
        btn = st.button("🚀 ANALİZ ET", use_container_width=True, type="primary")

    if btn and val > 0:
        st.divider()
        st.subheader(f"📊 {val} Analiz Raporu")
        c_sol, c_sag = st.columns(2)
        d = "ÇİFT" if val % 2 == 0 else "TEK"
        c_sol.info(f"👉 Bu sayı bir **{d}** sayıdır.")
        idx = 0
        TUM_KONTROL = OZELLIKLER + [("Sayı RAMANUJAN sayısı mı?", is_ramanujan, 200, 5, "EVET", "HAYIR")]
        for ad, func, _, _, _, _ in TUM_KONTROL:
            if "TEK" in ad: continue
            kisa = ad.replace("Sayı ", "").replace(" sayısı mı?", "").replace(" dizisinde mi?", "").replace(" mü?", "").replace(" mi?", "").replace("?", "").replace("yoksa", "").strip()
            kisa = kisa.replace(" mı", "").replace(" mi", "").replace(" mu", "").replace(" mü", "").strip()
            
            if func(val):
                hedef = c_sol if idx % 2 == 0 else c_sag
                with hedef:
                    st.success(f"✅ **{kisa}**")
                    if "FIBONACCI" in kisa:
                        with st.expander("Fibonacci Bilgisi"):
                            st.write("Altın oranın temeli olan Fibonacci dizisindedir.")
                            st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/1024px-Fibonacci_Spiral.svg.png", caption="Fibonacci Sarmalı")
                    if "RAMANUJAN" in kisa:
                         st.info("Bu sayı çok özeldir! İlk üç Ramanujan sayısı: 1729, 4104, 13832'dir.")
            idx += 1
        st.divider()

# --- MOD 3: FORMULA SPRINT ---
elif secim == "🧠 Formula Sprint":
    st.title("🧠 Formula Sprint: Hızlı Tekrar")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    st.metric("SPRINT PUANI", st.session_state.ezber_puan)
    
    # Veri setlerini hazırla
    if 'liste_carpim' not in st.session_state: st.session_state.liste_carpim = get_carpim_tablosu()
    if 'liste_kare' not in st.session_state: st.session_state.liste_kare = get_tam_kareler()
    if 'liste_kup' not in st.session_state: st.session_state.liste_kup = get_tam_kupler()
    if 'liste_efsane' not in st.session_state: st.session_state.liste_efsane = get_ileri_duzey()
    
    tab1, tab2, tab3, tab4 = st.tabs(["✖️ Çarpım Tablosu", "🔲 Tam Kareler", "🧊 Tam Küpler", "🚀 Efsane Formüller"])
    
    with tab1:
        st.subheader("Çarpım Tablosu")
        if st.button("Sıradaki Soru", key="bn_c"): sonraki_soru_sprint("carpim")
        idx = st.session_state.get("idx_carpim", 0)
        soru, dogru, puan = st.session_state.liste_carpim[idx]
        st.markdown(f"### `{soru}`")
        with st.form("f_c"):
            cevap = st.text_input("Cevap:", key="in_c")
            if st.form_submit_button("Kontrol Et"): kontrol_et_sprint(cevap, "carpim")
    
    with tab2:
        st.subheader("Tam Kareler")
        if st.button("Sıradaki Soru", key="bn_k"): sonraki_soru_sprint("kare")
        idx = st.session_state.get("idx_kare", 0)
        soru, dogru, puan = st.session_state.liste_kare[idx]
        st.markdown(f"### `{soru}`")
        with st.form("f_k"):
            cevap = st.text_input("Cevap:", key="in_k")
            if st.form_submit_button("Kontrol Et"): kontrol_et_sprint(cevap, "kare")

    with tab3:
        st.subheader("Tam Küpler")
        if st.button("Sıradaki Soru", key="bn_ku"): sonraki_soru_sprint("kup")
        idx = st.session_state.get("idx_kup", 0)
        soru, dogru, puan = st.session_state.liste_kup[idx]
        st.markdown(f"### `{soru}`")
        with st.form("f_ku"):
            cevap = st.text_input("Cevap:", key="in_ku")
            if st.form_submit_button("Kontrol Et"): kontrol_et_sprint(cevap, "kup")

    with tab4:
        st.subheader("Özdeşlikler & Trigonometri")
        if st.button("Sıradaki Soru", key="bn_e"): sonraki_soru_sprint("efsane")
        idx = st.session_state.get("idx_efsane", 0)
        soru, dogru, puan = st.session_state.liste_efsane[idx]
        st.markdown(f"### `{soru}`")
        with st.form("f_e"):
            cevap = st.text_input("Cevap:", key="in_e")
            if st.form_submit_button("Kontrol Et"): kontrol_et_sprint(cevap, "efsane")

# --- MOD 4: BİLGİ KÖŞESİ (FULL İÇERİK GERİ GELDİ) ---
elif secim == "📚 Bilgi Köşesi":
    st.title("📚 Master Class Bilgi Bankası")
    st.markdown(kurum_kodu, unsafe_allow_html=True)
    
    tab_sayi, tab_trigo, tab_carpan = st.tabs(["🔢 Sayı Türleri", "📐 Trigonometri", "✨ Çarpanlara Ayırma"])
    
    with tab_sayi:
        st.info("Sayı teorisinin en gizemli üyeleri burada!")
        
        with st.expander("⭐ MERSENNE ASALLARI"):
            st.markdown(r"""
            **Tanım:** $2^p - 1$ biçiminde yazılabilen asal sayılardır ($p$ de asal olmalıdır).
            
            **Dünya Rekoru (2024):** Bilinen en büyük asal sayı bir Mersenne asalıdır:
            $$ 2^{136,279,841} - 1 $$
            *(Bu sayının 41 milyondan fazla basamağı vardır!)*
            """)

        with st.expander("➗ FERMAT ASALLARI"):
            st.markdown(r"""
            **Tanım:** $F_n = 2^{2^n} + 1$ formülü ile elde edilen asal sayılardır.
            
            **Bilinen Sadece 5 Tane Vardır:**
            * $F_0 = 3$, $F_1 = 5$, $F_2 = 17$, $F_3 = 257$, $F_4 = 65537$
            """)
        
        with st.expander("🔺 YARI ASAL (Semi-Prime)"):
            st.markdown("""
            **Tanım:** Sadece iki asal sayının çarpımı olan sayılardır. (Örn: $6=2x3$, $9=3x3$).
            """)

        with st.expander("🔄 PALİNDROMİK ASALLAR"):
            st.markdown("""
            **Tanım:** Hem asal sayı olan hem de tersten okunuşu aynı olan sayılardır. (Örn: 101, 131, 929).
            """)

        with st.expander("🚕 RAMANUJAN (TAKSİ) SAYILARI"):
            st.markdown("""
            **Tanım:** İki farklı küp toplamı olarak iki farklı yolla yazılabilen sayılardır.
            
            **1. Ramanujan Sayısı (1729):**
            $$ 1^3 + 12^3 = 1729 $$
            $$ 9^3 + 10^3 = 1729 $$
            
            **2. Ramanujan Sayısı (4104):**
            $$ 2^3 + 16^3 = 4104 $$
            $$ 9^3 + 15^3 = 4104 $$
            
            **3. Ramanujan Sayısı (13832):**
            $$ 2^3 + 24^3 = 13832 $$
            $$ 18^3 + 20^3 = 13832 $$
            """)
            
        with st.expander("✨ MÜKEMMEL SAYILAR"):
            st.markdown("""
            **Tanım:** Kendisi hariç pozitif bölenlerinin toplamı kendisine eşit olan sayılardır.
            * **6:** $1+2+3=6$
            * **28:** $1+2+4+7+14=28$
            """)
            
        with st.expander("🌀 FIBONACCI SAYILARI"):
            st.markdown("""
            **Tanım:** Her sayının kendinden önceki iki sayının toplamı olduğu dizidir.
            **Dizi:** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
            """)
            st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fibonacci_Spiral.svg/1024px-Fibonacci_Spiral.svg.png", caption="Fibonacci Sarmalı")
            
        with st.expander("💪 ARMSTRONG SAYISI"):
            st.markdown("""
            **Tanım:** Rakamlarının, basamak sayısı kadar kuvvetlerinin toplamı kendine eşit olan sayıdır.
            **Örnek (153):** $1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153$
            """)
            
        with st.expander("🔢 HARSHAD SAYISI"):
            st.markdown("Rakamları toplamına tam bölünen sayıdır. Örn: 18 (1+8=9 ve 18/9=2)")

    with tab_trigo:
        st.info("Trigonometrik özdeşlikler ve formüller.")
        col1, col2 = st.columns(2)
        with col1:
            st.markdown("##### Temel Özdeşlikler")
            st.latex(r"\sin^2 x + \cos^2 x = 1")
            st.latex(r"\tan x = \frac{\sin x}{\cos x}")
            st.latex(r"\cot x = \frac{1}{\tan x}")
            
            st.markdown("##### Toplam - Fark")
            st.latex(r"\sin(x \pm y) = \sin x \cos y \pm \cos x \sin y")
            st.latex(r"\cos(x \pm y) = \cos x \cos y \mp \sin x \sin y")
            
        with col2:
            st.markdown("##### Yarım Açı")
            st.latex(r"\sin(2x) = 2\sin x \cos x")
            st.latex(r"\cos(2x) = \cos^2 x - \sin^2 x")
            st.latex(r"\cos(2x) = 2\cos^2 x - 1")
            
            st.markdown("##### Dönüşüm")
            st.latex(r"\sin(90^\circ - x) = \cos x")
            st.latex(r"\cos(180^\circ - x) = -\cos x")

    with tab_carpan:
        st.info("Cebirsel ifadeleri sadeleştirmenin anahtarı.")
        st.markdown("##### İki Kare Farkı")
        st.latex(r"a^2 - b^2 = (a - b)(a + b)")
        
        st.markdown("##### Tam Kare Açılımı")
        st.latex(r"(a + b)^2 = a^2 + 2ab + b^2")
        st.latex(r"(a - b)^2 = a^2 - 2ab + b^2")
        st.latex(r"(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + ac + bc)")
        
        st.markdown("##### Küp Açılımları")
        st.latex(r"a^3 - b^3 = (a - b)(a^2 + ab + b^2)")
        st.latex(r"a^3 + b^3 = (a + b)(a^2 - ab + b^2)")

        st.latex(r"(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3")


