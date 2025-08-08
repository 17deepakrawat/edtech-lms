<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'enroll_id',
        'gateway',
        'transaction_id',
        'status',
        'amount',
        'email',
        'phone',
        'response',
    ];

    protected $casts = [
        'response' => 'array',
    ];

    public function enroll()
    {
        return $this->belongsTo(Enrolls::class);
    }
}


