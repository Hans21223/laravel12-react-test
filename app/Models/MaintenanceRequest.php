<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_no',
        'user_id',
        'technician_id',
        'title',
        'equipment_type',
        'location',
        'description',
        'priority',
        'status',
        'assigned_at',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function requester()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function technician()
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    public function repairLogs()
    {
        return $this->hasMany(
            MaintenanceRepairLog::class,
            'maintenance_request_id'
        );
    }

    public function invoice()
    {
        return $this->hasOne(
            MaintenanceInvoice::class,
            'maintenance_request_id'
        );
    }
}
