import { X } from 'lucide-react';

interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    showCloseButton?: boolean;
    children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, showCloseButton = true, children }: Props) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-zinc-900"
                onClick={(e) => e.stopPropagation()}
            >
                {showCloseButton && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300 transition-colors"
                        aria-label="Cerrar"
                    >
                        <X className="size-5" />
                    </button>
                )}
                {title && (
                    <div className="border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 pr-12">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {title}
                        </h2>
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};
