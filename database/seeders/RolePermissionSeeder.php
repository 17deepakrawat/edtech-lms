<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
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
            'view lead','view-pdf lead','view-excel lead',
            'view course mentor','allot course mentor','delete course mentor'
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $mentorRole = Role::firstOrCreate(['name' => 'mentor']);
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        // Assign all permissions to admin only
        $adminRole->syncPermissions(Permission::all());

        // Mentor and student roles should have no permissions
        $mentorRole->syncPermissions([]); // explicitly empty
        $studentRole->syncPermissions([]);

        // Optionally assign roles to users by ID
        $adminUser = User::find(1);
        if ($adminUser) {
            $adminUser->assignRole($adminRole);
        }

        $mentorUser = User::find(2);
        if ($mentorUser) {
            $mentorUser->assignRole($mentorRole);
        }

        $studentUser = User::find(3);
        if ($studentUser) {
            $studentUser->assignRole($studentRole);
        }
    }
}
