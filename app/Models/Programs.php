<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Programs extends Model
{
    protected $fillable = ['name', 'department_id', 'status'];

    /**
     * Get the department this program belongs to.
     */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Departments::class, 'department_id');
    }

    /**
     * Get all courses under this program.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Courses::class, 'program_id');
    }
}
