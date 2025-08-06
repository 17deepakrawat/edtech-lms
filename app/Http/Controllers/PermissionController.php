<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $newPermision = Permission::all();
        return Inertia::render('admin/rolepermision/permission/Index', [
            'permissions' => $newPermision,
        ]);
    }

    // public function store(Request $request)
    // {
    //      $request->validate(['name' => 'required|unique:permissions']);
    //     $permission = Permission::create(['name' => $request->name]);
    // }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'guard_names' => 'required|array|min:1',
            'guard_names.*' => 'in:user,student',
        ]);

        $permissions = [];

        foreach ($validated['guard_names'] as $guard) {
            // Check if permission already exists for this guard to avoid duplicate
            $existing = Permission::where('name', $validated['name'])
                ->where('guard_name', $guard)
                ->first();

            if (!$existing) {
                $permissions[] = Permission::create([
                    'name' => $validated['name'],
                    'guard_name' => $guard,
                ]);
            }
        }
    }
}
