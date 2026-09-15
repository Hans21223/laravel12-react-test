<?php

namespace App\Http\Controllers\Api\Maintenance;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    // รายชื่อช่างสำหรับมอบหมายงาน
    public function index()
    {
        $technicians = User::where(
                'role',
                'technician'
            )
            ->select(
                'id',
                'name',
                'email',
                'role'
            )
            ->orderBy('name')
            ->get();

        return response()->json($technicians);
    }


    // รายชื่อผู้ใช้งานทั้งหมด
    // Route นี้ถูกล็อกไว้เฉพาะ Admin
    public function users()
    {
        $users = User::select(
                'id',
                'name',
                'email',
                'role',
                'created_at'
            )
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($users);
    }


    // เปลี่ยนสิทธิ์ผู้ใช้งาน
    // Route นี้ถูกล็อกไว้เฉพาะ Admin
    public function updateRole(
        Request $request,
        User $user
    ) {
        // ป้องกัน Admin เปลี่ยน Role ตัวเอง
        if ($request->user()->id === $user->id) {
            return response()->json([
                'message' =>
                    'ไม่สามารถเปลี่ยนสิทธิ์บัญชีของตัวเองได้',
            ], 422);
        }

        $validated = $request->validate([
            'role' =>
                'required|in:guest,technician,admin',
        ]);

        $user->update([
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' =>
                'อัปเดตสิทธิ์ผู้ใช้งานสำเร็จ',
            'data' => $user,
        ]);
    }
}