<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles and permissions
        $this->call(RolePermissionSeeder::class);

        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');

        // Create mentor user
        $mentor = User::create([
            'name' => 'Mentor User',
            'email' => 'mentor@example.com',
            'password' => Hash::make('password'),
        ]);
        $mentor->assignRole('mentor');

        // Create student user
        $student = User::create([
            'name' => 'Student User',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
        ]);
        $student->assignRole('student');
    }
}
