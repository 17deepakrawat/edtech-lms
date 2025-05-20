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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade');
            $table->foreignId('program_id')->constrained('programs')->onDelete('cascade');
            $table->string('name');
            $table->string('image');
            $table->text('short_description');
            $table->longText('content');
            $table->string('modes');
            $table->string('duration');
            $table->float('rating');
            $table->float('price');
            $table->boolean('status')->default('1');
            $table->boolean('is_subject')->default(false); 
            $table->json('course_keys')->nullable();  
            $table->json('faqs')->nullable();      
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
