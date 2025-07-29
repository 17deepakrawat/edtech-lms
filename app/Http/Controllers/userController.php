<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::all()->makeVisible(['password']);;
        
        return Inertia::render('admin/rolepermision/user/Index', [
            'users' => $users,
           
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/rolepermision/user/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    public function edit(string $id): Response
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/rolepermision/user/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
                ? Hash::make($request->password)
                : $user->password,
        ]);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
    public function getRolesAndUserRole($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::pluck('name');
        $userRoles = $user->getRoleNames();

        return response()->json([
            'roles' => $roles,
            'userRoles' => $userRoles,
        ]);
    }

    public function assignRole(Request $request, $id)
    {
        // dd($request);/
        $user = User::findOrFail($id);
        $request->validate([
            'role' => 'required|string|exists:roles,name'
        ]);
        $user->syncRoles([$request->role]);
        // return response()->json(['message' => 'Role assigned successfully']);
        return redirect()->route('users.index')->with('success', 'Permissions updated successfully.');
    }
    public function toggleStatus($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->status = !$user->status;
            $user->save();

            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
    // public function assignCourseForm($courseId)
    // {
    //     return Inertia::render('admin/courses/Assign', [
    //         'course' => Course::findOrFail($courseId),
    //         'mentors' => User::role('mentor')->get(), // ✅ only mentors
    //     ]);
    // }


    // UserController.php

    
}
