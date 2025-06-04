<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoriBuku = [
            [
                "name" => "Fiksi",
                "description" => "Buku-buku cerita imajinatif seperti novel dan cerpen."
            ],
            [
                "name" => "Non-Fiksi",
                "description" => "Buku berdasarkan fakta dan informasi nyata."
            ],
            [
                "name" => "Biografi",
                "description" => "Kisah hidup seseorang, biasanya tokoh terkenal."
            ],
            [
                "name" => "Sejarah",
                "description" => "Buku yang bahas peristiwa masa lalu dan perkembangan zaman."
            ],
            [
                "name" => "Sains",
                "description" => "Buku yang ngebahas ilmu pengetahuan dan eksperimen."
            ],
            [
                "name" => "Teknologi",
                "description" => "Bahas perkembangan teknologi, software, dan hardware."
            ],
            [
                "name" => "Self-Improvement",
                "description" => "Buku motivasi, pengembangan diri, dan skill life."
            ],
            [
                "name" => "Bisnis",
                "description" => "Topik bisnis, manajemen, dan kewirausahaan."
            ],
            [
                "name" => "Agama",
                "description" => "Pembahasan tentang kepercayaan, spiritual, dan nilai moral."
            ],
            [
                "name" => "Anak-anak",
                "description" => "Buku cerita dan edukasi buat anak-anak."
            ]
        ];

        Kategori::insert($kategoriBuku);
    }
}
