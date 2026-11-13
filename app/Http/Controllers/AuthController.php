<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Menampilkan halaman login guru.
     */
    public function showLoginForm()
    {
        return view('auth.login');
    }

    /**
     * Handle proses login guru (rencana pengembangan backend).
     */
    public function login(Request $request)
    {
        // TODO: Validasi kredensial dan autentikasi session
    }

    /**
     * Handle proses logout guru (rencana pengembangan backend).
     */
    public function logout(Request $request)
    {
        // TODO: Hapus session autentikasi
    }
}

