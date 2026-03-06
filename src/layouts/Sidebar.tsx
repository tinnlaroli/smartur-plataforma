import { NavLink } from 'react-router-dom';
import {
    X,
    Users,
    Building2,
    Wrench,
    Settings,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Home,
    LogOut,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 
                    transform bg-white dark:bg-[#0d0d0f] 
                    shadow-sm transition-all duration-300 ease-in-out
                    md:static md:translate-x-0 border-r border-zinc-200 dark:border-zinc-800
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
            >
                <div
                    className={`flex h-16 items-center border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between px-4'}`}
                >
                    <div className="flex items-center overflow-hidden transition-all duration-300">
                        <img
                            src={isCollapsed ? '/image.png' : '/smartur.png'}
                            alt="Smartur"
                            className={`transition-all duration-500 object-contain drop-shadow-sm ${isCollapsed ? 'h-10 w-10 p-1' : 'h-24 w-auto'}`}
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={toggleCollapse}
                            className={`
                                rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 
                                dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-all
                                ${isCollapsed ? 'absolute -right-3 top-6 bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 shadow-md z-10 p-1' : 'hidden md:flex'}
                            `}
                            title={isCollapsed ? 'Expandir' : 'Contraer'}
                        >
                            {isCollapsed ? (
                                <ChevronRight className="h-4 w-4" />
                            ) : (
                                <ChevronLeft className="h-4 w-4" />
                            )}
                        </button>

                        <button
                            type="button"
                            className="md:hidden rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <nav className="p-2 space-y-1">
                    {menuItems.map((item, index) => (
                        <NavLink key={item.id} to={item.path} onClick={onClose} end={item.end}>
                            {({ isActive }) => (
                                <div
                                    className={`
                                        relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200
                                        ${isCollapsed ? 'justify-center mx-1' : ''}
                                        ${
                                            isActive
                                                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 shadow-sm shadow-indigo-500/10'
                                                : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                                        }
                                        group hover:scale-[1.02] active:scale-[0.98]
                                    `}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <item.icon
                                        className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                                    />

                                    <span
                                        className={`transition-all duration-300 overflow-hidden whitespace-nowrap font-medium ${isCollapsed ? 'w-0 opacity-0 absolute' : 'w-auto opacity-100'}`}
                                    >
                                        {item.label}
                                    </span>

                                    {isActive && !isCollapsed && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                                    )}

                                    {isActive && isCollapsed && (
                                        <span className="absolute right-0 h-8 w-1 rounded-l-full bg-indigo-600 dark:bg-indigo-400" />
                                    )}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <button className="absolute bottom-4 left-0 right-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span>Cerrar sesión</span>
                    <LogOut className="h-5 w-5" />
                </button>

                {isCollapsed && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-in fade-in zoom-in duration-500">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 cursor-pointer hover:rotate-6 transition-transform">
                            <span className="text-sm font-bold">U</span>
                        </div>
                    </div>
                )}
            </aside>
        </>
    );
}
