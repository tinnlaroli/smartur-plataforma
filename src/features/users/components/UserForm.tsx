import type { UserPayload, UserUpdatePayload } from '../types';

// Mapeo de tipos para los valores del formulario
type FormValues = UserPayload | UserUpdatePayload;

interface Props {
    mode: 'create' | 'edit'; // Determina si el formulario es para crear o editar
    initialValues?: { name: string; email: string; password?: string }; // Valores iniciales para edición
    onSubmit: (values: FormValues) => void;
    onCancel: () => void;
    loading?: boolean;
}

export const UserForm = ({ mode, initialValues, onSubmit, onCancel, loading = false }: Props) => {
    const isEdit = mode === 'edit';

    /**
     * Maneja el envío del formulario.
     * Construye el payload adecuado según si se está creando o editando.
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        if (isEdit) {
            // En modo edición, el password es opcional
            const payload: UserUpdatePayload = { name, email };
            if (password) payload.password = password;
            onSubmit(payload);
        } else {
            // En modo creación, el password es obligatorio (aunque el HTML tiene 'required')
            onSubmit({ name, email, password });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                    htmlFor="user-name"
                    className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    Nombre
                </label>
                <input
                    id="user-name"
                    name="name"
                    type="text"
                    required
                    defaultValue={initialValues?.name}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Nombre completo"
                />
            </div>
            <div>
                <label
                    htmlFor="user-email"
                    className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    Email
                </label>
                <input
                    id="user-email"
                    name="email"
                    type="email"
                    required
                    defaultValue={initialValues?.email}
                    disabled={isEdit}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-zinc-100 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed"
                    placeholder="correo@ejemplo.com"
                />
                {isEdit && (
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        El email no se puede modificar.
                    </p>
                )}
            </div>
            <div>
                <label
                    htmlFor="user-password"
                    className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                    {isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                </label>
                <input
                    id="user-password"
                    name="password"
                    type="password"
                    required={!isEdit}
                    minLength={isEdit ? undefined : 6}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder={isEdit ? 'Dejar en blanco para no cambiar' : 'Mínimo 6 caracteres'}
                />
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {loading
                        ? isEdit
                            ? 'Guardando...'
                            : 'Creando...'
                        : isEdit
                          ? 'Guardar cambios'
                          : 'Crear usuario'}
                </button>
            </div>
        </form>
    );
};
