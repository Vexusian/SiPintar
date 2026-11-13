<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MataPelajaran extends Model
{
    use HasFactory;

    protected $table = 'mata_pelajaran';

    protected $primaryKey = 'id_mapel';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'nama_mapel',
        'id_guru',
    ];

    public function guru(): BelongsTo
    {
        return $this->belongsTo(Guru::class, 'id_guru', 'id_guru');
    }

    public function siswa(): BelongsToMany
    {
        return $this->belongsToMany(
            Siswa::class,
            'siswa_mata_pelajaran',
            'id_mapel',
            'id_siswa',
            'id_mapel',
            'id_siswa'
        )->withPivot([
            'id_siswa_mapel',
            'nilai',
            'tanggal_input',
            'tanggal_update',
        ]);
    }

    public function siswaMataPelajaran()
    {
        return $this->hasMany(
            SiswaMataPelajaran::class,
            'id_mapel',
            'id_mapel'
        );
    }
}
