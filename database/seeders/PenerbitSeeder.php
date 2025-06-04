<?php

namespace Database\Seeders;

use App\Models\Penerbit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenerbitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penerbitBuku = [
            [
                'name' => "Gramedia Pustaka Utama",
                'address' => "Jl. Palmerah Barat No. 29-37, Jakarta Barat, DKI Jakarta"
            ],
            [
                'name' => "Erlangga",
                'address' => "Jl. H. Baping No.100, Ciracas, Jakarta Timur"
            ],
            [
                'name' => "Mizan Publishing",
                'address' => "Jl. Cinambo No.135, Bandung, Jawa Barat"
            ],
            [
                'name' => "Bentang Pustaka",
                'address' => "Jl. Pandega Siwi No.15, Sleman, Yogyakarta"
            ],
            [
                'name' => "GagasMedia",
                'address' => "Jl. H. Montong No.57, Ciganjur, Jakarta Selatan"
            ],
            [
                'name' => "Andi Publisher",
                'address' => "Jl. Beo No.38-40, Yogyakarta"
            ],
            [
                'name' => "Penerbit Deepublish",
                'address' => "Jl. Rajawali Selatan II No.1B, Sleman, Yogyakarta"
            ],
            [
                'name' => "Kanisius",
                'address' => "Jl. Cempaka No.58, Yogyakarta"
            ],
            [
                'name' => "Pustaka Pelajar",
                'address' => "Jl. Kahar Muzakir No.5, Yogyakarta"
            ],
            [
                'name' => "VisiMedia",
                'address' => "Jl. Palmerah Barat No.29-37, Jakarta Barat"
            ],
        ];

        Penerbit::insert($penerbitBuku);
    }
}
