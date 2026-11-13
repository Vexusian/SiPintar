<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\DashboardController;

// Route tampilan antarmuka
Route::view('/', 'auth.login')->name('home');
Route::view('/login', 'auth.login')->name('login');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

// Endpoint data dashboard
Route::get('/dashboard/data', [DashboardController::class, 'data'])
    ->name('dashboard.data');

// Halaman tambah dan edit nilai
Route::view('/nilai/tambah', 'nilai.tambah')->name('nilai.create');
Route::view('/nilai/edit', 'nilai.edit')->name('nilai.edit');

// Proses penyimpanan dan pembaruan nilai
Route::post('/nilai/tambah', [NilaiController::class, 'store'])
    ->name('nilai.store');

Route::put('/nilai/edit', [NilaiController::class, 'update'])
    ->name('nilai.update');
