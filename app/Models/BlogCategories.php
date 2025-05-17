<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategories extends Model
{
    protected $fillable=['name'];
    public function blogs(): HasMany
    {
      return $this->hasMany(Blogs::class, 'blog_category_id');
    }
}
