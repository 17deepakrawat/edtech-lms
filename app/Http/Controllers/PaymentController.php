<?php

namespace App\Http\Controllers;

use App\Models\Enroll;
use App\Models\Enrolls;
use App\Models\Payment;
use App\Models\PaymentLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
class PaymentController extends Controller
{
    public function success(Request $request)
    {
        $transactionId = $request->txnid;

        PaymentLog::create([
            'type' => 'success',
            'payload' => $request->all(),
            'enroll_id' => Enrolls::where('transaction_id', $transactionId)->value('id'),
        ]);

        Enrolls::where('transaction_id', $transactionId)->update([
            'status' => 'paid',
        ]);

        Payment::where('transaction_id', $transactionId)->update([
            'status' => 'success',
            'response' => $request->all(),
        ]);

        return redirect()->route('student.dashboard')->with('success', 'Payment successful. Course access granted.');
    }

    public function failed(Request $request)
    {
        $transactionId = $request->txnid;

        PaymentLog::create([
            'type' => 'failed',
            'payload' => $request->all(),
            'enroll_id' => Enrolls::where('transaction_id', $transactionId)->value('id'),
        ]);

        Enrolls::where('transaction_id', $transactionId)->update(['status' => 'failed']);

        Payment::where('transaction_id', $transactionId)->update([
            'status' => 'failed',
            'response' => $request->all(),
        ]);

        return redirect()->route('course.details', ['slug' => $request->productinfo ?? 'course'])
            ->with('error', 'Payment failed. Please try again.');
    }
}
