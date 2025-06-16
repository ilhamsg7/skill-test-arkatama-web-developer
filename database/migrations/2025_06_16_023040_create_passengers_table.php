<?php

use App\Models\Travel;
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
        Schema::create('passengers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Travel::class)->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('booking_code')->unique();
            $table->string('name');
            $table->enum('gender', ['L', 'P'])->default(null)->nullable();
            $table->string('city');
            $table->integer('age');
            $table->integer('birth_year');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passengers');
    }
};
