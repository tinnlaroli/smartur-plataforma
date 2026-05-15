import { useMemo } from 'react';
import { usePOI } from '../hooks/usePOI';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../users/components/Pagination';
import { Star, Leaf, Tag } from 'lucide-react';
import { TableBodyRows } from '../../../components/ui/TableSkeleton';
import { motion } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getDashboardText } from '../../../shared/i18n/dashboardLocale';

const TH = ({ children }: { children: React.ReactNode }) => (
    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-alt)' }}>
        {children}
    </th>
);

export const POIPage = () => {
    const { lang } = useLanguage();
    const m = useMemo(() => getDashboardText(lang).modules, [lang]);
    const { points, isLoading, totalPages } = usePOI();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--color-pink)' }}>
                    <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                        {m.poi.title}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
                        {m.poi.subtitle}
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                {points.length === 0 && !isLoading ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-3">
                        <Star className="h-12 w-12" style={{ color: 'var(--color-border)' }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--color-text-alt)' }}>
                            {m.poi.empty}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
                                <tr>
                                    <TH>{m.poi.colName}</TH>
                                    <TH>{m.poi.colDescription}</TH>
                                    <TH>
                                        <span className="flex items-center gap-1.5">
                                            <Tag className="h-3.5 w-3.5" />
                                            {m.poi.colType}
                                        </span>
                                    </TH>
                                    <TH>
                                        <span className="flex items-center gap-1.5">
                                            <Leaf className="h-3.5 w-3.5" />
                                            {m.poi.colSustainable}
                                        </span>
                                    </TH>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <TableBodyRows rows={9} colWidths={['w-36', 'flex-1', 'w-24', 'w-24']} />
                                ) : (
                                    points.map((poi, i) => (
                                        <motion.tr
                                            key={poi.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            style={{ borderBottom: '1px solid var(--color-border)' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(var(--rgb-text),0.03)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                                        >
                                            <td className="px-5 py-3.5">
                                                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                                                    {poi.name}
                                                </p>
                                            </td>
                                            <td className="max-w-sm px-5 py-3.5">
                                                <p className="truncate text-sm" style={{ color: 'var(--color-text-alt)' }}>
                                                    {poi.description || m.poi.noDescription}
                                                </p>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span
                                                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                    style={{
                                                        background: 'rgba(var(--rgb-purple-accent),0.12)',
                                                        color: 'var(--color-purple)',
                                                    }}
                                                >
                                                    {poi.typeId}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {poi.sustainability ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        <Leaf className="h-3 w-3" /> {m.poi.badgeSustainable}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                        style={{ background: 'var(--color-bg-alt)', color: 'var(--color-text-alt)' }}
                                                    >
                                                        {m.poi.badgeStandard}
                                                    </span>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))
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
