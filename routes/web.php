<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('web-pages/Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Role-based dashboard redirection
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        if ($user->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->hasRole('mentor')) {
            return redirect()->route('mentor.dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');

    // Home Components route
    Route::get('/home-components', function () {
        return Inertia::render('admin/web/HomeComponents');
    })->name('home-components');
});

// Admin routes (only accessible by admin role)
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    })->name('admin.dashboard');
});

// Mentor routes (only accessible by mentor role)
Route::middleware(['auth', 'verified', 'role:mentor'])->prefix('mentor')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('mentor/Dashboard');
    })->name('mentor.dashboard');

    Route::get('/students', function () {
        return Inertia::render('mentor/Students');
    })->name('mentor.students');

    Route::get('/courses', function () {
        return Inertia::render('mentor/Courses');
    })->name('mentor.courses');
});

// Public pages
Route::get('/courses', fn() => Inertia::render('web-pages/course/Index'))->name('courses');
Route::get('/courses-details', fn() => Inertia::render('web-pages/course/Details'))->name('courses-details');
Route::get('/all-blogs', fn() => Inertia::render('web-pages/blogs/Index'))->name('all-blogs');
Route::get('/blogs', fn() => Inertia::render('web-pages/blogs/Blogs'))->name('blogs');
Route::get('/blog-details', fn() => Inertia::render('web-pages/blogs/Details'))->name('blog-details');
Route::get('/contact', fn() => Inertia::render('web-pages/Contact'))->name('contact');
Route::get('/about', fn() => Inertia::render('web-pages/About'))->name('about');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
