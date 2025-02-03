<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\Country;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Support\Facades\Session;

class RegisterController extends Controller
{

    private readonly AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(Request $request)
    {
        return inertia('Auth/Register');
    }

    public function store(RegisterRequest $request)
    {
        $credentials = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ];

        $this->authService->register($credentials);

        return redirect()->route('dashboard')->with('success', 'Login successfully');
    }
}
