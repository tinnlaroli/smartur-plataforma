import { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthModal } from '../features/auth/context/AuthModalContext';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { openModal } = useAuthModal();

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userRole = user?.role_id || 2;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        openModal('login');
        navigate('/');
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
            <div className="flex min-h-screen bg-zinc-50 selection:bg-indigo-100 selection:text-indigo-700 dark:bg-[#0a0a0c] dark:selection:bg-indigo-900/30 dark:selection:text-indigo-300">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
                    <header className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b border-zinc-200 bg-white/50 px-8 backdrop-blur-md dark:border-zinc-800/50 dark:bg-[#0d0d0f]/50 md:flex">
                        <div className="flex items-center gap-4 text-zinc-400">
                            <div className="group relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar en Smartur..."
                                    className="w-64 rounded-full border-none bg-zinc-100 py-1.5 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 dark:bg-zinc-900/50"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="group relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                <Bell className="h-5 w-5" />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500 dark:border-[#0d0d0f]" />
                            </button>
                            <div className="mx-1 h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
                            <div className="flex items-center gap-3 pl-2">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        {user?.name || 'Usuario'}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        {userRole === 1 ? 'Administrador' : 'Usuario'}
                                    </p>
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-900">
                                    {user ? getInitials(user.name) : 'U'}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="ml-1 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-rose-500 dark:hover:bg-zinc-800"
                                    title="Cerrar sesión"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 md:hidden">
                        <div className="flex h-16 items-center px-4">
                            <button
                                type="button"
                                className="-ml-2 rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Abrir menú"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                            <span className="ml-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-base font-bold text-transparent">
                                Smartur
                            </span>
                            <div className="ml-auto flex items-center gap-2">
                                <button className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <Bell className="h-5 w-5" />
                                </button>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-xs font-bold text-white">
                                    {user ? getInitials(user.name) : 'U'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1 overflow-y-auto bg-zinc-50 p-4 dark:bg-[#0a0a0c] sm:p-6 lg:p-8">
                        <div className="mx-auto w-full max-w-400 min-h-full">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
