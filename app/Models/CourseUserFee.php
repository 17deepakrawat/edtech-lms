<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseUserFee extends Pivot
{
    protected $table = 'course_user_fee';

    protected $fillable = [
        'user_id',
        'course_id',
        'fee',
    ];
}
