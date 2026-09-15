<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRepairLog extends Model
{
    protected $fillable = [
        'maintenance_request_id',
        'technician_id',
        'action',
        'repair_detail',
        'labor_cost',
        'parts_cost',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function maintenanceRequest()
    {
        return $this->belongsTo(
            MaintenanceRequest::class,
            'maintenance_request_id'
        );
    }

    public function technician()
    {
        return $this->belongsTo(
            User::class,
            'technician_id'
        );
    }
}