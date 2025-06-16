<?php

namespace App\Http\Controllers\Auth;

use App\Contract\UserAuthContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Utils\WebResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    protected UserAuthContract $service;

    public function __construct(UserAuthContract $service)
    {
        $this->service = $service;
    }

    public function login()
    {
        if (Auth::guard()->check()) {
            return "Welcome";
        } else {
            return Inertia::render('auth/login');
        }
    }

    public function store(LoginRequest $request)
    {
        $payload = $request->validated();
        $result = $this->service->login($payload);

        return WebResponse::response($result, 'backoffice.index');
    }

    public function logout()
    {
        $result = $this->service->logout();
        return WebResponse::response($result, 'auth.login');
    }
}
