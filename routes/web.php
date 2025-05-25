<?php

use App\Http\Controllers\BannersController;
use App\Http\Controllers\BlogCategoriesController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\FeedbacksController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UniversityPartnersController;
use App\Http\Controllers\WeoffersController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\Webhomcontroller;
use App\Models\BlogCategories;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\WebPlanController;
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
        Route::get('/banner/{banner}/toggle-status', [BannersController::class, 'toggleStatus'])->name('banner.toggle-status');

        Route::resource('feedback', FeedbacksController::class)->names('feedback');
        Route::get('/feedback/{feedback}/toggle-status', [FeedbacksController::class, 'toggleStatus'])->name('feedback.toggle-status');

        Route::resource('universitypartner', UniversityPartnersController::class)->names('universitypartner');
        Route::get('/universitypartner/{universitypartner}/toggle-status', [UniversityPartnersController::class, 'toggleStatus'])->name('universitypartner.toggle-status');

        Route::resource('weoffers', WeoffersController::class)->names('weoffers');
        Route::get('/weoffers/{weoffer}/toggle-status', [WeoffersController::class, 'toggleStatus'])->name('weoffers.toggle-status');

        Route::resource('department', DepartmentsController::class)->names('department');
        Route::get('/department/{department}/toggle-status', [DepartmentsController::class, 'toggleStatus'])->name('department.toggle-status');

        Route::resource('programs', ProgramsController::class)->names('programs');
        Route::get('/programs/{program}/toggle-status', [ProgramsController::class, 'toggleStatus'])->name('programs.toggle-status');

        Route::resource('courses', CoursesController::class)->names('courses');
        Route::get('/courses/{course}/toggle-status', [CoursesController::class, 'toggleStatus'])->name('courses.toggle-status');
        Route::get('/get-program-by-departmnet/{department_id}', [CoursesController::class, 'getByDepartment']);

        Route::resource('blogcategories', BlogCategoriesController::class)->names('blogcategories');
        Route::get('/blogcategories/{blogcategories}/toggle-status', [BlogCategoriesController::class, 'toggleStatus'])->name('blogcategories.toggle-status');

        Route::resource('/adminblogs', BlogsController::class)->names('adminblogs');
        Route::get('/adminblogs/{blog}/toggle-status', [BlogsController::class, 'toggleStatus'])->name('adminblogs.toggle-status');

        Route::resource('units', UnitController::class)->names('units');
        Route::get('/units/{unit}/toggle-status', [UnitController::class, 'toggleStatus'])->name('units.toggle-status');

        Route::resource('topics', TopicController::class)->names('topics');
        Route::get('/topics/{id}/toggle-status', [TopicController::class, 'toggleStatus'])->name('topics.toggle-status');

        Route::resource('videos', VideoController::class)->names('videos');
        Route::get('/videos/{id}/toggle-status', [VideoController::class, 'toggleStatus'])->name('videos.toggle-status');
        Route::get('/videos/get-units-by-course/{courseId}', [VideoController::class, 'getUnitsByCourse'])->name('videos.get-units');
        Route::get('/videos/get-topics-by-unit/{unitId}', [VideoController::class, 'getTopicsByUnit'])->name('videos.get-topics');
        Route::resource('plans', WebPlanController::class)->names('plans');
    });
});

Route::get('/', [Webhomcontroller::class, 'home']);

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

Route::post('ckeditor/upload', [CKEditorController::class, 'upload'])->name('ckeditor.upload');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
