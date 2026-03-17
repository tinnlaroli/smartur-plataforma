import { useActivities } from '../hooks/useActivities';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';

export const ActivitiesPage = () => {
    const { activities, isLoading, totalPages } = useActivities();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Actividades Turísticas</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Registro de impacto social y ambiental por actividad</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#121214]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                        <thead className="bg-[#f9fafb] dark:bg-[#121214]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Empresa</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Valor Producción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Impacto Ambiental</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Impacto Social</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-[#121214]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        Cargando...
                                    </td>
                                </tr>
                            ) : activities.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No hay actividades registradas
                                    </td>
                                </tr>
                            ) : (
                                activities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900 dark:text-white">{activity.id}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">{activity.company}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">${activity.production_value}</td>
                                        <td className="max-w-xs truncate px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{activity.environmental_impact || 'Bajo'}</td>
                                        <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{activity.social_impact || 'Positivo'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination page={page} limit={limit} totalPages={totalPages} setSearchParams={setSearchParams} />
        </div>
    );
};
