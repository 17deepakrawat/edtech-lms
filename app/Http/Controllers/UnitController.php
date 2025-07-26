<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Courses;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $units = Unit::with('course')->get();
        $courses = Courses::where('status', true)->get();

        return Inertia::render('admin/Units/Index', [
            'units' => [
                'data' => $units
            ],
            'courses' => $courses,
            'users' => User::all(),
            'can' => [
                'create' => auth()->user()->can('create unit'),
                'edit' => auth()->user()->can('edit unit'),
                'delete' => auth()->user()->can('delete unit'),
            ],

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // This method is no longer used in the new implementation
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'order' => 'required|integer|min:0',
        ]);

        $unit = Unit::create($validated);

        return redirect()->route('units.index')->with('success', 'Unit created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        // This method is no longer used in the new implementation
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'order' => 'required|integer|min:0',
        ]);

        $unit->update($validated);

        return redirect()->route('units.index')->with('success', 'Unit update successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        $unit->delete();
        return response()->json(['message' => 'Unit deleted successfully']);
    }
    public function toggleStatus($id)
    {
        try {
            $partner = Unit::findOrFail($id);
            $partner->status = !$partner->status;
            $partner->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
