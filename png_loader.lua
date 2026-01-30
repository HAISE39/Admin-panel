--[[
╭────────────────────────────────────────╮
│          JULES-CORE PNG LOADER         │
│     Cyber-Engineered by VELLIXAO       │
╰────────────────────────────────────────╯
]]

local function decrypt(data, key)
    local output = {}
    local key_len = #key
    for i = 1, #data do
        local b = data:byte(i)
        local k = key:byte((i - 1) % key_len + 1)
        if bit32 then
            output[i] = string.char(bit32.bxor(b, k))
        else
            -- Fallback decryption for non-bit32 environments
            output[i] = string.char((b - k) % 256)
        end
    end
    return table.concat(output)
end

function boot_system(config)
    local target = config.target
    local key = config.key or "JULES-CORE-2025"
    local content = ""

    gg.toast("🌀 Initializing System Boot...")

    -- Handle Remote or Local source
    if target:find("^http") then
        local res = gg.makeRequest(target)
        if not res or not res.content then
            gg.alert("🚫 NETWORK ERROR: Connection to core server failed.")
            return
        end
        content = res.content
    else
        local f = io.open(target, "rb")
        if not f then
            gg.alert("🚫 SYSTEM ERROR: Local package not found.\nPath: " .. target)
            return
        end
        content = f:read("*a")
        f:close()
    end

    -- Locate IEND chunk marker
    -- IEND signature + CRC: IEND\174\66\96\130
    local marker = "IEND\174\66\96\130"
    local _, pos = content:find(marker, 1, true)

    if not pos then
        gg.alert("🚫 SECURITY BREACH: Signature mismatch or corrupted package.")
        return
    end

    local payload = content:sub(pos + 1)
    local decrypted_code = decrypt(payload, key)

    -- Integrate and Execute
    local script, err = load(decrypted_code)
    if script then
        gg.toast("⚡ VELLSC: Logic Synchronized.")
        -- Execute in a protected call to catch runtime errors
        local ok, runtime_err = pcall(script)
        if not ok then
            gg.alert("⚠️ RUNTIME EXCEPTION:\n" .. tostring(runtime_err))
        end
    else
        gg.alert("🚫 CORE INTEGRATION FAILED:\n" .. tostring(err))
    end
end

-- [[ CONFIGURATION ]]
-- Masukkan path file PNG hasil builder atau URL link raw
-- Pastikan KEY sama dengan yang dimasukkan saat proses build
local SETTINGS = {
    target = gg.EXT_STORAGE .. "/Vellixao_Fused.png.lua", -- Path file atau URL (http...)
    key = "JULES-CORE-2025" -- Harus sama dengan kunci di Builder
}

if gg then
    boot_system(SETTINGS)
else
    print("Game Guardian Environment Required.")
end
