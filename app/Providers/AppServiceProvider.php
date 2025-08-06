<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    // public function boot(): void
    // {
    //     Inertia::share('auth', function () {
    //         $user = Auth::user();
    //         return [
    //             'user' => $user,
    //             'roles' => $user ? $user->getRoleNames()->toArray() : [],
    //             'permissions' => $user ? $user->getAllPermissions()->pluck('name')->toArray() : [],
    //         ];
    //     });
    // }
     public function boot(): void
    {
        // Share auth user with roles & permissions
        Inertia::share('auth', function () {
            $user = Auth::user();
            return [
                'user' => $user,
                'roles' => $user ? $user->getRoleNames()->toArray() : [],
                'permissions' => $user ? $user->getAllPermissions()->pluck('name')->toArray() : [],
            ];
        });

        // ✅ Share student data from session
        Inertia::share('student_data', function () {
            return session('student_data');
        });
    }
}
