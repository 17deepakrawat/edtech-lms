<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::with('unit.course')->get();
        $units = Unit::where('status', true)->with('course')->get();

        return Inertia::render('admin/Topics/Index', [
            'topics' => ['data' => $topics],
            'units' => $units,
            'users' => User::all(),
            'can' => [
                'create' => auth()->user()->can('create topics'),
                'edit' => auth()->user()->can('edit topics'),
                'delete' => auth()->user()->can('delete topics'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string|max:255',
        ]);

        Topic::create($validated);

        return redirect()->route('topics.index')->with('success', 'Topic created successfully.');
    }

    public function update(Request $request, Topic $topic)
    {
        $validated = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string|max:255',
        ]);

        $topic->update($validated);

        return redirect()->route('topics.index')->with('success', 'Topic updated successfully.');
    }

    public function destroy(Topic $topic)
    {
        try {
            $topic->delete();
            return redirect()->route('topics.index')->with('success', 'Topic delete successfully.');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete topic: ' . $e->getMessage()], 422);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $topic = Topic::findOrFail($id);
            $topic->status = !$topic->status;
            $topic->save();

            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
