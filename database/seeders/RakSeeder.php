<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Rak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rakBuku = [
            [
                'name' => "Rak Fiksi Modern",
                'location' => "Lantai 1 - Sisi Barat",
                'capacity' => 150,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Sejarah Dunia",
                'location' => "Lantai 2 - Sisi Timur",
                'capacity' => 120,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Sains Populer",
                'location' => "Lantai 2 - Tengah",
                'capacity' => 100,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Teknologi Informasi",
                'location' => "Lantai 3 - Sisi Barat",
                'capacity' => 130,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Biografi Tokoh",
                'location' => "Lantai 1 - Sisi Timur",
                'capacity' => 90,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Anak-anak",
                'location' => "Lantai 1 - Dekat Pintu Masuk",
                'capacity' => 80,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Buku Agama",
                'location' => "Lantai 2 - Sisi Selatan",
                'capacity' => 110,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Referensi",
                'location' => "Lantai 3 - Dekat Meja Pustakawan",
                'capacity' => 70,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Bisnis & Ekonomi",
                'location' => "Lantai 3 - Sisi Timur",
                'capacity' => 100,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
            [
                'name' => "Rak Bahasa & Sastra",
                'location' => "Lantai 2 - Sisi Barat",
                'capacity' => 95,
                'kategori_id' => Kategori::pluck('id')->random()
            ],
        ];

        Rak::insert($rakBuku);
    }
}
