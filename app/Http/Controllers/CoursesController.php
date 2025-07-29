<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Courses;
use App\Models\Departments;
use App\Models\Programs;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

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
    // Laravel Controller Method
    public function details($slug)
    {
        $course = Courses::with('videos')->where('slug', $slug)->firstOrFail();
        $unit = Course::with([
            'units.videos',
            'units.topics.videos'
        ])->where('slug', $slug)->firstOrFail();
        // dd($course);
        $firstVideo = $course->videos->first();
        $otherCourses = Courses::where('id', '!=', $course->id)
            ->where('program_id', $course->program_id)
            ->where('status', 1)
            ->take(4)
            ->get(['id', 'name', 'slug', 'image', 'rating', 'short_description', 'price']);

        $data = [
            'id' => $course->id,
            'name' => $course->name ?? 'N/A',
            'slug' => $course->slug,
            'short_description' => $course->short_description ?? 'No short description available.',
            'duration' => $course->duration ?? '0h',
            'price' => $course->price ?? 0,
            'rating' => $course->rating ?? 0,
            'image' => $course->image ?? '/build/assets/web-assets/course.jpg',
            'modes' => $course->modes ?? [],
            'content' => $course->content ?? [],
            'course_keys' => $course->course_keys ?? [],
            'faqs' => $course->faqs ?? [],
            'video_name' => $firstVideo->name ?? 'Course Introduction',
            'videoid' => $firstVideo->id ?? 'No Id',
            'video_type' => $firstVideo->video_type ?? 'normal',
            'video_path' => $firstVideo->video_path ?? '/build/assets/web-assets/videoc.mp4',
            'embed_url' => $firstVideo->embed_url ?? 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'video_duration' => $firstVideo->duration ?? '1:00',

        ];
        return Inertia::render('web-pages/course/Details', [
            'course' => $data,
            'other_courses' => $otherCourses ?? [],
            'units' => $unit,

        ]);
    }









    public function courselist()
    {
        $departments = Departments::where('status', 1)
            ->with(['programs.courses' => function ($query) {
                $query->where('status', 1);
            }])
            ->get();

        $maxAmount = Courses::max('price');
        $flatCourses = [];
        $departmentPrograms = [];

        foreach ($departments as $department) {
            $deptName = $department->name;
            $departmentPrograms[$deptName] = [];

            foreach ($department->programs as $program) {
                $progName = $program->name;
                $departmentPrograms[$deptName][] = $progName;

                foreach ($program->courses as $course) {
                    $flatCourses[] = [
                        'id' => $course->id,
                        'name' => $course->name,
                        'image' => $course->image,
                        'rating' => $course->rating,
                        'price' => $course->price,
                        'department' => $deptName,
                        'program' => $progName,
                        'slug' => $course->slug,
                    ];
                }
            }
        }

        return Inertia::render('web-pages/course/Index', [
            'courses' => $flatCourses,
            'departmentPrograms' => $departmentPrograms,
            'maxAmount' => $maxAmount,
        ]);
    }




    public function index()
    {
        $user = auth()->user();
        $courses = Courses::with(['department:id,name', 'program:id,name'])->get()->map(function ($course) {
            return [
                'id' => $course->id,
                'name' => $course->name,
                'department' => $course->department?->name,
                'program' => $course->program?->name,
                'price' => $course->price,
                'image' => $course->image,
                'status' => $course->status,



            ];
        });

        return Inertia::render('admin/courses/Index', [
            'courses' => $courses,
            'users' => User::all(),
            'can' => [
                'create' => auth()->user()->can('create feedback'),
                'edit' => auth()->user()->can('edit feedback'),
                'delete' => auth()->user()->can('delete feedback'),
            ],
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
        $user = auth()->user();
        
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
            'slug' => Str::slug($validated['name']),
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
            'slug' => Str::slug($validated['name'] ?? $course->slug),
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
    public function assignCourse(Request $request, Course $course)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $user = User::findOrFail($request->user_id);

        // ✅ Check if user is mentor
        if (!$user->hasRole('mentor')) {
            return back()->with('error', 'Only mentors can be assigned to courses.');
        }

        // Attach the course
        $course->users()->syncWithoutDetaching([$user->id]);

        return back()->with('success', 'Course assigned to mentor successfully.');
    }
}
