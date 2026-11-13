<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nama_siswa', 'nis'])]
class Siswa extends Model
{
    use HasFactory;

    /**
     * Nama tabel basis data yang digunakan oleh model.
     *
     * @var string
     */
    protected $table = 'siswa';

    /**
     * Primary key untuk tabel siswa.
     *
     * @var string
     */
    protected $primaryKey = 'id_siswa';

    /**
     * Atribut yang dapat diisi secara massal (mass assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_siswa',
        'nis',
    ];

    /**
     * Relasi one-to-many ke entitas Siswa_Mata_Pelajaran (penyimpanan transaksi nilai).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function siswaMataPelajaran(): HasMany
    {
        return $this->hasMany(SiswaMataPelajaran::class, 'id_siswa', 'id_siswa');
    }

    /**
     * Alias relasi ke entitas Nilai sesuai penamaan pada Class Diagram.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function nilai(): HasMany
    {
        return $this->hasMany(Nilai::class, 'id_siswa', 'id_siswa');
    }

    /**
     * Relasi many-to-many ke entitas Mata_Pelajaran melalui tabel perantara siswa_mata_pelajaran.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function mataPelajaran(): BelongsToMany
    {
        return $this->belongsToMany(
            MataPelajaran::class,
            'siswa_mata_pelajaran',
            'id_siswa',
            'id_mapel',
            'id_siswa',
            'id_mapel'
        )->withPivot(['id_siswa_mapel', 'nilai', 'tanggal_input', 'tanggal_update']);
    }
}

