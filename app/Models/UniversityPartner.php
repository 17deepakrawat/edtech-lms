<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityPartner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'status'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];
}
