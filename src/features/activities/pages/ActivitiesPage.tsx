import { useMemo } from 'react';
import { useActivities } from '../hooks/useActivities';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';
import { Activity, DollarSign } from 'lucide-react';
import { TableBodyRows } from '../../../components/ui/TableSkeleton';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getDashboardText } from '../../../shared/i18n/dashboardLocale';

const ImpactBadge = ({
    value,
    type,
    lowEnv,
    lowSocial,
}: {
    value: string;
    type: 'env' | 'social';
    lowEnv: string;
    lowSocial: string;
}) => {
    const low =
        type === 'env'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    const high = 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
    const isHigh = ['alto', 'high', 'negativo', 'negative'].includes(value?.toLowerCase() ?? '');
    return (
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${isHigh ? high : low}`}>
            {value || (type === 'env' ? lowEnv : lowSocial)}
        </span>
    );
};

const TH = ({ children }: { children: React.ReactNode }) => (
    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-alt)' }}>
        {children}
    </th>
);

export const ActivitiesPage = () => {
    const { lang } = useLanguage();
    const m = useMemo(() => getDashboardText(lang).modules, [lang]);
    const { activities, isLoading, totalPages } = useActivities();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--color-green)' }}>
                    <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                        {m.activities.title}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
                        {m.activities.subtitle}
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                {activities.length === 0 && !isLoading ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-3">
                        <Activity className="h-12 w-12" style={{ color: 'var(--color-border)' }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-alt)' }}>
                            {m.activities.empty}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
                                <tr>
                                    <TH>{m.activities.colOrder}</TH>
                                    <TH>{m.activities.colCompany}</TH>
                                    <TH>
                                        <span className="flex items-center gap-1.5">
                                            <DollarSign className="h-3.5 w-3.5" />
                                            {m.activities.colProduction}
                                        </span>
                                    </TH>
                                    <TH>{m.activities.colEnvImpact}</TH>
                                    <TH>{m.activities.colSocialImpact}</TH>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <TableBodyRows rows={9} colWidths={['w-7', 'flex-1', 'w-28', 'w-28', 'w-28']} />
                                ) : (
                                    activities.map((activity, i) => {
                                        const rowNumber = (page - 1) * limit + i + 1;

                                        return (
                                            <motion.tr
                                                key={activity.id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                style={{ borderBottom: '1px solid var(--color-border)' }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(var(--rgb-text),0.03)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                                            >
                                                <td className="px-5 py-3.5">
                                                    <span
                                                        className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
                                                        style={{ background: 'var(--color-green)' }}
                                                    >
                                                        {rowNumber}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5 text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                                                    {activity.company}
                                                </td>
                                                <td className="px-5 py-3.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                    ${Number(activity.production_value).toLocaleString(lang === 'es' ? 'es-MX' : lang === 'fr' ? 'fr-FR' : 'en-US')}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <ImpactBadge
                                                        value={activity.environmental_impact}
                                                        type="env"
                                                        lowEnv={m.activities.impactLowEnv}
                                                        lowSocial={m.activities.impactLowSocial}
                                                    />
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <ImpactBadge
                                                        value={activity.social_impact}
                                                        type="social"
                                                        lowEnv={m.activities.impactLowEnv}
                                                        lowSocial={m.activities.impactLowSocial}
                                                    />
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Pagination page={page} limit={limit} totalPages={totalPages} setSearchParams={setSearchParams} />
        </div>
    );
};
