<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('siswa_mata_pelajaran', function (Blueprint $table) {
            $table->increments('id_siswa_mapel');

            $table->unsignedBigInteger('id_siswa');
            $table->unsignedInteger('id_mapel');

            $table->decimal('nilai', 5, 2);
            $table->timestamp('tanggal_input');
            $table->timestamp('tanggal_update');

            $table->foreign('id_siswa')
                  ->references('id_siswa')
                  ->on('siswa');

            $table->foreign('id_mapel')
                  ->references('id_mapel')
                  ->on('mata_pelajaran');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('siswa_mata_pelajaran');
    }
};