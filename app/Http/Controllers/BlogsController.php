<?php

namespace App\Http\Controllers;

use App\Models\BlogCategories;
use App\Models\Blogs;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogsController extends Controller
{
    public function index()
    {
        $blogs = Blogs::with('category:id,name')->get();

        return Inertia::render('admin/blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function create()
    {
        $blogCategories = BlogCategories::where('status', 1)->get(['id', 'name']);

        return Inertia::render('admin/blogs/Create', [
            'blogCategories' => $blogCategories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
            'author_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'content' => 'required|string',
            'faq' => 'required|array|min:1',
            'faq.*.question' => 'required|string|max:255',
            'faq.*.answer' => 'required|string',
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

    public function edit(Blogs $adminblog)
    {
        $blogCategories = BlogCategories::where('status', 1)->get(['id', 'name']);

        return Inertia::render('admin/blogs/Edit', [
            'blog' => $adminblog,
            'blogCategories' => $blogCategories,
        ]);
    }

    public function update(Request $request, $blogId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'author_name' => 'required|string|max:255',
            'content' => 'required|string',
            'faq' => 'required|array|min:1',
            'faq.*.question' => 'required|string|max:255',
            'faq.*.answer' => 'required|string',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'author_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $blog = Blogs::findOrFail($blogId);

        if ($request->hasFile('author_image')) {
            if ($blog->author_image && Storage::disk('public')->exists($blog->author_image)) {
                Storage::disk('public')->delete($blog->author_image);
            }
            $blog->author_image = $request->file('author_image')->store('blogs/author', 'public');
        }

        if ($request->hasFile('image')) {
            if ($blog->image && Storage::disk('public')->exists($blog->image)) {
                Storage::disk('public')->delete($blog->image);
            }
            $blog->image = $request->file('image')->store('blogs', 'public');
        }

        $blog->update([
            'name' => $validated['name'],
            'author_name' => $validated['author_name'],
            'content' => $validated['content'],
            'faq' => json_encode($validated['faq']),
            'blog_category_id' => $validated['blog_category_id'],
        ]);

        return redirect()->route('adminblogs.index')->with('success', 'Blog updated successfully!');
    }

    public function destroy($id)
    {
        $blog = Blogs::findOrFail($id);
    
        if ($blog->author_image && Storage::disk('public')->exists($blog->author_image)) {
            Storage::disk('public')->delete($blog->author_image);
        }
    
        if ($blog->image && Storage::disk('public')->exists($blog->image)) {
            Storage::disk('public')->delete($blog->image);
        }
    
        $blog->delete();
    
        return redirect()->route('adminblogs.index')->with('success', 'Blog deleted successfully!');
    }

    public function toggleStatus($id)
    {
        try {
            $blog = Blogs::findOrFail($id);
            $blog->status = !$blog->status;
            $blog->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
