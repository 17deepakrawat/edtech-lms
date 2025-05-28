<?php

namespace App\Http\Controllers;

use App\Models\WebPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WebPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = WebPlan::all();

        // If the user is authenticated and is an admin, show the admin view
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            return Inertia::render('admin/plans/Index', [
                'plans' => $plans,
            ]);
        }

        // Otherwise show the public view
        return Inertia::render('web-pages/Plans', [
            'plans' => $plans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/plans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'frequency' => ['required', 'string', 'in:monthly,yearly'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string'],
            'disabled_features' => ['nullable', 'array'],
            'disabled_features.*' => ['string'],            
        ]);


        WebPlan::create($validated);

        return redirect()->route('plans.index')->with('success', 'Plans created successfully.');;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WebPlan $plan)
    {
        return Inertia::render('admin/plans/Edit', [
            'plan' => $plan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WebPlan $plan)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'frequency' => ['required', 'string', 'in:monthly,yearly'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string'],
            'disabled_features' => ['nullable', 'array'],
            'disabled_features.*' => ['string'],
            'status' => ['nullable', 'boolean'],
        ]);

        $validated['status'] = $request->boolean('status', $plan->status);

        $plan->update($validated);

        return redirect()->route('plans.index')
            ->with('success', 'Plan updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WebPlan $plan)
    {
        $plan->delete();
        return redirect()->route('plans.index')->with('success', 'Plan deleted successfully.');
    }

    /**
     * Toggle the status of the specified resource.
     */
    public function toggleStatus($id)
    {
        try {
            $plan = WebPlan::findOrFail($id);
            $plan->status = !$plan->status;
            $plan->save();
            return redirect()->route('plans.index')->width('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
