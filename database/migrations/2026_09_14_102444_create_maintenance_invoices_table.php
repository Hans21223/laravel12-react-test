<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenance_invoices', function (Blueprint $table) {
            $table->id();

            $table->string('invoice_no')->unique();

            $table->foreignId('maintenance_request_id')
                ->unique()
                ->constrained('maintenance_requests')
                ->cascadeOnDelete();

            $table->decimal('labor_cost', 10, 2)->default(0);

            $table->decimal('parts_cost', 10, 2)->default(0);

            $table->decimal('total_amount', 10, 2)->default(0);

            $table->enum('payment_status', [
                'unpaid',
                'paid',
                'cancelled'
            ])->default('unpaid');

            $table->text('note')->nullable();

            $table->date('issued_at');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance_invoices');
    }
};