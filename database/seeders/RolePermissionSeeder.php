<?php

// database/seeders/RolePermissionSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $permissions = [
            'create course',
            'edit course',
            'delete course',
            'view course',
            'assign students',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $mentorRole = Role::firstOrCreate(['name' => 'mentor']);
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        // Admin has all permissions
        $adminRole->syncPermissions(Permission::all());

        // Mentor has some permissions
        $mentorRole->syncPermissions(['create course', 'edit course', 'view course']);

        // Student has limited permissions
        $studentRole->syncPermissions(['view course']);

        // Assign roles to users (optional)
        $adminUser = User::find(1); // Replace with correct user ID
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }

        $mentorUser = User::find(2); // Replace with correct user ID
        if ($mentorUser) {
            $mentorUser->assignRole('mentor');
        }

        $studentUser = User::find(3); // Replace with correct user ID
        if ($studentUser) {
            $studentUser->assignRole('student');
        }
    }
}

