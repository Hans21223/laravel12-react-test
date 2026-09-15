<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceInvoiceItem extends Model
{
    protected $fillable = [
        'maintenance_invoice_id',
        'description',
        'quantity',
        'unit_price',
        'subtotal',
    ];

    public function invoice()
    {
        return $this->belongsTo(
            MaintenanceInvoice::class,
            'maintenance_invoice_id'
        );
    }
}