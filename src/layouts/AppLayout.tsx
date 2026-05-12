import { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, LogOut, ChevronRight, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthModal } from '../features/auth/context/AuthModalContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

/* ── Route → breadcrumb label map ────────────────────────────────────── */
const ROUTE_LABELS: Record<string, string> = {
    '/dashboard':                  'Inicio',
    '/dashboard/usuarios':         'Usuarios',
    '/dashboard/companias':        'Compañías',
    '/dashboard/servicios':        'Servicios',
    '/dashboard/ubicaciones':      'Ubicaciones',
    '/dashboard/perfiles':         'Perfiles',
    '/dashboard/actividades':      'Actividades',
    '/dashboard/certificaciones':  'Certificaciones',
    '/dashboard/poi':              'Puntos de Interés',
    '/dashboard/estadisticas':     'Estadísticas',
    '/dashboard/instrumentos':     'Instrumentos',
    '/dashboard/configuracion':    'Configuración',
};

const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

/* ── Breadcrumb ──────────────────────────────────────────────────────── */
const Breadcrumb = ({ pathname }: { pathname: string }) => {
    const segments = pathname.split('/').filter(Boolean);
    const crumbs = segments.map((_, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/');
        return { label: ROUTE_LABELS[path] ?? segments[i], path };
    });

    return (
        <nav className="flex items-center gap-1 text-sm">
            {crumbs.map((crumb, i) => (
                <span key={crumb.path} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />}
                    <span
                        className={
                            i === crumbs.length - 1
                                ? 'font-semibold'
                                : 'text-zinc-400 dark:text-zinc-500'
                        }
                        style={i === crumbs.length - 1 ? { color: 'var(--color-text)' } : {}}
                    >
                        {crumb.label}
                    </span>
                </span>
            ))}
        </nav>
    );
};

/* ── Main layout ─────────────────────────────────────────────────────── */
export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const navigate = useNavigate();
    const { openModal } = useAuthModal();
    const { t } = useLanguage();
    const { pathname } = useLocation();
    const { theme, toggleTheme } = useTheme();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userRole = user?.role_id || 2;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        openModal('login');
        navigate('/');
    };

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--color-bg)' }}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex min-w-0 flex-1 flex-col">

                {/* ── Desktop header ── */}
                <header
                    className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b px-6 backdrop-blur-md md:flex"
                    style={{
                        borderColor: 'var(--color-border)',
                        background: 'rgba(var(--rgb-bg), 0.75)',
                    }}
                >
                    {/* Left: breadcrumb */}
                    <Breadcrumb pathname={pathname} />

                    {/* Right: actions */}
                    <div className="flex items-center gap-2">

                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                            className="rounded-xl p-2 transition-colors nav-item-idle hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {theme === 'dark'
                                ? <Sun className="size-[18px] text-amber-400" />
                                : <Moon className="size-[18px] text-indigo-400" />}
                        </button>

                        {/* Notification bell */}
                        <div className="relative">
                            <button
                                onClick={() => setNotifOpen((v) => !v)}
                                className="relative rounded-xl p-2 transition-colors nav-item-idle hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                title="Notificaciones"
                            >
                                <Bell className="size-[18px]" />
                                <motion.span
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.4 }}
                                    className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 bg-rose-500"
                                    style={{ borderColor: 'var(--color-bg)' }}
                                />
                            </button>

                            <AnimatePresence>
                                {notifOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute right-0 top-11 w-72 rounded-2xl border p-4 shadow-xl"
                                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                                    >
                                        <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-alt)' }}>
                                            Notificaciones
                                        </p>
                                        <div className="flex flex-col items-center gap-2 py-4 text-center">
                                            <Bell className="h-8 w-8 text-zinc-300" />
                                            <p className="text-sm text-zinc-400">Sin notificaciones nuevas</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Divider */}
                        <div className="mx-1 h-6 w-px" style={{ background: 'var(--color-border)' }} />

                        {/* User pill */}
                        <div
                            className="flex items-center gap-2.5 rounded-xl border px-3 py-1.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <div
                                className="flex size-7 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
                                style={{ background: 'linear-gradient(135deg, var(--color-purple), var(--color-pink))' }}
                            >
                                {user ? getInitials(user.name) : 'U'}
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-semibold leading-none" style={{ color: 'var(--color-text)' }}>
                                    {user?.name || t('sidebar.user')}
                                </p>
                                <p className="mt-0.5 text-[10px]" style={{ color: 'var(--color-text-alt)' }}>
                                    {userRole === 1 ? t('sidebar.admin') : t('sidebar.user')}
                                </p>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            title={t('header.logout')}
                            className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20"
                        >
                            <LogOut className="size-4" />
                        </button>
                    </div>
                </header>

                {/* ── Mobile header ── */}
                <div
                    className="sticky top-0 z-30 flex h-14 items-center border-b px-4 backdrop-blur-sm md:hidden"
                    style={{
                        borderColor: 'var(--color-border)',
                        background: 'rgba(var(--rgb-bg), 0.85)',
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="-ml-1 rounded-xl p-2 nav-item-idle"
                        aria-label={t('header.openMenu')}
                    >
                        <Menu className="size-5" />
                    </button>

                    <span
                        className="ml-3 text-base font-bold"
                        style={{ background: 'linear-gradient(90deg, var(--color-purple), var(--color-pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        Smartur
                    </span>

                    <div className="ml-auto flex items-center gap-2">
                        <button
                            className="relative rounded-xl p-2 transition-colors nav-item-idle"
                        >
                            <Bell className="size-[18px]" />
                            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
                        </button>
                        <div
                            className="flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow"
                            style={{ background: 'linear-gradient(135deg, var(--color-purple), var(--color-pink))' }}
                        >
                            {user ? getInitials(user.name) : 'U'}
                        </div>
                    </div>
                </div>

                {/* ── Main content ── */}
                <main
                    className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
                    style={{ background: 'var(--color-bg-alt)' }}
                >
                    <div className="mx-auto w-full max-w-400 min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Click-away for notification panel */}
            {notifOpen && (
                <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
            )}
        </div>
    );
}
