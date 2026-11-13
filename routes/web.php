<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - SiPintar
|--------------------------------------------------------------------------
| Rute saat ini diarahkan langsung ke View untuk progress antarmuka (UI).
| Struktur Controller telah disiapkan di app/Http/Controllers/ untuk tahap backend selanjutnya.
|
| Contoh aktivasi Controller nanti:
| Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
| Route::post('/login', [AuthController::class, 'login'])->name('login.post');
| Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
| Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
| Route::get('/nilai/tambah', [NilaiController::class, 'create'])->name('nilai.create');
| Route::post('/nilai/tambah', [NilaiController::class, 'store'])->name('nilai.store');
| Route::get('/nilai/edit', [NilaiController::class, 'edit'])->name('nilai.edit');
| Route::put('/nilai/edit', [NilaiController::class, 'update'])->name('nilai.update');
|
*/

// Route Tampilan Antarmuka (UI)
Route::view('/', 'auth.login')->name('home');
Route::view('/login', 'auth.login')->name('login');
Route::view('/dashboard', 'dashboard.index')->name('dashboard');
Route::view('/nilai/tambah', 'nilai.tambah')->name('nilai.create');
Route::view('/nilai/edit', 'nilai.edit')->name('nilai.edit');
