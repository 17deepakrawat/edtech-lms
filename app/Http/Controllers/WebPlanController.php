<?php

namespace App\Http\Controllers;

use App\Models\WebPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WebPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $plans = WebPlan::all();

        return Inertia::render('admin/plans/Index', [
            'plans' => $plans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
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
            'status' => ['nullable', 'boolean'],
        ]);

        $validated['status'] = $request->boolean('status');

        WebPlan::create($validated);

        return redirect()->route('websiteplan.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WebPlan $plan): Response
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
        try {
            $plan->delete();

            return redirect()->route('admin.plans.index')
                ->with('success', 'Plan deleted successfully.');
        } catch (\Throwable $e) {
            return redirect()->route('admin.plans.index')
                ->with('error', 'Failed to delete plan.');
        }
    }

    /**
     * Toggle the status of the specified resource.
     */
    public function toggleStatus(WebPlan $plan)
    {
        try {
            $plan->status = !$plan->status;
            $plan->save();

            return redirect()->back()
                ->with('success', 'Plan status updated successfully.');
        } catch (\Throwable $e) {
            return redirect()->back()
                ->with('error', 'Failed to update plan status.');
        }
    }
}
