<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
    protected $fillable = ['department_id', 'program_id', 'name', 'short_description','image', 'content', 'modes', 'duration', 'rating', 'price', 'is_subject', 'course_keys', 'faqs', 'status'];
    protected $casts = [
        'is_subject' => 'boolean',
        'course_keys' => 'array',  // automatically JSON encode/decode
        'faqs' => 'array',         // automatically JSON encode/decode
    ];

    // public function department()
    // {
    //     return $this->belongsTo(Departments::class);
    // }

    // public function program()
    // {
    //     return $this->belongsTo(Programs::class);
    // }
    public function department()
    {
        return $this->belongsTo(Departments::class, 'department_id');
    }
    
    public function program()
    {
        return $this->belongsTo(Programs::class, 'program_id');
    }

}
