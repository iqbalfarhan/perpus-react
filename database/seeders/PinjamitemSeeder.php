<?php

namespace Database\Seeders;

use App\Models\Pinjamitem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PinjamitemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pinjamitem::factory(10)->create();
    }
}
