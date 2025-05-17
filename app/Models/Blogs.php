<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blogs extends Model
{
    protected $fillable = ['name', 'author_image', 'author_name', 'content', 'blog_category_id','image'];
    protected $casts = [
        'faq' => 'array'
    ];
    public function blogcategory():BelongsTo
    {
        return $this->belongsTo(BlogCategories::class, 'blog_category_id');// foreign key
    }
}
