<?php

namespace App\Http\Controllers;

use App\Mail\StudentWelcomeMail;
use App\Models\Course;
use App\Models\Courses;
use App\Models\Enrolls;
use Illuminate\Support\Facades\Mail;
use App\Models\students;
// use Illuminate\Container\Attributes\Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

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
    // public function store(Request $request)
    // {
    //     try {
    //         $validated = $request->validate([
    //             'first_name'   => 'required|string|max:255',
    //             'middle_name'  => 'nullable|string|max:255',
    //             'last_name'    => 'required|string|max:255',
    //             'email'        => 'required|email|unique:users,email',
    //             'dob'          => 'required|date',
    //             'mobile'       => 'required|string|max:15',
    //             'country'      => 'nullable|string|max:100',
    //             'state'        => 'nullable|string|max:100',
    //             'city'         => 'nullable|string|max:100',
    //             'gender'       => 'nullable|in:male,female,other',
    //             'password'     => 'required|string|min:8',
    //             're_password'  => 'required|string|min:8|same:password',
    //             'photo'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         ]);
    //         if ($request->hasFile('photo')) {
    //             $image = $request->file('photo');
    //             $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
    //             $image->move(public_path('uploads/students'), $imageName);
    //             $validated['photo'] = 'uploads/students/' . $imageName;
    //         }
    //         $rawPassword = $validated['password'];
    //         $validated['password'] = Crypt::encrypt($validated['password']);
    //         unset($validated['re_password']);
    //         $user = students::create($validated);
    //         $user->assignRole('student');
    //         Auth::login($user);
    //         session(['student_data' => $user->toArray()]);
    //         Mail::to($user->email)->send(new StudentWelcomeMail($user->toArray(), $rawPassword));
    //         return redirect()->back()->with('success', 'User created successfully');
    //     } catch (\Exception $e) {
    //         Log::error('Student Creation Error: ' . $e->getMessage());
    //         return back()->withInput()->with('error', 'Something went wrong. Please try again.');
    //     }
    // }
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'first_name'   => 'required|string|max:255',
                'middle_name'  => 'nullable|string|max:255',
                'last_name'    => 'required|string|max:255',
                'email'        => 'required|email|max:255|unique:students,email',
                'dob'          => 'required|date',
                'mobile'       => 'required|string|max:15',
                'country'      => 'nullable|string|max:100',
                'state'        => 'nullable|string|max:100',
                'city'         => 'nullable|string|max:100',
                'gender'       => 'nullable|in:male,female,other',
                'password'     => 'required|string|min:8',
                're_password'  => 'required|string|min:8|same:password',
                'photo'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $rawPassword = $validated['password'];
            $encryptedPassword = Crypt::encrypt($rawPassword);
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/students'), $imageName);
                $validated['photo'] = 'uploads/students/' . $imageName;
            }
            $validated['password'] = $encryptedPassword;
            unset($validated['re_password']);
            $user = students::create($validated);
            $user->assignRole('student');
            Auth::login($user);
            session(['student_data' => $user->toArray()]);
            Mail::to($user->email)->send(new StudentWelcomeMail($user->toArray(), $rawPassword));
            return redirect()->back()->with('success', 'User created successfully and welcome email sent.');
        } catch (\Exception $e) {
            Log::error('Student Creation Error: ' . $e->getMessage());
            return back()->withInput()->with('error', 'A student with this email and password already exists.');
        }
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

        return Inertia::render('admin/students/Edit', [
            'student' => $student,
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
            'email'        => 'sometimes|required|email|unique:students,email,' . $students->id,
            'password'     => 'nullable|string|min:6',
            'dob'          => 'sometimes|required|date',
            'mobile'       => 'sometimes|required|string|max:15',
            'country'      => 'nullable|string|max:100',
            'state'        => 'nullable|string|max:100',
            'city'         => 'nullable|string|max:100',
            'gender'       => 'nullable|in:male,female,other',
        ]);

        // Encrypt password only if it is present
        if (!empty($validated['password'])) {
            $validated['password'] = Crypt::encrypt($validated['password']);
        } else {
            unset($validated['password']); // Don't update if not passed
        }

        $students->update($validated);

        return redirect()->route('students.index')->with('success', 'User updated successfully');
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
    // public function studentDashboard()
    // {
    //     // Get authenticated student from 'student' guard
    //     $student = Auth::guard('student')->user();

    //     if (!$student) {
    //         return redirect()->route('login');
    //     }

    //     // Eager load enrollments with related courses, filtering only paid enrollments
    //     $enrolls = Enrolls::with('course')
    //         ->where('student_id', $student->id)
    //         ->where('status', 'paid')
    //         ->get();

    //     // Agar koi paid enrollments nahi hain toh redirect
    //     if ($enrolls->isEmpty()) {
    //         return redirect()->route('webHome');
    //     }

    //     // Prepare student info for dashboard
    //     $studentDashboard = [
    //         'name' => trim("{$student->first_name} {$student->middle_name} {$student->last_name}"),
    //         'email' => $student->email,
    //         'dob' => $student->dob,
    //         'phone_no' => $student->mobile,
    //         'address' => trim("{$student->city} {$student->state} {$student->country}"),
    //         'user_profile_pic' => $student->photo ?? '',
    //     ];

    //     // Extract courses directly from enrollments to avoid extra query
    //     $courses = $enrolls->pluck('course')->filter()->map(function ($course) {
    //         return $course->getAttributes();
    //     });
    //     // dd($courses);
    //     foreach ($courses as $course) {
    //         $mycourse = [
    //             'course_name' => $course['name'],
    //             'rating' =>    $course['rating'],
    //             'image' => $course['image'],
    //             'duration' => $course['duration'],
    //             'id' =>  $course['slug'],
    //         ];
    //     };

    //     // $related_course= Course::where('program_id','!=',$courses['program_id'])->get();
    //     // Return data to Inertia view
    //     return Inertia::render('student/dashboard/Index', [
    //         'studentDashboard' => $studentDashboard,
    //         'courses' => $courses,
    //     ]);
    // }
    // public function studentDashboard()
    // {
    //     $student = Auth::guard('student')->user();

    //     if (!$student) {
    //         return redirect()->route('login');
    //     }

    //     // Fetch all paid enrollments with course info
    //     $enrolls = Enrolls::with(['course:id,name,rating,image,duration,slug,program_id'])
    //         ->where('student_id', $student->id)
    //         ->where('status', 'paid')
    //         ->get();

    //     if ($enrolls->isEmpty()) {
    //         return redirect()->route('webHome');
    //     }
    //     $student_birth_date = Carbon::parse($student->dob)
    //         ->timezone('Asia/Kolkata')
    //         ->format('d M Y');
    //     // Student profile data
    //     $studentDashboard = [
    //         'name'           => trim("{$student->first_name} {$student->middle_name} {$student->last_name}"),
    //         'email'          => $student->email,
    //         'dob'            => $student_birth_date,
    //         'phone_no'       => $student->mobile,
    //         'address'        => trim("{$student->city} {$student->state} {$student->country}"),
    //         'user_profile_pic' => $student->photo ?? '',
    //     ];

    //     // Map enrolled courses
    //     $courses = $enrolls->pluck('course')->filter()->map(function ($course) {
    //         return [
    //             'course_name' => $course->name,
    //             'rating'      => $course->rating,
    //             'image'       => $course->image,
    //             'duration'    => $course->duration,
    //             'slug'        => $course->slug,
    //             'program_id'  => $course->program_id,
    //         ];
    //     })->values();

    //     // Get related courses (same program but not already enrolled in)
    //     $relatedCourses = collect();
    //     if ($courses->isNotEmpty()) {
    //         $programIds = $courses->pluck('program_id')->unique();
    //         $enrolledCourseSlugs = $courses->pluck('slug');

    //         $relatedCourses = Course::select('id', 'name', 'rating', 'image', 'duration', 'slug')
    //             ->whereIn('program_id', $programIds)
    //             ->whereNotIn('slug', $enrolledCourseSlugs)
    //             ->limit(5)
    //             ->get();
    //     }
    //     dd($relatedCourses);
    //     return Inertia::render('student/dashboard/Index', [
    //         'student_info'   => $studentDashboard,
    //         'mycourses'      => $courses,
    //         'relatedCourses' => $relatedCourses,
    //     ]);
    // }
    public function studentDashboard()
    {
        $student = Auth::guard('student')->user();

        if (!$student) {
            return redirect()->route('login');
        }

        // Fetch paid enrollments with course info
        $enrolls = Enrolls::with(['course:id,name,rating,image,duration,slug,program_id,department_id'])
            ->where('student_id', $student->id)
            ->where('status', 'paid')
            ->get();

        if ($enrolls->isEmpty()) {
            return redirect()->route('webHome');
        }

        // Handle DOB safely
        $student_birth_date = $student->dob
            ? Carbon::parse($student->dob)->timezone('Asia/Kolkata')->format('d M Y')
            : null;

        // Student profile
        $studentDashboard = [
            'name'             => trim("{$student->first_name} {$student->middle_name} {$student->last_name}"),
            'email'            => $student->email,
            'dob'              => $student_birth_date,
            'phone_no'         => $student->mobile,
            'address'          => trim("{$student->city} {$student->state} {$student->country}"),
            'user_profile_pic' => $student->photo ?? '',
        ];

        // Map enrolled courses
        $courses = $enrolls->pluck('course')->filter()->map(function ($course) {
            return [
                'course_name'  => $course->name,
                'rating'       => $course->rating,
                'image'        => $course->image,
                'duration'     => $course->duration,
                'slug'         => $course->slug,
                'program_id'   => $course->program_id,
                'department_id' => $course->department_id,
            ];
        })->values();

        // Related courses → All other programs and departments
        $relatedCourses = collect();
        if ($courses->isNotEmpty()) {
            $enrolledCourseSlugs = $courses->pluck('slug');

            $relatedCourses = Course::select('id', 'name', 'rating', 'image', 'duration', 'slug', 'short_description', 'price')
                ->whereNotIn('slug', $enrolledCourseSlugs)
                ->orderBy('rating', 'desc') // Optional: show top-rated first
                ->get();
        }
        // dd($relatedCourses);
        return Inertia::render('student/dashboard/Index', [
            'student_info'   => $studentDashboard,
            'mycourses'      => $courses,
            'relatedCourses' => $relatedCourses,
        ]);
    }




    public function studentlogout(Request $request)
    {

        Auth::guard('student')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
    public function updateprofile(Request $request)
    {
        $request->validate([
            'profile_img' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        $student = Auth::guard('student')->user();
        if ($request->hasFile('profile_img')) {
            $imagePath = $request->file('profile_img')->store('student_profile', 'public');
            students::where('id', $student->id)->update([
                'photo' => $imagePath,
            ]);
        }

        return back()->with('success', 'Profile picture updated successfully!');
    }
}
