<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ✅ Correct facade
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class StudentAuthController extends Controller
{
    public function showLoginForm(): Response
    {
        return Inertia::render('auth/student-login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
            // dd('helo');

        if (Auth::guard('student')->attempt($credentials)) { 
            // dd(session());          
            $request->session()->regenerate();  
            // dd(Auth::guard('student')->user()->name);        
            // return redirect()->route('student.dashboard.index');
             return redirect()->intended(route('student.dashboard.index', absolute: false));
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
