<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/department/Index', [
            'departments' => Departments::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/department/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        Departments::create($validated);
        return redirect()->route('department.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Departments $department) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departments $department)
    {
        return Inertia::render('admin/department/Edit', [
            'department' => $department,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departments $department)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $department->update($validated);

        return redirect()->route('department.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $department)
    {
        $department->delete();
        return redirect()->route('department.index');
    }
}
