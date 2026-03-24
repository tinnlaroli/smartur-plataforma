import { useState } from 'react';
import type { UpdateUserDTO } from '../types/types';
import { Save, X, Camera, User as UserIcon } from 'lucide-react';

interface Props {
    user: {
        id: number;
        name: string;
        role_id: number;
        is_active: boolean;
        photo_url: string | null;
    };
    onClose: () => void;
    onSubmit: (id: number, data: UpdateUserDTO) => Promise<boolean | undefined>;
}

export default function EditUserModal({ user, onClose, onSubmit }: Props) {
    const [formData, setFormData] = useState({
        name: user.name,
        password: '',
        role_id: user.role_id,
        is_active: user.is_active,
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.photo_url);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === 'role_id'
                    ? Number(value)
                    : name === 'is_active'
                      ? value === 'true'
                      : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataToSend: UpdateUserDTO = {};

        if (formData.name !== user.name) {
            dataToSend.name = formData.name;
        }

        if (formData.password.trim() !== '') {
            dataToSend.password = formData.password;
        }

        if (formData.role_id !== user.role_id) {
            dataToSend.role_id = formData.role_id;
        }

        if (formData.is_active !== user.is_active) {
            dataToSend.is_active = formData.is_active;
        }

        if (selectedImage) {
            dataToSend.image = selectedImage;
        }

        if (Object.keys(dataToSend).length === 0) {
            onClose();
            return;
        }

        const success = await onSubmit(user.id, dataToSend);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md transform transition-all">
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                    <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        Editar usuario
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="flex flex-col items-center justify-center space-y-3 pb-2">
                        <div className="relative group">
                            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 transition-colors group-hover:border-indigo-500">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                        <UserIcon className="h-8 w-8" />
                                    </div>
                                )}
                            </div>
                            <label
                                htmlFor="edit-photo-upload"
                                className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                            >
                                <Camera className="h-3.5 w-3.5" />
                                <input
                                    id="edit-photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                            Foto de perfil
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Nombre
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-sm  bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500  dark:focus:ring-indigo-400/20 dark:focus:border-indigo-400 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors"
                                placeholder="Nombre completo"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Nueva contraseña
                                <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500 ml-2">
                                    (opcional)
                                </span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-sm 
                                     bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                                     dark:focus:ring-indigo-400/20 dark:focus:border-indigo-400
                                     placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                                     transition-colors"
                                placeholder="Dejar vacío para no cambiar"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Rol
                            </label>
                            <select
                                name="role_id"
                                value={formData.role_id}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-sm 
                                     bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                                     dark:focus:ring-indigo-400/20 dark:focus:border-indigo-400
                                     cursor-pointer transition-colors"
                            >
                                <option value={1} className="py-2">
                                    Administrador
                                </option>
                                <option value={2} className="py-2">
                                    Usuario
                                </option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Estado
                            </label>
                            <select
                                name="is_active"
                                value={String(formData.is_active)}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 text-sm 
                                     bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
                                     dark:focus:ring-indigo-400/20 dark:focus:border-indigo-400
                                     cursor-pointer transition-colors"
                            >
                                <option value="true" className="py-2">
                                    Activo
                                </option>
                                <option value="false" className="py-2">
                                    Inactivo
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 
                   px-3 py-2 text-sm font-medium 
                   rounded-md text-zinc-600 dark:text-zinc-400
                   hover:text-zinc-900 dark:hover:text-zinc-100 
                   hover:bg-zinc-100 dark:hover:bg-zinc-800
                   transition-colors"
                        >
                            <X className="h-4 w-4" />
                            <span>Cancelar</span>
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 
                   px-3 py-2 text-sm font-medium 
                   rounded-md bg-indigo-600 dark:bg-indigo-500
                   text-white
                   hover:bg-indigo-700 dark:hover:bg-indigo-600
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/20
                   transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            <span>Guardar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
