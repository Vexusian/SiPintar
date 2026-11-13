<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

#[Fillable(['nama_guru', 'username', 'password'])]
#[Hidden(['password', 'remember_token'])]
class Guru extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Nama tabel basis data yang digunakan oleh model.
     *
     * @var string
     */
    protected $table = 'guru';

    /**
     * Primary key untuk tabel guru.
     *
     * @var string
     */
    protected $primaryKey = 'id_guru';

    /**
     * Atribut yang dapat diisi secara massal (mass assignable).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_guru',
        'username',
        'password',
    ];

    /**
     * Atribut yang disembunyikan saat serialisasi (array/JSON).
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Format casting tipe data atribut.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Relasi one-to-many ke entitas Mata_Pelajaran.
     * Satu guru dapat mengampu satu atau lebih mata pelajaran.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mataPelajaran(): HasMany
    {
        return $this->hasMany(MataPelajaran::class, 'id_guru', 'id_guru');
    }

    /**
     * Memverifikasi login guru berdasarkan username dan password
     * sesuai spesifikasi Class Diagram (+ login(username, password): boolean).
     *
     * @param string $username
     * @param string $password
     * @return bool
     */
    public function login(string $username, string $password): bool
    {
        if ($this->exists) {
            return $this->username === $username && Hash::check($password, $this->password);
        }

        $guru = static::where('username', $username)->first();

        return $guru ? Hash::check($password, $guru->password) : false;
    }
}

