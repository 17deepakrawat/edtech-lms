<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'unit_id',
        'topic_id',
        'name',
        'video_type', // 'local' or 'embed'
        'video_path',
        'embed_url',
        'duration',
        'status'
    ];

    /**
     * Get the course that owns the video.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Courses::class, 'course_id');
    }

    /**
     * Get the unit that owns the video.
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    /**
     * Get the topic that owns the video.
     */
    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
