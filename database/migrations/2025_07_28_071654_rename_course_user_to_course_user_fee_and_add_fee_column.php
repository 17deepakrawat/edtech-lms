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
        Schema::table('course_user_fee_and_add_fee_column', function (Blueprint $table) {
            Schema::rename('course_user', 'course_user_fee');
            Schema::table('course_user_fee', function (Blueprint $table) {
                $table->decimal('fee', 10, 2)->nullable()->after('user_id');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('course_user_fee', function (Blueprint $table) {
            $table->dropColumn('fee');
        });

        // Rename back to original
        Schema::rename('course_user_fee', 'course_user');
    }
};
