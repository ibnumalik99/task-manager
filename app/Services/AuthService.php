<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class AuthService
{
    protected string $email;
    protected string $password;
    protected string $ip;

    public function login(string $email, string $password, string $ip)
    {
        $this->email = $email;
        $this->password = $password;
        $this->ip = $ip;
        $this->ensureIsNotRateLimited();

        if (!Auth::attempt([
            'email' => $email,
            'password' => $password,
        ], true)) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        request()->session()->regenerate();

        RateLimiter::clear($this->throttleKey());
    }


    public function register(array $credentials)
    {
        if (RateLimiter::tooManyAttempts($credentials['email'], 3, 60)) {
            throw ValidationException::withMessages([
                'email' => __('register.failed'),
            ]);
        }

        $user = User::create($credentials);

        event(new Registered($user));

        Auth::login($user);

        request()->session()->regenerate();

        RateLimiter::resetAttempts($credentials['email']);
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->email) . '|' . $this->ip);
    }

    public function logout()
    {
        return Auth::logout();
    }
}
