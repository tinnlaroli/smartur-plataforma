import { useState } from 'react';
import type { CreateCompanyDTO } from '../types/types';

import { X, Building2, Plus } from 'lucide-react';

interface Props {
    onClose: () => void;
    onSubmit: (data: CreateCompanyDTO) => Promise<boolean | undefined>;
}

export default function CreateCompanyModal({ onClose, onSubmit }: Props) {
    const [formData, setFormData] = useState<CreateCompanyDTO>({
        name: '',
        address: '',
        phone: '',
        id_sector: 1,
        id_location: 1,
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'id_sector' || name === 'id_location' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onSubmit(formData);
        if (success) onClose();
    };

    return (
        <>
            
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white dark:bg-[#121214] rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                            <Building2 className="size-5 text-violet-500" />
                            Crear Nueva Empresa
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 gap-y-4 flex flex-col">
                        <div>
                            <label htmlFor="create-company-name" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Nombre de la Empresa
                            </label>
                            <input
                                id="create-company-name"
                                name="name"
                                value={formData.name}
                                required
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                placeholder="Ej. Smartur Solutions"
                            />
                        </div>

                        <div>
                            <label htmlFor="create-company-address" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Dirección
                            </label>
                            <input
                                id="create-company-address"
                                name="address"
                                value={formData.address}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                placeholder="Av. Principal #123"
                            />
                        </div>

                        <div>
                            <label htmlFor="create-company-phone" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Teléfono
                            </label>
                            <input
                                id="create-company-phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                placeholder="+52 …"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="create-company-sector" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                    Sector (ID)
                                </label>
                                <input
                                    id="create-company-sector"
                                    name="id_sector"
                                    type="number"
                                    value={formData.id_sector}
                                    onChange={handleFieldChange}
                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label htmlFor="create-company-location" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                    Ubicación (ID)
                                </label>
                                <input
                                    id="create-company-location"
                                    name="id_location"
                                    type="number"
                                    value={formData.id_location}
                                    onChange={handleFieldChange}
                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-violet-700 active:scale-[0.98] transition-all flex items-center gap-2"
                            >
                                <Plus className="size-4" />
                                Crear Empresa
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
