import { useProfiles } from '../hooks/useProfiles';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';
import { UserCircle, Luggage, Heart, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { TableBodyRows } from '../../../components/ui/TableSkeleton';

const Badge = ({ text, color }: { text: string; color: string }) => (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>{text}</span>
);

const TH = ({ children }: { children: React.ReactNode }) => (
    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-alt)' }}>
        {children}
    </th>
);

const TD = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <td className={`px-5 py-3.5 text-sm ${className}`} style={{ color: 'var(--color-text-alt)' }}>
        {children}
    </td>
);

export const ProfilesPage = () => {
    const { profiles, isLoading, totalPages } = useProfiles();
    const [searchParams, setSearchParams] = useSearchParams();
    const page  = Number(searchParams.get('page'))  || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: 'var(--color-purple)' }}>
                    <UserCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Perfiles de Viajero
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
                        Intereses y preferencias de los usuarios
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                {profiles.length === 0 && !isLoading ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-3">
                        <UserCircle className="h-12 w-12" style={{ color: 'var(--color-border)' }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-alt)' }}>No hay perfiles registrados</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
                                <tr>
                                    <TH>#</TH>
                                    <TH>Usuario</TH>
                                    <TH><span className="flex items-center gap-1.5"><Luggage className="h-3.5 w-3.5" />Tipo de Viaje</span></TH>
                                    <TH><span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" />Intereses</span></TH>
                                    <TH><span className="flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5" />Sostenibilidad</span></TH>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <TableBodyRows rows={9} colWidths={['w-7', 'w-20', 'w-24', 'flex-1', 'w-24']} />
                                ) : profiles.map((profile, i) => (
                                    <motion.tr
                                        key={profile.id}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="transition-colors"
                                        style={{ borderBottom: '1px solid var(--color-border)' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(var(--rgb-text),0.03)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                                    >
                                        <TD>
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
                                                style={{ background: 'var(--color-purple)' }}>
                                                {profile.id}
                                            </span>
                                        </TD>
                                        <TD>
                                            <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                                                ID {profile.user_id}
                                            </span>
                                        </TD>
                                        <TD>
                                            {profile.travel_type
                                                ? <Badge text={profile.travel_type} color="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" />
                                                : <span className="text-xs text-zinc-400">N/A</span>}
                                        </TD>
                                        <TD className="max-w-xs">
                                            <p className="truncate">{profile.interests || 'N/A'}</p>
                                        </TD>
                                        <TD>
                                            {profile.sustainable_preferences
                                                ? <Badge text={profile.sustainable_preferences} color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" />
                                                : <span className="text-xs text-zinc-400">N/A</span>}
                                        </TD>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Pagination page={page} limit={limit} totalPages={totalPages} setSearchParams={setSearchParams} />
        </div>
    );
};
