import { Modal } from './Modal';
import type { User } from '../types';

interface Props {
    user: User | null;
    open: boolean;
    onClose: () => void;
}

export const ViewUserModal = ({ user, open, onClose }: Props) => {
    if (!user) return null;

    return (
        <Modal open={open} onClose={onClose} title="Detalle del usuario" showCloseButton={true}>
            <div className="space-y-4">
                <div className="grid gap-3">
                    <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Nombre
                        </span>
                        <p className="mt-0.5 text-zinc-900 dark:text-white">{user.name}</p>
                    </div>
                    <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Email
                        </span>
                        <p className="mt-0.5 text-zinc-900 dark:text-white">{user.email}</p>
                    </div>
                    <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Rol
                        </span>
                        <p className="mt-0.5 text-zinc-900 dark:text-white">{user.role_name}</p>
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
                                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'
                                }`}
                            >
                                {user.is_active ? 'Activo' : 'Inactivo'}
                            </span>
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Registrado
                        </span>
                        <p className="mt-0.5 text-zinc-900 dark:text-white">
                            {new Date(user.created_at).toLocaleString('es')}
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
