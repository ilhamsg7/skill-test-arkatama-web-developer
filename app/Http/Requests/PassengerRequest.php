<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PassengerRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'passenger_input' => ['required', 'string', 'regex:/^[a-zA-Z\s]+\s+\d+(\s*(TAHUN|THN|TH))?\s+[a-zA-Z\s]+$/i'],
            'travel_id' => ['required', 'exists:travel,id', Rule::unique('passengers')->where(function ($query) {
                return $query->where('name', strtoupper($this->getPassengerName()));
            })]
        ];
    }

    public function getPassengerName(): string
    {
        $parts = preg_split('/\s+/', $this->passenger_input);
        $ageIndex = $this->findAgeIndex($parts);
        return implode(' ', array_slice($parts, 0, $ageIndex));
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
