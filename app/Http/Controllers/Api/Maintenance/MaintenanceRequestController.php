<?php

namespace App\Http\Controllers\Api\Maintenance;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceRequest;
use Illuminate\Http\Request;

class MaintenanceRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = MaintenanceRequest::with([
            'requester:id,name,email',
            'technician:id,name,email'
        ]);

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('request_no', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%")
                    ->orWhere('equipment_type', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        return response()->json(
            $query->latest()->paginate(10)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'equipment_type' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
        ]);

        $maintenanceRequest = MaintenanceRequest::create([
            ...$validated,
            'request_no' => 'TEMP-' . uniqid(),
            'user_id' => $request->user()->id,
            'status' => 'pending',
        ]);

        $maintenanceRequest->update([
            'request_no' =>
            'MR-' .
                now()->format('Y') .
                '-' .
                str_pad(
                    $maintenanceRequest->id,
                    4,
                    '0',
                    STR_PAD_LEFT
                ),
        ]);

        return response()->json([
            'message' => 'สร้างใบแจ้งซ่อมสำเร็จ',
            'data' => $maintenanceRequest->fresh(),
        ], 201);
    }

    public function show(MaintenanceRequest $maintenanceRequest)
    {
        $maintenanceRequest->load([
            'requester',
            'technician',
            'repairLogs.technician',
            'invoice.items',
        ]);

        return response()->json($maintenanceRequest);
    }

    public function update(
        Request $request,
        MaintenanceRequest $maintenanceRequest
    ) {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'equipment_type' => 'sometimes|required|string|max:100',
            'location' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high,urgent',
            'status' => 'sometimes|required|in:pending,assigned,in_progress,waiting_parts,completed,cancelled',
        ]);

        $maintenanceRequest->update($validated);

        if (
            isset($validated['status']) &&
            $validated['status'] === 'in_progress' &&
            !$maintenanceRequest->started_at
        ) {
            $maintenanceRequest->update([
                'started_at' => now()
            ]);
        }

        if (
            isset($validated['status']) &&
            $validated['status'] === 'completed'
        ) {
            $maintenanceRequest->update([
                'completed_at' => now()
            ]);
        }

        return response()->json([
            'message' => 'อัปเดตข้อมูลสำเร็จ',
            'data' => $maintenanceRequest->fresh(),
        ]);
    }

    public function destroy(MaintenanceRequest $maintenanceRequest)
    {
        $maintenanceRequest->delete();

        return response()->json([
            'message' => 'ลบใบแจ้งซ่อมสำเร็จ',
        ]);
    }

    public function assignTechnician(
    Request $request,
    MaintenanceRequest $maintenanceRequest
) {
    $validated = $request->validate([
        'technician_id' => 'required|exists:users,id',
    ]);

    $maintenanceRequest->update([
        'technician_id' => $validated['technician_id'],
        'status' => 'assigned',
        'assigned_at' => now(),
    ]);

    $maintenanceRequest->load('technician');

    return response()->json($maintenanceRequest);
}
}
