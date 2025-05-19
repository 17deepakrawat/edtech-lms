<?php

namespace App\Http\Controllers;

use App\Models\Courses;
use App\Models\Departments;
use App\Models\Programs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getByDepartment($department_id)
    {
        $programs = Programs::where('department_id', $department_id)
            ->where('status', 1) // only active programs
            ->get(['id', 'name']);

        return response()->json($programs);
    }

    public function index()
    {
        $courses = Courses::with(['department:id,name', 'program:id,name'])->get()->map(function ($course) {
            return [
                'id' => $course->id,
                'name' => $course->name,
                'department' => $course->department?->name,
                'program' => $course->program?->name,
                'price' => $course->price,
                'image' => $course->image,
            ];
        });

        return Inertia::render('admin/courses/Index', [
            'courses' => $courses,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Departments::all(['id', 'name']);

        return Inertia::render('admin/courses/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'short_description' => 'required|string|max:500',
            'content' => 'required|string',
            'modes' => 'required|in:month,year,semester',
            'duration' => 'required|string',
            'rating' => 'required|numeric|min:1|max:5',
            'price' => 'required|numeric|min:0',
            'is_subject' => 'required|in:0,1',
            'course_keys' => 'required|array|min:1',
            'course_keys.*' => 'required|string',

            // Correct nested validation for FAQs
            'faqs' => 'required|array|min:1',
            'faqs.*.question' => 'required|string|max:255',
            'faqs.*.answer' => 'required|string|max:1000',

            'image' => 'required|image|max:2048',
        ]);

        // Handle image upload
        $imagePath = $request->file('image')->store('courses', 'public');

        // Create the course
        Courses::create([
            'department_id' => $validated['department_id'],
            'program_id' => $validated['program_id'],
            'name' => $validated['name'],
            'short_description' => $validated['short_description'],
            'content' => $validated['content'],
            'modes' => $validated['modes'],
            'duration' => $validated['duration'],
            'rating' => $validated['rating'],
            'price' => $validated['price'],
            'is_subject' => $validated['is_subject'],
            'course_keys' => json_encode($validated['course_keys']), // Store as JSON
            'faqs' => json_encode($validated['faqs']),               // Store as JSON
            'image' => $imagePath,
        ]);

        return redirect()->route('courses.index')->with('success', 'Course created successfully!');
    }




    /**
     * Display the specified resource.
     */
    public function show(Courses $courses)
    {
        // Not needed for now, but you can implement it later
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Courses $course)
    {
        $departments = Departments::all();
        $programs = Programs::where('department_id', $course->department_id)->get();
        //  dd($course);
        return inertia('admin/courses/Edit', [
            'course' => $course,
            'departments' => $departments,
            'programs' => $programs,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Courses $course)
    {
        $validated = $request->validate([
            'department_id' => 'nullable|exists:departments,id',
            'program_id' => 'nullable|exists:programs,id',
            'name' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'content' => 'nullable|string',
            'modes' => ['nullable', Rule::in(['month', 'year', 'semester'])],
            'duration' => 'nullable|string|max:100',
            'rating' => 'nullable|numeric|min:0|max:5',
            'price' => 'nullable|numeric|min:0',
            'is_subject' => 'nullable|in:0,1',
            'course_keys' => 'nullable|array',
            'course_keys.*' => 'string',
            'faqs' => 'nullable|array',
            'faqs.*.question' => 'required_with:faqs|string',
            'faqs.*.answer' => 'required_with:faqs|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $course->fill([
            'name' => $validated['name'] ?? $course->name,
            'short_description' => $validated['short_description'] ?? $course->short_description,
            'content' => $validated['content'] ?? $course->content,
            'modes' => $validated['modes'] ?? $course->modes,
            'duration' => $validated['duration'] ?? $course->duration,
            'rating' => $validated['rating'] ?? $course->rating,
            'price' => $validated['price'] ?? $course->price,
            'is_subject' => $validated['is_subject'] ?? $course->is_subject,
            'course_keys' => isset($validated['course_keys']) ? json_encode($validated['course_keys']) : $course->course_keys,
            'faqs' => isset($validated['faqs']) ? json_encode($validated['faqs']) : $course->faqs,
        ]);

        if ($request->filled('department_id')) {
            $course->department_id = $validated['department_id'];
        }

        if ($request->filled('program_id')) {
            $course->program_id = $validated['program_id'];
        }

        if ($request->hasFile('image')) {
            if ($course->image) {
                Storage::disk('public')->delete($course->image);
            }
            $course->image = $request->file('image')->store('courses', 'public');
        }

        $course->save();

        return redirect()->route('courses.index')->with('success', 'Course updated successfully!');
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Courses $course)
    {
        if ($course->image) {
            Storage::disk('public')->delete($course->image);
        }

        $course->delete();

        return redirect()->route('courses.index')->with('success', 'Course deleted successfully!');
    }

    public function toggleStatus($id)
    {
        try {
            $course = Courses::findOrFail($id);
            $course->status = !$course->status;
            $course->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
