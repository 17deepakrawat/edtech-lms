<?php

namespace App\Http\Controllers;

use App\Models\BlogCategories;
use App\Models\Blogs;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/blogs/Index', [
            'blogs' => Blogs::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $blogCategories = BlogCategories::where('status', 1)->get(['id', 'name']);

        return Inertia::render('admin/blogs/Create', [
            'blogCategories' => $blogCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
            'author_image' => 'required|image|max:2048',
            'image' => 'required|image|max:2048',
            'content' => 'required|string',
            'faq' => 'required|array|min:1',
            'faq.*.question' => 'required|string|max:255',
            'faq.*.answer' => 'required|string|max:1000',
            'blog_category_id' => 'required|exists:blog_categories,id',
        ]);

        $authorImagePath = $request->file('author_image')->store('blogs/author', 'public');
        $imagePath = $request->file('image')->store('blogs', 'public');

        Blogs::create([
            'name' => $validated['name'],
            'author_name' => $validated['author_name'],
            'author_image' => $authorImagePath,
            'image' => $imagePath,
            'content' => $validated['content'],
            'faq' => json_encode($validated['faq']),
            'blog_category_id' => $validated['blog_category_id'],
        ]);

        return redirect()->route('adminblogs.index')->with('success', 'Blog created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blogs $blogs)
    {
        //
    }

    public function edit(Blogs $blogs)
    {
        $blogCategories = BlogCategories::where('status', 1)->get(['id', 'name']);
        return Inertia::render('admin/blogs/Edit', [
            'blog' => $blogs,
            'blogCategories' => $blogCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blogs $blogs)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
            'author_image' => 'nullable|image|max:2048',
            'image' => 'nullable|image|max:2048',
            'content' => 'required|string',
            'faq' => 'required|array|min:1',
            'faq.*.question' => 'required|string|max:255',
            'faq.*.answer' => 'required|string|max:1000',
            'blog_category_id' => 'required|exists:blog_categories,id',
        ]);

        if ($request->hasFile('author_image')) {
            Storage::disk('public')->delete($blogs->author_image);
            $blogs->author_image = $request->file('author_image')->store('blogs/author', 'public');
        }

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($blogs->image);
            $blogs->image = $request->file('image')->store('blogs', 'public');
        }

        $blogs->update([
            'name' => $validated['name'],
            'author_name' => $validated['author_name'],
            'author_image' => $blogs->author_image,
            'image' => $blogs->image,
            'content' => $validated['content'],
            'faq' => json_encode($validated['faq']),
            'blog_category_id' => $validated['blog_category_id'],
        ]);

        return redirect()->route('adminblogs.index')->with('success', 'Blog updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blogs $blogs)
    {
        if ($blogs->author_image) {
            Storage::disk('public')->delete($blogs->author_image);
        }

        if ($blogs->image) {
            Storage::disk('public')->delete($blogs->image);
        }

        $blogs->delete();

        return redirect()->route('adminblogs.index')->with('success', 'Blog deleted successfully!');
    }
}
