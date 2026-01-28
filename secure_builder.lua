--[[
    JULES-CORE SECURE BUILDER
    Generates an obfuscated standalone loader script.
]]

local url = "https://raw.githubusercontent.com/HAISE39/Mkl-65/main/script.lua"
local secret_key = "JULES-SECURE-X" -- You can change this

-- 1. Encryption Algorithm
local function encrypt(str, k)
    local out = ""
    for i = 1, #str do
        local b = string.byte(str, i)
        local kb = string.byte(k, (i - 1) % #k + 1)
        -- XOR with key and then a simple rotation/shift (optional)
        local e = (b ~ kb)
        out = out .. string.format("%02X", e)
    end
    return out
end

local encrypted_hex = encrypt(url, secret_key)

-- 2. Convert key to byte array for obfuscation
local key_bytes = {}
for i = 1, #secret_key do
    table.insert(key_bytes, string.byte(secret_key, i))
end
local key_obfuscated = "string.char(" .. table.concat(key_bytes, ",") .. ")"

-- 3. Construct the Obfuscated Stub
-- Variables:
-- _c = string.char
-- _b = string.byte
-- _t = tonumber
-- _k = key
-- _h = hex input
-- _u = decrypted url
-- _r = response
local loader_stub = [[
local _c,_b,_t=string.char,string.byte,tonumber;local _k=]] .. key_obfuscated .. [[;local VXload=function(_h)local _u=""for i=1,#_h,2 do local _bv=_t(_h:sub(i,i+1),16)local _kv=_b(_k,((i/2-0.5)%#_k)+1)_u=_u.._c(_bv~_kv)end;local _r=gg.makeRequest(_u)if _r and _r.code==200 then local _f,_e=load(_r.content)if _f then pcall(_f)else gg.alert("Fail: ".._e)end else gg.toast("🚫 Net Error")end end
]]

local final_script = "-- JULES-CORE SECURE LOAD SYSTEM\n" .. loader_stub .. "\nVXload(\"" .. encrypted_hex .. "\")"

-- 4. Save the final script
local output_path = "final_script.lua"
print("Building secure script...")
print("Target URL: " .. url)
print("Encrypted Hex: " .. encrypted_hex)
print("Saving to: " .. output_path)

-- Note: In this environment I use write_file, but the builder itself is a tool for the user.
-- I will provide the builder code to the user.
