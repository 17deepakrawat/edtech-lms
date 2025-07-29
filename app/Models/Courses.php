<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Courses extends Model
{
    protected $fillable = ['department_id', 'program_id', 'name', 'short_description', 'image', 'content', 'modes', 'duration', 'rating', 'price', 'is_subject', 'course_keys', 'faqs', 'status', 'slug'];
    protected $casts = [
        'is_subject' => 'boolean',
        'course_keys' => 'array',
        'faqs' => 'array',
    ];

    /**
     * Get the status of the course.
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Video::class, 'course_id');
    }

    public function department()
    {
        return $this->belongsTo(Departments::class, 'department_id');
    }

    public function program()
    {
        return $this->belongsTo(Programs::class, 'program_id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user_fee')
            ->using(CourseUserFee::class)
            ->withPivot('fee')
            ->withTimestamps();
    }
}
