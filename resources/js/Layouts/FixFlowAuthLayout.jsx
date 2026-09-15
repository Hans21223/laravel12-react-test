import React from 'react';
import { Link } from '@inertiajs/react';

export default function FixFlowAuthLayout({
    children,
    title,
    subtitle,
}) {
    return (
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

            {/* LEFT */}
            <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col">

                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

                <div className="relative z-10">

                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 no-underline"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-950/40">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-6 w-6"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.7 6.3a4 4 0 0 0-5-5L7.4 3.6l3 3-3.8 3.8-3-3-2.3 2.3a4 4 0 0 0 5 5l7.7-7.7Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m13 11 8 8-2 2-8-8"
                                />
                            </svg>
                        </div>

                        <div>
                            <div className="text-2xl font-bold tracking-tight text-white">
                                FixFlow
                            </div>

                            <div className="text-sm text-slate-400">
                                Maintenance System
                            </div>
                        </div>
                    </Link>

                </div>


                <div className="relative z-10 my-auto max-w-xl">

                    <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
                        Maintenance Management Platform
                    </div>

                    <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight">
                        จัดการงานซ่อม
                        <br />
                        <span className="text-blue-400">
                            ง่ายขึ้นในที่เดียว
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                        ตั้งแต่การแจ้งปัญหา มอบหมายช่าง
                        ติดตามสถานะการซ่อม
                        ไปจนถึงการออกใบแจ้งหนี้
                    </p>


                    <div className="mt-10 grid gap-4">

                        {[
                            'แจ้งปัญหาและติดตามสถานะได้ง่าย',
                            'มอบหมายช่างและบันทึกการซ่อม',
                            'สรุปค่าใช้จ่ายและออกใบแจ้งหนี้',
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 text-slate-300"
                            >
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                    ✓
                                </div>

                                <span>
                                    {item}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>


                <div className="relative z-10 text-sm text-slate-500">
                    © 2026 FixFlow Maintenance System
                </div>

            </section>


            {/* RIGHT */}
            <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">

                <div className="w-full max-w-md">

                    {/* MOBILE BRAND */}
                    <div className="mb-10 flex items-center gap-3 lg:hidden">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <span className="text-xl">
                                ⚒
                            </span>
                        </div>

                        <div>
                            <div className="text-xl font-bold text-slate-900">
                                FixFlow
                            </div>

                            <div className="text-xs text-slate-500">
                                Maintenance System
                            </div>
                        </div>

                    </div>


                    <div className="mb-8">

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            {title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {subtitle}
                        </p>

                    </div>


                    {children}

                </div>

            </section>

        </div>
    );
}