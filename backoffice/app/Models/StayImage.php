<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class StayImage extends Model
{
    protected $fillable = [
        'stay_id',
        'path',
        'alt_text',
        'credit',
        'sort_order',
    ];

    public function stay(): BelongsTo
    {
        return $this->belongsTo(Stay::class);
    }
}
