import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MaintenanceLayout from '@/Layouts/MaintenanceLayout';
import useFixFlowSettings from '@/hooks/useFixFlowSettings';

export default function Create() {
    const { language } = useFixFlowSettings();

    const [form, setForm] = useState({
        title: '',
        equipment_type: '',
        location: '',
        description: '',
        priority: 'medium',
    });

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const text = {
        th: {
            layoutTitle: 'แจ้งซ่อม',
            pageTitle: 'แจ้งซ่อมใหม่',
            description:
                'กรอกรายละเอียดปัญหาเพื่อส่งคำขอซ่อมบำรุง',

            back: 'กลับรายการ',

            infoTitle: 'ขั้นตอนการแจ้งซ่อม',
            infoDescription:
                'ระบุข้อมูลอุปกรณ์ สถานที่ และรายละเอียดปัญหาให้ครบถ้วน เพื่อให้เจ้าหน้าที่สามารถมอบหมายช่างและดำเนินการได้รวดเร็วยิ่งขึ้น',

            requestInfo: 'ข้อมูลการแจ้งซ่อม',
            requestInfoDescription:
                'ข้อมูลหลักของปัญหาที่ต้องการแจ้ง',

            titleLabel: 'หัวข้อการแจ้งซ่อม',
            titlePlaceholder:
                'เช่น คอมพิวเตอร์เปิดไม่ติด',

            equipmentLabel: 'ประเภทอุปกรณ์',

            computer: 'คอมพิวเตอร์',
            airConditioner: 'เครื่องปรับอากาศ',
            printer: 'เครื่องพิมพ์',
            network: 'ระบบเครือข่าย',
            electrical: 'ระบบไฟฟ้า',
            furniture: 'เฟอร์นิเจอร์',
            other: 'อื่น ๆ',

            locationLabel: 'สถานที่',
            locationPlaceholder:
                'เช่น อาคาร 75 ห้อง 7502',

            descriptionLabel: 'รายละเอียดปัญหา',
            descriptionPlaceholder:
                'อธิบายอาการหรือปัญหาที่พบ...',

            priorityTitle: 'ระดับความเร่งด่วน',
            priorityDescription:
                'เลือกระดับตามผลกระทบของปัญหา',

            low: 'ต่ำ',
            lowDescription:
                'สามารถรอดำเนินการได้',

            medium: 'ปกติ',
            mediumDescription:
                'งานซ่อมทั่วไป',

            high: 'สูง',
            highDescription:
                'ควรเร่งดำเนินการ',

            urgent: 'เร่งด่วน',
            urgentDescription:
                'ต้องดำเนินการโดยเร็ว',

            cancel: 'ยกเลิก',
            submit: 'ส่งคำขอแจ้งซ่อม',
            saving: 'กำลังส่งข้อมูล...',

            success: 'สร้างใบแจ้งซ่อมสำเร็จ',
            error:
                'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        },

        en: {
            layoutTitle: 'New Request',
            pageTitle: 'New Repair Request',
            description:
                'Provide the issue details to submit a maintenance request.',

            back: 'Back to Requests',

            infoTitle: 'How to Submit a Request',
            infoDescription:
                'Provide the equipment, location and issue details clearly so the maintenance team can assign a technician and resolve the problem efficiently.',

            requestInfo: 'Request Information',
            requestInfoDescription:
                'Main information about the issue you are reporting.',

            titleLabel: 'Request Title',
            titlePlaceholder:
                'e.g. Computer will not turn on',

            equipmentLabel: 'Equipment Type',

            computer: 'Computer',
            airConditioner: 'Air Conditioner',
            printer: 'Printer',
            network: 'Network',
            electrical: 'Electrical',
            furniture: 'Furniture',
            other: 'Other',

            locationLabel: 'Location',
            locationPlaceholder:
                'e.g. Building 75, Room 7502',

            descriptionLabel: 'Issue Description',
            descriptionPlaceholder:
                'Describe the problem or symptoms...',

            priorityTitle: 'Priority Level',
            priorityDescription:
                'Select the priority based on the impact of the issue.',

            low: 'Low',
            lowDescription:
                'Can wait for normal processing',

            medium: 'Medium',
            mediumDescription:
                'General maintenance request',

            high: 'High',
            highDescription:
                'Should be handled soon',

            urgent: 'Urgent',
            urgentDescription:
                'Requires immediate attention',

            cancel: 'Cancel',
            submit: 'Submit Request',
            saving: 'Submitting...',

            success: 'Repair request created successfully',
            error:
                'Something went wrong. Please try again.',
        },
    };

    const t = text[language] ?? text.th;

    const handleChange = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });

        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setErrors({});

        try {
            const response = await axios.post(
                '/api/maintenance/requests',
                form
            );

            const newRequest = response.data?.data;

            alert(t.success);

            if (newRequest?.id) {
                router.visit(
                    `/maintenance/requests/${newRequest.id}`
                );
            } else {
                router.visit(
                    '/maintenance/requests'
                );
            }
        } catch (error) {
            console.error(error);

            if (error.response?.status === 422) {
                setErrors(
                    error.response.data.errors ?? {}
                );
            } else {
                alert(t.error);
            }
        } finally {
            setSaving(false);
        }
    };

    const equipmentOptions = [
        {
            value: 'Computer',
            label: t.computer,
            icon: 'bi-pc-display',
        },
        {
            value: 'Air Conditioner',
            label: t.airConditioner,
            icon: 'bi-snow',
        },
        {
            value: 'Printer',
            label: t.printer,
            icon: 'bi-printer',
        },
        {
            value: 'Network',
            label: t.network,
            icon: 'bi-wifi',
        },
        {
            value: 'Electrical',
            label: t.electrical,
            icon: 'bi-lightning-charge',
        },
        {
            value: 'Furniture',
            label: t.furniture,
            icon: 'bi-building',
        },
        {
            value: 'Other',
            label: t.other,
            icon: 'bi-three-dots',
        },
    ];

    const priorityOptions = [
        {
            value: 'low',
            label: t.low,
            description: t.lowDescription,
            className:
                'border-slate-200 bg-white text-slate-700',
            activeClass:
                'border-slate-500 bg-slate-50 ring-4 ring-slate-500/10',
            dot: 'bg-slate-400',
        },
        {
            value: 'medium',
            label: t.medium,
            description: t.mediumDescription,
            className:
                'border-blue-200 bg-white text-blue-700',
            activeClass:
                'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10',
            dot: 'bg-blue-500',
        },
        {
            value: 'high',
            label: t.high,
            description: t.highDescription,
            className:
                'border-orange-200 bg-white text-orange-700',
            activeClass:
                'border-orange-500 bg-orange-50 ring-4 ring-orange-500/10',
            dot: 'bg-orange-500',
        },
        {
            value: 'urgent',
            label: t.urgent,
            description: t.urgentDescription,
            className:
                'border-rose-200 bg-white text-rose-700',
            activeClass:
                'border-rose-500 bg-rose-50 ring-4 ring-rose-500/10',
            dot: 'bg-rose-500',
        },
    ];

    return (
        <MaintenanceLayout title={t.layoutTitle}>
            <Head title={t.pageTitle} />

            <div className="mx-auto max-w-5xl space-y-6">

                {/* HEADER */}
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            {t.pageTitle}
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            {t.description}
                        </p>
                    </div>

                    <Link
                        href="/maintenance/requests"
                        className="
                            inline-flex items-center justify-center gap-2
                            rounded-xl
                            border border-slate-200
                            bg-white
                            px-4 py-2.5
                            text-sm font-semibold
                            text-slate-600
                            no-underline
                            shadow-sm
                            transition
                            hover:bg-slate-50
                            hover:text-slate-900
                        "
                    >
                        <i className="bi bi-arrow-left"></i>
                        {t.back}
                    </Link>

                </section>


                {/* INFO */}
                <section className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <i className="bi bi-info-circle text-lg"></i>
                    </div>

                    <div>
                        <div className="font-bold text-blue-900">
                            {t.infoTitle}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-blue-700">
                            {t.infoDescription}
                        </p>
                    </div>

                </section>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* BASIC INFO */}
                    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 px-6 py-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <i className="bi bi-card-text"></i>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        {t.requestInfo}
                                    </h3>

                                    <p className="mt-0.5 text-sm text-slate-500">
                                        {t.requestInfoDescription}
                                    </p>
                                </div>

                            </div>

                        </div>


                        <div className="space-y-6 p-6">

                            {/* TITLE */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {t.titleLabel}
                                    <span className="ml-1 text-rose-500">
                                        *
                                    </span>
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
                                    placeholder={t.titlePlaceholder}
                                    className={`
                                        w-full rounded-xl border bg-white
                                        px-4 py-3 text-sm text-slate-900
                                        outline-none transition
                                        placeholder:text-slate-400
                                        focus:ring-4
                                        ${
                                            errors.title
                                                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                                        }
                                    `}
                                />

                                {errors.title && (
                                    <p className="mt-2 text-sm text-rose-600">
                                        {errors.title[0]}
                                    </p>
                                )}

                            </div>


                            {/* EQUIPMENT */}
                            <div>

                                <label className="mb-3 block text-sm font-semibold text-slate-700">
                                    {t.equipmentLabel}
                                    <span className="ml-1 text-rose-500">
                                        *
                                    </span>
                                </label>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

                                    {equipmentOptions.map(
                                        (option) => {
                                            const selected =
                                                form.equipment_type ===
                                                option.value;

                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() =>
                                                        handleChange(
                                                            'equipment_type',
                                                            option.value
                                                        )
                                                    }
                                                    className={`
                                                        flex min-h-[105px]
                                                        flex-col items-center
                                                        justify-center gap-2
                                                        rounded-xl border
                                                        p-4 text-center
                                                        transition
                                                        ${
                                                            selected
                                                                ? 'border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-500/10'
                                                                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50'
                                                        }
                                                    `}
                                                >
                                                    <i
                                                        className={`bi ${option.icon} text-2xl`}
                                                    ></i>

                                                    <span className="text-sm font-semibold">
                                                        {option.label}
                                                    </span>

                                                </button>
                                            );
                                        }
                                    )}

                                </div>

                                {errors.equipment_type && (
                                    <p className="mt-2 text-sm text-rose-600">
                                        {errors.equipment_type[0]}
                                    </p>
                                )}

                            </div>


                            {/* LOCATION */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {t.locationLabel}
                                    <span className="ml-1 text-rose-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <i className="bi bi-geo-alt pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>

                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={(e) =>
                                            handleChange(
                                                'location',
                                                e.target.value
                                            )
                                        }
                                        placeholder={t.locationPlaceholder}
                                        className={`
                                            w-full rounded-xl border bg-white
                                            py-3 pl-11 pr-4
                                            text-sm text-slate-900
                                            outline-none transition
                                            placeholder:text-slate-400
                                            focus:ring-4
                                            ${
                                                errors.location
                                                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                                            }
                                        `}
                                    />

                                </div>

                                {errors.location && (
                                    <p className="mt-2 text-sm text-rose-600">
                                        {errors.location[0]}
                                    </p>
                                )}

                            </div>


                            {/* DESCRIPTION */}
                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    {t.descriptionLabel}
                                    <span className="ml-1 text-rose-500">
                                        *
                                    </span>
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
                                    placeholder={t.descriptionPlaceholder}
                                    className={`
                                        w-full resize-none rounded-xl
                                        border bg-white
                                        px-4 py-3 text-sm
                                        text-slate-900 outline-none
                                        transition placeholder:text-slate-400
                                        focus:ring-4
                                        ${
                                            errors.description
                                                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                                : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                                        }
                                    `}
                                />

                                {errors.description && (
                                    <p className="mt-2 text-sm text-rose-600">
                                        {errors.description[0]}
                                    </p>
                                )}

                            </div>

                        </div>

                    </section>


                    {/* PRIORITY */}
                    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                        <div className="border-b border-slate-100 px-6 py-5">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <i className="bi bi-exclamation-triangle"></i>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        {t.priorityTitle}
                                    </h3>

                                    <p className="mt-0.5 text-sm text-slate-500">
                                        {t.priorityDescription}
                                    </p>
                                </div>

                            </div>

                        </div>


                        <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2">

                            {priorityOptions.map(
                                (option) => {
                                    const active =
                                        form.priority ===
                                        option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() =>
                                                handleChange(
                                                    'priority',
                                                    option.value
                                                )
                                            }
                                            className={`
                                                flex items-center gap-4
                                                rounded-xl border
                                                p-4 text-left transition
                                                ${option.className}
                                                ${
                                                    active
                                                        ? option.activeClass
                                                        : 'hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            <div
                                                className={`
                                                    h-3 w-3 shrink-0
                                                    rounded-full
                                                    ${option.dot}
                                                `}
                                            />

                                            <div>
                                                <div className="font-bold">
                                                    {option.label}
                                                </div>

                                                <div className="mt-0.5 text-xs opacity-70">
                                                    {option.description}
                                                </div>
                                            </div>

                                            {active && (
                                                <i className="bi bi-check-circle-fill ml-auto"></i>
                                            )}

                                        </button>
                                    );
                                }
                            )}

                        </div>

                    </section>


                    {/* ACTION */}
                    <section className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                        <Link
                            href="/maintenance/requests"
                            className="
                                inline-flex items-center justify-center
                                rounded-xl border border-slate-200
                                bg-white px-6 py-3
                                text-sm font-semibold text-slate-600
                                no-underline transition
                                hover:bg-slate-50
                            "
                        >
                            {t.cancel}
                        </Link>

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                inline-flex items-center justify-center gap-2
                                rounded-xl bg-blue-600
                                px-7 py-3
                                text-sm font-semibold text-white
                                shadow-lg shadow-blue-600/20
                                transition hover:bg-blue-700
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {saving ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                                    {t.saving}
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send"></i>
                                    {t.submit}
                                </>
                            )}
                        </button>

                    </section>

                </form>

            </div>
        </MaintenanceLayout>
    );
}