--[[
╭────────────────────────────────────────╮
│          JULES-CORE PNG FUSION         │
│     Cyber-Engineered by VELLIXAO       │
╰────────────────────────────────────────╯
]]

local PNG_HEADER = "\137PNG\r\n\26\n\0\0\0\rIHDR\0\0\0\1\0\0\0\1\8\2\0\0\0\144wS\222\0\0\0\nIDAT\8\213c\248\255\255? \0\5\254\2\254\1675N\230\0\0\0\0IEND\174\66\96\130"

local function xor_cipher(data, key)
    local output = {}
    local key_len = #key
    for i = 1, #data do
        local b = data:byte(i)
        local k = key:byte((i - 1) % key_len + 1)
        -- Using bit32 if available (GG standard), otherwise fallback to additive shift
        if bit32 then
            output[i] = string.char(bit32.bxor(b, k))
        else
            output[i] = string.char((b + k) % 256)
        end
    end
    return table.concat(output)
end

function start()
    local config = gg.prompt({
        "💠 Target Lua Script Path",
        "💠 Output Filename (.png.lua)",
        "💠 Cryptographic Key"
    }, {
        [1] = "/sdcard/script.lua",
        [2] = "Vellixao_Fused.png.lua",
        [3] = "JULES-CORE-2025"
    }, {
        "file",
        "text",
        "text"
    })

    if not config then return end

    local f = io.open(config[1], "rb")
    if not f then
        gg.alert("🚫 SYSTEM ERROR: Source file not found.\nCheck path: " .. tostring(config[1]))
        return
    end
    local raw_data = f:read("*a")
    f:close()

    gg.toast("⚡ Encrypting payload...")
    local secret_data = xor_cipher(raw_data, config[3])

    gg.toast("🛠️ Fusing with PNG structure...")
    local final_package = PNG_HEADER .. secret_data

    -- Ensure output goes to a predictable place if no path is given
    local out_path = config[2]
    if not out_path:find("/") then
        out_path = gg.EXT_STORAGE .. "/" .. out_path
    end

    local out = io.open(out_path, "wb")
    if out then
        out:write(final_package)
        out:close()
        gg.alert("✅ FUSION COMPLETE\n\nFile: " .. out_path .. "\n\nPackage is now disguised as a PNG image.\n\n💡 CARA PAKAI:\n1. Gunakan png_loader.lua untuk menjalankan file ini.\n2. Pastikan KEY yang digunakan sama (" .. config[3] .. ")")
    else
        gg.alert("🚫 SYSTEM ERROR: Permission denied or invalid output path.")
    end
end

if gg then
    start()
else
    print("This script is designed for Game Guardian.")
end
