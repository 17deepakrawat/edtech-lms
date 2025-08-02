<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Weoffers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class WeoffersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/weoffer/Index', [
            'weoffers' => Weoffers::all(),
            
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/weoffer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['string'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $validated['image'] = $request->file('image')->store('weoffer', 'public');

        Weoffers::create($validated);

        return redirect()->route('weoffers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Weoffers $weoffers) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Weoffers $weoffer)
    {
        return Inertia::render('admin/weoffer/Edit', [
            'weoffers' => $weoffer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Weoffers $weoffer)
    {
        $validated = $request->validate([
            'title' => ['string', 'max:255'],
            'description' => ['string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $validated['image'] = Controller::handleImageUpdate(
            $request,
            'image',
            $weoffer->image,
            'weoffer'
        );
        $weoffer->update($validated);

        return redirect()
            ->route('weoffers.index')
            ->with('success', 'University Partner updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Weoffers $weoffer)
    {
        $weoffer->delete();
        return redirect()->route('weoffers.index');
    }

    public function toggleStatus($id)
    {
        try {
            $weoffer = Weoffers::findOrFail($id);
            $weoffer->status = !$weoffer->status;
            $weoffer->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
