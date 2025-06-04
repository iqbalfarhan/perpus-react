<?php

namespace Database\Seeders;

use App\Models\Bahasa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BahasaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $negaraList = [
            [
                'name' => "Indonesia",
                'flag' => "🇮🇩",
            ],
            [
                'name' => "Jepang",
                'flag' => "🇯🇵",
            ],
            [
                'name' => "Amerika Serikat",
                'flag' => "🇺🇸",
            ],
            [
                'name' => "Inggris",
                'flag' => "🇬🇧",
            ],
            [
                'name' => "Korea Selatan",
                'flag' => "🇰🇷",
            ],
            [
                'name' => "Jerman",
                'flag' => "🇩🇪",
            ],
            [
                'name' => "Perancis",
                'flag' => "🇫🇷",
            ],
            [
                'name' => "Brasil",
                'flag' => "🇧🇷",
            ],
            [
                'name' => "Italia",
                'flag' => "🇮🇹",
            ],
            [
                'name' => "India",
                'flag' => "🇮🇳",
            ],
        ];

        Bahasa::insert($negaraList);
    }
}
