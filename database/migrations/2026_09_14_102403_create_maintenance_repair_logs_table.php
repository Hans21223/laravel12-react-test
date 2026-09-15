<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenance_repair_logs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('maintenance_request_id')
                ->constrained('maintenance_requests')
                ->cascadeOnDelete();

            $table->foreignId('technician_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('action');

            $table->text('repair_detail')->nullable();

            $table->decimal('labor_cost', 10, 2)->default(0);

            $table->decimal('parts_cost', 10, 2)->default(0);

            $table->timestamp('completed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance_repair_logs');
    }
};