<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class PaymentGateways extends Model
{
    protected $fillable = [
        'name',
        'mode',
        'access_key',
        'secret_key',        
        'webhook_url',
        'success_url',
        'error_url',
        'api_url',
        'status'
    ];
    public function getAccessKeyAttribute($value)
    {
        return Crypt::decryptString($value);
    }

    public function getSecretKeyAttribute($value)
    {
        return Crypt::decryptString($value);
    }

    public function getSaltKeyAttribute($value)
    {
        return Crypt::decryptString($value);
    }
}
