import { usePOI } from '../hooks/usePOI';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';

export const POIPage = () => {
    const { points, isLoading, totalPages } = usePOI();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Puntos de Interés (POI)</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Lugares turísticos y su estado de sostenibilidad</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#121214]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                        <thead className="bg-[#f9fafb] dark:bg-[#121214]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Descripción</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Sostenible</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-[#121214]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">
                                        Cargando...
                                    </td>
                                </tr>
                            ) : points.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">
                                        No hay POIs registrados
                                    </td>
                                </tr>
                            ) : (
                                points.map((poi) => (
                                    <tr key={poi.id}>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-zinc-900 dark:text-white">{poi.name}</td>
                                        <td className="max-w-sm truncate px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{poi.description || 'Sin descripción'}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">{poi.typeId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${poi.sustainability ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'}`}
                                            >
                                                {poi.sustainability ? 'Sostenible' : 'Estándar'}
                                            </span>
                                        </td>
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
