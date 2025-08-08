<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ✅ Correct facade
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Crypt;

class StudentAuthController extends Controller
{
    public function showLoginForm(): Response
    {
        return Inertia::render('auth/student-login');
    }

    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => ['required', 'email'],
    //         'password' => ['required'],
    //     ]);
    //         // dd('helo');

    //     if (Auth::guard('student')->attempt($credentials)) { 
    //         // dd(session());          
    //         $request->session()->regenerate();  
    //         // dd(Auth::guard('student')->user()->name);        
    //         // return redirect()->route('student.dashboard.index');
    //          return redirect()->intended(route('student.dashboard.index', absolute: false));
    //     }

    //     throw ValidationException::withMessages([
    //         'email' => 'Invalid email or password.',
    //     ]);
    // }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $student = students::where('email', $credentials['email'])->first();

        if ($student) {
            try {
                $decryptedPassword = Crypt::decrypt($student->password);

                if ($credentials['password'] === $decryptedPassword) {
                    // Manually log in the user
                    Auth::guard('student')->login($student);
                    $request->session()->regenerate();

                    // Store full student data in session
                    session(['student_data' => $student->toArray()]);

                    return redirect()->intended(route('student.dashboard.index', absolute: false));
                }
            } catch (\Exception $e) {
                // Decryption error
            }
        }

        throw ValidationException::withMessages([
            'email' => 'Invalid email or password.',
        ]);
    }
    public function logout(Request $request)
    {
        Auth::guard('student')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/auth/student-login');
    }
}
