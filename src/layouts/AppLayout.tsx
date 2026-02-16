import { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../shared/context/ToastContext';
import { Menu } from 'lucide-react';

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ToastProvider>
            <div className="flex bg-zinc-50 dark:bg-zinc-950 min-h-screen">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                    <div className="md:hidden p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center">
                        <button
                            type="button"
                            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="ml-4 font-semibold text-lg text-zinc-900 dark:text-white">
                            Smartur
                        </span>
                    </div>

                    <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
                        <Outlet />
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}
