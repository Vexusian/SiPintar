<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NilaiController extends Controller
{
    /**
     * Menampilkan form input nilai siswa baru.
     */
    public function create()
    {
        return view('nilai.tambah');
    }

    /**
     * Menyimpan data nilai baru siswa (rencana pengembangan backend).
     */
    public function store(Request $request)
    {
        // TODO: Validasi dan simpan data nilai ke database
    }

    /**
     * Menampilkan form edit / pembaruan nilai siswa.
     */
    public function edit()
    {
        return view('nilai.edit');
    }

    /**
     * Memperbarui data nilai siswa (rencana pengembangan backend).
     */
    public function update(Request $request)
    {
        // TODO: Validasi dan update data nilai di database
    }
}

