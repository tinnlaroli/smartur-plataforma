import { useTemplates } from '../hooks/useTemplates';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';
import { Plus, ListChecks } from 'lucide-react';

export const TemplatesPage = () => {
    const { templates, isLoading, totalPages } = useTemplates();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Plantillas de Evaluación</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Administración de rúbricas para auditorías de sostenibilidad</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-500">
                    <Plus className="h-4 w-4" />
                    Nueva Plantilla
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {isLoading ? (
                    <p>Cargando plantillas...</p>
                ) : templates.length === 0 ? (
                    <div className="col-span-full rounded-2xl border-2 border-dashed border-zinc-200 py-12 text-center dark:border-zinc-800">
                        <ListChecks className="mx-auto mb-4 h-12 w-12 text-zinc-300" />
                        <p className="text-zinc-500">No hay plantillas configuradas</p>
                    </div>
                ) : (
                    templates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#121214]">
                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-white">
                                    {template.name} <span className="text-xs font-normal text-zinc-500">v{template.version}</span>
                                </h3>
                                <p className="text-sm text-zinc-500">{template.servicio}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`h-2.5 w-2.5 rounded-full ${template.estado ? 'bg-green-500' : 'bg-zinc-300'}`}></span>
                                <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Editar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Pagination page={page} limit={limit} totalPages={totalPages} setSearchParams={setSearchParams} />
        </div>
    );
};
