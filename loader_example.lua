-- [[ VELLSC PUBLIC LOADER ]]
-- Edit bagian ini agar log terkirim ke ID Chat Anda!

-- 1. MASUKKAN ID CHAT TELEGRAM ANDA DISINI
local id_chat = "7045275886"  -- GANTI DENGAN ID CHAT ANDA!

-- 2. SET VARIABEL GLOBAL untuk diakses script utama
_G.PUBLIC_ID = id_chat

-- 3. LOAD & RUN SCRIPT UTAMA (Satu baris)
-- Script utama di cloud akan otomatis mendeteksi _G.PUBLIC_ID yang Anda set di atas.
load(gg.makeRequest('https://vellixaoscript.vercel.app/api/raw/1769656041614').content)()
