import React, { useEffect, useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import MaintenanceLayout from '@/Layouts/MaintenanceLayout';
import useFixFlowSettings from '@/hooks/useFixFlowSettings';

export default function Index() {
    const { language } = useFixFlowSettings();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [savingId, setSavingId] = useState(null);

    const text = {
        th: {
            layoutTitle: 'ผู้ใช้งานและช่างซ่อม',
            title: 'จัดการผู้ใช้งานและช่างซ่อม',
            description:
                'กำหนดสิทธิ์ผู้ใช้งานสำหรับการใช้งานระบบ FixFlow',

            totalUsers: 'ผู้ใช้งานทั้งหมด',
            technicians: 'ช่างซ่อม',
            admins: 'ผู้ดูแลระบบ',
            generalUsers: 'ผู้ใช้งานทั่วไป',

            searchUser: 'ค้นหาผู้ใช้งาน',
            searchPlaceholder:
                'ค้นหาชื่อ อีเมล หรือสิทธิ์...',

            usersInSystem: 'ผู้ใช้งานในระบบ',
            found: 'พบ',
            records: 'รายการ',

            user: 'ผู้ใช้งาน',
            email: 'อีเมล',
            currentRole: 'สิทธิ์ปัจจุบัน',
            manage: 'จัดการ',

            userId: 'รหัสผู้ใช้',

            guest: 'ผู้ใช้งานทั่วไป',
            technician: 'ช่างซ่อม',
            admin: 'ผู้ดูแลระบบ',

            loading: 'กำลังโหลดข้อมูล...',
            noUsers: 'ไม่พบผู้ใช้งาน',
            tryAnotherSearch:
                'ลองเปลี่ยนคำค้นหา',

            noticeTitle: 'การกำหนดสิทธิ์ผู้ใช้งาน',
            noticeDescription:
                'ผู้ใช้งานทั่วไปสามารถแจ้งซ่อมได้ ช่างซ่อมสามารถรับผิดชอบและอัปเดตงานซ่อม ส่วนผู้ดูแลระบบสามารถจัดการผู้ใช้งาน ช่างซ่อม และข้อมูลทั้งหมดในระบบ',

            updateSuccess:
                'อัปเดตสิทธิ์ผู้ใช้งานสำเร็จ',
            updateError:
                'ไม่สามารถอัปเดตสิทธิ์ได้',
            loadError:
                'ไม่สามารถโหลดข้อมูลผู้ใช้งานได้',

            guestOption: 'User',
            technicianOption: 'Technician',
            adminOption: 'Admin',
        },

        en: {
            layoutTitle: 'Users & Technicians',
            title: 'Manage Users & Technicians',
            description:
                'Manage user roles and permissions in FixFlow.',

            totalUsers: 'Total Users',
            technicians: 'Technicians',
            admins: 'Administrators',
            generalUsers: 'General Users',

            searchUser: 'Search Users',
            searchPlaceholder:
                'Search by name, email or role...',

            usersInSystem: 'System Users',
            found: 'Found',
            records: 'records',

            user: 'User',
            email: 'Email',
            currentRole: 'Current Role',
            manage: 'Manage',

            userId: 'User ID',

            guest: 'General User',
            technician: 'Technician',
            admin: 'Administrator',

            loading: 'Loading users...',
            noUsers: 'No users found',
            tryAnotherSearch:
                'Try another search keyword.',

            noticeTitle: 'User Role Management',
            noticeDescription:
                'General users can submit repair requests, technicians can handle and update assigned jobs, and administrators can manage users, technicians, and system data.',

            updateSuccess:
                'User role updated successfully',
            updateError:
                'Unable to update user role',
            loadError:
                'Unable to load users',

            guestOption: 'User',
            technicianOption: 'Technician',
            adminOption: 'Admin',
        },
    };

    const t = text[language] ?? text.th;

    const loadUsers = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                '/api/maintenance/users'
            );

            setUsers(response.data ?? []);
        } catch (error) {
            console.error(error);
            alert(t.loadError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const updateRole = async (userId, role) => {
        setSavingId(userId);

        try {
            await axios.put(
                `/api/maintenance/users/${userId}/role`,
                {
                    role,
                }
            );

            await loadUsers();

            alert(t.updateSuccess);
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ??
                    t.updateError
            );
        } finally {
            setSavingId(null);
        }
    };

    const filteredUsers = useMemo(() => {
        const keyword = search
            .trim()
            .toLowerCase();

        if (!keyword) {
            return users;
        }

        return users.filter((user) => {
            return (
                user.name
                    ?.toLowerCase()
                    .includes(keyword) ||
                user.email
                    ?.toLowerCase()
                    .includes(keyword) ||
                user.role
                    ?.toLowerCase()
                    .includes(keyword)
            );
        });
    }, [users, search]);

    const technicianCount = users.filter(
        (user) => user.role === 'technician'
    ).length;

    const guestCount = users.filter(
        (user) => user.role === 'guest'
    ).length;

    const adminCount = users.filter(
        (user) => user.role === 'admin'
    ).length;

    return (
        <MaintenanceLayout title={t.layoutTitle}>
            <Head title={t.title} />

            <div className="space-y-6">

                {/* HEADER */}
                <section>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        {t.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {t.description}
                    </p>
                </section>


                {/* STATS */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* TOTAL */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <div className="text-sm font-medium text-slate-500">
                                    {t.totalUsers}
                                </div>

                                <div className="mt-2 text-3xl font-bold text-slate-900">
                                    {users.length}
                                </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                <i className="bi bi-people text-xl"></i>
                            </div>

                        </div>

                    </div>


                    {/* GENERAL USER */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <div className="text-sm font-medium text-slate-500">
                                    {t.generalUsers}
                                </div>

                                <div className="mt-2 text-3xl font-bold text-slate-900">
                                    {guestCount}
                                </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                <i className="bi bi-person text-xl"></i>
                            </div>

                        </div>

                    </div>


                    {/* TECHNICIAN */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <div className="text-sm font-medium text-slate-500">
                                    {t.technicians}
                                </div>

                                <div className="mt-2 text-3xl font-bold text-blue-600">
                                    {technicianCount}
                                </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <i className="bi bi-person-gear text-xl"></i>
                            </div>

                        </div>

                    </div>


                    {/* ADMIN */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <div className="text-sm font-medium text-slate-500">
                                    {t.admins}
                                </div>

                                <div className="mt-2 text-3xl font-bold text-violet-600">
                                    {adminCount}
                                </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <i className="bi bi-shield-check text-xl"></i>
                            </div>

                        </div>

                    </div>

                </section>


                {/* SEARCH */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="max-w-xl">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            {t.searchUser}
                        </label>

                        <div className="relative">

                            <i className="bi bi-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder={t.searchPlaceholder}
                                className="
                                    w-full
                                    rounded-xl
                                    border border-slate-200
                                    bg-white
                                    py-3 pl-11 pr-4
                                    text-sm
                                    text-slate-900
                                    outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-blue-500
                                    focus:ring-4
                                    focus:ring-blue-500/10
                                "
                            />

                        </div>

                    </div>

                </section>


                {/* USERS */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

                        <h3 className="text-lg font-bold text-slate-900">
                            {t.usersInSystem}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {t.found}{' '}
                            {filteredUsers.length}{' '}
                            {t.records}
                        </p>

                    </div>


                    {loading ? (
                        <div className="flex min-h-[320px] items-center justify-center">

                            <div className="flex flex-col items-center gap-3">

                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                                <span className="text-sm text-slate-500">
                                    {t.loading}
                                </span>

                            </div>

                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex min-h-[320px] flex-col items-center justify-center text-center">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <i className="bi bi-person-x text-3xl"></i>
                            </div>

                            <div className="mt-4 font-bold text-slate-700">
                                {t.noUsers}
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                {t.tryAnotherSearch}
                            </div>

                        </div>
                    ) : (
                        <div className="w-full">

                            <table className="w-full table-fixed">

                                <thead className="bg-slate-50">

                                    <tr className="border-b border-slate-200">

                                        <th className="w-[30%] px-5 py-3 text-left text-xs font-bold text-slate-500 sm:px-6">
                                            {t.user}
                                        </th>

                                        <th className="w-[30%] px-5 py-3 text-left text-xs font-bold text-slate-500 sm:px-6">
                                            {t.email}
                                        </th>

                                        <th className="w-[18%] px-5 py-3 text-left text-xs font-bold text-slate-500 sm:px-6">
                                            {t.currentRole}
                                        </th>

                                        <th className="w-[22%] px-5 py-3 text-right text-xs font-bold text-slate-500 sm:px-6">
                                            {t.manage}
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-slate-100">

                                    {filteredUsers.map(
                                        (user) => (
                                            <tr
                                                key={user.id}
                                                className="transition hover:bg-slate-50/80"
                                            >

                                                {/* USER */}
                                                <td className="px-5 py-4 sm:px-6">

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`
                                                                flex h-10 w-10 shrink-0
                                                                items-center
                                                                justify-center
                                                                rounded-full
                                                                text-sm
                                                                font-bold
                                                                ${
                                                                    user.role ===
                                                                    'admin'
                                                                        ? 'bg-violet-100 text-violet-700'
                                                                        : user.role ===
                                                                          'technician'
                                                                        ? 'bg-blue-100 text-blue-700'
                                                                        : 'bg-slate-100 text-slate-600'
                                                                }
                                                            `}
                                                        >
                                                            {(user.name ??
                                                                'U')
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>

                                                        <div className="min-w-0">

                                                            <div className="truncate font-semibold text-slate-900">
                                                                {user.name}
                                                            </div>

                                                            <div className="mt-0.5 text-xs text-slate-400">
                                                                {t.userId}:{' '}
                                                                {user.id}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* EMAIL */}
                                                <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">

                                                    <div className="truncate">
                                                        {user.email}
                                                    </div>

                                                </td>


                                                {/* ROLE */}
                                                <td className="px-5 py-4 sm:px-6">

                                                    {user.role === 'admin' ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 ring-1 ring-inset ring-violet-200">
                                                            <i className="bi bi-shield-check"></i>
                                                            {t.admin}
                                                        </span>
                                                    ) : user.role === 'technician' ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-200">
                                                            <i className="bi bi-tools"></i>
                                                            {t.technician}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                                                            <i className="bi bi-person"></i>
                                                            {t.guest}
                                                        </span>
                                                    )}

                                                </td>


                                                {/* MANAGE */}
                                                <td className="px-5 py-4 text-right sm:px-6">

                                                    <select
                                                        value={user.role}
                                                        disabled={
                                                            savingId ===
                                                            user.id
                                                        }
                                                        onChange={(e) =>
                                                            updateRole(
                                                                user.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="
                                                            w-full
                                                            max-w-[180px]
                                                            rounded-xl
                                                            border
                                                            border-slate-200
                                                            bg-white
                                                            px-3 py-2
                                                            text-sm
                                                            font-semibold
                                                            text-slate-700
                                                            outline-none
                                                            transition
                                                            focus:border-blue-500
                                                            focus:ring-4
                                                            focus:ring-blue-500/10
                                                            disabled:cursor-not-allowed
                                                            disabled:opacity-60
                                                        "
                                                    >
                                                        <option value="guest">
                                                            {t.guestOption}
                                                        </option>

                                                        <option value="technician">
                                                            {t.technicianOption}
                                                        </option>

                                                        <option value="admin">
                                                            {t.adminOption}
                                                        </option>
                                                    </select>

                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </section>


                {/* NOTICE */}
                <section className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        <i className="bi bi-info-circle"></i>
                    </div>

                    <div>

                        <div className="font-bold text-amber-900">
                            {t.noticeTitle}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-amber-800">
                            {t.noticeDescription}
                        </p>

                    </div>

                </section>

            </div>
        </MaintenanceLayout>
    );
}