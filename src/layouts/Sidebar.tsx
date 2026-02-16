import { NavLink } from 'react-router-dom';
import {
    X,
    Users,
    Building2,
    Wrench,
    Settings,
    FileText,
    BarChart3,
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const menuItems = [
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
            id: 'reports',
            label: 'Reportes',
            icon: FileText,
            path: '/dashboard/reportes',
        },
        {
            id: 'statistics',
            label: 'Estadísticas',
            icon: BarChart3,
            path: '/dashboard/estadisticas',
        },
        {
            id: 'settings',
            label: 'Configuración',
            icon: Settings,
            path: '/dashboard/configuracion',
        },
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-zinc-950 shadow-sm transition-transform duration-300 md:static md:translate-x-0 border-r border-zinc-200 dark:border-zinc-800 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center">
                        <img
                            src="/smartur.png"
                            alt="Smartur"
                            className="h-30 w-auto object-contain"
                        />
                    </div>
                    <button
                        type="button"
                        className="md:hidden rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="p-2">
                    {menuItems.map((item) => (
                        <NavLink key={item.id} to={item.path} onClick={onClose}>
                            {({ isActive }) => (
                                <div
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                        isActive
                                            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>

                                    {isActive && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                    )}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-400">
                        <p>Smartur v1.0</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
