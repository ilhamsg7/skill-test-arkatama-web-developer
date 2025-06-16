<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'prefix' => 'dashboard',
        'as' => 'dashboard.',
        //'middleware' => ['user-auth'],
    ],
    function () {
        Route::get('', [DashboardController::class, 'index'])->name('index');
    }
);
