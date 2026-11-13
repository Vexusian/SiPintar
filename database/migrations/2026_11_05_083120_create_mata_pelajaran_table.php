
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mata_pelajaran', function (Blueprint $table) {
            $table->increments('id_mapel');
            $table->string('nama_mapel', 50);

            $table->unsignedBigInteger('id_guru');

            // Foreign Key
            $table->foreign('id_guru')
                  ->references('id_guru')
                  ->on('guru');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mata_pelajaran');
    }
};
