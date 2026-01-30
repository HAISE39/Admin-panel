# 💠 JULES-CORE PNG FUSION SYSTEM

Sistem ini dirancang untuk menyembunyikan script Lua di dalam file gambar PNG (Obfuscation) agar tidak mudah dibaca atau dideteksi.

## 🛠️ Kenapa ada 2 Script?

Sistem ini membutuhkan dua bagian untuk bekerja:
1.  **`png_builder.lua` (Developer Tool):** Digunakan oleh ANDA untuk mengubah script Lua asli menjadi file PNG yang terenkripsi.
2.  **`png_loader.lua` (End-User Loader):** Digunakan oleh PEMAKAI (atau anda sendiri) untuk menjalankan file PNG tersebut. Script ini bertugas mengekstrak kode rahasia dari gambar dan menjalankannya di memori.

---

## 🚀 Cara Penggunaan

### Langkah 1: Proses Fusion (Enkripsi)
1.  Buka Game Guardian dan jalankan **`png_builder.lua`**.
2.  Masukkan path script Lua asli anda (contoh: `/sdcard/my_script.lua`).
3.  Tentukan nama output (contoh: `Vellixao_Secret.png.lua`).
4.  Masukkan **Cryptographic Key** (Kunci ini harus sama saat di loader nanti).
5.  Klik OK. File baru akan tercipta.

### Langkah 2: Proses Boot (Menjalankan)
1.  Buka **`png_loader.lua`**.
2.  Scroll ke bagian paling bawah di bagian `SETTINGS`.
3.  Ubah `target` menjadi lokasi file PNG yang tadi dibuat.
4.  Ubah `key` agar sesuai dengan kunci yang anda masukkan saat proses Fusion.
5.  Jalankan **`png_loader.lua`** di Game Guardian.
6.  Selesai! Script asli anda akan berjalan secara "gaib" dari dalam gambar.

---

## 🛡️ Fitur Keamanan
- **Rolling XOR Cipher:** Mengacak data script agar tidak bisa dibaca teks biasa.
- **PNG Masking:** File hasil builder memiliki header PNG yang valid, sehingga terlihat seperti gambar rusak bagi hex editor biasa.
- **Bit32 Fallback:** Tetap bekerja meskipun di versi Game Guardian lama yang tidak punya library bit32.

---
**Created by VELLIXAO | JULES-CORE AI**
