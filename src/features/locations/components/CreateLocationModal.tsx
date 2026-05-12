import { useState } from 'react';
import type { CreateLocationDTO } from '../types/types';
import { X, MapPin, Plus } from 'lucide-react';

interface Props {
    onClose: () => void;
    onSubmit: (data: CreateLocationDTO) => Promise<boolean | undefined>;
}

export default function CreateLocationModal({ onClose, onSubmit }: Props) {
    const [formData, setFormData] = useState<CreateLocationDTO>({
        name: '',
        state: '',
        municipality: '',
        latitude: '0',
        longitude: '0',
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                        <MapPin className="size-5 text-violet-500" />
                        Crear Nueva Ubicación
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
                        <label htmlFor="create-location-name" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                            Nombre de la Ubicación
                        </label>
                        <input
                            id="create-location-name"
                            name="name"
                            value={formData.name}
                            required
                            onChange={handleFieldChange}
                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                            placeholder="Ej. Parque Central"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="create-location-state" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Estado
                            </label>
                            <input
                                id="create-location-state"
                                name="state"
                                value={formData.state}
                                required
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                placeholder="Ej. Chiapas"
                            />
                        </div>
                        <div>
                            <label htmlFor="create-location-municipality" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Municipio
                            </label>
                            <input
                                id="create-location-municipality"
                                name="municipality"
                                value={formData.municipality}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                placeholder="Ej. Tuxtla Gtz"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="create-location-latitude" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Latitud
                            </label>
                            <input
                                id="create-location-latitude"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all font-mono"
                            />
                        </div>
                        <div>
                            <label htmlFor="create-location-longitude" className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-1.5">
                                Longitud
                            </label>
                            <input
                                id="create-location-longitude"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleFieldChange}
                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none transition-all font-mono"
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
                            Crear Ubicación
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
