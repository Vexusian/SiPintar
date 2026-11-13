<?php

use Illuminate\Support\Facades\Route;

// Route untuk Single Page Application (React)
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
