import { NavLink } from 'react-router-dom';
import { Users, X } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const menuItems = [{ id: 'users', label: 'Usuarios', icon: Users, path: '/users' }];

    return (
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-zinc-900 px-4 py-5 text-white transition-transform duration-300 md:static md:translate-x-0 border-r border-zinc-800 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex justify-center w-full md:w-auto">
                        <img
                            src="/smartur.png"
                            alt="Smartur"
                            className="h-30 w-auto object-contain"
                        />
                    </div>
                    <button
                        type="button"
                        className="md:hidden text-zinc-400 hover:text-white"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            onClick={() => onClose()} // Cerrar sidebar al navegar en móvil
                            className={({ isActive }) =>
                                `flex items-center rounded-lg p-2 transition-colors ${
                                    isActive
                                        ? 'bg-zinc-800 font-medium text-white'
                                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5 mr-2" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
