<?php

namespace App\Http\Controllers;

use App\Models\Lead; // <-- make sure you have this model
use App\Models\Leads;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Store the lead info (NO login, NO auth)
        $lead = Leads::create([
            'name'  => $googleUser->getName(),
            'email' => $googleUser->getEmail(),
            'phone' => null, // ask later if needed
        ]);

        return redirect()->route('course'); // or back to frontend with a message
    }
}

