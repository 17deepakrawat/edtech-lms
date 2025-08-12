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
            $table->string('name'); // e.g., easebuzz, razorpay        
            $table->enum('mode', ['sandbox', 'live'])->default('sandbox');
            $table->string('access_key')->nullable(); // Access/public key
            $table->string('secret_key')->nullable(); // Secret key           
            $table->string('webhook_url')->nullable();
            $table->string('success_url')->nullable();
            $table->string('error_url')->nullable();
            $table->string('api_url')->nullable();
            $table->boolean('status')->default('1');
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
