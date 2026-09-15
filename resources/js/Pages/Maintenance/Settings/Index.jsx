import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import MaintenanceLayout from '@/Layouts/MaintenanceLayout';

export default function Index() {
    const [theme, setTheme] = useState(
        localStorage.getItem('fixflow-theme') || 'light'
    );

    const [language, setLanguage] = useState(
        localStorage.getItem('fixflow-language') || 'th'
    );

    const applyTheme = (value) => {
        localStorage.setItem('fixflow-theme', value);
        setTheme(value);

        window.dispatchEvent(
            new CustomEvent('fixflow-theme-change', {
                detail: value,
            })
        );
    };

    const applyLanguage = (value) => {
        localStorage.setItem('fixflow-language', value);
        setLanguage(value);

        window.dispatchEvent(
            new CustomEvent('fixflow-language-change', {
                detail: value,
            })
        );
    };

    useEffect(() => {
        const savedTheme =
            localStorage.getItem('fixflow-theme') || 'light';

        const savedLanguage =
            localStorage.getItem('fixflow-language') || 'th';

        setTheme(savedTheme);
        setLanguage(savedLanguage);
    }, []);

    const isThai = language === 'th';

    return (
        <MaintenanceLayout
            title={isThai ? 'ตั้งค่า' : 'Settings'}
        >
            <Head
                title={isThai ? 'ตั้งค่า' : 'Settings'}
            />

            <div className="mx-auto max-w-4xl space-y-6">

                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        {isThai
                            ? 'ตั้งค่าระบบ'
                            : 'System Settings'}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {isThai
                            ? 'ปรับแต่งภาษาและรูปแบบการแสดงผลของ FixFlow'
                            : 'Customize the language and appearance of FixFlow.'}
                    </p>
                </div>


                {/* THEME */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-6 py-5">

                        <h3 className="text-lg font-bold text-slate-900">
                            {isThai
                                ? 'รูปแบบการแสดงผล'
                                : 'Appearance'}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {isThai
                                ? 'เลือกรูปแบบสีของระบบ'
                                : 'Choose how FixFlow should look.'}
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">

                        {/* LIGHT */}
                        <button
                            type="button"
                            onClick={() =>
                                applyTheme('light')
                            }
                            className={`
                                rounded-2xl border p-5 text-left transition
                                ${
                                    theme === 'light'
                                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10'
                                        : 'border-slate-200 bg-white hover:border-blue-300'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                    ☀
                                </div>

                                {theme === 'light' && (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                                        ✓
                                    </div>
                                )}

                            </div>

                            <div className="mt-4 font-bold text-slate-900">
                                {isThai
                                    ? 'สว่าง'
                                    : 'Light'}
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                {isThai
                                    ? 'ใช้ธีมสีสว่าง'
                                    : 'Use light appearance'}
                            </div>
                        </button>


                        {/* DARK */}
                        <button
                            type="button"
                            onClick={() =>
                                applyTheme('dark')
                            }
                            className={`
                                rounded-2xl border p-5 text-left transition
                                ${
                                    theme === 'dark'
                                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10'
                                        : 'border-slate-200 bg-white hover:border-blue-300'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                                    ☾
                                </div>

                                {theme === 'dark' && (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                                        ✓
                                    </div>
                                )}

                            </div>

                            <div className="mt-4 font-bold text-slate-900">
                                {isThai
                                    ? 'มืด'
                                    : 'Dark'}
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                {isThai
                                    ? 'ใช้ธีมสีเข้ม'
                                    : 'Use dark appearance'}
                            </div>
                        </button>


                        {/* SYSTEM */}
                        <button
                            type="button"
                            onClick={() =>
                                applyTheme('system')
                            }
                            className={`
                                rounded-2xl border p-5 text-left transition
                                ${
                                    theme === 'system'
                                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10'
                                        : 'border-slate-200 bg-white hover:border-blue-300'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                    <i className="bi bi-display"></i>
                                </div>

                                {theme === 'system' && (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                                        ✓
                                    </div>
                                )}

                            </div>

                            <div className="mt-4 font-bold text-slate-900">
                                {isThai
                                    ? 'ตามระบบ'
                                    : 'System'}
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                {isThai
                                    ? 'ใช้ค่าตามอุปกรณ์'
                                    : 'Follow device settings'}
                            </div>
                        </button>

                    </div>

                </section>


                {/* LANGUAGE */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-6 py-5">

                        <h3 className="text-lg font-bold text-slate-900">
                            {isThai
                                ? 'ภาษา'
                                : 'Language'}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {isThai
                                ? 'เลือกภาษาที่ใช้แสดงผลในระบบ'
                                : 'Choose the display language.'}
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

                        <button
                            type="button"
                            onClick={() =>
                                applyLanguage('th')
                            }
                            className={`
                                flex items-center justify-between
                                rounded-2xl border
                                p-5 text-left transition
                                ${
                                    language === 'th'
                                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10'
                                        : 'border-slate-200 bg-white hover:border-blue-300'
                                }
                            `}
                        >
                            <div>
                                <div className="text-lg font-bold text-slate-900">
                                    ภาษาไทย
                                </div>

                                <div className="mt-1 text-sm text-slate-500">
                                    Thai
                                </div>
                            </div>

                            {language === 'th' && (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                                    ✓
                                </div>
                            )}

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                applyLanguage('en')
                            }
                            className={`
                                flex items-center justify-between
                                rounded-2xl border
                                p-5 text-left transition
                                ${
                                    language === 'en'
                                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-500/10'
                                        : 'border-slate-200 bg-white hover:border-blue-300'
                                }
                            `}
                        >
                            <div>
                                <div className="text-lg font-bold text-slate-900">
                                    English
                                </div>

                                <div className="mt-1 text-sm text-slate-500">
                                    ภาษาอังกฤษ
                                </div>
                            </div>

                            {language === 'en' && (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                                    ✓
                                </div>
                            )}

                        </button>

                    </div>

                </section>


                {/* INFO */}
                <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">

                    <div className="flex gap-3">

                        <i className="bi bi-info-circle text-blue-600"></i>

                        <p className="text-sm leading-6 text-blue-800">
                            {isThai
                                ? 'การตั้งค่าจะถูกบันทึกไว้ในอุปกรณ์นี้ และจะยังคงอยู่เมื่อเปิด FixFlow ครั้งถัดไป'
                                : 'Your settings are saved on this device and will be restored the next time you open FixFlow.'}
                        </p>

                    </div>

                </section>

            </div>
        </MaintenanceLayout>
    );
}