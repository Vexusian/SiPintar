<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

# SiPintar — Sistem Terpusat Informasi & Navigasi Terpadu Akademik Responsif

## Deskripsi Proyek

SiPintar adalah sistem informasi akademik berbasis web untuk membantu pengelolaan data dan informasi akademik di lingkungan sekolah. Pada sistem informasi akademik secara keseluruhan terdapat beberapa jenis pengguna (siswa, guru, staf tata usaha, dan admin).

Pada proyek ini, pengembangan difokuskan pada **pengelolaan nilai siswa oleh guru**. Guru login menggunakan akun yang dimiliki, lalu menambah dan mengedit nilai siswa sesuai mata pelajaran yang diampu. Data nilai disimpan ke dalam basis data.

Perancangan sistem didokumentasikan dalam dokumen Deskripsi Perancangan Perangkat Lunak (DPPL/SDD) versi 1.0 yang disusun sebagai acuan pengembangan.

## Fitur

| No. | Fitur | Deskripsi |
|---|---|---|
| 1 | Login Guru | Guru masuk dengan username dan password. Jika data tidak sesuai, sistem menampilkan pesan dan halaman login tetap terbuka. |
| 2 | Menambah Nilai Siswa | Guru memilih siswa, mengisi satu nilai pada form, lalu menyimpannya. Jika gagal, sistem menampilkan pesan dan form tetap terbuka. |
| 3 | Mengedit Nilai Siswa | Guru memilih nilai siswa yang sudah tersimpan, mengisi nilai terbaru, lalu menyimpannya. Jika gagal, sistem menampilkan pesan dan form tetap terbuka. |

Proyek ini **tidak** mencakup pengelolaan data siswa secara keseluruhan, pengelolaan akun pengguna, pembayaran, penghapusan nilai, maupun fitur untuk siswa, staf tata usaha, dan admin.

## Halaman Antarmuka

| Kode | Halaman | Fungsi |
|---|---|---|
| UI-001 | Login Guru | Guru memasukkan username dan password. |
| UI-002 | Dashboard & Data Siswa/Mapel | Menampilkan daftar siswa dan nilainya, serta tombol Tambah atau Edit. |
| UI-003 | Form Tambah Nilai | Mengisi satu nilai untuk siswa yang belum memiliki nilai. |
| UI-004 | Form Edit Nilai | Mengubah nilai siswa yang sudah tersimpan. |

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| PHP dan Laravel 12 | Pengembangan sisi server dan pengolahan data. |
| JavaScript dan React JS | Antarmuka pengguna yang interaktif. |
| MySQL | Basis data (`sipintar_db`). |
| Windows 10/11 | Sistem operasi lingkungan pengembangan. |
| Visual Studio Code | Editor kode. |
| Git dan GitHub | Pengelolaan versi dan kolaborasi. |
| Laragon | Lingkungan pengembangan lokal (Apache dan MySQL). |
| Google Chrome dan Microsoft Edge | Pengujian aplikasi. |

## Arsitektur Sistem

Sistem terdiri dari empat lapisan:

1. **Presentation Layer** — halaman React (Login, Input Nilai, Update Nilai) yang diakses guru lewat browser.
2. **Application Layer** — Laravel di Apache (Laragon), berisi routing, middleware autentikasi, `AuthController`, dan `NilaiController` (`index`, `store`, `update`).
3. **Persistence Layer** — Eloquent ORM Models (User, Siswa, Nilai, MataPelajaran) beserta validasi form.
4. **Data Layer** — database MySQL `sipintar_db`.

## Struktur Basis Data

| Tabel | Isi |
|---|---|
| `GURU` | Data guru dan akun login (id_guru, nama_guru, username, password). |
| `SISWA` | Data siswa (id_siswa, nama_siswa, nis). |
| `MATA_PELAJARAN` | Data mata pelajaran dan guru pengampu (id_mapel, nama_mapel, id_guru). |
| `SISWA_MATA_PELAJARAN` | Hubungan siswa dengan mapel beserta nilai (id_siswa_mapel, id_siswa, id_mapel, nilai, tanggal_input, tanggal_update). |

Relasi: Guru 1:M Mata Pelajaran, Siswa 1:M Siswa_Mata_Pelajaran, Mata Pelajaran 1:M Siswa_Mata_Pelajaran.

## Struktur Dokumentasi

- `docs/SDD/` — dokumen Deskripsi Perancangan Perangkat Lunak (DPPL/SDD).
- `docs/STD/` — disiapkan untuk dokumen pengujian perangkat lunak.

## Cara Menjalankan Proyek

Pastikan PHP 8.2+, Composer, Node.js, dan MySQL (Laragon) sudah terpasang.

1. Clone repository:
   ```bash
   git clone https://github.com/Vexusian/SiPintar.git
   cd SiPintar
   ```
2. Install dependensi:
   ```bash
   composer install
   npm install
   ```
3. Salin file environment dan buat app key:
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```
4. Buat database MySQL bernama `sipintar_db`, lalu sesuaikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` di file `.env`.
5. Jalankan migrasi:
   ```bash
   php artisan migrate
   ```
6. Jalankan aplikasi:
   ```bash
   php artisan serve
   npm run dev
   ```
7. Buka `http://localhost:8000` di browser.

## Project Progress

- [x] DPPL/SDD v1.0 selesai disusun
- [ ] Implementasi Login Guru
- [ ] Implementasi Menambah Nilai Siswa
- [ ] Implementasi Mengedit Nilai Siswa
- [ ] Pengujian (STD)

## Anggota Tim

| No. | NIM | Nama | Tugas Perancangan |
|---|---|---|---|
| 1 | 10251118 | Vanessa Marie Tandiarru | Arsitektur Sistem Perangkat Lunak dan Class Diagram. |
| 2 | 10241002 | Ade Putri Amanda | Definisi, Akronim, dan Singkatan; Kamus Data; Matriks Keterunutan. |
| 3 | 10241030 | Fatika Rizki Syahada | Tujuan Penulisan dan Lingkup Masalah; Peta Navigasi (UI Flow); Mockup/Wireframe. |
| 4 | 10241036 | Indriani Anwar | Rancangan Lingkungan Implementasi; Sequence Diagram; Entity Relationship Diagram. |
| 5 | 10241060 | Oktavia Nur Rahmadani | Aturan Penomoran dan Penamaan; Referensi; Activity Diagram. |