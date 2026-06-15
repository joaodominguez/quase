<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Stay extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'region',
        'location',
        'stay_type',
        'status',
        'excerpt',
        'review_body',
        'ideal_for',
        'highlights',
        'practical',
        'price_range',
        'official_url',
        'affiliate_url',
        'booking_url',
        'seo_title',
        'seo_description',
        'published_at',
    ];

    protected $casts = [
        'highlights' => 'array',
        'practical' => 'array',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::saving(function (Stay $stay): void {
            if (! $stay->slug) {
                $stay->slug = Str::slug($stay->name);
            }

            if ($stay->status === 'published' && ! $stay->published_at) {
                $stay->published_at = now();
            }
        });
    }

    public function images(): HasMany
    {
        return $this->hasMany(StayImage::class)->orderBy('sort_order');
    }
}
