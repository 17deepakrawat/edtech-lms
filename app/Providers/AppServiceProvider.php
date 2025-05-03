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
    public function boot(): void
    {
        Inertia::share('auth', function () {
            $user = Auth::user();
            return [
                'user' => $user,
                'roles' => $user ? $user->getRoleNames()->toArray() : [],
                'permissions' => $user ? $user->getAllPermissions()->pluck('name')->toArray() : [],
            ];
        });
    }
}
