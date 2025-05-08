<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Departments extends Model
{
    protected $fillable = ['name'];

    /**
     * Get all programs under this department.
     */
    public function programs(): HasMany
    {
        return $this->hasMany(Programs::class, 'department_id');
    }
}
