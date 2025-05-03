<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = Banner::all();
        return response()->json($banners);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|string|url',
            'link' => 'required|string|url',
            'status' => 'boolean',
        ]);

        $banner = Banner::create($validated);
        return response()->json($banner, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        return response()->json($banner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'image' => 'string|url',
            'link' => 'string|url',
            'status' => 'boolean',
        ]);

        $banner->update($validated);
        return response()->json($banner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        $banner->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
