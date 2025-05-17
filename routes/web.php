<?php

use App\Http\Controllers\BannersController;
use App\Http\Controllers\BlogCategoriesController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\FeedbacksController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\UniversityPartnersController;
use App\Http\Controllers\WeoffersController;
use App\Models\BlogCategories;
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
        Route::resource('universitypartner', UniversityPartnersController::class)->names('universitypartner');
        Route::resource('weoffers', WeoffersController::class)->names('weoffers');
        Route::resource('department', DepartmentsController::class)->names('department');
        Route::resource('programs', ProgramsController::class)->names('programs');
        Route::get('/programs/{program}/toggle-status', [ProgramsController::class, 'toggleStatus'])->name('programs.toggle-status');
        Route::resource('programs', ProgramsController::class)->names('programs');
        Route::resource('courses', CoursesController::class)->names('courses');
        Route::get('/get-program-by-departmnet/{department_id}', [CoursesController::class, 'getByDepartment']);
        Route::resource('blogcategories', BlogCategoriesController::class)->names('blogcategories');
        Route::get('/blogcategories/{blogcategories}/toggle-status', [BlogCategoriesController::class, 'toggleStatus'])->name('blogcategories.toggle-status');
        Route::resource('/adminblogs', BlogsController::class)->names('adminblogs');

    });
});
Route::get('/', function () {
    return Inertia::render('web-pages/Home');
})->name('home');
Route::get('/course', function () {
    return Inertia::render('web-pages/course/Index');
})->name('course');
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
Route::get('/refund', function () {
    return Inertia::render('web-pages/Refund');
})->name('refund');
Route::get('/privacy', function () {
    return Inertia::render('web-pages/Privacy');
})->name('privacy');
Route::get('/term-condition', function () {
    return Inertia::render('web-pages/TermCondition');
})->name('term-condition');
Route::get('/about', function () {
    return Inertia::render('web-pages/AboutUs');
})->name('about');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
