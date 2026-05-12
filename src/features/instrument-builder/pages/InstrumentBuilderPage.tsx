import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Edit3, ToggleLeft, ToggleRight, Trash2, Search, ListChecks, Loader2, AlertCircle } from 'lucide-react';
import { instrumentApi } from '../api/instrumentApi';
import type { InstrumentTemplate } from '../types/types';

export const InstrumentBuilderPage = () => {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState<InstrumentTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', version: '1.0.0', service_type: '', active: true });

    const fetchTemplates = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await instrumentApi.getTemplates(1, 100);
            setTemplates(res.templates);
        } catch {
            setError('No se pudieron cargar los instrumentos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleCreate = async () => {
        if (!newTemplate.name || !newTemplate.service_type) return;
        try {
            await instrumentApi.createTemplate({
                name: newTemplate.name,
                version: newTemplate.version,
                service_type: newTemplate.service_type,
                active: newTemplate.active,
            });
            setShowCreate(false);
            setNewTemplate((prev) => ({ ...prev, name: '', version: '1.0.0', service_type: '', active: true }));
            fetchTemplates();
        } catch {
            setError('Error al crear el instrumento');
        }
    };

    const handleToggleActive = async (t: InstrumentTemplate) => {
        try {
            await instrumentApi.updateTemplate(t.id, { active: !t.estado });
            fetchTemplates();
        } catch {
            setError('Error al cambiar estado');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Eliminar este instrumento?')) return;
        try {
            await instrumentApi.deleteTemplate(id);
            fetchTemplates();
        } catch {
            setError('Error al eliminar');
        }
    };

    const filtered = templates.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.servicio.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-full" suppressHydrationWarning>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Constructor de Instrumentos
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Crea y administra instrumentos de evaluación tipo Google Forms
                    </p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                >
                    <Plus className="h-4 w-4" />
                    Nuevo Instrumento
                </button>
            </div>

            {error && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    {error}
                    <button onClick={() => setError(null)} className="ml-auto text-rose-500 hover:text-rose-700">X</button>
                </div>
            )}

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    placeholder="Buscar instrumentos…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
            </div>

            {loading ? (
                <div className="flex min-h-[40vh] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <ListChecks className="mb-4 h-16 w-16 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
                        {search ? 'Sin resultados' : 'No hay instrumentos'}
                    </p>
                    <p className="mt-1 text-sm text-zinc-400">
                        {search ? 'Intenta con otra búsqueda' : 'Crea tu primer instrumento de evaluación'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((t) => (
                        <div
                            key={t.id}
                            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                        t.estado
                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                                    }`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${
                                            t.estado ? 'bg-emerald-500' : 'bg-zinc-400'
                                        }`}
                                    />
                                    {t.estado ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {t.name}
                            </h3>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {t.servicio}
                            </p>
                            <p className="mt-1 text-xs text-zinc-400">v{t.version}</p>

                            <p className="mt-2 text-xs text-zinc-400" suppressHydrationWarning>
                                Creado: {new Date(t.register_at).toLocaleDateString('es-MX')}
                            </p>

                            <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                <button
                                    onClick={() => navigate(`/dashboard/instrumentos/${t.id}`)}
                                    className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
                                >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleToggleActive(t)}
                                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                >
                                    {t.estado ? (
                                        <ToggleRight className="h-3.5 w-3.5 text-emerald-500" />
                                    ) : (
                                        <ToggleLeft className="h-3.5 w-3.5" />
                                    )}
                                    {t.estado ? 'Desactivar' : 'Activar'}
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <button type="button" aria-label="Cerrar" className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-default" onClick={() => setShowCreate(false)} />
                    <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Nuevo Instrumento</h2>
                        <p className="mt-1 text-sm text-zinc-500">Define las propiedades básicas</p>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Nombre</label>
                                <input
                                    type="text"
                                    value={newTemplate.name}
                                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, name: e.target.value }))}
                                    placeholder="Ej: Evaluación Hotelera 2024"
                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Versión</label>
                                <input
                                    type="text"
                                    value={newTemplate.version}
                                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, version: e.target.value }))}
                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Tipo de Servicio</label>
                                <select
                                    value={newTemplate.service_type}
                                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, service_type: e.target.value }))}
                                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                >
                                    <option value="">Seleccionar…</option>
                                    <option value="Hotel">Hotel</option>
                                    <option value="Restaurante">Restaurante</option>
                                    <option value="Tour">Tour</option>
                                    <option value="Spa">Spa</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="new-active"
                                    checked={newTemplate.active}
                                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, active: e.target.checked }))}
                                    className="rounded border-zinc-300 text-indigo-600 dark:border-zinc-600"
                                />
                                <label htmlFor="new-active" className="text-sm text-zinc-700 dark:text-zinc-300">Activo</label>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setShowCreate(false)} className="rounded-lg px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                                Cancelar
                            </button>
                            <button onClick={handleCreate} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500">
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
