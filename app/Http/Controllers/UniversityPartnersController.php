<?php

namespace App\Http\Controllers;

use App\Models\UniversityPartners;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UniversityPartnersController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/universitypartner/Index', [
            'universitypartners' => UniversityPartners::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/universitypartner/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'link' => ['nullable', 'url', 'max:255'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $validated['image'] = $request->file('image')->store('UniversityPartners', 'public');

        UniversityPartners::create($validated);

        return redirect()->route('universitypartner.index')->with('success', 'University Partner created successfully.');
    }

    public function show(UniversityPartners $universityPartners)
    {
        //
    }

    public function edit(UniversityPartners $universitypartner)
    {
        return Inertia::render('admin/universitypartner/Edit', [
            'universityPartners' => $universitypartner,
        ]);
    }


    public function update(Request $request, UniversityPartners $universitypartner)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'link' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            if ($universitypartner->image && Storage::disk('public')->exists($universitypartner->image)) {
                Storage::disk('public')->delete($universitypartner->image);
            }
            $validated['image'] = $request->file('image')->store('university_partner', 'public');
        } else {
            unset($validated['image']);
        }

        $universitypartner->update($validated);

        return redirect()
            ->route('universitypartner.index')
            ->with('success', 'University Partner updated successfully.');
    }


    public function destroy(UniversityPartners $universitypartner)
    {
        $universitypartner->delete();
        return redirect()->route('universitypartner.index');
    }
}
