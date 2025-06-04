<?php

namespace Database\Seeders;

use App\Models\Pinjam;
use App\Models\Pinjamitem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PinjamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pinjam::factory(10)->create()->each(function ($pinjam) {
            Pinjamitem::factory(3)->create([
                'pinjam_id' => $pinjam->id,
            ]);
        });
    }
}
