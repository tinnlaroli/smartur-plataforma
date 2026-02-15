import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Pencil, UserPen, X } from 'lucide-react';
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

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    useEffect(() => {
        if (userId && isOpen) {
            findById(userId);
        }
    }, [userId, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        Detalle del Usuario
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition"
                    >
                        <span className="sr-only">Cerrar</span>
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
                            <p className="text-sm text-rose-800 dark:text-rose-300">{error}</p>
                        </div>
                    )}

                    {user && !isLoading && (
                        <div className="space-y-4">
                            <div className="grid gap-3">
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        ID
                                    </span>
                                    <p className="mt-0.5 text-zinc-900 dark:text-white">
                                        {user.id}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Nombre
                                    </span>
                                    <p className="mt-0.5 text-zinc-900 dark:text-white">
                                        {user.name}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Email
                                    </span>
                                    <p className="mt-0.5 text-zinc-900 dark:text-white">
                                        {user.email}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Rol
                                    </span>
                                    <p className="mt-0.5">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                user.role_id === 1
                                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300'
                                                    : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                                            }`}
                                        >
                                            {user.role_id === 1 ? 'Administrador' : 'Usuario'}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Estado
                                    </span>
                                    <p className="mt-0.5">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                user.is_active
                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                                            }`}
                                        >
                                            {user.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Creado
                                    </span>
                                    <p className="mt-0.5 text-zinc-900 dark:text-white">
                                        {new Date(user.created_at).toLocaleString('es')}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Actualizado
                                    </span>
                                    <p className="mt-0.5 text-zinc-900 dark:text-white">
                                        {new Date(user.updated_at).toLocaleString('es')}
                                    </p>
                                </div>
                                {isEditModalOpen && user && (
                                    <EditUserModal
                                        onClose={handleCloseEditModal}
                                        onSubmit={updateUser}
                                        user={user}
                                    />
                                )}
                                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                    <button
                                        onClick={handleOpenEditModal}
                                        className="w-full inline-flex items-center justify-center gap-2 
                   rounded-lg bg-indigo-600 dark:bg-indigo-500
                   px-4 py-2.5 text-sm font-medium text-white
                   hover:bg-indigo-700 dark:hover:bg-indigo-600
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                   shadow-sm hover:shadow-md
                   active:scale-[0.98]
                   transition-all duration-200"
                                    >
                                        <UserPen className="h-4 w-4" />
                                        <span>Editar usuario</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;
