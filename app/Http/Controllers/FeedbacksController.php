<?php

namespace App\Http\Controllers;

use App\Models\Feedbacks;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FeedbacksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/feedback/Index', [
            'feedbacks' => Feedbacks::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/feedback/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated =   $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['required', 'image', 'max:2048'],
        ]);
        $validated['image'] = $request->file('image')->store('feedback', 'public');
        Feedbacks::create($validated);
        return redirect()->route('feedback.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedbacks $feedbacks) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feedbacks $feedback)
    {
        return Inertia::render('admin/feedback/Edit', [
            'feedbacks' => $feedback,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */


    public function update(Request $request, Feedbacks $feedback)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);
        //   dd($request);
        // if ($request->hasFile('image')) {
        //     if ($feedback->image && Storage::disk('public')->exists($feedback->image)) {
        //         Storage::disk('public')->delete($feedback->image);
        //     }
        //     $validated['image'] = $request->file('image')->store('image', 'public');
        // }
        $validated['image'] = Controller::handleImageUpdate(
            $request,
            'image',
            $feedback->image,
            'image'
        );
        $feedback->update($validated);

        return redirect()->route('feedback.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedbacks $feedback)
    {
        $feedback->delete();
        return redirect()->route('feedback.index');
    }

    public function toggleStatus($id)
    {
        try {
            $feedback = Feedbacks::findOrFail($id);
            $feedback->status = !$feedback->status;
            $feedback->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
