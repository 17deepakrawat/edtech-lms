<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Student; // Assuming you have a Student model
use App\Models\students;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

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
        $admin->assignRole('admin'); // web guard

        // Create Mentor User
        $mentor = User::firstOrCreate(
            ['email' => 'mentor@example.com'],
            [
                'name' => 'Mentor User',
                'password' => Hash::make('password'),
            ]
        );
        $mentor->assignRole('mentor'); // web guard

        // ✅ Create Student User using Student model (student guard)
        $student = students::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'first_name'   => 'Test',
                'middle_name'  => 'mid_name',
                'last_name'    => 'last_name',
                'dob'          => '2000-01-01',
                'mobile'       => '1234567891',
                'password'     => Hash::make('1234567891'), // hash mobile as password
            ]
        );
        // Make sure to use guard_name = student
        $student->assignRole(Role::findByName('student', 'student'));
    }
}
