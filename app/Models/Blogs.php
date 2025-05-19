<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Blogs extends Model
{
    protected $fillable = ['name', 'author_image', 'content', 'author_name', 'blog_category_id', 'image', 'faq'];
    
    protected $casts = [
        'faq' => 'array',
        'status' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategories::class, 'blog_category_id');
    }
}