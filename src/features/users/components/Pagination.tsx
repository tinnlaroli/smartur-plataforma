import type { PaginationProps } from '../types/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

function Pagination({ page, totalPages, limit, setSearchParams }: PaginationProps) {
    const [pageInput, setPageInput] = useState(page);

    const goToPage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        setSearchParams((prev) => {
            prev.set('page', String(newPage));
            prev.set('limit', String(limit));
            return prev;
        });
    };

    const changeLimit = (newLimit: number) => {
        setSearchParams((prev) => {
            prev.set('limit', String(newLimit));
            prev.set('page', '1');
            return prev;
        });
    };

    const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newPage = Number(pageInput);
            if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
                goToPage(newPage);
            }
        }
    };

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (page <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push(-1);
                pages.push(totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1);
                pages.push(-1);
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push(-1);
                for (let i = page - 1; i <= page + 1; i++) pages.push(i);
                pages.push(-2);
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 text-sm text-gray-600 dark:text-gray-400">

            <div className="flex items-center gap-1">
                <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className={`
                        p-1.5 rounded transition-colors
                        ${
                            page <= 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                        }
                    `}
                >
                    <ChevronLeft size={16} strokeWidth={1.5} />
                </button>

                <div className="flex items-center gap-1 mx-1">
                    {generatePageNumbers().map((p, index) => {
                        if (p < 0) {
                            return (
                                <span key={`dots-${index}`} className="px-1.5 select-none">
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                key={p}
                                onClick={() => goToPage(p)}
                                className={`
                                    min-w-[28px] h-7 px-1.5 rounded text-xs
                                    transition-colors
                                    ${
                                        p === page
                                            ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-medium'
                                            : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }
                                `}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    className={`
                        p-1.5 rounded transition-colors
                        ${
                            page >= totalPages
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
                        }
                    `}
                >
                    <ChevronRight size={16} strokeWidth={1.5} />
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
                <span>
                    Página {page} de {totalPages}
                </span>

                <select
                    value={limit}
                    onChange={(e) => changeLimit(Number(e.target.value))}
                    className="border-0 bg-transparent p-0 pr-4 text-xs focus:ring-0 cursor-pointer"
                    style={{ backgroundPosition: 'right 0 center' }}
                >
                    <option value={5}>5 items</option>
                    <option value={10}>10 items</option>
                    <option value={15}>15 items</option>
                    <option value={20}>20 items</option>
                </select>

                <div className="flex items-center gap-1">
                    <span>Ir a:</span>
                    <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={pageInput}
                        onChange={(e) => setPageInput(Number(e.target.value))}
                        onKeyDown={handlePageInput}
                        className="w-10 border-b border-gray-300 dark:border-zinc-700 bg-transparent px-0 py-0.5 text-center text-xs focus:border-indigo-500 focus:outline-none"
                        placeholder="N°"
                    />
                </div>

                <span className="text-gray-400 dark:text-gray-600">
                    Mostrando {(page - 1) * limit + 1} -{' '}
                    {Math.min(page * limit, totalPages * limit)} de {totalPages * limit}
                </span>
            </div>
        </div>
    );
}

export default Pagination;
