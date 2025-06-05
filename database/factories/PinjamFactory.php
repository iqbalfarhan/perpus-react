<?php

namespace Database\Factories;

use App\Models\Pinjam;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pinjam>
 */
class PinjamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $loandate = fake()->date();
        $islate = fake()->boolean();
        $isreturned = fake()->boolean();

        return [
            'code' => uniqid(),
            'user_id' => User::whereRole('user')->pluck('id')->random(),
            'pic_id' => User::whereRole('admin')->pluck('id')->random(),
            'loan_date' => $loandate,
            'due_date' => (new Carbon($loandate))->addDays(7),
            'late' => $islate,
            'fine' => $islate ? 10000 : null,
            'note' => fake()->sentence(),
            'returned' => $isreturned,
            'returned_at' => $isreturned ? fake()->dateTime() : null,
        ];
    }
}
