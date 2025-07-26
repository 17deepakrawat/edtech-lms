<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Models\Course;
use App\Models\Unit;
use App\Models\Topic;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::with(['course', 'unit', 'topic'])->get();
        $courses = Course::where('status', true)->get();

        return Inertia::render('admin/Videos/Index', [
            'videos' => ['data' => $videos],
            'courses' => $courses,
            'users' => User::all(),
            'can' => [
                'create' => auth()->user()->can('create course video'),
                'edit' => auth()->user()->can('edit course video'),
                'delete' => auth()->user()->can('delete course video'),
            ],

        ]);
    }

    public function create()
    {
        $courses = Course::where('status', true)->get();

        return Inertia::render('admin/Videos/Create', [
            'courses' => $courses,
        ]);
    }

    public function edit(Video $video)
    {
        $courses = Course::where('status', true)->get();
        $units = Unit::where('course_id', $video->course_id)->where('status', true)->get();
        $topics = Topic::where('unit_id', $video->unit_id)->where('status', true)->get();

        return Inertia::render('admin/Videos/Edit', [
            'video' => $video,
            'courses' => $courses,
            'units' => $units,
            'topics' => $topics,
        ]);
    }

    public function getUnitsByCourse($courseId)
    {
        try {
            $units = Unit::where('course_id', $courseId)
                ->where('status', true)
                ->get(['id', 'title']);

            return response()->json($units);
        } catch (\Exception $e) {
            Log::error('Failed to fetch units', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch units'], 500);
        }
    }

    public function getTopicsByUnit($unitId)
    {
        try {
            $topics = Topic::where('unit_id', $unitId)
                ->where('status', true)
                ->get(['id', 'name']);

            return response()->json($topics);
        } catch (\Exception $e) {
            Log::error('Failed to fetch topics', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch topics'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'course_id' => 'nullable|exists:courses,id',
                'unit_id' => 'nullable|exists:units,id',
                'topic_id' => 'nullable|exists:topics,id',
                'name' => 'required|string|max:255',
                'video_type' => 'required|in:local,embed',
                'video_path' => 'nullable|file|mimes:mp4,mov,avi|max:102400',
                'embed_url' => [
                    'nullable',
                    'string',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->video_type === 'embed' && empty($value)) {
                            $fail('The ' . $attribute . ' is required for embed videos.');
                        }

                        if ($value && !preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/', $value)) {
                            $fail('The ' . $attribute . ' must be a valid YouTube embed URL.');
                        }
                    }
                ],
                'duration' => 'required|string|regex:/^([0-9]{2}:)?[0-9]{2}:[0-9]{2}$/',
            ], [
                'video_path.mimes' => 'Only mp4, mov, avi formats are allowed.',
                'embed_url.required_if' => 'Please provide a valid embed URL.',
                'duration.regex' => 'Duration must be in format HH:MM:SS or MM:SS.',
            ]);

            // Assign optional foreign keys if filled
            $validated['course_id'] = $request->filled('course_id') ? $request->course_id : null;
            $validated['unit_id'] = $request->filled('unit_id') ? $request->unit_id : null;
            $validated['topic_id'] = $request->filled('topic_id') ? $request->topic_id : null;

            // File or embed video handling
            if ($request->video_type === 'local') {
                if ($request->hasFile('video_path')) {
                    $file = $request->file('video_path');
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $path = $file->storeAs('videos', $filename, 'public');

                    if (!$path) {
                        throw new \Exception('Failed to store the video file.');
                    }

                    $validated['video_path'] = $path;
                    $validated['embed_url'] = null;
                } else {
                    throw new \Exception('Video file is required for local video type.');
                }
            } else {
                $validated['video_path'] = null;
                $validated['embed_url'] = $request->embed_url;
            }

            $video = Video::create($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Video created successfully.',
                    'video' => $video->load(['course', 'unit', 'topic']),
                ]);
            }

            return redirect()->route('videos.index')->with('toast', [
                'type' => 'success',
                'message' => 'Video created successfully.',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $message = collect($e->errors())->first()[0];

            return redirect()->back()
                ->withInput()
                ->with('toast', [
                    'type' => 'error',
                    'message' => $message,
                ])
                ->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('Video store error', ['error' => $e->getMessage()]);

            return redirect()->back()
                ->withInput()
                ->with('toast', [
                    'type' => 'error',
                    'message' => 'Failed to create video: ' . $e->getMessage(),
                ]);
        }
    }


    public function update(Request $request, Video $video)
    {
        try {
            $validated = $request->validate([
                'course_id' => 'nullable|exists:courses,id',
                'unit_id' => 'nullable|exists:units,id',
                'topic_id' => 'nullable|exists:topics,id',
                'name' => 'required|string|max:255',
                'video_type' => 'required|in:local,embed',
                'video_path' => 'nullable|file|mimes:mp4,mov,avi|max:102400',
                'embed_url' => [
                    'nullable',
                    'required_if:video_type,embed',
                    'string',
                    function ($attribute, $value, $fail) {
                        if ($value && !preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/', $value)) {
                            $fail('The ' . $attribute . ' must be a valid YouTube embed URL.');
                        }
                    }
                ],
                'duration' => 'required|string|regex:/^([0-9]{2}:)?[0-9]{2}:[0-9]{2}$/',
            ], [
                'duration.regex' => 'Duration must be in format HH:MM:SS or MM:SS',
            ]);

            if ($request->video_type === 'local' && $request->hasFile('video_path')) {
                if ($video->video_path && Storage::disk('public')->exists($video->video_path)) {
                    Storage::disk('public')->delete($video->video_path);
                }

                $file = $request->file('video_path');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('videos', $filename, 'public');

                $validated['video_path'] = $path;
                // Clear embed_url because it's local video
                $validated['embed_url'] = null;
            } else if ($request->video_type === 'embed') {
                // If embed video type, clear video_path if exists
                if ($video->video_path && Storage::disk('public')->exists($video->video_path)) {
                    Storage::disk('public')->delete($video->video_path);
                }
                $validated['video_path'] = null;
            }

            // Handle optional relationships
            if (!$request->has('course_id') || $request->course_id === '') {
                $validated['course_id'] = null;
            }
            if (!$request->has('unit_id') || $request->unit_id === '') {
                $validated['unit_id'] = null;
            }
            if (!$request->has('topic_id') || $request->topic_id === '') {
                $validated['topic_id'] = null;
            }

            $video->update($validated);

            return redirect()->route('videos.index')->with('toast', [
                'type' => 'success',
                'message' => 'Video updated successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Video update failed', ['error' => $e->getMessage()]);
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Failed to update video: ' . $e->getMessage(),
            ]);
        }
    }

    public function destroy(Video $video)
    {
        try {
            if ($video->video_path && Storage::disk('public')->exists($video->video_path)) {
                Storage::disk('public')->delete($video->video_path);
            }

            $video->delete();

            return redirect()->route('videos.index')->with('toast', [
                'type' => 'success',
                'message' => 'Video deleted successfully.',
            ]);
        } catch (\Exception $e) {
            Log::error('Video delete failed', ['error' => $e->getMessage()]);
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Failed to delete video: ' . $e->getMessage(),
            ]);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $video = Video::findOrFail($id);
            $video->status = !$video->status;
            $video->save();

            return redirect()->back()->with('toast', [
                'type' => 'success',
                'message' => 'Video status updated.',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('toast', [
                'type' => 'error',
                'message' => 'Failed to update status: ' . $e->getMessage(),
            ]);
        }
    }
}
