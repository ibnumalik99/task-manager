<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class LoginController extends Controller
{
    private readonly AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(LoginRequest $request)
    {
        $this->authService->login(
            $request->email,
            $request->password,
            $request->ip()
        );

        \Log::debug(Session::all());
        return redirect()->route('dashboard');
    }

    public function logout()
    {
        // Auth::user()->forceFill([
        //     'remember_token' => null,
        // ])->save();

        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        \Log::debug(Session::all());
        return redirect()->route('login.index');
    }

}
