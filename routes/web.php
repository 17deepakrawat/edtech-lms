<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\{
    BannersController,
    BlogCategoriesController,
    BlogsController,
    CKEditorController,
    CoursesController,
    DepartmentsController,
    FeedbacksController,
    LeadsController,
    mentorController,
    PaymentGatewaysController,
    ProgramsController,
    TopicController,
    UniversityPartnersController,
    WeoffersController,
    UnitController,
    VideoController,
    Webhomcontroller,
    PlanController,
    WebPlanController,
    RoleController,
    PermissionController,
    StudentsController,
    userController,
    UserRolePermssionController
};


// Public Routes
Route::get('/', [Webhomcontroller::class, 'home']);
Route::get('/welcome', fn() => Inertia::render('welcome'))->name('home');
Route::get('/blogs', [BlogCategoriesController::class, 'show'])->name('blogs');
Route::get('/blog/{slug}', [BlogsController::class, 'details'])->name('blog');
Route::get('/category/{slug}', [BlogCategoriesController::class, 'category'])->name('category');
Route::get('course', [CoursesController::class, 'courselist'])->name('course');
Route::get('/course/{slug}', [CoursesController::class, 'details'])->name('course-details');
Route::get('/contact', fn() => Inertia::render('web-pages/Contact'))->name('contact');
Route::get('/refund', fn() => Inertia::render('web-pages/Refund'))->name('refund');
Route::get('/privacy', fn() => Inertia::render('web-pages/Privacy'))->name('privacy');
Route::get('/term-condition', fn() => Inertia::render('web-pages/TermCondition'))->name('term-condition');
Route::get('/about', fn() => Inertia::render('web-pages/AboutUs'))->name('about');
Route::get('/courses-details', fn() => Inertia::render('web-pages/course/Details'))->name('courses-details');
Route::get('/all-blogs', fn() => Inertia::render('web-pages/blogs/Index'))->name('all-blogs');
Route::get('/blog-details', fn() => Inertia::render('web-pages/blogs/Details'))->name('blog-details');

Route::post('/leads', [LeadsController::class, 'store'])->name('leads.store');
Route::post('ckeditor/upload', [CKEditorController::class, 'upload'])->name('ckeditor.upload');

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return Inertia::render('admin/Dashboard');
        } elseif ($user->hasRole('mentor')) {
            return Inertia::render('mentor/Dashboard');
        } elseif ($user->hasRole('student')) {
            return Inertia::render('student/Dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('students', StudentsController::class);
        Route::get('/students/{id}/toggle-status', [StudentsController::class, 'toggleStatus'])->name('students.toggle-status');
        Route::resource('payment-gateways', PaymentGatewaysController::class);
        Route::get('payment-history', [PaymentGatewaysController::class, 'paymenthistory'])->name('payment-history');
        Route::get('/payment-gateways/{id}/toggle-status', [PaymentGatewaysController::class, 'toggleStatus'])->name('payment-gateways.toggle-status');
        Route::resource('mentors', mentorController::class);
        Route::post('/mentor-allot/{user}/assign-course', [mentorController::class, 'assignCourse']);
        Route::resource('roles', RoleController::class);
        Route::resource('permissions', PermissionController::class);
        Route::resource('users', userController::class);
        Route::get('/users/{id}/roles', [UserController::class, 'getRolesAndUserRole']);
        Route::post('/api/users/{id}/roles', [UserController::class, 'assignRole']);
        Route::get('/users/{id}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
        Route::get('/roles', [UserRolePermssionController::class, 'index'])->name('roles.index');
        Route::post('roles/{role}/permissions', [UserRolePermssionController::class, 'assignPermissiontorole'])->name('roles.assign.permissions');
        Route::post('/api/roles/{role}/update-permissions', [UserRolePermssionController::class, 'storePermissions']);
        Route::resource('banner', BannersController::class)->names('banner');
        Route::get('/banner/{banner}/toggle-status', [BannersController::class, 'toggleStatus'])->name('banner.toggle-status');
        Route::resource('feedback', FeedbacksController::class)->names('feedback');
        Route::get('/feedback/{feedback}/toggle-status', [FeedbacksController::class, 'toggleStatus'])->name('feedback.toggle-status');
        Route::resource('universitypartner', UniversityPartnersController::class)->names('universitypartner');
        Route::get('/universitypartner/{id}/toggle-status', [UniversityPartnersController::class, 'toggleStatus'])->name('universitypartner.toggle-status');
        Route::resource('weoffers', WeoffersController::class)->names('weoffers');
        Route::get('/weoffers/{id}/toggle-status', [WeoffersController::class, 'toggleStatus'])->name('weoffers.toggle-status');
        Route::resource('department', DepartmentsController::class)->names('department');
        Route::get('/department/{id}/toggle-status', [DepartmentsController::class, 'toggleStatus'])->name('department.toggle-status');
        Route::resource('programs', ProgramsController::class)->names('programs');
        Route::get('/programs/{id}/toggle-status', [ProgramsController::class, 'toggleStatus'])->name('programs.toggle-status');
        Route::resource('courses', CoursesController::class)->names('courses');
        Route::get('/courses/{id}/toggle-status', [CoursesController::class, 'toggleStatus'])->name('courses.toggle-status');
        Route::get('/get-program-by-departmnet/{department_id}', [CoursesController::class, 'getByDepartment']);
        Route::resource('blogcategories', BlogCategoriesController::class)->names('blogcategories');
        Route::get('/blogcategories/{id}/toggle-status', [BlogCategoriesController::class, 'toggleStatus'])->name('blogcategories.toggle-status');
        Route::resource('adminblogs', BlogsController::class)->names('adminblogs');
        Route::get('/adminblogs/{id}/toggle-status', [BlogsController::class, 'toggleStatus'])->name('adminblogs.toggle-status');
        Route::resource('units', UnitController::class)->names('units');
        Route::get('/units/{id}/toggle-status', [UnitController::class, 'toggleStatus'])->name('units.toggle-status');
        Route::resource('topics', TopicController::class)->names('topics');
        Route::get('/topics/{id}/toggle-status', [TopicController::class, 'toggleStatus'])->name('topics.toggle-status');
        Route::resource('videos', VideoController::class)->names('videos');
        Route::get('/videos/{id}/toggle-status', [VideoController::class, 'toggleStatus'])->name('videos.toggle-status');
        Route::get('/videos/get-units-by-course/{courseId}', [VideoController::class, 'getUnitsByCourse'])->name('videos.get-units');
        Route::get('/videos/get-topics-by-unit/{unitId}', [VideoController::class, 'getTopicsByUnit'])->name('videos.get-topics');
        Route::resource('plans', WebPlanController::class)->names('plans');
        Route::get('/plans/{id}/toggle-status', [WebPlanController::class, 'toggleStatus'])->name('plans.toggle-status');
        Route::resource('leads', LeadsController::class);
    });
    Route::middleware(['role:mentor'])->prefix('mentor')->group(function () {});
    Route::middleware(['role:student'])->prefix('student')->group(function () {});
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
