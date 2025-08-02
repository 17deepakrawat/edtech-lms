<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentGateways extends Model
{
    protected $fillable = [
        'name',
        'code',
        'mode',
        'public_key',
        'secret_key',
        'webhook_url',
        'redirect_url',
        'api_url',
        'status'
    ];
}
