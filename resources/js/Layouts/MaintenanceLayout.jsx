import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";

export default function MaintenanceLayout({
    children,
    title = "Maintenance System",
}) {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const [theme, setTheme] = useState(
        localStorage.getItem("fixflow-theme") || "light",
    );

    const [language, setLanguage] = useState(
        localStorage.getItem("fixflow-language") || "th",
    );

    const isThai = language === "th";

    const translations = {
        th: {
            dashboard: "Dashboard",
            newRequest: "แจ้งซ่อม",
            requests: "รายการแจ้งซ่อม",
            technicians: "ช่างซ่อม",
            invoices: "ใบแจ้งหนี้",
            profile: "โปรไฟล์ของฉัน",
            settings: "ตั้งค่า",
            menu: "เมนู",
            subtitle: "ระบบบริหารจัดการงานซ่อมบำรุง",
            account: "บัญชีผู้ใช้",
            logout: "ออกจากระบบ",
            oldSystem: "กลับระบบเดิม",
        },

        en: {
            dashboard: "Dashboard",
            newRequest: "New Request",
            requests: "Repair Requests",
            technicians: "Technicians",
            invoices: "Invoices",
            profile: "My Profile",
            settings: "Settings",
            menu: "Menu",
            subtitle: "Maintenance Management System",
            account: "Account",
            logout: "Logout",
            oldSystem: "Back to Old System",
        },
    };

    const t = translations[language];

    const applyTheme = (value) => {
        let darkMode = false;

        if (value === "dark") {
            darkMode = true;
        }

        if (value === "system") {
            darkMode = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;
        }

        document.documentElement.classList.toggle("fixflow-dark", darkMode);

        setTheme(value);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("fixflow-theme") || "light";

        const savedLanguage = localStorage.getItem("fixflow-language") || "th";

        setLanguage(savedLanguage);
        applyTheme(savedTheme);

        const handleTheme = (event) => {
            applyTheme(event.detail);
        };

        const handleLanguage = (event) => {
            setLanguage(event.detail);
        };

        window.addEventListener("fixflow-theme-change", handleTheme);

        window.addEventListener("fixflow-language-change", handleLanguage);

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const systemThemeChanged = () => {
            const current = localStorage.getItem("fixflow-theme");

            if (current === "system") {
                applyTheme("system");
            }
        };

        media.addEventListener("change", systemThemeChanged);

        return () => {
            window.removeEventListener("fixflow-theme-change", handleTheme);

            window.removeEventListener(
                "fixflow-language-change",
                handleLanguage,
            );

            media.removeEventListener("change", systemThemeChanged);
        };
    }, []);

    const role = user?.role ?? "guest";

    const menuItems = [
        // ทุก Role เห็น Dashboard
        {
            name: t.dashboard,
            href: "/maintenance",
            icon: "bi-grid",
        },

        {
            name: t.profile,
            href: "/maintenance/profile",
            icon: "bi-person-circle",
        },

        // User และ Admin แจ้งซ่อมใหม่ได้
        ...(["guest", "admin"].includes(role)
            ? [
                  {
                      name: t.newRequest,
                      href: "/maintenance/requests/create",
                      icon: "bi-plus-circle",
                  },
              ]
            : []),

        // ทุก Role มีหน้ารายการงาน
        {
            name: t.requests,
            href: "/maintenance/requests",
            icon: "bi-tools",
        },

        // เฉพาะ Admin จัดการผู้ใช้/ช่าง
        ...(role === "admin"
            ? [
                  {
                      name: t.technicians,
                      href: "/maintenance/technicians",
                      icon: "bi-person-gear",
                  },
              ]
            : []),

        // เฉพาะ Admin ดูใบแจ้งหนี้
        ...(role === "admin"
            ? [
                  {
                      name: t.invoices,
                      href: "/maintenance/invoices",
                      icon: "bi-receipt",
                  },
              ]
            : []),
    ];

    const isActive = (href) => {
        if (href === "/maintenance") {
            return url === "/maintenance";
        }

        if (href === "/maintenance/requests/create") {
            return url === "/maintenance/requests/create";
        }

        if (href === "/maintenance/requests") {
            return (
                url === "/maintenance/requests" ||
                (url.startsWith("/maintenance/requests/") &&
                    url !== "/maintenance/requests/create")
            );
        }

        if (href === "/maintenance/technicians") {
            return url.startsWith("/maintenance/technicians");
        }

        if (href === "/maintenance/invoices") {
            return url.startsWith("/maintenance/invoices");
        }

        return url === href;
    };

    const logout = () => {
        router.post("/logout");
    };

    return (
        <div className="fixflow-app min-h-screen bg-slate-50">
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                rel="stylesheet"
            />

            {/* DARK MODE OVERRIDES */}
            <style>{`
    .fixflow-dark .fixflow-app {
        background: #020617 !important;
        color: #e2e8f0 !important;
    }

    /* MAIN SURFACES */
    .fixflow-dark .bg-white {
        background-color: #0f172a !important;
    }

    .fixflow-dark .bg-slate-50,
    .fixflow-dark .bg-slate-50\\/50 {
        background-color: #020617 !important;
    }

    .fixflow-dark .bg-slate-100 {
        background-color: #1e293b !important;
    }

    .fixflow-dark .bg-slate-200 {
        background-color: #334155 !important;
    }

    /* TEXT */
    .fixflow-dark .text-slate-900,
    .fixflow-dark .text-slate-800,
    .fixflow-dark .text-slate-700 {
        color: #f8fafc !important;
    }

    .fixflow-dark .text-slate-600,
    .fixflow-dark .text-slate-500 {
        color: #cbd5e1 !important;
    }

    .fixflow-dark .text-slate-400 {
        color: #94a3b8 !important;
    }

    /* BORDERS */
    .fixflow-dark .border-slate-100,
    .fixflow-dark .border-slate-200,
    .fixflow-dark .border-slate-300 {
        border-color: #334155 !important;
    }

    /* INPUTS */
    .fixflow-dark input,
    .fixflow-dark textarea,
    .fixflow-dark select {
        background-color: #0f172a !important;
        color: #f8fafc !important;
        border-color: #475569 !important;
    }

    .fixflow-dark input::placeholder,
    .fixflow-dark textarea::placeholder {
        color: #64748b !important;
    }

    .fixflow-dark select option {
        background-color: #0f172a !important;
        color: #f8fafc !important;
    }

    /* TABLE */
    .fixflow-dark table {
        background-color: #0f172a !important;
    }

    .fixflow-dark thead,
    .fixflow-dark thead.bg-slate-50 {
        background-color: #1e293b !important;
    }

    .fixflow-dark tbody tr {
        border-color: #334155 !important;
    }

    .fixflow-dark tbody tr:hover {
        background-color: #1e293b !important;
    }

    /* BLUE */
    .fixflow-dark .bg-blue-50 {
        background-color: rgba(37, 99, 235, 0.18) !important;
    }

    .fixflow-dark .bg-blue-100 {
        background-color: rgba(37, 99, 235, 0.28) !important;
    }

    .fixflow-dark .text-blue-600,
    .fixflow-dark .text-blue-700,
    .fixflow-dark .text-blue-800,
    .fixflow-dark .text-blue-900 {
        color: #93c5fd !important;
    }

    .fixflow-dark .border-blue-100,
    .fixflow-dark .border-blue-200,
    .fixflow-dark .border-blue-300 {
        border-color: #2563eb !important;
    }

    /* EMERALD / GREEN */
    .fixflow-dark .bg-emerald-50 {
        background-color: rgba(16, 185, 129, 0.16) !important;
    }

    .fixflow-dark .bg-emerald-100 {
        background-color: rgba(16, 185, 129, 0.24) !important;
    }

    .fixflow-dark .text-emerald-600,
    .fixflow-dark .text-emerald-700,
    .fixflow-dark .text-emerald-800,
    .fixflow-dark .text-emerald-900 {
        color: #6ee7b7 !important;
    }

    .fixflow-dark .border-emerald-100,
    .fixflow-dark .border-emerald-200,
    .fixflow-dark .border-emerald-300 {
        border-color: #059669 !important;
    }

    /* AMBER / YELLOW */
    .fixflow-dark .bg-amber-50 {
        background-color: rgba(245, 158, 11, 0.16) !important;
    }

    .fixflow-dark .bg-amber-100 {
        background-color: rgba(245, 158, 11, 0.24) !important;
    }

    .fixflow-dark .text-amber-600,
    .fixflow-dark .text-amber-700,
    .fixflow-dark .text-amber-800,
    .fixflow-dark .text-amber-900 {
        color: #fcd34d !important;
    }

    .fixflow-dark .border-amber-100,
    .fixflow-dark .border-amber-200,
    .fixflow-dark .border-amber-300 {
        border-color: #d97706 !important;
    }

    /* ORANGE */
    .fixflow-dark .bg-orange-50 {
        background-color: rgba(249, 115, 22, 0.16) !important;
    }

    .fixflow-dark .text-orange-600,
    .fixflow-dark .text-orange-700,
    .fixflow-dark .text-orange-800 {
        color: #fdba74 !important;
    }

    .fixflow-dark .border-orange-200 {
        border-color: #ea580c !important;
    }

    /* ROSE / RED */
    .fixflow-dark .bg-rose-50 {
        background-color: rgba(244, 63, 94, 0.16) !important;
    }

    .fixflow-dark .bg-rose-100 {
        background-color: rgba(244, 63, 94, 0.24) !important;
    }

    .fixflow-dark .text-rose-600,
    .fixflow-dark .text-rose-700,
    .fixflow-dark .text-rose-800 {
        color: #fda4af !important;
    }

    .fixflow-dark .border-rose-200 {
        border-color: #e11d48 !important;
    }

    /* VIOLET */
    .fixflow-dark .bg-violet-50 {
        background-color: rgba(139, 92, 246, 0.16) !important;
    }

    .fixflow-dark .bg-violet-100 {
        background-color: rgba(139, 92, 246, 0.24) !important;
    }

    .fixflow-dark .text-violet-600,
    .fixflow-dark .text-violet-700,
    .fixflow-dark .text-violet-800 {
        color: #c4b5fd !important;
    }

    .fixflow-dark .border-violet-200 {
        border-color: #7c3aed !important;
    }

    /* CYAN */
    .fixflow-dark .bg-cyan-50 {
        background-color: rgba(6, 182, 212, 0.16) !important;
    }

    .fixflow-dark .text-cyan-600,
    .fixflow-dark .text-cyan-700 {
        color: #67e8f9 !important;
    }

    .fixflow-dark .border-cyan-200 {
        border-color: #0891b2 !important;
    }

    /* BUTTONS / HOVER */
    .fixflow-dark .hover\\:bg-slate-50:hover,
    .fixflow-dark .hover\\:bg-slate-100:hover {
        background-color: #1e293b !important;
    }

    .fixflow-dark .hover\\:text-slate-900:hover {
        color: #ffffff !important;
    }

    /* DROPDOWN */
    .fixflow-dark .shadow-xl,
    .fixflow-dark .shadow-sm {
        box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.35) !important;
    }

    /* DISABLED */
    .fixflow-dark button:disabled,
    .fixflow-dark select:disabled,
    .fixflow-dark input:disabled {
        opacity: 0.55;
    }
`}</style>

            {/* MOBILE OVERLAY */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-[280px] flex-col
                    bg-slate-950
                    px-5 py-6
                    text-white
                    shadow-2xl
                    transition-transform duration-300
                    lg:translate-x-0
                    ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* BRAND */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-950/30">
                            <i className="bi bi-tools text-xl"></i>
                        </div>

                        <div>
                            <div className="text-xl font-bold">FixFlow</div>

                            <div className="text-sm text-slate-400">
                                Maintenance System
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    {t.menu}
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                                    group flex items-center gap-3
                                    rounded-xl px-4 py-3
                                    text-[15px] font-medium
                                    no-underline
                                    transition-all
                                    ${
                                        active
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                                            : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                                    }
                                `}
                            >
                                <div
                                    className={`
                                        flex h-8 w-8 items-center justify-center
                                        rounded-lg
                                        ${
                                            active
                                                ? "bg-white/15"
                                                : "bg-white/[0.04]"
                                        }
                                    `}
                                >
                                    <i className={`bi ${item.icon}`}></i>
                                </div>

                                <span>{item.name}</span>

                                {active && (
                                    <i className="bi bi-chevron-right ml-auto text-xs opacity-70"></i>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* SETTINGS */}
                <div className="mt-auto space-y-1 border-t border-white/10 pt-5">
                    <Link
                        href="/maintenance/settings"
                        className={`
                            flex items-center gap-3
                            rounded-xl px-4 py-3
                            text-sm font-medium
                            no-underline
                            transition
                            ${
                                url.startsWith("/maintenance/settings")
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
                            }
                        `}
                    >
                        <i className="bi bi-gear"></i>

                        <span>{t.settings}</span>
                    </Link>

                    <Link
                        href="/dashboard"
                        className="
                            flex items-center gap-3
                            rounded-xl
                            px-4 py-3
                            text-sm font-medium
                            text-slate-400
                            no-underline
                            transition
                            hover:bg-white/[0.07]
                            hover:text-white
                        "
                    >
                        <i className="bi bi-arrow-left"></i>

                        <span>{t.oldSystem}</span>
                    </Link>
                </div>
            </aside>

            {/* PAGE */}
            <div className="min-h-screen lg:pl-[280px]">
                {/* TOPBAR */}
                <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white">
                    <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
                            >
                                <i className="bi bi-list text-xl"></i>
                            </button>

                            <div>
                                <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                                    {title}
                                </h1>

                                <p className="hidden text-sm text-slate-500 sm:block">
                                    {t.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* USER MENU */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-100"
                            >
                                <div className="hidden text-right sm:block">
                                    <div className="max-w-[220px] truncate text-sm font-semibold text-slate-900">
                                        {user?.name ?? "User"}
                                    </div>

                                    <div className="text-xs capitalize text-slate-500">
                                        {user?.role ?? "guest"}
                                    </div>
                                </div>

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                    {(user?.name ?? "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <i className="bi bi-chevron-down text-xs text-slate-400"></i>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                                    <div className="border-b border-slate-100 p-4">
                                        <div className="font-semibold text-slate-900">
                                            {user?.name}
                                        </div>

                                        <div className="mt-1 truncate text-xs text-slate-500">
                                            {user?.email}
                                        </div>
                                    </div>

                                    <div className="p-2">
                                        <Link
                                            href="/maintenance/settings"
                                            onClick={() =>
                                                setUserMenuOpen(false)
                                            }
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-100"
                                        >
                                            <i className="bi bi-gear"></i>

                                            {t.settings}
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={logout}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                        >
                                            <i className="bi bi-box-arrow-right"></i>

                                            {t.logout}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
