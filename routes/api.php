<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\Maintenance\MaintenanceRequestController;
use App\Http\Controllers\Api\Maintenance\TechnicianController;
use App\Http\Controllers\Api\Maintenance\RepairLogController;
use App\Http\Controllers\Api\Maintenance\InvoiceController;

Route::get('/components', function () {
    $components = DB::table('iot_components')->get();
    return response()->json($components);
});

Route::apiResource('/product', ProductController::class);

Route::post('/sanctum/token', function (Request $request) {
    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
        return ['email' => ['The provided credentials are incorrect.']];
    }
    return ['token' => $user->createToken($request->device_name)->plainTextToken];
});

Route::post('/sanctum/token/register', function (Request $request) {
    $user = User::where('email', $request->email)->first();
    if ($user) {
        return ['email' => ['The email is already in use.']];
    }
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);
    return ['token' => $user->createToken($request->device_name)->plainTextToken];
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// ==========================================
// Maintenance Request System
// ==========================================

Route::prefix('maintenance')
    ->middleware('auth:sanctum')
    ->group(function () {

        Route::put(
            'requests/{maintenanceRequest}/assign',
            [MaintenanceRequestController::class, 'assignTechnician']
        );

        Route::apiResource(
            'requests',
            MaintenanceRequestController::class
        )->parameters([
            'requests' => 'maintenanceRequest'
        ]);


        // รายชื่อช่าง
        Route::get(
            'technicians',
            [TechnicianController::class, 'index']
        );


        // เฉพาะ Admin เท่านั้น
        Route::middleware('check.role:admin')
            ->group(function () {

                Route::get(
                    'users',
                    [TechnicianController::class, 'users']
                );

                Route::put(
                    'users/{user}/role',
                    [TechnicianController::class, 'updateRole']
                );
            });


        Route::apiResource(
            'repair-logs',
            RepairLogController::class
        )->parameters([
            'repair-logs' => 'repairLog'
        ]);

        Route::apiResource(
            'invoices',
            InvoiceController::class
        );
    });
