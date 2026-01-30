--[[
╭────────────────────────────────────────╮
│      JULES-CORE ALL-IN-ONE PROTECTOR   │
│     Cyber-Engineered by VELLIXAO       │
│    (Generator Script Tunggal / Standalone) │
╰────────────────────────────────────────╯
]]

local PNG_HEADER = "\137PNG\r\n\26\n\0\0\0\rIHDR\0\0\0\1\0\0\0\1\8\2\0\0\0\144wS\222\0\0\0\nIDAT\8\213c\248\255\255? \0\5\254\2\254\1675N\230\0\0\0\0IEND\174\66\96\130"

local function xor_cipher(data, key)
    local output = {}
    local key_len = #key
    for i = 1, #data do
        local b = data:byte(i)
        local k = key:byte((i - 1) % key_len + 1)
        if bit32 then
            output[i] = string.char(bit32.bxor(b, k))
        else
            output[i] = string.char((b + k) % 256)
        end
    end
    return table.concat(output)
end

function generate_standalone()
    local config = gg.prompt({
        "💠 Script Asli (Input)",
        "💠 Nama Hasil (Output .lua)",
        "💠 Kunci Enkripsi"
    }, {
        [1] = "/sdcard/script_kamu.lua",
        [2] = "Script_Terlindungi.lua",
        [3] = "JULES-CORE-2025"
    }, {
        "file",
        "text",
        "text"
    })

    if not config then return end

    local f = io.open(config[1], "rb")
    if not f then
        gg.alert("🚫 ERROR: Script asli tidak ditemukan!")
        return
    end
    local raw_data = f:read("*a")
    f:close()

    gg.toast("⚡ Mengenkripsi...")
    local secret_data = xor_cipher(raw_data, config[3])
    local full_payload = PNG_HEADER .. secret_data

    -- Mengubah payload menjadi format string byte agar aman di dalam script
    local hex_payload = ""
    for i = 1, #full_payload do
        hex_payload = hex_payload .. string.format("\\%03d", full_payload:byte(i))
    end

    -- Template Script Loader Standalone
    local loader_template = [[
--[[
╭────────────────────────────────────────╮
│          VELLSC PROTECTED CORE         │
│     Encoded by JULES-CORE System       │
╰────────────────────────────────────────╯
]]
local p = "]] .. hex_payload .. [["
local k = ]] .. string.format("%q", config[3]) .. [[

local function d(data, key)
    local out = {}
    local kl = #key
    for i = 1, #data do
        local b = data:byte(i)
        local c = key:byte((i - 1) % kl + 1)
        if bit32 then out[i] = string.char(bit32.bxor(b, c)) else out[i] = string.char((b - c) % 256) end
    end
    return table.concat(out)
end

local m = "IEND\174\66\96\130"
local _, pos = p:find(m, 1, true)
if pos then
    local code = d(p:sub(pos + 1), k)
    local s, err = load(code)
    if s then pcall(s) else gg.alert("🚫 Load Error: " .. tostring(err)) end
else
    gg.alert("🚫 Security Mismatch")
end
]]

    local out_path = config[2]
    if not out_path:find("/") then out_path = gg.EXT_STORAGE .. "/" .. out_path end

    local out = io.open(out_path, "wb")
    if out then
        out:write(loader_template)
        out:close()
        gg.alert("✅ BERHASIL!\n\nFile: " .. out_path .. "\n\nSekarang kamu hanya perlu membagikan SATU file ini saja ke orang lain. Tidak perlu loader tambahan.")
    else
        gg.alert("🚫 ERROR: Gagal menulis file.")
    end
end

if gg then
    generate_standalone()
else
    print("Gunakan di Game Guardian.")
end
