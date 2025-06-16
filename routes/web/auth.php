<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Middleware\UserAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'store'])->name('attempt');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout')->middleware([UserAuthMiddleware::class]);
});
