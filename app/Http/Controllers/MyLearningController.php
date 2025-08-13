<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrolls;
use App\Models\Video;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MyLearningController extends Controller
{
    public function index(Request $request)
    {
        $studentId = Auth::guard('student')->user()->id;
        $enrolls = Enrolls::with(['course'])
            ->where('student_id', $studentId)
            ->where('status', 'paid')
            ->get()
            ->pluck('course');
        $coursesinfo = $enrolls->filter()->map(function ($course) {
            return [
                'id' => $course->id,
                'image' => $course->image,
                'name' => $course->name,
                'short_description' => $course->short_description,
                'slug' => $course->slug,
                'progress' => $course->progress ?? 0, // optional
            ];
        })->values();
        return Inertia::render('student/mylearning/Index', [
            'coursesinfo' => $coursesinfo,
        ]);
    }
    public function coursevideo(Video $video, Response $response, $slug)
    {
        // dd($slug);
        $course = Course::where('slug', $slug)->first()->getAttributes();
        // dd($course);
        return Inertia::render('student/mylearning/CoursePlayer', [
            'course_overview' => $course,
        ]);
    }
}
