<?php

namespace App\Models;

use Faker\Provider\ar_EG\Payment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Enrolls extends Model
{
   use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'status',
        'transaction_id',
        'price',
    ];

    public function student()
    {
        return $this->belongsTo(students::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function logs()
    {
        return $this->hasMany(PaymentLog::class);
    }
}
