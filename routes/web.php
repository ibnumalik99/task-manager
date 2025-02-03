<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TaskController;
use App\Models\Task;
use App\Models\User;
use App\Notifications\TaskAssigned;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login.index');
});

Route::get('/logout', [LoginController::class, 'logout']);

Route::middleware(['guest'])->group(function() {
    // Login
    Route::prefix('login')->name('login.')->group(function() {
        Route::get('/', [LoginController::class, 'index'])->name('index');
        Route::post('/', [LoginController::class, 'store'])->name('store');
    });

    Route::prefix('register')->name('register.')->group(function() {
        Route::get('/', [RegisterController::class, 'index'])->name('index');
        Route::post('/', [RegisterController::class, 'store'])->name('store');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', function () {
        $data = Task::get();
        return Inertia::render('Dashboard', ['tasks' => $data]);
    })->name('dashboard');
    Route::prefix('task')->name('task.')->group(function() {
        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::post('/', [TaskController::class, 'store'])->name('store');

        Route::get('/{task}/edit', [TaskController::class, 'edit'])->name('edit');
        Route::put('/{task}', [TaskController::class, 'update'])->name('update');

        Route::get('/{task}/show', [TaskController::class, 'show'])->name('show');
        Route::get('/{task}/update-status', [TaskController::class, 'updateStatus'])->name('update-status');

        Route::delete('/{task}', [TaskController::class, 'destroy'])->name('destroy');
    });
});
