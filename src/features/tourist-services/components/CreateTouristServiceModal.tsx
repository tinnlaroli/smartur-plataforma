import { useState } from 'react';
import type { CreateTouristServiceDTO } from '../types/types';
import { X, Wrench, Plus } from 'lucide-react';

interface Props {
    onClose: () => void;
    onSubmit: (data: CreateTouristServiceDTO) => Promise<boolean | undefined>;
}

export default function CreateTouristServiceModal({ onClose, onSubmit }: Props) {
    const [formData, setFormData] = useState<CreateTouristServiceDTO>({
        name: '',
        description: '',
        id_company: 1,
        id_location: 1,
        service_type: 'tour',
        active: true,
    });

    const handleFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'id_company' || name === 'id_location'
                    ? Number(value)
                    : name === 'active'
                      ? value === 'true'
                      : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await onSubmit(formData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#121214] rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                        <Wrench className="size-5 text-violet-500" />
                        Crear Nuevo Servicio
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
                        <label htmlFor="create-service-name" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                            Nombre del Servicio
                        </label>
                        <input
                            id="create-service-name"
                            name="name"
                            value={formData.name}
                            required
                            onChange={handleFieldChange}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                            placeholder="Ej. Tour por la ciudad"
                        />
                    </div>

                    <div>
                        <label htmlFor="create-service-description" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                            Descripción
                        </label>
                        <textarea
                            id="create-service-description"
                            name="description"
                            value={formData.description}
                            onChange={handleFieldChange}
                            rows={3}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
                            placeholder="Describe el servicio…"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="create-service-type" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Tipo de Servicio
                            </label>
                            <select
                                id="create-service-type"
                                name="service_type"
                                value={formData.service_type}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="tour">Tour</option>
                                <option value="hotel">Hotel</option>
                                <option value="restaurant">Restaurante</option>
                                <option value="transporte">Transporte</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="create-service-company" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Compañía (ID)
                            </label>
                            <input
                                id="create-service-company"
                                name="id_company"
                                type="number"
                                value={formData.id_company}
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
                            Crear Servicio
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
