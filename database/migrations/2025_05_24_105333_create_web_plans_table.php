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
        Schema::create('web_plans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('price', 10, 2); 
            $table->string('frequency');
            $table->json('features')->nullable();
            $table->json('disabled_features')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('web_plans');
    }
};
