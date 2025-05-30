<?php

namespace App\Http\Controllers;

use App\Models\Leads;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->validator)->withInput();
        }

        Leads::create($request->only(['name', 'email', 'phone']));

        return redirect()->back()->with('success', 'Lead created successfully!');
    }
    /**
     * Display the specified resource.
     */
    public function show(Leads $leads)
    {
        $leads= Leads::all();
       return Inertia::render('admin/Leads/Index', [
            'leads' => $leads,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leads $leads)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Leads $leads)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leads $leads)
    {
        //
    }
}
