import React from 'react';
import {
    Head,
    Link,
    useForm,
} from '@inertiajs/react';

import FixFlowAuthLayout from '@/Layouts/FixFlowAuthLayout';

export default function Login({
    status,
    canResetPassword,
}) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () =>
                reset('password'),
        });
    };

    return (
        <FixFlowAuthLayout
            title="เข้าสู่ระบบ"
            subtitle="เข้าสู่บัญชีของคุณเพื่อใช้งานระบบจัดการงานซ่อม"
        >
            <Head title="เข้าสู่ระบบ" />

            {status && (
                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}


            <form
                onSubmit={submit}
                className="space-y-5"
            >

                {/* EMAIL */}
                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        อีเมล
                    </label>

                    <input
                        type="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) =>
                            setData(
                                'email',
                                e.target.value
                            )
                        }
                        placeholder="name@example.com"
                        className={`
                            w-full
                            rounded-xl
                            border
                            bg-white
                            px-4 py-3.5
                            text-sm
                            text-slate-900
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:ring-4
                            ${
                                errors.email
                                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                            }
                        `}
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-rose-600">
                            {errors.email}
                        </p>
                    )}

                </div>


                {/* PASSWORD */}
                <div>

                    <div className="mb-2 flex items-center justify-between">

                        <label className="text-sm font-semibold text-slate-700">
                            รหัสผ่าน
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route(
                                    'password.request'
                                )}
                                className="text-sm font-semibold text-blue-600 no-underline hover:text-blue-800"
                            >
                                ลืมรหัสผ่าน?
                            </Link>
                        )}

                    </div>

                    <input
                        type="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) =>
                            setData(
                                'password',
                                e.target.value
                            )
                        }
                        placeholder="••••••••"
                        className={`
                            w-full
                            rounded-xl
                            border
                            bg-white
                            px-4 py-3.5
                            text-sm
                            text-slate-900
                            outline-none
                            transition
                            placeholder:text-slate-400
                            focus:ring-4
                            ${
                                errors.password
                                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                            }
                        `}
                    />

                    {errors.password && (
                        <p className="mt-2 text-sm text-rose-600">
                            {errors.password}
                        </p>
                    )}

                </div>


                {/* REMEMBER */}
                <label className="flex cursor-pointer items-center gap-3">

                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) =>
                            setData(
                                'remember',
                                e.target.checked
                            )
                        }
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span className="text-sm text-slate-600">
                        จดจำการเข้าสู่ระบบ
                    </span>

                </label>


                {/* LOGIN */}
                <button
                    type="submit"
                    disabled={processing}
                    className="
                        flex w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5 py-3.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                        transition
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {processing ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            กำลังเข้าสู่ระบบ...
                        </>
                    ) : (
                        'เข้าสู่ระบบ'
                    )}
                </button>

            </form>


            <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs text-slate-400">
                    หรือ
                </span>

                <div className="h-px flex-1 bg-slate-200" />

            </div>


            <div className="text-center text-sm text-slate-600">

                ยังไม่มีบัญชี?

                <Link
                    href={route('register')}
                    className="ml-2 font-bold text-blue-600 no-underline hover:text-blue-800"
                >
                    สมัครสมาชิก
                </Link>

            </div>

        </FixFlowAuthLayout>
    );
}