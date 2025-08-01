<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status'
    ];

    /**
     * Get the units for the course.
     */
    public function units(): HasMany
    {
        return $this->hasMany(Unit::class);
    }

    /**
     * Get the videos for the course.
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'course_user_fee')
    //         ->using(CourseUserFee::class)
    //         ->withPivot('fee')
    //         ->withTimestamps();
    // }
    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user_fee')
            ->withTimestamps(); // No withPivot for now
    }
}
