import { Loader2 } from 'lucide-react';
import type { User } from '../types';
import { UserActions } from './UserActions';

interface Props {
    users: User[];
    loading: boolean;
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export const UsersTable = ({ users, loading, onView, onEdit, onDelete }: Props) => {
    // Estado de carga
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
                <Loader2 className="size-10 animate-spin text-blue-500" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Cargando usuarios...</p>
            </div>
        );
    }

    // Estado vacío (sin usuarios)
    if (users.length === 0) {
        return (
            <div className="py-16 text-center">
                <p className="text-zinc-500 dark:text-zinc-400">
                    No hay usuarios que coincidan con la búsqueda.
                </p>
            </div>
        );
    }

    // Tabla de resultados
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
                <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Nombre
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Rol
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Estado
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Registrado
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        >
                            <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                                {user.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                                {user.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                                {user.role_name}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        user.is_active
                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                            : 'bg-red-100 text-zinc-600 dark:bg-red-700 dark:text-zinc-300'
                                    }`}
                                >
                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                                {new Date(user.created_at).toLocaleDateString('es')}
                            </td>
                            <td className="px-6 py-4">
                                <UserActions
                                    user={user}
                                    onView={onView}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
