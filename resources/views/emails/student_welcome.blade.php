<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to EdTech</title>
</head>
<body>
    <table style="background:#e1e1e1;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:17px;line-height:1.5;width:100%;min-width:700px;" width="100%">
        <tr>
            <td style="padding:10px">
                <table style="margin:0 auto;width:700px;" width="700" align="center">
                    <tr>
                        <td style="padding:0 21px">
                            <table style="background:#ffffff;width:658px;margin:0 auto;" width="658" align="center">
                                <tr>
                                    <td style="border-bottom:3px solid #669c76;padding:20px;text-align:center">
                                        <img src="{{ url('assets/web-assets/edtech_logo.png') }}" width="200" alt="EdTech Logo" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:25px 60px">
                                        <div style="border-bottom:2px dotted #16345c;color:#16345c;padding-bottom:1em;">
                                            <p><strong>Hello {{ $student['first_name'] }} {{ $student['last_name'] }},</strong></p>
                                            <p>Welcome to your new <strong>EdTech student account</strong>.</p>
                                        </div>
                                        <div style="color:#555;">
                                            <p>Your account has been successfully created. Below are your login credentials:</p>
                                            <ul style="padding-left: 20px;">
                                                <li><strong>Email:</strong> {{ $student['email'] }}</li>
                                                <li><strong>Password:</strong> {{ $rawPassword }}</li>
                                                <li><strong>Login URL:</strong> <a href="{{ url('login') }}" style="color:#669c76;">{{ url('login') }}</a></li>
                                            </ul>
                                            <p>You can now log in and explore your dashboard to begin your learning journey.</p>
                                            <p style="color:#16345c">Best regards,<br>
                                                <strong style="color:black">EdTech Innovate Team</strong>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#669c76;text-align:center;padding:30px;color:#ffffff">
                            <p>Need help? Contact us at <a href="mailto:support@edtechinnovate.com" style="color:#fff;text-decoration:underline;">support@edtechinnovate.com</a></p>
                            <p style="margin:5px 0 0">© {{ date('Y') }} EdTech Innovate. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
