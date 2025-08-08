<?php

namespace App\Http\Controllers;

use App\Models\Enrolls;
use App\Models\Payment;
use App\Models\PaymentLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnrollsController extends Controller
{
    /**
     * Handle course enrollment and payment initiation.
     */
    public function submit(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
            'price' => 'required|numeric',
            'course_name' =>  'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'mobile_no' => 'required|string|max:15',
        ]);
        $transactionid = Str::uuid()->toString();
        DB::transaction(function () use ($request, $transactionid) {
            $enroll = Enrolls::create([
                'student_id' => $request->student_id,
                'course_id' => $request->course_id,
                'transaction_id' => $transactionid,
                'status' => 'pending',
                'price' => $request->price,
            ]);

            Payment::create([
                'enroll_id' => $enroll->id,
                'gateway' => 'easebuzz',
                'transaction_id' => $transactionid,
                'status' => 'initiated',
                'amount' => $request->price,
                'email' => $request->email,
                'phone' => $request->mobile_no,
            ]);
        });

        $accessKey = '3XDM1KLGSE';
        $salt = '5XFZ6OOLBF';

        $txnid = $transactionid;
        // $amount = $request->price;
        $amount = '1';
        $productinfo = trim($request->course_name.' Course');
        $firstname = $request->name;
        $email = $request->email;
        $phone = $request->mobile_no;
        $accounts = json_encode(array("Edtech Innovate Pvt Ltd." => $amount));
        $hashString = "$accessKey|$txnid|$amount|$productinfo|$firstname|$email|||||||||||$salt";
        $hash = hash("sha512", $hashString);

        $paymentData = [
            'key' => $accessKey,
            'txnid' => $txnid,
            'amount' => $amount,
            'productinfo' => $productinfo,
            'firstname' => $firstname,
            'email' => $email,
            'phone' => $phone,
            'surl' => route('payment.success'),
            'furl' => route('payment.failed'),
            "split_payments" => $accounts,
            'hash' => $hash,
        ];

        PaymentLog::create([
            'type' => 'request',
            'payload' => $paymentData,
            'enroll_id' => Enrolls::where('transaction_id', $txnid)->value('id'),
        ]);

        $response = Http::asForm()->post('https://pay.easebuzz.in/payment/initiateLink', $paymentData);
        // dd($response->json());
        PaymentLog::create([
            'type' => 'response',
            'payload' => $response->json(),
            'enroll_id' => Enrolls::where('transaction_id', $txnid)->value('id'),
        ]);


        if ($response->successful() && isset($response['data'])) {
            $token = $response['data'];
            return response()->json([
                'payment_link' => "https://pay.easebuzz.in/pay/{$token}"
            ]);
        }

        return response()->json(['error' => 'Unable to initiate payment.'], 500);
    }
    public function paymentSuccess(Request $request)
    {
        // dd($request->all());
        Enrolls::where('transaction_id', $request->txnid)->update([
            'status' => 'paid'
        ]);
        Payment::where('transaction_id', $request->txnid)->update([
            'response' => json_encode($request->all())
        ]);
        $success_response = [
            'name' => $request->firstname,
            'txnid' => $request->txnid,
            'amount' => $request->amount,
            'status' => $request->status,
            'easepayid' => $request->easepayid,
            'productinfo' => $request->productinfo,
        ];
        return Inertia::render('gateway_response/Response', [
            'success' => $success_response,
        ]);
    }
    public function paymentFailed(Request $request)
    {
        // dd($request->all());
        Enrolls::where('transaction_id', $request->txnid)->update([
            'status' => 'failed',
        ]);
        Payment::where('transaction_id', $request->txnid)->update([
            'response' => json_encode($request->all())
        ]);
        $error_response = [
            'name' => $request->firstname,
            'txnid' => $request->txnid,
            'amount' => $request->amount,
            'status' => $request->status,
            'easepayid' => $request->easepayid,
            'productinfo' => $request->productinfo,
        ];
        return Inertia::render('gateway_response/Response', [
            'error' => $error_response,
        ]);
    }
}
