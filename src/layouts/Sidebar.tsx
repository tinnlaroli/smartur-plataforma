import { NavLink, useNavigate } from 'react-router-dom';
import { X, Users, Building2, Wrench, Settings, MapPin, ChevronLeft, ChevronRight, Home, LogOut, UserCircle, Activity, Award, Star, BarChart3, FileText, Sun, Moon, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuthModal } from '../features/auth/context/AuthModalContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface MenuItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
    end?: boolean;
    roles: number[];
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { openModal } = useAuthModal();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userRole = user?.role_id || 2;

    const menuItems: MenuItem[] = [
        { id: 'home', label: 'Inicio', icon: Home, path: '/dashboard', end: true, roles: [1] },
        { id: 'users', label: 'Usuarios', icon: Users, path: '/dashboard/usuarios', roles: [1] },
        { id: 'companies', label: 'Compañías', icon: Building2, path: '/dashboard/companias', roles: [1] },
        { id: 'services', label: 'Servicios', icon: Wrench, path: '/dashboard/servicios', roles: [1] },
        { id: 'locations', label: 'Ubicaciones', icon: MapPin, path: '/dashboard/ubicaciones', roles: [1] },
        { id: 'profiles', label: 'Perfiles', icon: UserCircle, path: '/dashboard/perfiles', roles: [1] },
        { id: 'activities', label: 'Actividades', icon: Activity, path: '/dashboard/actividades', roles: [1] },
        { id: 'certifications', label: 'Certificaciones', icon: Award, path: '/dashboard/certificaciones', roles: [1] },
        { id: 'poi', label: 'POI', icon: Star, path: '/dashboard/poi', roles: [1] },
        { id: 'stats', label: 'Estadísticas', icon: BarChart3, path: '/dashboard/estadisticas', roles: [1] },
        { id: 'templates', label: 'Plantillas', icon: FileText, path: '/dashboard/plantillas', roles: [1] },
        { id: 'instruments', label: 'Instrumentos', icon: FileText, path: '/dashboard/instrumentos', roles: [1] },
        { id: 'settings', label: 'Configuración', icon: Settings, path: '/dashboard/configuracion', roles: [1] },
    ];

    const filteredItems = menuItems.filter((item) => item.roles.includes(userRole));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        openModal('login');
        navigate('/');
        if (onClose) onClose();
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

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
                className={`fixed inset-y-0 left-0 z-50 flex transform flex-col border-r bg-white shadow-sm transition-all duration-300 ease-in-out md:static md:translate-x-0 dark:border-zinc-800 dark:bg-[#0d0d0f] ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isCollapsed ? 'w-20' : 'w-64'}`}
            >
                <div
                    className={`flex h-16 flex-shrink-0 items-center border-b px-4 transition-all duration-300 dark:border-zinc-800 ${
                        isCollapsed ? 'justify-center' : 'justify-between'
                    }`}
                >
                    <div className="flex items-center overflow-hidden">
                        <img
                            src={isCollapsed ? '/image.png' : '/smartur.png'}
                            alt="Smartur"
                            className={`object-contain transition-all duration-500 ${
                                isCollapsed ? 'h-10 w-10' : 'h-24 w-auto'
                            }`}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={toggleCollapse}
                            className={`rounded-lg p-1.5 text-zinc-400 transition-all hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 ${
                                isCollapsed
                                    ? 'absolute -right-3 top-6 z-10 rounded-full border bg-white p-1 shadow-md dark:border-zinc-800 dark:bg-[#0d0d0f]'
                                    : 'hidden md:flex'
                            }`}
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
                            className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 md:hidden dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-2">
                    {filteredItems.map((item, index) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            onClick={onClose}
                            end={item.end}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                                    isCollapsed ? 'mx-1 justify-center' : ''
                                } ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-600 shadow-sm dark:bg-indigo-950/40 dark:text-indigo-400'
                                        : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                                } group active:scale-[0.98]`
                            }
                            style={{ animationDelay: `${index * 50}ms` }}
                            title={isCollapsed ? item.label : ''}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                                            isActive ? 'scale-110' : 'group-hover:scale-110'
                                        }`}
                                    />
                                    <span
                                        className={`overflow-hidden whitespace-nowrap font-medium transition-all duration-300 ${
                                            isCollapsed
                                                ? 'absolute w-0 opacity-0'
                                                : 'w-auto opacity-100'
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    {isActive && !isCollapsed && (
                                        <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                    )}
                                    {isActive && isCollapsed && (
                                        <span className="absolute right-0 h-8 w-1 rounded-l-full bg-indigo-600 dark:bg-indigo-400" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex-shrink-0 space-y-2 border-t p-2 dark:border-zinc-800">
                    <button
                        onClick={toggleTheme}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 ${
                            isCollapsed ? 'justify-center' : ''
                        }`}
                        title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5 flex-shrink-0" />
                        ) : (
                            <Moon className="h-5 w-5 flex-shrink-0" />
                        )}
                        <span
                            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                                isCollapsed ? 'absolute w-0 opacity-0' : 'w-auto opacity-100'
                            }`}
                        >
                            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                        </span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-500 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 dark:text-rose-400 dark:hover:bg-rose-950/30 ${
                            isCollapsed ? 'justify-center' : ''
                        } group active:scale-[0.98]`}
                        title={isCollapsed ? 'Cerrar sesión' : ''}
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                        <span
                            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                                isCollapsed ? 'absolute w-0 opacity-0' : 'w-auto opacity-100'
                            }`}
                        >
                            Cerrar sesión
                        </span>
                    </button>

                    {isCollapsed ? (
                        <div className="flex justify-center">
                            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg transition-transform hover:rotate-6">
                                <span className="text-sm font-bold">
                                    {user ? getInitials(user.name) : 'U'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border bg-zinc-50 px-3 py-3 dark:border-zinc-800/50 dark:bg-zinc-900/50">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-sm">
                                    <span className="text-sm font-bold">
                                        {user ? getInitials(user.name) : 'U'}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                        {user?.name || 'Usuario'}
                                    </p>
                                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                        {user?.email || ''}
                                    </p>
                                    <span className="mt-0.5 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                                        {userRole === 1 ? 'Administrador' : 'Usuario'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
