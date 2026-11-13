<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\MataPelajaran;
use App\Models\SiswaMataPelajaran;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Menampilkan halaman dashboard.
     */
    public function index()
    {
        return view('dashboard.index');
    }

    /**
     * Mengambil seluruh data siswa dan mata pelajaran
     * beserta nilai yang tersimpan di database.
     */
    public function data(): JsonResponse
    {
        $siswaList = Siswa::all();
        $mapelList = MataPelajaran::all();

        $nilaiList = SiswaMataPelajaran::all()->keyBy(
            fn ($item) => $item->id_siswa . '-' . $item->id_mapel
        );

        $data = [];

        foreach ($mapelList as $mapel) {
            foreach ($siswaList as $siswa) {
                $key = $siswa->id_siswa . '-' . $mapel->id_mapel;
                $nilai = $nilaiList->get($key);

                $data[] = [
                    'id_siswa' => $siswa->id_siswa,
                    'id_mapel' => $mapel->id_mapel,
                    'id_siswa_mapel' => $nilai?->id_siswa_mapel,
                    'nis' => $siswa->nis,
                    'nama_siswa' => $siswa->nama_siswa,
                    'nama_mapel' => $mapel->nama_mapel,
                    'nilai' => $nilai?->nilai,
                ];
            }
        }

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
