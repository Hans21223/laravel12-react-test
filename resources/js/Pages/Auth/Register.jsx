import React from 'react';
import {
    Head,
    Link,
    useForm,
} from '@inertiajs/react';

import FixFlowAuthLayout from '@/Layouts/FixFlowAuthLayout';

export default function Register() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () =>
                reset(
                    'password',
                    'password_confirmation'
                ),
        });
    };

    return (
        <FixFlowAuthLayout
            title="สร้างบัญชีใหม่"
            subtitle="สมัครสมาชิกเพื่อเริ่มแจ้งและติดตามงานซ่อมผ่าน FixFlow"
        >
            <Head title="สมัครสมาชิก" />


            <form
                onSubmit={submit}
                className="space-y-5"
            >

                {/* NAME */}
                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        ชื่อ - นามสกุล
                    </label>

                    <input
                        type="text"
                        value={data.name}
                        autoFocus
                        autoComplete="name"
                        onChange={(e) =>
                            setData(
                                'name',
                                e.target.value
                            )
                        }
                        placeholder="กรอกชื่อและนามสกุล"
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
                                errors.name
                                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                            }
                        `}
                    />

                    {errors.name && (
                        <p className="mt-2 text-sm text-rose-600">
                            {errors.name}
                        </p>
                    )}

                </div>


                {/* EMAIL */}
                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        อีเมล
                    </label>

                    <input
                        type="email"
                        value={data.email}
                        autoComplete="username"
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

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        รหัสผ่าน
                    </label>

                    <input
                        type="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData(
                                'password',
                                e.target.value
                            )
                        }
                        placeholder="อย่างน้อย 8 ตัวอักษร"
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


                {/* CONFIRM PASSWORD */}
                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        ยืนยันรหัสผ่าน
                    </label>

                    <input
                        type="password"
                        value={
                            data.password_confirmation
                        }
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData(
                                'password_confirmation',
                                e.target.value
                            )
                        }
                        placeholder="กรอกรหัสผ่านอีกครั้ง"
                        className="
                            w-full
                            rounded-xl
                            border border-slate-200
                            bg-white
                            px-4 py-3.5
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

                    {errors.password_confirmation && (
                        <p className="mt-2 text-sm text-rose-600">
                            {
                                errors.password_confirmation
                            }
                        </p>
                    )}

                </div>


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
                    {processing
                        ? 'กำลังสร้างบัญชี...'
                        : 'สมัครสมาชิก'}
                </button>

            </form>


            <div className="mt-7 text-center text-sm text-slate-600">

                มีบัญชีอยู่แล้ว?

                <Link
                    href={route('login')}
                    className="ml-2 font-bold text-blue-600 no-underline hover:text-blue-800"
                >
                    เข้าสู่ระบบ
                </Link>

            </div>

        </FixFlowAuthLayout>
    );
}