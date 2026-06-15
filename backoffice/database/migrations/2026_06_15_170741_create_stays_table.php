<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stays', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('region');
            $table->string('location')->nullable();
            $table->string('stay_type')->nullable();
            $table->string('status')->default('draft')->index();
            $table->text('excerpt')->nullable();
            $table->longText('review_body')->nullable();
            $table->string('ideal_for')->nullable();
            $table->json('highlights')->nullable();
            $table->json('practical')->nullable();
            $table->string('price_range')->nullable();
            $table->string('official_url')->nullable();
            $table->string('affiliate_url')->nullable();
            $table->string('booking_url')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stays');
    }
};
