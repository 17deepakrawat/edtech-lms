<?php

namespace App\Http\Controllers;

use App\Models\BlogCategories;
use App\Models\Blogs;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
    public function category($slug)
    {
        // Fetch category and its active blogs
        $blogCategory = BlogCategories::where('slug', $slug)
            ->where('status', 1)
            ->with(['blogs' => function ($query) {
                $query->where('status', 1)->with('category');
            }])
            ->firstOrFail();

        return Inertia::render('web-pages/blogs/Index', [
            'category' => [
                'slug' => $blogCategory->slug,
                'name' => $blogCategory->name,
            ],
            'blogs' => $blogCategory->blogs->map(function ($blog) use ($blogCategory) {
                return [
                    'id' => $blog->id,
                    'name' => $blog->name ?? 'No Title', // consistent naming
                    'slug' => $blog->slug ?? 'no-title',
                    'excerpt' => $blog->excerpt ?? '',
                    'content' => $blog->content ?? 'No Content',
                    'image' => $blog->image ?? '',
                    'created_at' => $blog->created_at ? $blog->created_at->toDateString() : null,
                    'author_name' => $blog->author_name ?? 'Unknown Author',
                    'author_image' => $blog->author_image ?? '',
                    'category' => $blog->category ? $blog->category->name : $blogCategory->name,
                ];
            }),
        ]);
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

        BlogCategories::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']), // generate slug from name
        ]);

        return redirect()->route('blogcategories.index')->with('success', 'Category created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show()
    {
        $blogCategories = BlogCategories::where('status', 1)
            ->with(['blogs' => function ($query) {
                $query->where('status', 1)->with('category');
            }])
            ->get()
            ->map(function ($category) {
                return [
                    'slug' => $category->slug, // ✅ Include the slug here
                    'blogs' => $category->blogs->map(function ($blog) use ($category) {
                        return [
                            'id' => $blog->id,
                            'name' => $blog->name ?? 'No Title', // change 'title' to 'name' to match frontend
                            'slug' => $blog->slug ?? 'no-title',
                            'image' => $blog->image ?? '',
                            'created_at' => $blog->created_at ? $blog->created_at->toDateString() : null,
                            'author_name' => $blog->author_name ?? 'Unknown Author',
                            'author_image' => $blog->author_image ?? '',
                            'category' => $category->name, // category name
                        ];
                    })->values(),
                ];
            });

        $allBlogs = Blogs::where('status', 1)
            ->with('category')
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'name' => $blog->name ?? 'No Title', // consistent with frontend
                    'slug' => $blog->slug ?? 'no-title',
                    'short_description' => $blog->short_description ?? 'No Content',
                    'image' => $blog->image ?? '',
                    'created_at' => $blog->created_at ? $blog->created_at->toDateString() : null,
                    'author_name' => $blog->author_name ?? 'Unknown Author',
                    'author_image' => $blog->author_image ?? '',
                    'category' => $blog->category ? $blog->category->name : 'Uncategorized',
                ];
            });

        return Inertia::render('web-pages/blogs/Blogs', [
            'categories' => $blogCategories,
            'slidblogs' => $allBlogs,
        ]);
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

        $blogcategory->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']), // generate slug from name
        ]);

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
