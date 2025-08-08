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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enroll_id')->constrained('enrolls')->onDelete('cascade');
            $table->string('gateway')->default('easebuzz');
            $table->string('transaction_id')->unique();
            $table->string('status')->default('initiated'); // initiated, success, failed
            $table->decimal('amount', 10, 2);
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->json('response')->nullable(); // full gateway response
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
