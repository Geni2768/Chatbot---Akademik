# AkademikKu — Chatbot Akademik

Website chatbot sederhana untuk membantu pengguna menemukan informasi umum seputar pendaftaran mahasiswa baru, perkuliahan, jadwal kuliah, KRS/KHS, dan administrasi akademik.

## Fitur

- Antarmuka chatbot responsif untuk desktop dan ponsel.
- Pertanyaan cepat untuk topik yang sering ditanyakan.
- Menu topik: pendaftaran, perkuliahan, jadwal, KRS/KHS, administrasi.
- Pencocokan kata kunci dengan JavaScript.
- Tombol percakapan baru.
- Tidak memerlukan database, framework, API key, atau instalasi package.

## Teknologi

- HTML5
- CSS3
- JavaScript murni (Vanilla JavaScript)

## Struktur folder

```text
chatbot-akademik/
├── index.html
├── README.md
└── assets/
    ├── style.css
    └── script.js
```

## Cara menjalankan di laptop

1. Unduh atau clone repository ini.
2. Ekstrak ZIP jika mengunduh sebagai ZIP.
3. Buka folder `chatbot-akademik` di Visual Studio Code.
4. Buka file `index.html` di browser.

Opsional: gunakan ekstensi **Live Server** di VS Code, klik kanan `index.html`, lalu pilih **Open with Live Server**.

## Cara mengubah jawaban chatbot

Buka `assets/script.js`, lalu cari variabel `knowledgeBase`. Setiap topik memiliki:
- `topic`: nama topik.
- `keywords`: daftar kata atau frasa yang dikenali.
- `answer`: jawaban yang ditampilkan.

Ubah contoh jawaban dengan informasi resmi dari kampus. Jangan masukkan biaya, jadwal, persyaratan, atau kebijakan yang belum diverifikasi. Untuk informasi terbaru, arahkan pengguna ke kanal resmi kampus.

## Cara mengunggah ke GitHub

### Opsi A — Melalui website GitHub

1. Masuk ke [GitHub](https://github.com/) atau buat akun.
2. Klik tombol **+** di kanan atas, lalu pilih **New repository**.
3. Isi nama repository, misalnya `chatbot-akademik`.
4. Pilih **Public** atau **Private**, lalu klik **Create repository**.
5. Di halaman repository, pilih **Add file → Upload files**.
6. Unggah `index.html`, `README.md`, dan folder `assets` beserta isinya. Pastikan struktur folder tetap sama.
7. Isi pesan commit, misalnya `Initial commit - Chatbot Akademik`.
8. Klik **Commit changes**.

### Opsi B — Menggunakan Git di terminal

Jalankan perintah berikut dari dalam folder project. Ganti `USERNAME` dengan username GitHub milikmu.

```bash
git init
git add .
git commit -m "Initial commit - Chatbot Akademik"
git branch -M main
git remote add origin https://github.com/USERNAME/chatbot-akademik.git
git push -u origin main
```

Jika Git meminta autentikasi, ikuti proses login yang disediakan GitHub. Jika repository sudah memiliki file commit awal, ikuti petunjuk GitHub agar riwayat lokal dan remote selaras.

## Cara menerbitkan website dengan GitHub Pages

1. Buka repository di GitHub.
2. Pilih **Settings → Pages**.
3. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
5. Tunggu proses publikasi selesai. Tautan website akan muncul di halaman Pages.

## Catatan penting

Versi awal ini adalah **chatbot berbasis aturan/kata kunci**, bukan model AI generatif. Jawaban masih berupa contoh informasi umum dan dapat tidak cocok untuk pertanyaan yang terlalu spesifik. Chatbot tidak menyimpan percakapan ke server dan tidak terhubung ke sistem akademik kampus.

Jika ingin dikembangkan, tahap berikutnya bisa mencakup backend, panel admin untuk mengelola FAQ, basis data, autentikasi, integrasi WhatsApp, atau AI/LLM dengan dokumen kampus yang sudah diverifikasi.
