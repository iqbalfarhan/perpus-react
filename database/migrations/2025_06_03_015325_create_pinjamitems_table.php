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
        Schema::create('pinjamitems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pinjam_id')->nullable()->constrained('pinjams')->nullOnDelete();
            $table->foreignId('buku_id')->nullable()->constrained('bukus')->nullOnDelete();
            $table->integer('qty');
            $table->boolean('checked')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjamitems');
    }
};
