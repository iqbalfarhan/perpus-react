<?php

namespace Database\Factories;

use App\Models\Bahasa;
use App\Models\Kategori;
use App\Models\Penerbit;
use App\Models\Rak;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Buku>
 */
class BukuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'synopsis' => fake()->text(),
            'author' => fake()->name(),
            'isbn' => fake()->randomNumber(9, true),
            'page' => fake()->randomNumber(3, true),
            'stock' => fake()->randomNumber(2, true),
            'penerbit_id' => Penerbit::pluck('id')->random(),
            'kategori_id' => Kategori::pluck('id')->random(),
            'rak_id' => Rak::pluck('id')->random(),
            'bahasa_id' => Bahasa::pluck('id')->random(),
            'created_by' => User::pluck('id')->random(),
        ];
    }
}
