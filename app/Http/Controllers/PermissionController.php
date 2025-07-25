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
  
public function store(Request $request)
{
     $request->validate(['name' => 'required|unique:permissions']);
    $permission = Permission::create(['name' => $request->name]);
}
}
