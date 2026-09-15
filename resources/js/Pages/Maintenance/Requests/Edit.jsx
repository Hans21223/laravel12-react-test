import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MaintenanceLayout from '@/Layouts/MaintenanceLayout';
import useFixFlowSettings from '@/hooks/useFixFlowSettings';

export default function Edit({ requestId }) {
    const { language } = useFixFlowSettings();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: '',
        equipment_type: '',
        location: '',
        description: '',
        priority: 'medium',
    });

    const text = {
        th: {
            title: 'แก้ไขรายการแจ้งซ่อม',
            description:
                'แก้ไขรายละเอียดของรายการแจ้งซ่อมที่บันทึกไว้',
            back: 'กลับรายละเอียด',
            requestInfo: 'ข้อมูลการแจ้งซ่อม',
            titleLabel: 'หัวข้อการแจ้งซ่อม',
            equipment: 'ประเภทอุปกรณ์',
            location: 'สถานที่',
            problem: 'รายละเอียดปัญหา',
            priority: 'ระดับความเร่งด่วน',
            save: 'บันทึกการแก้ไข',
            saving: 'กำลังบันทึก...',
            cancel: 'ยกเลิก',
            loading: 'กำลังโหลดข้อมูล...',
            success: 'แก้ไขรายการแจ้งซ่อมสำเร็จ',
            error: 'ไม่สามารถแก้ไขรายการแจ้งซ่อมได้',

            computer: 'คอมพิวเตอร์',
            air: 'เครื่องปรับอากาศ',
            printer: 'เครื่องพิมพ์',
            network: 'ระบบเครือข่าย',
            electrical: 'ระบบไฟฟ้า',
            furniture: 'เฟอร์นิเจอร์',
            other: 'อื่น ๆ',

            low: 'ต่ำ',
            medium: 'ปกติ',
            high: 'สูง',
            urgent: 'เร่งด่วน',
        },

        en: {
            title: 'Edit Repair Request',
            description:
                'Update the information for this maintenance request.',
            back: 'Back to Details',
            requestInfo: 'Request Information',
            titleLabel: 'Request Title',
            equipment: 'Equipment Type',
            location: 'Location',
            problem: 'Issue Description',
            priority: 'Priority Level',
            save: 'Save Changes',
            saving: 'Saving...',
            cancel: 'Cancel',
            loading: 'Loading data...',
            success: 'Repair request updated successfully',
            error: 'Unable to update repair request',

            computer: 'Computer',
            air: 'Air Conditioner',
            printer: 'Printer',
            network: 'Network',
            electrical: 'Electrical',
            furniture: 'Furniture',
            other: 'Other',

            low: 'Low',
            medium: 'Medium',
            high: 'High',
            urgent: 'Urgent',
        },
    };

    const t = text[language] ?? text.th;

    useEffect(() => {
        const loadRequest = async () => {
            setLoading(true);

            try {
                const response = await axios.get(
                    `/api/maintenance/requests/${requestId}`
                );

                const item = response.data;

                setForm({
                    title: item.title ?? '',
                    equipment_type:
                        item.equipment_type ?? '',
                    location: item.location ?? '',
                    description:
                        item.description ?? '',
                    priority:
                        item.priority ?? 'medium',
                });
            } catch (error) {
                console.error(error);
                alert(t.error);

                router.visit(
                    `/maintenance/requests/${requestId}`
                );
            } finally {
                setLoading(false);
            }
        };

        loadRequest();
    }, [requestId]);

    const handleChange = (field, value) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((current) => ({
                ...current,
                [field]: null,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setErrors({});

        try {
            await axios.put(
                `/api/maintenance/requests/${requestId}`,
                form
            );

            alert(t.success);

            router.visit(
                `/maintenance/requests/${requestId}`
            );
        } catch (error) {
            console.error(error);

            if (error.response?.status === 422) {
                setErrors(
                    error.response.data.errors ?? {}
                );
            } else {
                alert(
                    error.response?.data?.message ??
                        t.error
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const equipmentOptions = [
        ['Computer', t.computer],
        ['Air Conditioner', t.air],
        ['Printer', t.printer],
        ['Network', t.network],
        ['Electrical', t.electrical],
        ['Furniture', t.furniture],
        ['Other', t.other],
    ];

    if (loading) {
        return (
            <MaintenanceLayout title={t.title}>
                <div className="flex min-h-[500px] items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                        <span className="text-sm text-slate-500">
                            {t.loading}
                        </span>
                    </div>
                </div>
            </MaintenanceLayout>
        );
    }

    return (
        <MaintenanceLayout title={t.title}>
            <Head title={t.title} />

            <div className="mx-auto max-w-4xl space-y-6">

                <section>
                    <Link
                        href={`/maintenance/requests/${requestId}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 no-underline transition hover:text-slate-900"
                    >
                        <i className="bi bi-arrow-left"></i>
                        {t.back}
                    </Link>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                        {t.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {t.description}
                    </p>
                </section>

                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                    <div className="border-b border-slate-100 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <i className="bi bi-pencil-square"></i>
                            </div>

                            <h3 className="font-bold text-slate-900">
                                {t.requestInfo}
                            </h3>
                        </div>
                    </div>

                    <div className="space-y-6 p-6">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {t.titleLabel}
                            </label>

                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) =>
                                    handleChange(
                                        'title',
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                            {errors.title && (
                                <p className="mt-2 text-sm text-rose-600">
                                    {errors.title[0]}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {t.equipment}
                                </label>

                                <select
                                    value={
                                        form.equipment_type
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            'equipment_type',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                >
                                    {equipmentOptions.map(
                                        ([value, label]) => (
                                            <option
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </option>
                                        )
                                    )}
                                </select>

                                {errors.equipment_type && (
                                    <p className="mt-2 text-sm text-rose-600">
                                        {
                                            errors
                                                .equipment_type[0]
                                        }
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {t.location}
                                </label>

                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) =>
                                        handleChange(
                                            'location',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                                {errors.location && (
                                    <p className="mt-2 text-sm text-rose-600">
                                        {errors.location[0]}
                                    </p>
                                )}
                            </div>

                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                {t.problem}
                            </label>

                            <textarea
                                rows="5"
                                value={form.description}
                                onChange={(e) =>
                                    handleChange(
                                        'description',
                                        e.target.value
                                    )
                                }
                                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                            {errors.description && (
                                <p className="mt-2 text-sm text-rose-600">
                                    {errors.description[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-3 block text-sm font-semibold text-slate-700">
                                {t.priority}
                            </label>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                                {[
                                    ['low', t.low],
                                    ['medium', t.medium],
                                    ['high', t.high],
                                    ['urgent', t.urgent],
                                ].map(([value, label]) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() =>
                                            handleChange(
                                                'priority',
                                                value
                                            )
                                        }
                                        className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                                            form.priority ===
                                            value
                                                ? 'border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-500/10'
                                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}

                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end">

                        <Link
                            href={`/maintenance/requests/${requestId}`}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 no-underline transition hover:bg-slate-50"
                        >
                            {t.cancel}
                        </Link>

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    {t.saving}
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check2-circle"></i>
                                    {t.save}
                                </>
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </MaintenanceLayout>
    );
}