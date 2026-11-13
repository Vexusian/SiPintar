<?php

namespace App\Http\Controllers;

use App\Models\SiswaMataPelajaran;
use Illuminate\Http\Request;

class NilaiController extends Controller
{
    /**
     * Menampilkan halaman form tambah nilai.
     */
    public function create()
    {
        return view('nilai.tambah');
    }

    /**
     * Menyimpan nilai baru siswa.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_siswa' => 'required|integer|exists:siswa,id_siswa',
            'id_mapel' => 'required|integer|exists:mata_pelajaran,id_mapel',
            'nilai' => 'required|numeric|between:0,100',
        ]);

        // Memastikan siswa belum memiliki nilai untuk mata pelajaran ini.
        $existingGrade = SiswaMataPelajaran::where(
            'id_siswa',
            $validated['id_siswa']
        )
        ->where('id_mapel', $validated['id_mapel'])
        ->exists();

        if ($existingGrade) {
            return response()->json([
                'message' => 'Nilai siswa untuk mata pelajaran ini sudah tersedia.',
            ], 409);
        }

        $nilai = SiswaMataPelajaran::saveGrade(
            $validated['id_siswa'],
            $validated['id_mapel'],
            $validated['nilai']
        );

        return response()->json([
            'message' => 'Nilai siswa berhasil disimpan.',
            'data' => [
                'id_siswa_mapel' => $nilai->id_siswa_mapel,
                'id_siswa' => $nilai->id_siswa,
                'id_mapel' => $nilai->id_mapel,
                'nilai' => $nilai->nilai,
            ],
        ], 201);
    }

    /**
     * Menampilkan halaman form edit nilai.
     */
    public function edit()
    {
        return view('nilai.edit');
    }

    /**
     * Memperbarui nilai siswa.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'id_siswa' => 'required|integer|exists:siswa,id_siswa',
            'id_mapel' => 'required|integer|exists:mata_pelajaran,id_mapel',
            'nilai' => 'required|numeric|between:0,100',
        ]);

        $updated = SiswaMataPelajaran::updateGrade(
            $validated['id_siswa'],
            $validated['id_mapel'],
            $validated['nilai']
        );

        if (!$updated) {
            return response()->json([
                'message' => 'Data nilai siswa tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Nilai siswa berhasil diperbarui.',
            'data' => [
                'id_siswa' => $validated['id_siswa'],
                'id_mapel' => $validated['id_mapel'],
                'nilai' => $validated['nilai'],
            ],
        ], 200);
    }
}
