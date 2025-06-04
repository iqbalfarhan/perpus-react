<?php

namespace Database\Factories;

use App\Models\Buku;
use App\Models\Pinjam;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pinjamitem>
 */
class PinjamitemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pinjam_id' => Pinjam::pluck('id')->random(),
            'buku_id' => Buku::pluck('id')->random(),
            'qty' => fake()->numberBetween(1, 3),
        ];
    }
}
