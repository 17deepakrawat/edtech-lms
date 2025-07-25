<?php
// app/Http/Controllers/UserRolePermssionController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserRolePermssionController extends Controller
{
    public function index()
    {
        $roles = Role::select('id', 'name')->get();
        $permissions = Permission::pluck('name');
        $rolePermissions = [];

        foreach ($roles as $role) {
            $rolePermissions[$role->id] = $role->permissions->pluck('name');
        }

        return Inertia::render('admin/rolepermision/role/Index', [
            'roles' => $roles,
            'allPermissions' => $permissions,
            'rolePermissionsMap' => $rolePermissions,
        ]);
    }
     public function assignPermissionToRole(Request $request, Role $role)
    {
        $allPermissions = Permission::pluck('name');
        $assignedPermissions = $role->permissions->pluck('name');

        return response()->json([
            'role' => $role,
            'allPermissions' => $allPermissions,
            'assignedPermissions' => $assignedPermissions,
        ]);
    }

    public function storePermissions(Request $request, Role $role)
    {
        $permissions = $request->input('permission', []);
        $role->syncPermissions($permissions);

        return redirect()->route('roles.index')->with('success', 'Permissions updated successfully.');
    }
   
}
