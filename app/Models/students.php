<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class students extends Model
{
    protected $fillable=['first_name','middle_name','last_name','email','password','dob','mobile'];
}
