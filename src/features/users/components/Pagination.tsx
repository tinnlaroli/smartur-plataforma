import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    page: number;
    totalPages: number;
    total: number;
    from: number;
    to: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const LIMIT_OPTIONS = [10, 20, 50, 100];

/**
 * Componente de paginación reutilizable.
 * Muestra el rango de elementos actuales, permite cambiar de página y el límite de elementos por página.
 */
export const Pagination = ({
    page,
    totalPages,
    total,
    from,
    to,
    limit,
    onPageChange,
    onLimitChange,
}: Props) => {
    if (total === 0) return null;

    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-4 rounded-b-xl">
            <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Mostrando{' '}
                    <span className="font-medium text-zinc-900 dark:text-white">{from}</span>-
                    <span className="font-medium text-zinc-900 dark:text-white">{to}</span> de{' '}
                    <span className="font-medium text-zinc-900 dark:text-white">{total}</span>{' '}
                    usuarios
                </p>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="pagination-limit"
                        className="text-sm text-zinc-600 dark:text-zinc-400"
                    >
                        Por página
                    </label>
                    <select
                        id="pagination-limit"
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-1.5 text-sm text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {LIMIT_OPTIONS.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!canPrev}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="size-4" />
                    Anterior
                </button>
                <span className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Página {page} de {totalPages}
                </span>
                <button
                    type="button"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!canNext}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    aria-label="Página siguiente"
                >
                    Siguiente
                    <ChevronRight className="size-4" />
                </button>
            </div>
        </div>
    );
};
