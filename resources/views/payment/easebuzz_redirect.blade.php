<!DOCTYPE html>
<html>
<head>
    <title>Redirecting to Easebuzz</title>
</head>
<body onload="document.forms['easebuzzForm'].submit()">
    <h3>Please wait, redirecting to payment gateway...</h3>
    <form name="easebuzzForm" method="POST" action="https://pay.easebuzz.in/payment/initiateLink">
        @foreach ($paymentData as $key => $value)
            <input type="hidden" name="{{ $key }}" value="{{ $value }}">
        @endforeach
    </form>
</body>
</html>
