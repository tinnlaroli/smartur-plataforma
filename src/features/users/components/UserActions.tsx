import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { User } from '../types';

interface Props {
    user: User;
    onView: (user: User) => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

/**
 * Componente que renderiza los botones de acción para un usuario en la tabla.
 * Permite ver, editar y eliminar un usuario.
 */
export const UserActions = ({ user, onView, onEdit, onDelete }: Props) => {
    return (
        <div className="flex items-center justify-center gap-1">
            <button
                type="button"
                onClick={() => onView(user)}
                className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                title="Ver"
                aria-label="Ver usuario"
            >
                <Eye className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => onEdit(user)}
                className="rounded-lg p-2 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-colors"
                title="Editar"
                aria-label="Editar usuario"
            >
                <Pencil className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => onDelete(user)}
                className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                title="Eliminar"
                aria-label="Eliminar usuario"
            >
                <Trash2 className="size-4" />
            </button>
        </div>
    );
};
