<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MentorController extends Controller
{
    public function index()
    {

        // $mentors = User::role('mentor')->get();
        // $mentors = User::role('mentor')->with('courses')->get();
        $mentors = User::role('mentor')->with(['courses' => function ($q) {
            $q->select('courses.id', 'name'); // Include pivot
        }])->get();

        // Add fee from pivot
        $mentors->each(function ($mentor) {
            foreach ($mentor->courses as $course) {
                $course->fee = $course->pivot->fee ?? 0; // Add fee manually
            }
        });
        // dd($mentors);
        $courses = Course::all();

        return Inertia::render('admin/rolepermision/mentor/Index', [
            'mentor' => $mentors,
            'courses' => $courses,
        ]);
    }



    // public function assignCourse(Request $request, User $user)
    // {
    //     // Validate input
    //     $validated = $request->validate([
    //         'courses' => 'required|array|min:1',
    //         'courses.*.id' => 'required|exists:courses,id',
    //         'courses.*.fee' => 'nullable|numeric|min:0',
    //     ]);

    //     // Only mentors can be assigned
    //     if (!$user->hasRole('mentor')) {
    //         return redirect()->back()->with('msg', 'Only mentors can be assigned courses');
    //     }

    //     // Prepare data for pivot with optional fee
    //     $syncData = [];
    //     foreach ($validated['courses'] as $course) {
    //         $syncData[$course['id']] = [
    //             'fee' => $course['fee'] ?? null, // or set default to 0 if you prefer
    //         ];
    //     }

    //     // Sync without removing old ones
    //     $user->courses()->syncWithoutDetaching($syncData);

    //     return redirect()->back()->with('success', 'Course(s) assigned successfully!');
    // }
    public function assignCourse(Request $request, User $user)
    {
        $validated = $request->validate([
            'courses' => 'array',
            'courses.*.id' => 'required|exists:courses,id',
            'courses.*.fee' => 'required|numeric|min:0',
            'removed' => 'array',
            'removed.*' => 'exists:courses,id',
        ]);

        $syncData = collect($validated['courses'])->mapWithKeys(fn($c) => [
            $c['id'] => ['fee' => $c['fee']]
        ]);

        $user->courses()->syncWithoutDetaching($syncData);

        if (!empty($validated['removed'])) {
            $user->courses()->detach($validated['removed']);
        }

        return redirect()->back()->with('success', 'Courses updated successfully!');
    }
}
