<?php

namespace App\Http\Controllers;

use App\Models\Banners;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
class BannersController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/banner/Index', [
            'banners' => Banners::all(),
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
    
        if ($request->hasFile('bannerimage')) {            
            if ($banner->bannerimage && Storage::disk('public')->exists($banner->bannerimage)) {
                Storage::disk('public')->delete($banner->bannerimage);
            }    
            $validated['bannerimage'] = $request->file('bannerimage')->store('banners', 'public');
        } else {
            unset($validated['bannerimage']);
        }
    
        $banner->update($validated);
    
        return redirect()->route('banner.index');
    }
    
    
    public function destroy(Banners $banner)
    {
        $banner->delete();

        return redirect()->route('banner.index');
    }
}
