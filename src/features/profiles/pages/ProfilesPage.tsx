import { useProfiles } from '../hooks/useProfiles';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';

export const ProfilesPage = () => {
    const { profiles, isLoading, totalPages } = useProfiles();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Perfiles de Viajero</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Gestión de intereses y preferencias de usuarios</p>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#121214]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                        <thead className="bg-[#f9fafb] dark:bg-[#121214]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">User ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Tipo Viaje</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Intereses</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase">Sostenibilidad</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-[#121214]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        Cargando...
                                    </td>
                                </tr>
                            ) : profiles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">
                                        No hay perfiles registrados
                                    </td>
                                </tr>
                            ) : (
                                profiles.map((profile) => (
                                    <tr key={profile.id}>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900 dark:text-white">{profile.id}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">{profile.user_id}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">{profile.travel_type || 'N/A'}</td>
                                        <td className="max-w-xs truncate px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{profile.interests || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">{profile.sustainable_preferences || 'N/A'}</td>
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
