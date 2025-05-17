<?php

namespace App\Http\Controllers;

use App\Models\BlogCategories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function toggleStatus($id)
    {
        try {
            $blogCategory = BlogCategories::findOrFail($id);
            $blogCategory->status = !$blogCategory->status;
            $blogCategory->save();
            return redirect()->back()->with('success', 'Status updated Successfull!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }

    public function index()
    {
        return Inertia::render('admin/blogcategories/Index', [
            'blogCategory' => BlogCategories::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/blogcategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        BlogCategories::create($validated);
        return redirect()->route('blogcategories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogCategories $blogCategories)
    {
        //
    }
    public function edit(BlogCategories $blogcategory)
    {
        return Inertia::render('admin/blogcategories/Edit', [
            'blogCategory' => $blogcategory, // ✅ Directly pass model
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogCategories $blogcategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $blogcategory->update($validated);

        return redirect()->route('blogcategories.index')->with('success', 'Blog category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blogCategories = BlogCategories::findOrFail($id);
        $blogCategories->delete();

        return;
    }
}
