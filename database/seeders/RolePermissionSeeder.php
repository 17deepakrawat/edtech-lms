<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use App\Models\Student;
use App\Models\students;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions for web guard (admin, mentor)
        $permissions = [
            'view role permision',
            'view permision',
            'view role',
            'view user',
            'view web',
            'view home component',
            'view banner',
            'create banner',
            'edit banner',
            'delete banner',
            'view feedback',
            'create feedback',
            'edit feedback',
            'delete feedback',
            'view university partner',
            'create university partner',
            'edit university partner',
            'delete university partner',
            'view offer',
            'create offer',
            'edit offer',
            'delete offer',
            'view course plans',
            'create course plans',
            'edit course plans',
            'delete course plans',
            'view department',
            'create department',
            'edit department',
            'delete department',
            'view program',
            'create program',
            'edit program',
            'delete program',
            'view course',
            'create course',
            'edit course',
            'delete course',
            'view unit',
            'create unit',
            'edit unit',
            'delete unit',
            'view topics',
            'create topics',
            'edit topics',
            'delete topics',
            'view course video',
            'create course video',
            'edit course video',
            'delete course video',
            'view blogs module',
            'view blogs category',
            'create blogs category',
            'edit blogs category',
            'delete blogs category',
            'view blogs',
            'create blogs',
            'edit blogs',
            'delete blogs',
            'view lead',
            'view-pdf lead',
            'view-excel lead',
            'view course mentor',
            'allot course mentor',
            'delete course mentor'
        ];

        // Define student-only permissions (separate guard: student)
        $studentPermissions = [
            'view dashboard','view my-learning','view my-courses','view my-certificates','view my-support'
        ];

        // Create permissions for web guard
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission, 'guard_name' => 'web']
            );
        }

        // Create permissions for student guard
        foreach ($studentPermissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission, 'guard_name' => 'student']
            );
        }

        // Create roles with specific guards
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $mentorRole = Role::firstOrCreate(['name' => 'mentor', 'guard_name' => 'web']);
        $studentRole = Role::firstOrCreate(['name' => 'student', 'guard_name' => 'student']);

        // Assign permissions to roles
        $adminRole->syncPermissions(Permission::where('guard_name', 'web')->get());
        $mentorRole->syncPermissions([]); // assign later if needed
        $studentRole->syncPermissions(Permission::where('guard_name', 'student')->get());

        // Assign roles to users (make sure User uses 'web' and Student uses 'student' guard)
        $adminUser = User::find(1);
        if ($adminUser) {
            $adminUser->assignRole('admin'); // uses web guard
        }

        $mentorUser = User::find(2);
        if ($mentorUser) {
            $mentorUser->assignRole('mentor'); // uses web guard
        }

        $studentUser = students::find(6); // assuming this is your student model
        if ($studentUser) {
            $studentUser->assignRole(Role::findByName('student', 'student'));
        }
    }
}
