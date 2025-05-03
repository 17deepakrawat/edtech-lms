<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole('admin');

        // Create Mentor User
        $mentor = User::firstOrCreate(
            ['email' => 'mentor@example.com'],
            [
                'name' => 'Mentor User',
                'password' => Hash::make('password'),
            ]
        );
        $mentor->assignRole('mentor');

        // Create Student User
        $student = User::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'name' => 'Student User',
                'password' => Hash::make('password'),
            ]
        );
        $student->assignRole('student');
    }
}