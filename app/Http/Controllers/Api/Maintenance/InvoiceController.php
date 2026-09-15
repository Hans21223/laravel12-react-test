<?php

namespace App\Http\Controllers\Api\Maintenance;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceInvoice;
use App\Models\MaintenanceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    // รายการใบแจ้งหนี้ทั้งหมด
    public function index()
    {
        $invoices = MaintenanceInvoice::with([
            'request.requester',
            'request.technician',
            'items'
        ])
            ->latest()
            ->get();

        return response()->json($invoices);
    }

    // สร้างใบแจ้งหนี้จากงานซ่อม
    public function store(Request $request)
    {
        $validated = $request->validate([
            'maintenance_request_id' =>
                'required|exists:maintenance_requests,id',
            'note' =>
                'nullable|string|max:1000',
        ]);

        $maintenanceRequest = MaintenanceRequest::with(
            'repairLogs'
        )->findOrFail(
            $validated['maintenance_request_id']
        );

        // ป้องกันสร้าง Invoice ซ้ำ
        $existingInvoice = MaintenanceInvoice::where(
            'maintenance_request_id',
            $maintenanceRequest->id
        )->first();

        if ($existingInvoice) {
            return response()->json([
                'message' =>
                    'รายการแจ้งซ่อมนี้มีใบแจ้งหนี้แล้ว',
                'data' => $existingInvoice,
            ], 422);
        }

        return DB::transaction(function () use (
            $maintenanceRequest,
            $validated
        ) {

            // รวมค่าแรงทั้งหมดจาก Repair Log
            $laborCost = $maintenanceRequest
                ->repairLogs
                ->sum('labor_cost');

            // รวมค่าอะไหล่ทั้งหมดจาก Repair Log
            $partsCost = $maintenanceRequest
                ->repairLogs
                ->sum('parts_cost');

            $totalAmount =
                $laborCost + $partsCost;

            // สร้าง Invoice ก่อนเพื่อเอา ID
            $invoice = MaintenanceInvoice::create([
                'invoice_no' =>
                    'TEMP-' . uniqid(),

                'maintenance_request_id' =>
                    $maintenanceRequest->id,

                'labor_cost' =>
                    $laborCost,

                'parts_cost' =>
                    $partsCost,

                'total_amount' =>
                    $totalAmount,

                'payment_status' =>
                    'unpaid',

                'note' =>
                    $validated['note'] ?? null,

                'issued_at' =>
                    now()->toDateString(),
            ]);

            // สร้างเลข Invoice
            $invoice->update([
                'invoice_no' =>
                    'INV-' .
                    now()->format('Y') .
                    '-' .
                    str_pad(
                        $invoice->id,
                        4,
                        '0',
                        STR_PAD_LEFT
                    ),
            ]);

            // รายการค่าแรง
            if ($laborCost > 0) {
                $invoice->items()->create([
                    'description' =>
                        'ค่าบริการและค่าแรงช่าง',

                    'quantity' => 1,

                    'unit_price' =>
                        $laborCost,

                    'subtotal' =>
                        $laborCost,
                ]);
            }

            // รายการค่าอะไหล่
            if ($partsCost > 0) {
                $invoice->items()->create([
                    'description' =>
                        'ค่าอะไหล่และอุปกรณ์',

                    'quantity' => 1,

                    'unit_price' =>
                        $partsCost,

                    'subtotal' =>
                        $partsCost,
                ]);
            }

            $invoice->load([
                'request.requester',
                'request.technician',
                'items'
            ]);

            return response()->json([
                'message' =>
                    'สร้างใบแจ้งหนี้สำเร็จ',

                'data' =>
                    $invoice,
            ], 201);
        });
    }

    // ดูใบแจ้งหนี้
    public function show(
        MaintenanceInvoice $invoice
    ) {
        $invoice->load([
            'request.requester',
            'request.technician',
            'request.repairLogs',
            'items'
        ]);

        return response()->json(
            $invoice
        );
    }

    // อัปเดตสถานะการชำระเงิน
    public function update(
        Request $request,
        MaintenanceInvoice $invoice
    ) {
        $validated = $request->validate([
            'payment_status' =>
                'sometimes|required|in:unpaid,paid,cancelled',

            'note' =>
                'nullable|string|max:1000',
        ]);

        $invoice->update(
            $validated
        );

        return response()->json([
            'message' =>
                'อัปเดตใบแจ้งหนี้สำเร็จ',

            'data' =>
                $invoice->fresh(),
        ]);
    }

    // ลบใบแจ้งหนี้
    public function destroy(
        MaintenanceInvoice $invoice
    ) {
        $invoice->delete();

        return response()->json([
            'message' =>
                'ลบใบแจ้งหนี้สำเร็จ',
        ]);
    }
}