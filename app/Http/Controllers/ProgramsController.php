<?php

namespace App\Http\Controllers;

use App\Models\Programs;
use App\Models\Departments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function index()
    {
        $programs = Programs::with('department')->get()->map(function ($program) {
            return [
                'id' => $program->id,
                'name' => $program->name,
                'department_id' => $program->department_id,
                'department_name' => $program->department ? $program->department->name : null,
                'status' => $program-> status,

            ];
        });

        return Inertia::render('admin/Programs/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Departments::all(['id', 'name']);
        return Inertia::render('admin/Programs/Create', [
            'departments' => $departments,
        ]);
    }
    public function toggleStatus($id)
{
    try {
        $program = Programs::findOrFail($id);
        $program->status = $program->status == 1 ? 0 : 1;
        $program->save();
        //  dd(($program->status == 1 ? 'Active' : 'Inactive'));
        return redirect()->back()->with('success', 'Status updated Successfull!');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
    }
}

    
    
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'department_id' => ['required', 'exists:departments,id'],
        ]);

        Programs::create($validated);

        return redirect()->route('programs.index')->with('success', 'Program created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programs $program)
    {
        $departments = Departments::all(['id', 'name']);
        return Inertia::render('admin/Programs/Edit', [
            'program' => $program,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Programs $program)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'department_id' => 'required|exists:departments,id',
        ]);

        $program->update($validated);

        return redirect()->route('programs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programs $program)
    {
        $program->delete();

        return redirect()->route('programs.index')->with('success', 'Program deleted successfully.');
    }
}
