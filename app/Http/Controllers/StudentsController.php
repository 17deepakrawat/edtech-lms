<?php

namespace App\Http\Controllers;

use App\Models\students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $student = students::all();
        return Inertia::render('admin/students/Index', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/students/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name'   => 'required|string|max:255',
            'middle_name'  => 'nullable|string|max:255',
            'last_name'    => 'required|string|max:255',
            'email'        => 'required|email|unique:users,email',
            'dob'          => 'required|date',
            'mobile'       => 'required|string|max:15',
        ]);
        $validated['password'] = Hash::make($validated['mobile']);
        // $validated['password'] = Hash::make($validated['password']);

        $user = students::create($validated);
        return redirect()->route('students.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(students $students)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(students $student)
    {

        return Inertia::render('admin/students/Edit',[
            'student'=> $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, students $students)
    {
        $validated = $request->validate([
            'first_name'   => 'sometimes|required|string|max:255',
            'middle_name'  => 'nullable|string|max:255',
            'last_name'    => 'sometimes|required|string|max:255',
            'email'        => 'sometimes|required|email|unique:users,email,' . $students->id,
            'password'     => 'nullable|min:6',
            'dob'          => 'sometimes|required|date',
            'mobile'       => 'sometimes|required|string|max:15',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $students->update($validated);
        return redirect()->route('students.index')->with('success', 'User update successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(students $students)
    {
        $students->delete();
        return redirect()->route('students.index')->with('success', 'User deleted successfully');
    }
    public function toggleStatus($id)
    {
        try {
            $student = students::findOrFail($id);
            $student->status = !$student->status;
            $student->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
