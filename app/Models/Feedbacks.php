<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedbacks extends Model
{
   protected $fillable=['name','title','description','image','status'];
}
