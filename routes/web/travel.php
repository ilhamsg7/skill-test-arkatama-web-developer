<?php

use App\Http\Controllers\TravelController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard/travel')->as('dashboard.travel.')
->group(function () {
    Route::get('fetch', [TravelController::class, 'fetch'])->name('fetch');
    Route::post('store', [TravelController::class, 'store'])->name('store');
    Route::put('{id}', [TravelController::class, 'update'])->name('update');
});
