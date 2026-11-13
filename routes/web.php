<?php

use Illuminate\Support\Facades\Route;

// Route utama: Langsung menampilkan halaman Login Guru (Frontend Saja)
Route::get('/', function () {
    return view('auth.login');
});

Route::get('/login', function () {
    return view('auth.login');
});

Route::get('/login-blade', function () {
    return view('auth.login');
});

// Route opsional untuk versi SPA React
Route::get('/app/{any?}', function () {
    return view('app');
})->where('any', '.*');
