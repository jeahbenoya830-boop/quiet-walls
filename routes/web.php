<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AnonymousMessageController;
use App\Http\Controllers\QuietWallController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/wall/{user:wall_slug}', [QuietWallController::class, 'show'])
    ->middleware('throttle:10,1')
    ->name('walls.show');

Route::post('/wall/{user:wall_slug}', [QuietWallController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('walls.messages.store');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AnonymousMessageController::class, 'index'])->name('dashboard');
    Route::delete('/messages/{message}', [AnonymousMessageController::class, 'destroy'])->name('messages.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
