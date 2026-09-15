import { Head, Link, usePage } from '@inertiajs/react';
import MaintenanceLayout from '@/Layouts/MaintenanceLayout';

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth.user;

    const roleLabel = {
        admin: 'ผู้ดูแลระบบ',
        technician: 'ช่างซ่อม',
        guest: 'ผู้ใช้งาน',
    };

    return (
        <MaintenanceLayout>
            <Head title="โปรไฟล์ของฉัน" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">
                        โปรไฟล์ของฉัน
                    </h1>
                    <p className="text-slate-500 mt-1">
                        ข้อมูลบัญชีผู้ใช้งานของคุณ
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {user.name}
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    {user.email}
                                </p>

                                <span className="inline-flex mt-3 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                    {roleLabel[user.role] || user.role}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 mt-8 pt-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-sm text-slate-500">
                                        ชื่อผู้ใช้งาน
                                    </p>
                                    <p className="font-semibold text-slate-800 mt-1">
                                        {user.name}
                                    </p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-sm text-slate-500">
                                        อีเมล
                                    </p>
                                    <p className="font-semibold text-slate-800 mt-1">
                                        {user.email}
                                    </p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-sm text-slate-500">
                                        สิทธิ์การใช้งาน
                                    </p>
                                    <p className="font-semibold text-slate-800 mt-1">
                                        {roleLabel[user.role] || user.role}
                                    </p>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-sm text-slate-500">
                                        User ID
                                    </p>
                                    <p className="font-semibold text-slate-800 mt-1">
                                        #{user.id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/profile"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl transition"
                            >
                                <i className="bi bi-pencil-square"></i>
                                แก้ไขโปรไฟล์ / เปลี่ยนรหัสผ่าน
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MaintenanceLayout>
    );
}