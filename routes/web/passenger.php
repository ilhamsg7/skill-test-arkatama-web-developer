<?php

use App\Http\Controllers\PassengerController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard/passenger')->as('dashboard.passenger.')
 ->middleware(['user-auth'])
->group(function () {
    Route::get('fetch', [PassengerController::class, 'fetch'])->name('fetch');
    Route::post('store', [PassengerController::class, 'store'])->name('store');
    Route::put('{id}', [PassengerController::class, 'update'])->name('update');
});
