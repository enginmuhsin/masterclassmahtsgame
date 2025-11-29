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
# TASARIM: AYDINLIK & FERAH TEMA (LIGHT MODE)
# =============================================================================
st.markdown("""
    <style>
    /* Menü ve Alt Bilgi Gizleme */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    /* 1. ARKA PLAN */
    .stApp {
        background-color: #f8f9fa;
        background-image: radial-gradient(#dee2e6 1px, transparent 1px);
        background-size: 20px 20px;
    }
    
    /* 2. ANA BAŞLIK */
    h1 {
        color: #0d2b5b !important;
        text-shadow: 1px 1px 2px #b0b0b0;
        font-weight: 900 !important;
        font-family: 'Helvetica', sans-serif;
    }
    
    /* 3. SKOR TABLOSU YAZILARI */
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
    
    /* 4. KURUM İSMİ KUTUSU */
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
    
    /* 5. BUTONLAR */
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
    
    /*