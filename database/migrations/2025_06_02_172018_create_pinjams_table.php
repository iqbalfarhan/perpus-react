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
        Schema::create('pinjams', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('pic_id')->nullable()->constrained('users')->nullOnDelete();
            $table->date('loan_date');
            $table->date('due_date');
            $table->boolean('late')->default(false);
            $table->integer('fine')->nullable();
            $table->text('note')->nullable();
            $table->boolean('returned')->default(false);
            $table->dateTime('returned_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pinjams');
    }
};
