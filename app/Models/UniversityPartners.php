<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityPartners extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','image','status'
    ];

    // protected $casts = [
    //     'status' => 'boolean'
    // ];
}
