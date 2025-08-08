<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{EnrollsController};

Route::post('/payment/success', [EnrollsController::class, 'paymentSuccess'])->name('payment.success');
Route::post('/payment/failed', [EnrollsController::class, 'paymentFailed'])->name('payment.failed');
