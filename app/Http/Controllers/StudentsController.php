<?php

namespace App\Http\Controllers;

use App\Mail\StudentWelcomeMail;
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
    public function studentDashboard()
    {
        return Inertia::render('student/dashboard/Index');
    }
    public function studentlogout(Request $request)
    {

        Auth::guard('student')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
