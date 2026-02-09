import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import type { User } from '../types';

interface Props {
    user: User | null;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

export const DeleteUserModal = ({ user, open, onClose, onConfirm, loading }: Props) => {
    if (!user) return null;

    return (
        <Modal open={open} onClose={onClose} title="Confirmar eliminación" showCloseButton={true}>
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                        <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <p className="text-zinc-700 dark:text-zinc-300">
                            ¿Estás seguro de que deseas eliminar al usuario{' '}
                            <strong className="text-zinc-900 dark:text-white">{user.name}</strong> (
                            {user.email})? Esta acción no se puede deshacer.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
