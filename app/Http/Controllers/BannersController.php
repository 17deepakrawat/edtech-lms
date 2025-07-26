<?php

namespace App\Http\Controllers;

use App\Models\Banners;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannersController extends Controller
{
    public function show() {}

    public function index()
    {      
        
        return Inertia::render('admin/banner/Index', [
            'banners' => Banners::all(),
            'users' => User::all(),
            'can' => [
                'create' => auth()->user()->can('create banner'),
                'edit' => auth()->user()->can('edit banner'),
                'delete' => auth()->user()->can('delete banner'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/banner/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'bannerimage' => ['required', 'image', 'max:2048'],
        ]);

        // Store image if needed
        $validated['bannerimage'] = $request->file('bannerimage')->store('banners', 'public');

        Banners::create($validated);

        return redirect()->route('banner.index');
    }

    public function edit(Banners $banner)
    {
        return Inertia::render('admin/banner/Edit', [
            'banner' => $banner,
        ]);
    }

    public function update(Request $request, Banners $banner)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'bannerimage' => ['nullable', 'image', 'max:2048'],
        ]);
        $validated['bannerimage'] = Controller::handleImageUpdate(
            $request,
            'bannerimage',
            $banner->bannerimage,
            'banners'
        );

        $banner->update($validated);

        return redirect()->route('banner.index');
    }

    public function destroy(Banners $banner)
    {
        $banner->delete();

        return redirect()->route('banner.index');
    }

    public function toggleStatus($id)
    {
        try {
            $banner = Banners::findOrFail($id);
            $banner->status = !$banner->status;
            $banner->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
