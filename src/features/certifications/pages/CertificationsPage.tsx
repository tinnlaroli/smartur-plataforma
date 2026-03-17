import { useCertifications } from '../hooks/useCertifications';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';

export const CertificationsPage = () => {
    const { certifications, isLoading, totalPages, updateStatus } = useCertifications();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Certificaciones de Servicio</h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Control de sellos de calidad y sostenibilidad</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <p className="col-span-full py-10 text-center">Cargando certificaciones...</p>
                ) : certifications.length === 0 ? (
                    <p className="col-span-full py-10 text-center">No hay certificaciones</p>
                ) : (
                    certifications.map((cert) => (
                        <div key={cert.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-[#121214]">
                            <div className="mb-3 flex items-start justify-between">
                                <h3 className="font-bold text-zinc-900 dark:text-white">{cert.certificationType}</h3>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${cert.status === 'Activo' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'}`}
                                >
                                    {cert.status}
                                </span>
                            </div>
                            <p className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                                Organización: <span className="text-zinc-700 dark:text-zinc-300">{cert.issuingOrganization}</span>
                            </p>
                            <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                                Expira: <span className="text-zinc-700 dark:text-zinc-300">{cert.expirationDate || 'Sin fecha'}</span>
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateStatus(cert.id, cert.status === 'Activo' ? 'Vencido' : 'Activo')}
                                    className="flex-1 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                >
                                    Cambiar Estado
                                </button>
                                {cert.evidenceUrl && (
                                    <a
                                        href={cert.evidenceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                                    >
                                        Ver Evidencia
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Pagination page={page} limit={limit} totalPages={totalPages} setSearchParams={setSearchParams} />
        </div>
    );
};
