<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/rolepermision/role/Index', [
            'roles' => Role::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:roles,name',
        ]);

        $role = Role::create(['name' => $validated['name']]);

        if ($request->wantsJson()) {
            return response()->json($role, 201);
        }

        return redirect()->back()->with('success', 'Role created successfully.');
    }

  
}
