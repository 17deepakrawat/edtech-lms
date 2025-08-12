<?php

namespace App\Http\Controllers;

use App\Models\Enroll;
use App\Models\Enrolls;
use App\Models\Payment;
use App\Models\PaymentLog;
use App\Models\students;
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
    public function show()
    {
        $enrolls = Enrolls::with(['student', 'course'])->get();
        $payments = $enrolls->map(function ($enroll) {
            $student = $enroll->student;
            $course  = $enroll->course;
            return [
                'student_name'   => collect([$student->first_name, $student->middle_name, $student->last_name])
                    ->filter() 
                    ->implode(' '),
                'course_name'    => $course->name,
                'payment_id'     => $enroll->id,
                'payment_status' => $enroll->status,
                'transaction_id' => $enroll->transaction_id,
                'amount'         => $enroll->price, 
                'payment_date'   => $enroll->created_at->timezone('Asia/Kolkata')->format('d M Y'),
                'payment_time'   => $enroll->created_at->timezone('Asia/Kolkata')->format('h:i:s A'),
            ];
        });       
        $paymentinfo =$payments->toArray();
        // dd($paymentinfo);
       return Inertia::render('admin/payments/Index',[
        'paymentinfo'=> $paymentinfo,
       ]);
    }
}
