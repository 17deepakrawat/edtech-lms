<?php

namespace App\Http\Controllers;

use App\Models\PaymentGateways;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class PaymentGatewaysController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd('hello');
        $payment = PaymentGateways::all();
        return Inertia::render('admin/paymentgateway/Index', [
            'payment' => $payment,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('admin/paymentgateway/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'mode'         => 'required|in:sandbox,live',
            'access_key'   => 'required|string|max:255',
            'secret_key'   => 'nullable|string|max:255',
            'webhook_url'  => 'nullable|url',
            'success_url'  => 'nullable|url',
            'error_url'    => 'nullable|url',
            'api_url'      => 'nullable|url',
            'pay_link'     => 'nullable|url'
        ]);

        PaymentGateways::create([
            'name'        => $validated['name'],
            'mode'        => $validated['mode'],
            'access_key'  => Crypt::encryptString($validated['access_key']),
            'secret_key'  => Crypt::encryptString($validated['secret_key']),
            'webhook_url' => $validated['webhook_url'] ?? null,
            'redirect_url' => $validated['success_url'] ?? null,  // renamed to redirect_url
            'api_url'     => $validated['api_url'] ?? null,
            'success_url' => $validated['success_url'] ?? null,
            'error_url'  => $validated['error_url'] ?? null,
            'pay_link'   => $validated['pay_link'] ?? null,
        ]);

        return to_route('payment-gateways.index')->with('success', 'Payment gateway created with encryption.');
    }


    /**
     * Display the specified resource.
     */
    public function show(PaymentGateways $paymentGateways)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentGateways $paymentGateway)
    {
        return Inertia::render('admin/paymentgateway/Edit', [
            'paymentGateway' => $paymentGateway,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        $paymentGateway = PaymentGateways::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:100|unique:payment_gateways,code,' . $paymentGateway->id,
            'mode' => 'required|in:sandbox,live',
            'public_key' => 'nullable|string|max:500',
            'secret_key' => 'nullable|string|max:500',
            'webhook_url' => 'nullable|url',
            'redirect_url' => 'nullable|url',
            'api_url' => 'nullable|url',
            'status' => 'boolean',
        ]);

        $paymentGateway->update($validated);

        return redirect()->route('payment-gateways.index')
            ->with('success', 'Payment gateway updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentGateways $paymentGateways)
    {
        $paymentGateways->delete();

        return redirect()->route('payment-gateways.index');
    }
    public function toggleStatus($id)
    {
        try {
            $paymentGateways = PaymentGateways::findOrFail($id);
            $paymentGateways->status = !$paymentGateways->status;
            $paymentGateways->save();
            return redirect()->back()->with('success', 'Status updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update status: ' . $e->getMessage());
        }
    }
}
