<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenance_invoice_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('maintenance_invoice_id')
                ->constrained('maintenance_invoices')
                ->cascadeOnDelete();

            $table->string('description');

            $table->integer('quantity')
                ->default(1);

            $table->decimal('unit_price', 10, 2)
                ->default(0);

            $table->decimal('subtotal', 10, 2)
                ->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance_invoice_items');
    }
};