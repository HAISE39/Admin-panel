-- encrypt_url.lua
-- Utility to encrypt a URL for use with VXload

-- Secret Key - MUST MATCH in loader.lua
local key = "JULES-CORE-KEY"

local function hex_encode(str)
    return (str:gsub('.', function(c)
        return string.format('%02X', string.byte(c))
    end))
end

-- Simple XOR encryption
local function encrypt(text, key)
    local result = ""
    for i = 1, #text do
        local char_code = string.byte(text, i)
        local key_code = string.byte(key, (i - 1) % #key + 1)
        -- Using string.char and bitwise XOR
        -- In Lua 5.3+, we can use ~ operator.
        -- For maximum compatibility in GG (Lua 5.1/5.2/5.3), we use a helper if needed.
        local xored = char_code ~ key_code
        result = result .. string.char(xored)
    end
    return hex_encode(result)
end

-- Input URL
local url = "https://raw.githubusercontent.com/HAISE39/Mkl-65/main/script.lua"

print("------------------------------------------")
print("   URL ENCRYPTION UTILITY FOR VXLOAD      ")
print("------------------------------------------")
print("URL to encrypt: " .. url)
local encrypted = encrypt(url, key)
print("Encrypted String: " .. encrypted)
print("------------------------------------------")
print("\nUsage in your loader script:")
print('VXload("' .. encrypted .. '")')
print("------------------------------------------")
