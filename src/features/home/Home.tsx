import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { dashboardApi, type DashboardStats } from './api/dashboardApi';
import {
    DashboardHeader,
    DashboardLoadingShell,
    DashboardPreferencesPanel,
    KpiStrip,
    OperationalMixCard,
    RecentActivityCard,
    TopServicesCard,
    TrendChartCard,
} from './components/DashboardWidgets';
import { useDashboardPreferences } from './hooks/useDashboardPreferences';
import { DASHBOARD_COLORS, deriveDashboardViewModel } from './utils/dashboard';
import { useLanguage } from '../../contexts/LanguageContext';
import { getDashboardText } from '../../shared/i18n/dashboardLocale';

const DashboardLoader = ({ label }: { label: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
    >
        <div className="relative h-14 w-14">
            <div
                className="absolute inset-0 animate-ping rounded-full"
                style={{ background: `${DASHBOARD_COLORS.purple}33` }}
            />
            <div
                className="relative flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: `${DASHBOARD_COLORS.purple}18` }}
            >
                <Loader2 className="h-7 w-7 animate-spin" style={{ color: DASHBOARD_COLORS.purple }} />
            </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
            {label}
        </p>
    </motion.div>
);

export const Home = () => {
    const { lang } = useLanguage();
    const copy = getDashboardText(lang);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preferencesOpen, setPreferencesOpen] = useState(false);
    const { preferences, setChartMode, setDensity, toggleWidget, resetPreferences } = useDashboardPreferences();

    const fetchStats = async (mode: 'initial' | 'refresh' = 'initial') => {
        if (mode === 'refresh' && stats) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        setError(null);

        try {
            const nextStats = await dashboardApi.getStats();
            setStats(nextStats);
        } catch {
            setError('dashboard-error');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        void fetchStats('initial');
    }, []);

    const viewModel = useMemo(() => (
        stats ? deriveDashboardViewModel(stats, lang) : null
    ), [lang, stats]);

    const supportWidgets = useMemo(() => {
        if (!viewModel || !stats) return [];

        const activityItems = viewModel.recentActivity.slice(0, preferences.density === 'compact' ? 4 : 5);

        return [
            preferences.showTopServices
                ? (
                    <TopServicesCard
                        key="top-services"
                        services={viewModel.topServices}
                        summary={viewModel.topServicesSummary}
                        density={preferences.density}
                    />
                )
                : null,
            preferences.showRecentActivity
                ? (
                    <RecentActivityCard
                        key="recent-activity"
                        activity={activityItems}
                        summary={viewModel.activitySummary}
                        density={preferences.density}
                    />
                )
                : null,
        ].filter((widget): widget is ReactElement => widget !== null);
    }, [preferences.density, preferences.showRecentActivity, preferences.showTopServices, stats, viewModel]);

    const showOperationalChart = preferences.showUserDistribution;

    if (loading) {
        return (
            <div className="relative">
                <DashboardLoadingShell density={preferences.density} />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                        className="rounded-[32px] border px-8 py-6 shadow-2xl backdrop-blur-md"
                        style={{
                            background: 'rgba(var(--rgb-bg), 0.72)',
                            borderColor: 'rgba(var(--rgb-text), 0.08)',
                        }}
                    >
                        <DashboardLoader label={copy.home.loadingLabel} />
                    </div>
                </div>
            </div>
        );
    }

    if (error && !stats) {
        return (
            <div className="flex h-full items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[28px] border p-8 text-center shadow-sm"
                    style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                    <AlertCircle className="mx-auto h-10 w-10" style={{ color: DASHBOARD_COLORS.danger }} />
                    <p className="mt-3 font-semibold" style={{ color: 'var(--color-text)' }}>
                        {copy.home.dashboardError}
                    </p>
                    <button
                        type="button"
                        onClick={() => { void fetchStats('initial'); }}
                        className="mt-5 inline-flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        style={{ background: DASHBOARD_COLORS.purple }}
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        {copy.home.retry}
                    </button>
                </motion.div>
            </div>
        );
    }

    if (!stats || !viewModel) return null;

    return (
        <div className="relative flex h-[calc(100vh-9rem)] flex-col gap-4 overflow-hidden">
            {preferencesOpen && (
                <button
                    type="button"
                    aria-label={copy.home.closePreferences}
                    className="absolute inset-0 z-10 cursor-default"
                    onClick={() => setPreferencesOpen(false)}
                />
            )}

            <DashboardHeader
                onRefresh={() => { void fetchStats('refresh'); }}
                refreshing={refreshing}
                preferencesOpen={preferencesOpen}
                onTogglePreferences={() => setPreferencesOpen((current) => !current)}
            />

            <DashboardPreferencesPanel
                open={preferencesOpen}
                preferences={preferences}
                onChartModeChange={setChartMode}
                onDensityChange={setDensity}
                onToggleWidget={toggleWidget}
                onReset={resetPreferences}
            />

            <KpiStrip metrics={viewModel.metrics} density={preferences.density} />

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <div className={`grid min-h-0 gap-4 ${showOperationalChart ? 'xl:grid-cols-12' : 'grid-cols-1'}`}>
                    <div className={showOperationalChart ? 'min-h-[24rem] xl:col-span-8' : 'min-h-[24rem]'}>
                        <TrendChartCard
                            chartMode={preferences.chartMode}
                            data={viewModel.trendData}
                            summary={viewModel.trendSummary}
                            insights={viewModel.trendInsights}
                            density={preferences.density}
                        />
                    </div>

                    {showOperationalChart && (
                        <div className="min-h-[22rem] xl:col-span-4">
                            <OperationalMixCard
                                data={viewModel.operationalData}
                                summary={viewModel.operationalSummary}
                                density={preferences.density}
                            />
                        </div>
                    )}
                </div>

                {supportWidgets.length > 0 ? (
                    <div className={`grid min-h-0 gap-4 ${supportWidgets.length > 1 ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
                        {supportWidgets}
                    </div>
                ) : !showOperationalChart ? (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[28px] border p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                    >
                        <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                            {copy.home.hiddenWidgetsTitle}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-alt)' }}>
                            {copy.home.hiddenWidgetsDescription}
                        </p>
                    </motion.div>
                ) : null}
            </div>

            <AnimatePresence>
                {refreshing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[32px] backdrop-blur-[2px]"
                        style={{ background: 'rgba(var(--rgb-bg), 0.58)' }}
                    >
                        <DashboardLoader label={copy.home.loadingRefreshLabel} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
