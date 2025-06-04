<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bukus', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('synopsis')->nullable();
            $table->string('author')->nullable();
            $table->string('isbn')->nullable();
            $table->string('cover')->nullable();
            $table->integer('page')->default(0);
            $table->integer('stock')->default(0);
            $table->foreignId('penerbit_id')->nullable()->constrained('penerbits')->nullOnDelete();
            $table->foreignId('kategori_id')->nullable()->constrained('kategoris')->nullOnDelete();
            $table->foreignId('rak_id')->nullable()->constrained('raks')->nullOnDelete();
            $table->foreignId('bahasa_id')->nullable()->constrained('bahasas')->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukus');
    }
};
