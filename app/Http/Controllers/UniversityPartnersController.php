<?php

namespace App\Http\Controllers;

use App\Models\UniversityPartners;
use App\Models\User;
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
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $validated['image'] = $request->file('image')->store('university_partner', 'public');
        UniversityPartners::create($validated);

        return redirect()->route('universitypartner.index')->with('success', 'University Partner created successfully.');
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
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $validated['image'] = Controller::handleImageUpdate(
            $request,
            'image',
            $universitypartner->image,
            'university_partner'
        );

        $universitypartner->update($validated);

        return redirect()
            ->route('universitypartner.index')
            ->with('success', 'University Partner updated successfully.');
    }

    public function destroy(UniversityPartners $universitypartner)
    {
        if ($universitypartner->image && Storage::disk('public')->exists($universitypartner->image)) {
            Storage::disk('public')->delete($universitypartner->image);
        }

        $universitypartner->delete();
        return redirect()->route('universitypartner.index')->with('success', 'University Partner deleted successfully.');
    }

    public function toggleStatus($id)
    {
        try {
            $partner = UniversityPartners::findOrFail($id);
            $partner->status = !$partner->status;
            $partner->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
