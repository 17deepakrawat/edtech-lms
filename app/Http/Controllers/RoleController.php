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
        dd('xasxas');
        $roles = Role::all();
        return Inertia::render('admin/rolepermision/role/Index', [
            'roles' => $roles,
        ]);
    }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'name' => 'required|unique:roles,name',
    //     ]);

    //     $role = Role::create(['name' => $validated['name']]);

    //     if ($request->wantsJson()) {
    //         return response()->json($role, 201);
    //     }

    //     return redirect()->back()->with('success', 'Role created successfully.');
    // }

  public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|unique:roles,name',
        'guard_name' => 'required|in:user,student', // 👈 validate guard name
    ]);

    $role = Role::create([
        'name' => $validated['name'],
        'guard_name' => $validated['guard_name'], // 👈 store guard name
    ]);

    if ($request->wantsJson()) {
        return response()->json($role, 201);
    }

    return redirect()->back()->with('success', 'Role created successfully.');
}
}
