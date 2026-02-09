import { Search, UserPlus } from 'lucide-react';

interface Props {
    onSearch: (value: string) => void;
    onOrderChange: (value: 'asc' | 'desc') => void;
    onAddUser: () => void;
}

/**
 * Cabecera de la sección de usuarios.
 * Contiene el campo de búsqueda, el selector de orden y el botón para agregar usuarios.
 */
export const UsersHeader = ({ onSearch, onOrderChange, onAddUser }: Props) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                    <input
                        placeholder="Buscar por nombre o email..."
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 py-2 pl-10 pr-3 text-zinc-900 dark:text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <select
                    onChange={(e) => onOrderChange(e.target.value as 'asc' | 'desc')}
                    className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="desc">Más recientes</option>
                    <option value="asc">Más antiguos</option>
                </select>
            </div>
            <button
                type="button"
                onClick={onAddUser}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
                <UserPlus className="size-4" />
                Registrar usuario
            </button>
        </div>
    );
};
