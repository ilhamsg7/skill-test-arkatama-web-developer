<?php

namespace Database\Factories;

use App\Models\Travel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Passenger>
 */
class PassengerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['L', 'P']);
        $birthYear = $this->faker->numberBetween(1960, 2010);

        return [
            'travel_id' => Travel::all()->random()->id,
            'booking_code' => $this->faker->unique()->regexify('[A-Z]{3}[0-9]{5}'),
            'name' => $this->faker->name(),
            'gender' => $gender,
            'city' => $this->faker->city(),
            'age' => now()->year - $birthYear,
            'birth_year' => $birthYear,
        ];
    }
}
