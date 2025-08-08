<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class PaymentLog extends Model
{
 use HasFactory;

    protected $fillable = [
        'enroll_id',
        'type',
        'payload',
    ];

    protected $casts = [
        'payload' => 'array',
    ];

    public function enroll()
    {
        return $this->belongsTo(Enrolls::class);
    }
}
