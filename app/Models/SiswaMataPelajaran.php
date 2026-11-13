<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['id_siswa', 'id_mapel', 'nilai', 'tanggal_input', 'tanggal_update'])]
class SiswaMataPelajaran extends Model
{
    use HasFactory;

    /**
     * Nama tabel basis data yang digunakan oleh model.
     * Sesuai Dokumen DPPL (SDD) Tabel 4.4 Kamus Data SISWA_MATA_PELAJARAN.
     *
     * @var string
     */
    protected $table = 'siswa_mata_pelajaran';

    /**
     * Primary key untuk tabel siswa_mata_pelajaran.
     * Sesuai Dokumen DPPL (SDD) Tabel 4.4: id_siswa_mapel (INT, AUTO_INCREMENT).
     *
     * @var string
     */
    protected $primaryKey = 'id_siswa_mapel';

    /**
     * Menandakan bahwa primary key auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * Tipe data primary key.
     *
     * @var string
     */
    protected $keyType = 'int';

    /**
     * Penamaan kustom kolom timestamp sesuai skema basis data dan kamus data DPPL:
     * - tanggal_input (TIMESTAMP) : waktu nilai dimasukkan
     * - tanggal_update (TIMESTAMP): waktu nilai diperbarui
     */
    const CREATED_AT = 'tanggal_input';
    const UPDATED_AT = 'tanggal_update';

    /**
     * Atribut yang dapat diisi secara massal (mass assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_siswa',
        'id_mapel',
        'nilai',
        'tanggal_input',
        'tanggal_update',
    ];

    /**
     * Format casting tipe data atribut sesuai spesifikasi Kamus Data.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id_siswa_mapel' => 'integer',
            'id_siswa' => 'integer',
            'id_mapel' => 'integer',
            'nilai' => 'decimal:2',
            'tanggal_input' => 'datetime',
            'tanggal_update' => 'datetime',
        ];
    }

    /**
     * Relasi ke entitas Siswa (Tabel 4.2).
     * Banyak data nilai mengacu pada satu siswa (many-to-one).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'id_siswa', 'id_siswa');
    }

    /**
     * Relasi ke entitas Mata_Pelajaran (Tabel 4.3).
     * Banyak data nilai mengacu pada satu mata pelajaran (many-to-one).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function mataPelajaran(): BelongsTo
    {
        return $this->belongsTo(MataPelajaran::class, 'id_mapel', 'id_mapel');
    }

    /**
     * Operasi Class Diagram (Gambar 4.1 Nilai):
     * + tambahNilai(): void
     *
     * Menyimpan nilai baru ke dalam basis data serta mencatat timestamp input dan update.
     *
     * @param float|int|string|null $nilai
     * @return void
     */
    public function tambahNilai(float|int|string|null $nilai = null): void
    {
        if ($nilai !== null) {
            $this->nilai = $nilai;
        }

        $now = Carbon::now();
        if (empty($this->tanggal_input)) {
            $this->tanggal_input = $now;
        }
        $this->tanggal_update = $now;

        $this->save();
    }

    /**
     * Operasi Class Diagram (Gambar 4.1 Nilai):
     * + updateNilai(nilaiBaru: decimal): void
     *
     * Memperbarui nilai siswa yang telah ada dengan nilai baru serta memperbarui tanggal_update.
     *
     * @param float|int|string $nilaiBaru
     * @return void
     */
    public function updateNilai(float|int|string $nilaiBaru): void
    {
        $this->nilai = $nilaiBaru;
        $this->tanggal_update = Carbon::now();
        $this->save();
    }

    /**
     * Metode interaksi Sequence Diagram SQC-002 (Menambah Nilai Siswa):
     * saveGrade(id_siswa, id_mapel, nilai)
     *
     * @param int $idSiswa
     * @param int $idMapel
     * @param float|int|string $nilai
     * @return static
     */
    public static function saveGrade(int $idSiswa, int $idMapel, float|int|string $nilai): static
    {
        $now = Carbon::now();

        return static::create([
            'id_siswa' => $idSiswa,
            'id_mapel' => $idMapel,
            'nilai' => $nilai,
            'tanggal_input' => $now,
            'tanggal_update' => $now,
        ]);
    }

    /**
     * Metode interaksi Sequence Diagram SQC-003 (Mengedit Nilai Siswa):
     * updateGrade(id_siswa, id_mapel, nilai)
     *
     * @param int $idSiswa
     * @param int $idMapel
     * @param float|int|string $nilai
     * @return bool
     */
    public static function updateGrade(int $idSiswa, int $idMapel, float|int|string $nilai): bool
    {
        $record = static::where('id_siswa', $idSiswa)
            ->where('id_mapel', $idMapel)
            ->first();

        if (! $record) {
            return false;
        }

        $record->updateNilai($nilai);

        return true;
    }
}

