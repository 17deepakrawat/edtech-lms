<?php

use App\Http\Controllers\BannersController;
use App\Http\Controllers\FeedbacksController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return Inertia::render('admin/Dashboard');
        } elseif ($user->hasRole('mentor')) {
            return Inertia::render('mentor/Dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('banner', BannersController::class)->names('banner');
        Route::resource('feedback', FeedbacksController::class)->names('feedback');
    });
   
});
Route::get('/', function () {
    return Inertia::render('web-pages/Home');
})->name('home');
Route::get('/courses', function () {
    return Inertia::render('web-pages/course/Index');
})->name('courses');
Route::get('/courses-details', function () {
    return Inertia::render('web-pages/course/Details');
})->name('courses-details');
Route::get('/all-blogs', function () {
    return Inertia::render('web-pages/blogs/Index');
})->name('all-blogs');
Route::get('/blogs', function () {
    return Inertia::render('web-pages/blogs/Blogs');
})->name('blogs');
Route::get('/blog-details', function () {
    return Inertia::render('web-pages/blogs/Details');
})->name('blog-details');
Route::get('/contact', function () {
    return Inertia::render('web-pages/Contact');
})->name('contact');
Route::get('/about', function () {
    return Inertia::render('web-pages/About');
})->name('about');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
