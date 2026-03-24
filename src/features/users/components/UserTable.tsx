import type { User } from '../types/types';
import { useRef } from 'react';

interface Props {
    users: User[];
    selectedUsers: number[];
    onToggle: (id: number) => void;
    onViewDetail: (id: number) => void;
    role: number | undefined;
    setRole: (roleId: number | undefined) => void;
}

export default function UserTable({ users, selectedUsers, onToggle, onViewDetail, role, setRole }: Props) {
    const tableRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#121214]">
            {/* Header */}
            <div className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#18181b]">
                <div className="flex items-center gap-4 px-4 py-3.5">
                    <div className="w-8 shrink-0">
                        <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length && users.length > 0}
                            onChange={() => {
                                if (selectedUsers.length === users.length) {
                                    selectedUsers.forEach((id) => onToggle(id));
                                } else {
                                    users.forEach((user) => {
                                        if (!selectedUsers.includes(user.id)) {
                                            onToggle(user.id);
                                        }
                                    });
                                }
                            }}
                            className="h-4 w-4 cursor-pointer rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                        />
                    </div>
                    <div className="w-16 shrink-0 text-xs font-medium tracking-wider text-zinc-400 uppercase">ID</div>
                    <div className="w-16 shrink-0 text-xs font-medium tracking-wider text-zinc-400 uppercase">Foto</div>
                    <div className="min-w-0 flex-1 text-xs font-medium tracking-wider text-zinc-400 uppercase">Nombre</div>
                    <div className="min-w-0 flex-1 text-xs font-medium tracking-wider text-zinc-400 uppercase">Email</div>
                    <div className="w-32 shrink-0 text-xs font-medium tracking-wider text-zinc-400 uppercase">
                        <div className="flex items-center gap-2">
                            <span>Rol</span>
                            <select
                                value={role || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setRole(value ? Number(value) : undefined);
                                }}
                                className="cursor-pointer border-0 bg-transparent p-0 text-xs font-medium text-zinc-400 transition-colors hover:text-white focus:ring-0"
                            >
                                <option value="" className="bg-zinc-900 text-zinc-400">
                                    Todos
                                </option>
                                <option value="1" className="bg-zinc-900 text-zinc-400">
                                    Administrador
                                </option>
                                <option value="2" className="bg-zinc-900 text-zinc-400">
                                    Usuario
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="w-24 shrink-0 text-xs font-medium tracking-wider text-zinc-400 uppercase">Estado</div>
                    <div className="w-28 shrink-0 text-xs font-medium tracking-wider text-zinc-400 uppercase">Registrado</div>
                </div>
            </div>

            {/* Body */}
            <div ref={tableRef} className="min-h-0 flex-1 overflow-y-auto">
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {users.map((user) => (
                        <div key={user.id} className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-zinc-800/50">
                            <div className="w-8 shrink-0">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => onToggle(user.id)}
                                    className="h-4 w-4 cursor-pointer rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                                />
                            </div>
                            <div className="w-16 shrink-0 text-sm font-medium text-zinc-100">{user.id}</div>

                            {/* Foto - Centrado */}
                            <div className="flex w-16 shrink-0">
                                {user.photo_url ? (
                                    <img src={user.photo_url} alt={user.name} className="h-8 w-8 pr rounded-full border border-zinc-200 object-cover dark:border-zinc-700" />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
                                        <span className="text-[10px] font-bold uppercase">{user.name?.charAt(0) || '?'}</span>
                                    </div>
                                )}
                            </div>

                            {/* Nombre */}
                            <div
                                onClick={() => onViewDetail(user.id)}
                                className="min-w-0 flex-1 cursor-pointer truncate text-sm text-zinc-300 transition-colors hover:text-indigo-400"
                                title={user.name}
                            >
                                {user.name}
                            </div>

                            {/* Email */}
                            <div
                                onClick={() => onViewDetail(user.id)}
                                className="min-w-0 flex-1 cursor-pointer truncate text-sm text-zinc-300 transition-colors hover:text-indigo-400"
                                title={user.email}
                            >
                                {user.email}
                            </div>

                            {/* Rol */}
                            <div className="w-32 shrink-0 text-sm">
                                <span className={`inline-flex items-center text-xs font-medium ${user.role_id === 1 ? 'text-indigo-400' : 'text-zinc-400'}`}>
                                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${user.role_id === 1 ? 'bg-indigo-400' : 'bg-zinc-500'}`} />
                                    {user.role_id === 1 ? 'Administrador' : 'Usuario'}
                                </span>
                            </div>

                            {/* Estado */}
                            <div className="w-24 shrink-0 text-sm">
                                <span className={`inline-flex items-center text-xs font-medium ${user.is_active ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${user.is_active ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            {/* Registrado */}
                            <div className="w-28 shrink-0 text-sm text-zinc-400">
                                {new Date(user.created_at).toLocaleDateString('es', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
