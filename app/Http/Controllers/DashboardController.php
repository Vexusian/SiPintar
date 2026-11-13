<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    /**
     * Menampilkan dashboard utama kelola nilai siswa.
     */
    public function index()
    {
        return view('dashboard.index');
    }
}
