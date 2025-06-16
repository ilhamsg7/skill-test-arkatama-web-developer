<?php

namespace App\Http\Controllers;

use App\Contract\PassengerContract;
use App\Contract\TravelContract;
use App\Models\Travel;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected TravelContract $service;
    protected PassengerContract $passengerService;

    public function __construct(
        TravelContract $service,
        PassengerContract $passengerService
    ) {
        $this->service = $service;
        $this->passengerService = $passengerService;
    }
    public function index()
    {
        $allowedSorts = [
            'name',
        ];

        $user = User::find(Auth::id());
        $passengers = $this->passengerService->all(
            allowedFilters: ['id'],
            allowedSorts: $allowedSorts,
            withPaginate: false,
            relation: ['travel']
        );

        $travel = $this->service->all(
            allowedFilters: ['id', 'name'],
            allowedSorts: $allowedSorts,
            withPaginate: false,
            relation: []
        );
        return Inertia::render('home', [
            'totalBooking' => Travel::all()->count(),
            'passengers'   => $passengers,
            'travel' => $travel
        ]);
    }
}
