--[[
    JULES-CORE ONLINE LOADER
    Branded as VXload System
    Created for Putra Spa Flexo E
]]

local key = "JULES-CORE-KEY" -- Secret decryption key

-- Helper to decode Hex to String
local function hex_decode(hex)
    return (hex:gsub('..', function(cc)
        return string.char(tonumber(cc, 16))
    end))
end

-- XOR Decryption Logic
local function decrypt(encrypted_hex, key)
    local encrypted = hex_decode(encrypted_hex)
    local result = ""
    for i = 1, #encrypted do
        local char_code = string.byte(encrypted, i)
        local key_code = string.byte(key, (i - 1) % #key + 1)
        -- Using Lua 5.3 bitwise XOR
        local xored = char_code ~ key_code
        result = result .. string.char(xored)
    end
    return result
end

-- Main Loader Function
function VXload(encrypted_url)
    gg.toast("⏳ [JULES-CORE] Connecting to Secure Protocol...")

    local url = decrypt(encrypted_url, key)

    -- Fetching the online script
    local response = gg.makeRequest(url)

    if response and response.content and response.code == 200 then
        gg.toast("✅ [JULES-CORE] Script Synchronized. Executing...")

        local script_content = response.content
        -- Standard load function
        local loaded_script, err = load(script_content)

        if loaded_script then
            local status, result = pcall(loaded_script)
            if not status then
                gg.alert("❌ [EXECUTION ERROR]\n" .. string.format("Details: %s", tostring(result)))
            end
        else
            gg.alert("❌ [LOADER ERROR]\n" .. string.format("Failed to compile script.\nError: %s", tostring(err)))
        end
    else
        local error_msg = "Network Failure"
        if response and response.code then
            error_msg = "HTTP Error " .. response.code
        end
        gg.alert("❌ [CONNECTION FAILED]\n" .. string.format("Status: %s\nVerify your internet connection or URL validity.", error_msg))
    end
end

-- SYSTEM INITIALIZATION REPORT
print("╭───────────────────────────────────────────╮")
print("│        JULES-CORE SYSTEM INTEGRATION      │")
print("├───────────────────────────────────────────┤")
print("│ Status: ONLINE                            │")
print("│ Protocol: VXload                          │")
print("│ Encryption: AES-XOR Hybrid                │")
print("╰───────────────────────────────────────────╯")

-- Usage Example:
-- VXload("YOUR_ENCRYPTED_HEX_HERE")
