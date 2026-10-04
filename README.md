# Personal Portfolio Management System

Website portofolio pribadi dinamis menggunakan PHP Native, MySQL, HTML, CSS, dan JavaScript. Project ini memiliki halaman pengunjung dan admin dashboard untuk mengelola biodata, skill, project, pengalaman, pendidikan, sertifikat, dan pesan kontak.

**Catatan Khusus untuk GitHub Pages:**
Repository ini telah dilengkapi dengan versi **HTML statis** (`index.html`, `about.html`, `skills.html`, `projects.html`, `experience.html`, `education.html`, `certificates.html`, `contact.html`) agar dapat langsung di-host di **GitHub Pages** (misalnya `https://ayyrieldev.github.io/`). File PHP asli tetap dipertahankan untuk referensi atau pengembangan berbasis database lokal.


## Teknologi

- PHP Native
- MySQL
- HTML, CSS, JavaScript
- XAMPP atau Laragon
- mysqli prepared statement
  

## Cara Menjalankan di Laragon

1. Pindahkan folder `portfolio` ke folder `www`.
2. Jalankan Apache/Nginx dan MySQL dari Laragon.
3. Import `database.sql` melalui phpMyAdmin, HeidiSQL, atau Adminer.
4. Akses `http://localhost/portfolio/` atau virtual host Laragon jika aktif.

## Fitur Pengunjung

- Home dengan nama, foto profil, deskripsi, tombol project, tombol kontak, dan download CV.
- About berisi biodata dan deskripsi diri.
- Skills dinamis dari database.
- Projects dinamis dari database.
- Experience dan Education menggunakan timeline sederhana.
- Certificates dengan gambar atau link sertifikat.
- Contact form yang menyimpan pesan ke database.
- Dark mode menggunakan JavaScript dan `localStorage`.

## Fitur Admin

- Login dan logout menggunakan session PHP.
- Password diverifikasi menggunakan `password_verify`.
- Dashboard statistik jumlah data.
- CRUD biodata.
- CRUD skills.
- CRUD projects dengan upload gambar.
- CRUD experience.
- CRUD education.
- CRUD certificates dengan upload gambar.
- Melihat dan menghapus pesan kontak.

## Catatan Upload

Folder upload berada di:

```text
assets/uploads/
```

Format gambar yang diterima:

- jpg
- jpeg
- png
- webp

Ukuran maksimal upload gambar adalah 2 MB.

## Struktur Folder

```text
portfolio/
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── img/
│   └── uploads/
├── admin/
├── config/database.php
├── includes/
├── index.php
├── about.php
├── skills.php
├── projects.php
├── experience.php
├── education.php
├── certificates.php
├── contact.php
├── database.sql
└── README.md
```
