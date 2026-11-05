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

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

# SiPintar — Sistem Terpusat Informasi & Navigasi Terpadu Akademik Responsif

## Deskripsi

SiPintar merupakan sistem informasi akademik berbasis web yang dirancang untuk membantu pengelolaan data dan informasi akademik di lingkungan sekolah. Secara keseluruhan, sistem informasi akademik mencakup berbagai kebutuhan, seperti pengelolaan data siswa, data guru, kelas, nilai, serta informasi akademik lainnya. Sistem ini memiliki beberapa jenis pengguna dengan hak akses yang berbeda, antara lain siswa, guru, staf tata usaha, dan admin.

Dalam proyek ini, perancangan SiPintar difokuskan pada pengelolaan nilai siswa oleh guru. Guru dapat masuk ke dalam sistem menggunakan akun yang telah dimiliki, kemudian mengakses fitur untuk menambah dan mengedit nilai siswa sesuai dengan kelas dan mata pelajaran yang diampu. Setiap proses dilakukan melalui antarmuka sistem dan melibatkan penyimpanan data nilai ke dalam basis data.

Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL/SDD) disusun sebagai acuan dalam proses pengembangan SiPintar, khususnya untuk menggambarkan rancangan sistem, alur kerja, struktur data, dan antarmuka pengguna.

## Anggota Tim

| No. | NIM | Nama | Peran/Tugas Perancangan |
|---|---|---|---|
| 1 | 10251118 | Vanessa Marie Tandiarru | Arsitektur Sistem Perangkat Lunak dan Class Diagram. |
| 2 | 10241002 | Ade Putri Amanda | Definisi, Akronim, dan Singkatan; Kamus Data; Matriks Keterunutan. |
| 3 | 10241030 | Fatika Rizki Syahada | Tujuan Penulisan dan Lingkup Masalah; Peta Navigasi (UI Flow); Mockup/Wireframe. |
| 4 | 10241036 | Indriani Anwar | Rancangan Lingkungan Implementasi; Sequence Diagram; Entity Relationship Diagram. |
| 5 | 10241060 | Oktavia Nur Rahmadani | Aturan Penomoran dan Penamaan; Referensi; Activity Diagram. |

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

## Arsitektur Sistem

Sistem terdiri dari empat lapisan:

1. **Presentation Layer**: halaman React (Login, Input Nilai, Update Nilai) yang diakses guru lewat browser.
2. **Application Layer**: Laravel di Apache (Laragon), berisi routing, middleware autentikasi, `AuthController`, dan `NilaiController` (`index`, `store`, `update`).
3. **Persistence Layer**: Eloquent ORM Models (User, Siswa, Nilai, MataPelajaran) beserta validasi form.
4. **Data Layer**: database MySQL `sipintar_db`.

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| PHP dan Laravel 12 | Pengembangan sisi server dan pengolahan data. |
| JavaScript dan React JS | Antarmuka pengguna yang interaktif. |
| MySQL | Basis data (`sipintar_db`). |
| Laragon | Lingkungan pengembangan lokal (Apache dan MySQL). |
| Visual Studio Code | Editor kode. |
| Git dan GitHub | Pengelolaan versi dan kolaborasi. |
| Google Chrome dan Microsoft Edge | Pengujian aplikasi. |

## Struktur Dokumentasi

- `docs/SDD`: dokumen desain perangkat lunak (DPPL/SDD)
- `docs/STD`: dokumen pengujian perangkat lunak

## Struktur Basis Data

| Tabel | Isi |
|---|---|
| `GURU` | Data guru dan akun login (id_guru, nama_guru, username, password). |
| `SISWA` | Data siswa (id_siswa, nama_siswa, nis). |
| `MATA_PELAJARAN` | Data mata pelajaran dan guru pengampu (id_mapel, nama_mapel, id_guru). |
| `SISWA_MATA_PELAJARAN` | Hubungan siswa dengan mapel beserta nilai (id_siswa_mapel, id_siswa, id_mapel, nilai, tanggal_input, tanggal_update). |

Relasi: Guru 1:M Mata Pelajaran, Siswa 1:M Siswa_Mata_Pelajaran, Mata Pelajaran 1:M Siswa_Mata_Pelajaran.

## Persiapan

1. Clone repository:
   ```bash
   git clone https://github.com/Vexusian/SiPintar.git
   cd SiPintar
   ```
2. Siapkan web server dan database lokal (Laragon).
3. Buat database MySQL bernama `sipintar_db`.
4. Install dependensi dan siapkan konfigurasi:
   ```bash
   composer install
   npm install
   copy .env.example .env
   php artisan key:generate
   ```
5. Sesuaikan konfigurasi database lokal (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) di file `.env`.
6. Jalankan migrasi dan aplikasi:
   ```bash
   php artisan migrate
   php artisan serve
   npm run dev
   ```

## Catatan

Petunjuk instalasi dan penggunaan akan diperbarui sesuai perkembangan proyek.