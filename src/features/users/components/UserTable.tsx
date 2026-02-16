import type { User } from '../types/types';

interface Props {
    users: User[];
    selectedUsers: number[];
    onToggle: (id: number) => void;
    onViewDetail: (id: number) => void;
    role: number | undefined;
    setRole: (roleId: number | undefined) => void;
}

export default function UserTable({
    users,
    selectedUsers,
    onToggle,
    onViewDetail,
    role,
    setRole,
}: Props) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50">
                        <table className="min-w-full divide-y divide-zinc-800">
                            <thead className="bg-zinc-900">
                                <tr>
                                    <th className="px-4 py-3.5 sm:w-12" />
                                    <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                        ID
                                    </th>
                                    <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                        Nombre
                                    </th>
                                    <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                        Email
                                    </th>
                                    <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <span>Rol</span>
                                            <select
                                                value={role || ''}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setRole(value ? Number(value) : undefined);
                                                }}
                                                className="border-0 bg-transparent p-0 text-xs font-medium text-zinc-400 focus:ring-0 cursor-pointer hover:text-white transition-colors"
                                            >
                                                <option
                                                    value=""
                                                    className="bg-zinc-900 text-zinc-400"
                                                >
                                                    Todos
                                                </option>
                                                <option
                                                    value="1"
                                                    className="bg-zinc-900 text-zinc-400"
                                                >
                                                    Admin
                                                </option>
                                                <option
                                                    value="2"
                                                    className="bg-zinc-900 text-zinc-400"
                                                >
                                                    User
                                                </option>
                                            </select>
                                        </div>
                                    </th>
                                    <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                                        Registrado
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => onViewDetail(user.id)}
                                        className="transition-colors hover:bg-zinc-900 cursor-pointer group"
                                    >
                                        <td className="px-4 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={() => onToggle(user.id)}
                                                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
                                            />
                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium text-zinc-100">
                                            {user.id}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-zinc-300">
                                            {user.name}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-zinc-300">
                                            {user.email}
                                        </td>

                                        <td className="px-4 py-4 text-sm">
                                            <span
                                                className={`inline-flex items-center text-xs font-medium ${
                                                    user.role_id === 1
                                                        ? 'text-indigo-400'
                                                        : 'text-zinc-400'
                                                }`}
                                            >
                                                <span
                                                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                        user.role_id === 1
                                                            ? 'bg-indigo-400'
                                                            : 'bg-zinc-500'
                                                    }`}
                                                />
                                                {user.role_id === 1 ? 'Admin' : 'User'}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm">
                                            <span
                                                className={`inline-flex items-center text-xs font-medium ${
                                                    user.is_active
                                                        ? 'text-emerald-400'
                                                        : 'text-rose-400'
                                                }`}
                                            >
                                                <span
                                                    className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                                        user.is_active
                                                            ? 'bg-emerald-400'
                                                            : 'bg-rose-400'
                                                    }`}
                                                />
                                                {user.is_active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-zinc-400">
                                            {new Date(user.created_at).toLocaleDateString('es', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </td>

                                     
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
