local input = gg.prompt({
    "Masukkan Token Bot Telegram:",
    "Masukkan Chat ID Telegram:"
}, {
    "",
    ""
}, {
    "text",
    "text"
})

if not input then
    gg.alert("Pengisian dibatalkan.")
    os.exit()
end

local botToken = input[1]
local chatId = input[2]

if botToken == "" or chatId == "" then
    gg.alert("Token atau Chat ID tidak boleh kosong!")
    os.exit()
end

-- Ambil IP Publik
gg.toast("Mengambil alamat IP...")
local ipResponse = gg.makeRequest("https://api.ipify.org")

if not ipResponse or ipResponse.code ~= 200 then
    gg.alert("Gagal mengambil alamat IP. Periksa koneksi internet Anda.")
    os.exit()
end

local ipAddress = ipResponse.content:gsub("%s+", "")
local messageText = "notifikasi script di gunakan oleh IP ini " .. ipAddress

-- Kirim ke Telegram
gg.toast("Mengirim notifikasi ke Telegram...")
local tgUrl = "https://api.telegram.org/bot" .. botToken .. "/sendMessage"
local headers = {
    ["Content-Type"] = "application/json"
}
local body = '{"chat_id": "' .. chatId .. '", "text": "' .. messageText .. '"}'

local tgResponse = gg.makeRequest(tgUrl, headers, body)

if tgResponse and tgResponse.code == 200 then
    gg.alert("Notifikasi berhasil dikirim!\nIP: " .. ipAddress)
else
    local errorMsg = "Gagal mengirim notifikasi."
    if tgResponse then
        errorMsg = errorMsg .. " Code: " .. tgResponse.code
    end
    gg.alert(errorMsg)
end
