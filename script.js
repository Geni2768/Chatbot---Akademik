const welcomeBlock = document.getElementById("welcomeBlock");
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

const knowledgeBase = [
  {
    topic: "pendaftaran",
    keywords: ["daftar", "pendaftaran", "mahasiswa baru", "maba", "persyaratan masuk", "syarat masuk", "dokumen", "jalur masuk", "biaya pendaftaran"],
    answer: "Berikut gambaran umum pendaftaran mahasiswa baru:\n\n1. Isi formulir pendaftaran melalui portal resmi kampus.\n2. Siapkan identitas diri, ijazah/SKL, pas foto, dan dokumen lain sesuai ketentuan.\n3. Ikuti proses seleksi jika diwajibkan.\n4. Periksa pengumuman hasil seleksi.\n5. Jika diterima, lakukan daftar ulang sesuai jadwal resmi.\n\nCatatan: persyaratan, jadwal, dan biaya pada setiap kampus bisa berbeda. Periksa pengumuman penerimaan mahasiswa baru dari kampus tujuan."
  },
  {
    topic: "perkuliahan",
    keywords: ["perkuliahan", "kuliah", "kalender akademik", "uts", "uas", "aturan kuliah", "absen", "kehadiran", "semester"],
    answer: "Informasi perkuliahan biasanya meliputi kalender akademik, jadwal perkuliahan, ketentuan kehadiran, UTS, UAS, dan masa pengisian nilai.\n\nTips: cek portal akademik dan pengumuman resmi program studi secara berkala. Tanggal UTS/UAS dan ketentuan kehadiran perlu mengikuti aturan kampus masing-masing."
  },
  {
    topic: "jadwal",
    keywords: ["jadwal", "jam kuliah", "ruang kelas", "kelas", "dosen", "perubahan jadwal"],
    answer: "Untuk mengecek jadwal kuliah, kamu bisa:\n\n1. Masuk ke portal akademik kampus.\n2. Buka menu Jadwal Kuliah atau Kartu Jadwal.\n3. Pilih semester aktif.\n4. Periksa hari, jam, mata kuliah, dosen, dan ruang kelas.\n\nJika ada perubahan jadwal, konfirmasi melalui program studi atau kanal pengumuman resmi."
  },
  {
    topic: "krs",
    keywords: ["krs", "khs", "sks", "kartu rencana studi", "kartu hasil studi", "isi krs", "mata kuliah", "nilai", "ipk", "ips"],
    answer: "Panduan umum KRS dan KHS:\n\n• KRS (Kartu Rencana Studi): daftar mata kuliah yang direncanakan untuk diambil pada semester berjalan.\n• KHS (Kartu Hasil Studi): ringkasan nilai mata kuliah pada semester yang telah ditempuh.\n\nCara mengisi KRS:\n1. Konsultasikan rencana studi dengan dosen pembimbing akademik jika diwajibkan.\n2. Buka portal akademik saat masa KRS.\n3. Pilih mata kuliah sesuai kurikulum dan batas SKS.\n4. Simpan/finalisasi KRS dan pastikan statusnya berhasil.\n\nBatas SKS dan jadwal pengisian mengikuti peraturan kampus."
  },
  {
    topic: "administrasi",
    keywords: ["administrasi", "surat aktif", "mahasiswa aktif", "cuti", "legalisasi", "surat", "transkrip", "pindah kampus", "berhenti kuliah", "dokumen akademik"],
    answer: "Layanan administrasi akademik dapat mencakup surat keterangan mahasiswa aktif, pengajuan cuti, legalisasi dokumen, transkrip nilai, dan surat pindah.\n\nLangkah umum:\n1. Tanyakan persyaratan ke bagian akademik atau tata usaha.\n2. Siapkan formulir dan dokumen pendukung.\n3. Ajukan melalui kanal yang ditentukan kampus.\n4. Simpan bukti pengajuan dan cek estimasi penyelesaian.\n\nFormulir, biaya, dan waktu pemrosesan dapat berbeda di setiap kampus."
  }
];

const fallback = "Maaf, aku belum menemukan jawaban yang cocok. Kamu bisa coba tanyakan tentang pendaftaran mahasiswa baru, jadwal kuliah, KRS/KHS, perkuliahan, atau administrasi akademik. Untuk informasi yang resmi dan terbaru, silakan hubungi bagian akademik kampus.";

function getAnswer(question) {
  const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let best = null;
  let bestScore = 0;
  for (const item of knowledgeBase) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (q.includes(keyword)) score += keyword.includes(" ") ? 3 : 1;
    }
    if (score > bestScore) { bestScore = score; best = item; }
  }
  if (!best || bestScore === 0) return fallback;
  return best.answer;
}

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message ${sender}`;
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = sender === "bot" ? "A" : "K";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  row.append(avatar, bubble);
  messages.appendChild(row);
  welcomeBlock.classList.add("hidden");
  messages.classList.add("visible");
  messages.scrollTop = messages.scrollHeight;
  row.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function sendMessage(text) {
  const question = (text ?? input.value).trim();
  if (!question) return;
  addMessage(question, "user");
  input.value = "";
  input.style.height = "auto";
  window.setTimeout(() => addMessage(getAnswer(question), "bot"), 250);
}

sendBtn.addEventListener("click", () => sendMessage());
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 130)}px`;
});
document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.question));
});
document.querySelectorAll(".topic-link").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".topic-link").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const questions = {
      pendaftaran: "Apa saja syarat pendaftaran mahasiswa baru?",
      perkuliahan: "Apa saja informasi perkuliahan yang perlu diketahui?",
      jadwal: "Bagaimana cara melihat jadwal kuliah?",
      krs: "Bagaimana cara mengisi KRS dan melihat KHS?",
      administrasi: "Bagaimana cara mengajukan surat mahasiswa aktif?"
    };
    sendMessage(questions[button.dataset.topic]);
    sidebar.classList.remove("open");
  });
});
newChatBtn.addEventListener("click", () => {
  messages.replaceChildren();
  messages.classList.remove("visible");
  welcomeBlock.classList.remove("hidden");
  input.value = "";
  input.focus();
  sidebar.classList.remove("open");
});
menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
document.addEventListener("click", (event) => {
  if (window.innerWidth <= 760 && sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
    sidebar.classList.remove("open");
  }
});
