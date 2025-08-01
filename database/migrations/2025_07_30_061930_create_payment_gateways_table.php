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
        Schema::create('payment_gateways', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->string('code')->nullable();
            $table->enum('mode', ['sandbox', 'live'])->default('sandbox');
            $table->string('public_key')->nullable();
            $table->string('secret_key')->nullable();
            $table->string('webhook_url')->nullable();
            $table->string('redirect_url')->nullable();
            $table->string('api_url')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_gateways');
    }
};
