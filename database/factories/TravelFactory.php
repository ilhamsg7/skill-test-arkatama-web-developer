<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Travel>
 */
class TravelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->company(),
            'departure_date' => $this->faker->dateTimeBetween("-2 weeks", "now"),
            'departure_time' => $this->faker->time(),
            'quota' => $this->faker->numberBetween(20, 100)
        ];
    }
}
