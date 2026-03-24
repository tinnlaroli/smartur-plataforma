import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { UserPen, X, User as UserIcon, Mail, Shield, Activity, Calendar } from 'lucide-react';
import EditUserModal from './EditUserModal';
import type { UpdateUserDTO } from '../types/types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    updateUser: (id: number, data: UpdateUserDTO) => Promise<boolean | undefined>;
}

const UserDetailModal: React.FC<Props> = ({ isOpen, onClose, userId, updateUser }) => {
    const { user, isLoading, error, findById } = useUser();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (userId && isOpen) {
            findById(userId);
        }
    }, [userId, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="animate-in fade-in zoom-in-95 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl duration-200 dark:bg-[#121214]">
                <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
                        <UserIcon className="h-5 w-5 text-indigo-500" />
                        Detalle del Usuario
                    </h2>
                    <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600 dark:border-zinc-700 dark:border-t-indigo-500"></div>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-lg bg-rose-50 p-4 dark:bg-rose-900/20">
                            <p className="text-sm font-medium text-rose-800 dark:text-rose-300">{error}</p>
                        </div>
                    )}

                    {user && !isLoading && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                            <div className="col-span-2 flex items-center gap-4 rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 transition-transform hover:scale-105">
                                    {user.photo_url ? (
                                        <img src={user.photo_url} alt={user.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                            <UserIcon className="h-8 w-8" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-500">ID: {user.id}</p>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
                                    <Mail className="h-3 w-3" />
                                    Correo Electrónico
                                </span>
                                <p className="rounded border border-zinc-100 bg-zinc-50/50 p-2 text-sm text-zinc-900 dark:border-zinc-800/50 dark:bg-zinc-800/30 dark:text-zinc-100">{user.email}</p>
                            </div>

                            <div>
                                <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
                                    <Shield className="h-3 w-3" />
                                    Rol
                                </span>
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                        user.role_id === 1
                                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300'
                                            : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                                    }`}
                                >
                                    {user.role_id === 1 ? 'Administrador' : 'Usuario'}
                                </span>
                            </div>

                            <div>
                                <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
                                    <Activity className="h-3 w-3" />
                                    Estado
                                </span>
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                        user.is_active
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                            : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                                    }`}
                                >
                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            <div className="col-span-2 grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
                                        <Calendar className="h-3 w-3" />
                                        Creado
                                    </span>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{new Date(user.created_at).toLocaleString('es')}</p>
                                </div>
                                <div>
                                    <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-500">
                                        <Calendar className="h-3 w-3" />
                                        Actualizado
                                    </span>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{new Date(user.updated_at).toLocaleString('es')}</p>
                                </div>
                            </div>

                            <div className="col-span-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
                                >
                                    <UserPen className="h-4 w-4" />
                                    <span>Editar usuario</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isEditModalOpen && user && <EditUserModal onClose={() => setIsEditModalOpen(false)} onSubmit={updateUser} user={user} />}
        </div>
    );
};

export default UserDetailModal;
