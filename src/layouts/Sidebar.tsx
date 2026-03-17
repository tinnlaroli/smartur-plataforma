import { NavLink, useNavigate } from 'react-router-dom';
import { X, Users, Building2, Wrench, Settings, MapPin, ChevronLeft, ChevronRight, Home, LogOut, UserCircle, Activity, Award, Star, BarChart3, FileText } from 'lucide-react';

import { useState } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth/login');
        if (onClose) onClose();
    };

    const menuItems = [
        { id: 'home', label: 'Inicio', icon: Home, path: '/dashboard', end: true },
        {
            id: 'users',
            label: 'Usuarios',
            icon: Users,
            path: '/dashboard/usuarios',
        },
        {
            id: 'companies',
            label: 'Compañías',
            icon: Building2,
            path: '/dashboard/companias',
        },
        {
            id: 'services',
            label: 'Servicios',
            icon: Wrench,
            path: '/dashboard/servicios',
        },
        {
            id: 'locations',
            label: 'Ubicaciones',
            icon: MapPin,
            path: '/dashboard/ubicaciones',
        },
        {
            id: 'profiles',
            label: 'Perfiles',
            icon: UserCircle,
            path: '/dashboard/perfiles',
        },
        {
            id: 'activities',
            label: 'Actividades',
            icon: Activity,
            path: '/dashboard/actividades',
        },
        {
            id: 'certifications',
            label: 'Certificaciones',
            icon: Award,
            path: '/dashboard/certificaciones',
        },
        {
            id: 'poi',
            label: 'POI',
            icon: Star,
            path: '/dashboard/poi',
        },
        {
            id: 'stats',
            label: 'Estadísticas',
            icon: BarChart3,
            path: '/dashboard/estadisticas',
        },
        {
            id: 'templates',
            label: 'Plantillas',
            icon: FileText,
            path: '/dashboard/plantillas',
        },
        {
            id: 'settings',
            label: 'Configuración',
            icon: Settings,
            path: '/dashboard/configuracion',
        },
    ];

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {isOpen && <div className="animate-in fade-in fixed inset-0 z-40 bg-black/20 backdrop-blur-sm duration-300 md:hidden" onClick={onClose} aria-hidden="true" />}

            <aside
                className={`fixed inset-y-0 left-0 z-50 transform border-r border-zinc-200 bg-white shadow-sm transition-all duration-300 ease-in-out md:static md:translate-x-0 dark:border-zinc-800 dark:bg-[#0d0d0f] ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-20' : 'w-64'} `}
            >
                <div className={`flex h-16 items-center border-b border-zinc-200 transition-all duration-300 dark:border-zinc-800 ${isCollapsed ? 'justify-center' : 'justify-between px-4'}`}>
                    <div className="flex items-center overflow-hidden transition-all duration-300">
                        <img
                            src={isCollapsed ? '/image.png' : '/smartur.png'}
                            alt="Smartur"
                            className={`object-contain drop-shadow-sm transition-all duration-500 ${isCollapsed ? 'h-10 w-10 p-1' : 'h-24 w-auto'}`}
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={toggleCollapse}
                            className={`rounded-lg p-1.5 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 ${isCollapsed ? 'absolute top-6 -right-3 z-10 border border-zinc-200 bg-white p-1 shadow-md dark:border-zinc-800 dark:bg-[#0d0d0f]' : 'hidden md:flex'} `}
                            title={isCollapsed ? 'Expandir' : 'Contraer'}
                        >
                            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </button>

                        <button
                            type="button"
                            className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 md:hidden dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <nav className="space-y-1 p-2">
                    {menuItems.map((item, index) => (
                        <NavLink key={item.id} to={item.path} onClick={onClose} end={item.end}>
                            {({ isActive }) => (
                                <div
                                    className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${isCollapsed ? 'mx-1 justify-center' : ''} ${
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-500/10 dark:bg-indigo-950/40 dark:text-indigo-400'
                                            : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                                    } group hover:scale-[1.02] active:scale-[0.98]`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />

                                    <span className={`overflow-hidden font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'absolute w-0 opacity-0' : 'w-auto opacity-100'}`}>
                                        {item.label}
                                    </span>

                                    {isActive && !isCollapsed && <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400" />}

                                    {isActive && isCollapsed && <span className="absolute right-0 h-8 w-1 rounded-l-full bg-indigo-600 dark:bg-indigo-400" />}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute right-0 bottom-4 left-0 space-y-4 px-2">
                    <button
                        onClick={handleLogout}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-500 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 dark:text-rose-400 dark:hover:bg-rose-950/30 ${isCollapsed ? 'justify-center' : ''} group active:scale-[0.98]`}
                        title={isCollapsed ? 'Cerrar sesión' : ''}
                    >
                        <LogOut className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5`} />
                        <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'absolute w-0 opacity-0' : 'w-auto opacity-100'}`}>Cerrar sesión</span>
                    </button>

                    {isCollapsed ? (
                        <div className="animate-in fade-in zoom-in flex justify-center duration-500">
                            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 transition-transform hover:rotate-6">
                                <span className="text-sm font-bold">U</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3 dark:border-zinc-800/50 dark:bg-zinc-900/50">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-sm">
                                <span className="text-sm font-bold">U</span>
                            </div>
                            <div className="flex min-w-0 flex-col">
                                <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">Administrador</span>
                                <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">admin@smartur.com</span>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
