<?php

namespace App\Service;

use App\Contract\PassengerContract;
use App\Models\Passenger;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PassengerService extends BaseService implements PassengerContract
{
    protected string|null $guardForeignKey = null;
    protected Model $model;

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Passenger $model)
    {
        $this->model = $model;
    }

    public function create($payload)
    {
        try {
            $parsedData = $this->parsePassengerInput($payload['passenger_input']);
            $bookingCode = $this->generateBookingCode($payload['travel_id']);
            DB::beginTransaction();
            $this->model->create([
                'name' => strtoupper($parsedData['name']),
                'age' => $parsedData['age'],
                'city' => strtoupper($parsedData['city']),
                'birth_year' => $parsedData['birth_year'],
                'booking_code' => $bookingCode,
                'travel_id' => $payload['travel_id']
            ]);
            DB::commit();
            return true;
        } catch (Exception $exception) {
            DB::rollBack();
            return $exception;
        }
    }

    private function parsePassengerInput(string $input): array
    {
        $parts = preg_split('/\s+/', $input);
        $currentYear = Carbon::now()->year;

        $ageIndex = $this->findAgeIndex($parts);

        $name = implode(' ', array_slice($parts, 0, $ageIndex));

        $age = (int) preg_replace('/[^0-9]/', '', $parts[$ageIndex]);

        $city = implode(' ', array_slice($parts, $ageIndex + 1));
        $birthYear = $currentYear - $age;

        return [
            'name' => $name,
            'age' => $age,
            'city' => $city,
            'birth_year' => $birthYear
        ];
    }

    private function generateBookingCode(string $travelId): string
    {
        $year = Carbon::now()->format('y');
        $month = Carbon::now()->format('m');
        $paddedTravelId = str_pad($travelId, 4, '0', STR_PAD_LEFT);

        $passengerCount = $this->model->where('travel_id', $travelId)->count();
        $sequence = str_pad($passengerCount + 1, 4, '0', STR_PAD_LEFT);

        $bookingCode = $year . $month . $paddedTravelId . $sequence;

        while ($this->model->where('booking_code', $bookingCode)->exists()) {
            $sequence = str_pad((int)$sequence + 1, 4, '0', STR_PAD_LEFT);
            $bookingCode = $year . $month . $paddedTravelId . $sequence;
        }

        return $bookingCode;
    }

    private function findAgeIndex(array $parts): int
    {
        foreach ($parts as $index => $part) {
            if (preg_match('/^\d+(\s*(TAHUN|THN|TH))?$/i', $part)) {
                return $index;
            }
        }
        return count($parts) - 2;
    }
}
