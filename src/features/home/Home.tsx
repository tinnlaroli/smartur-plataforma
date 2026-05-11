import { useEffect, useState } from 'react';
import {
    Users, MapPin, Star, Building2, Activity, TrendingUp,
    Clock, Award, ChevronRight, BarChart3, Percent,
    UserCheck, FileText, Loader2, AlertCircle, RefreshCw,
} from 'lucide-react';
import { dashboardApi, type DashboardStats } from './api/dashboardApi';

export const Home = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await dashboardApi.getStats();
            setStats(data);
        } catch (err) {
            setError('No se pudieron cargar las estadísticas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <Loader2 className="mx-auto h-10 w-10 animate-spin text-indigo-500" />
                    <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <AlertCircle className="mx-auto h-12 w-12 text-rose-400" />
                    <p className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">{error}</p>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Verifica la conexión con el servidor</p>
                    <button
                        onClick={fetchStats}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    const metrics = [
        {
            label: 'Lugares Registrados',
            value: stats.total_locations,
            icon: MapPin,
            color: 'from-blue-500 to-blue-600',
            lightBg: 'bg-blue-50',
            lightIcon: 'text-blue-600',
            darkBg: 'bg-blue-500/10',
            darkIcon: 'text-blue-400',
            border: 'border-blue-500',
        },
        {
            label: 'Servicios Turísticos',
            value: stats.total_services,
            icon: Building2,
            color: 'from-emerald-500 to-emerald-600',
            lightBg: 'bg-emerald-50',
            lightIcon: 'text-emerald-600',
            darkBg: 'bg-emerald-500/10',
            darkIcon: 'text-emerald-400',
            border: 'border-emerald-500',
        },
        {
            label: 'Usuarios Activos',
            value: stats.active_users,
            icon: UserCheck,
            color: 'from-violet-500 to-violet-600',
            lightBg: 'bg-violet-50',
            lightIcon: 'text-violet-600',
            darkBg: 'bg-violet-500/10',
            darkIcon: 'text-violet-400',
            border: 'border-violet-500',
        },
        {
            label: 'Evaluaciones Realizadas',
            value: stats.total_evaluations,
            icon: Star,
            color: 'from-amber-500 to-amber-600',
            lightBg: 'bg-amber-50',
            lightIcon: 'text-amber-600',
            darkBg: 'bg-amber-500/10',
            darkIcon: 'text-amber-400',
            border: 'border-amber-500',
        },
    ];

    const secondaryMetrics = [
        {
            label: 'Usuarios Totales',
            value: stats.total_users,
            icon: Users,
            change: '+12%',
            positive: true,
        },
        {
            label: 'Empresas',
            value: stats.total_companies,
            icon: Building2,
            change: '+8%',
            positive: true,
        },
        {
            label: 'Puntos de Interés',
            value: stats.total_poi,
            icon: MapPin,
            change: '+5%',
            positive: true,
        },
        {
            label: 'Promedio General',
            value: `${stats.average_score}`,
            icon: Percent,
            suffix: '/5',
            change: stats.average_score >= '4' ? 'Excelente' : 'Mejorable',
            positive: stats.average_score >= '4',
        },
    ];

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (mins < 60) return `Hace ${mins} min`;
        if (hours < 24) return `Hace ${hours} h`;
        if (days < 7) return `Hace ${days} días`;
        return date.toLocaleDateString('es-MX');
    };

    const getScoreColor = (score: string | number) => {
        const num = Number(score);
        if (num >= 4) return 'text-emerald-500';
        if (num >= 3) return 'text-amber-500';
        return 'text-rose-500';
    };

    const maxEvaluationCount = Math.max(
        ...stats.evaluations_by_month.map((e) => e.count),
        1
    );

    return (
        <div className="min-h-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Panel de Control
                </h1>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Resumen general del sistema Smartur
                </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className={`group relative overflow-hidden rounded-2xl border-l-4 ${m.border} bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-zinc-900`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    {m.label}
                                </p>
                                <p className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                    {m.value.toLocaleString()}
                                </p>
                            </div>
                            <div className={`rounded-xl p-3 ${m.darkBg} ${m.lightBg}`}>
                                <m.icon className={`h-6 w-6 ${m.darkIcon} ${m.lightIcon}`} />
                            </div>
                        </div>
                        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <div
                                className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-1000`}
                                style={{ width: `${Math.min((m.value / 2000) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {secondaryMetrics.map((m) => (
                    <div
                        key={m.label}
                        className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                {m.label}
                            </p>
                            <m.icon className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div className="mt-2 flex items-baseline gap-1.5">
                            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {m.value}
                            </span>
                            {'suffix' in m && (
                                <span className="text-sm text-zinc-400">{m.suffix}</span>
                            )}
                        </div>
                        <p
                            className={`mt-1 text-xs font-medium ${
                                m.positive ? 'text-emerald-500' : 'text-rose-500'
                            }`}
                        >
                            {m.change}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Evaluaciones por Mes
                        </h3>
                        <BarChart3 className="h-5 w-5 text-zinc-400" />
                    </div>
                    {stats.evaluations_by_month.length === 0 ? (
                        <p className="py-8 text-center text-sm text-zinc-500">Sin datos disponibles</p>
                    ) : (
                        <div className="space-y-3">
                            {stats.evaluations_by_month.map((item) => (
                                <div key={item.month} className="group">
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                                            {new Date(item.month + '-01').toLocaleDateString('es-MX', {
                                                year: 'numeric',
                                                month: 'short',
                                            })}
                                        </span>
                                        <span className="text-zinc-500">
                                            {item.count} eval · <span className={getScoreColor(item.avg_score)}>{Number(item.avg_score).toFixed(1)}</span>
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700 group-hover:opacity-80"
                                            style={{
                                                width: `${(item.count / maxEvaluationCount) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-5 flex items-center justify-between">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Servicios Mejor Evaluados
                        </h3>
                        <Award className="h-5 w-5 text-zinc-400" />
                    </div>
                    {stats.top_services.length === 0 ? (
                        <p className="py-8 text-center text-sm text-zinc-500">Sin evaluaciones aún</p>
                    ) : (
                        <div className="space-y-4">
                            {stats.top_services.map((service, i) => (
                                <div
                                    key={service.id_service}
                                    className="flex items-center justify-between border-b border-zinc-100 pb-3 last:border-0 dark:border-zinc-800"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white shadow-sm">
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                {service.service_name}
                                            </p>
                                            <p className="text-xs text-zinc-500">{service.company_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold ${getScoreColor(service.avg_score)}`}>
                                            {Number(service.avg_score).toFixed(1)}
                                        </span>
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Actividad Reciente
                    </h3>
                    <Activity className="h-5 w-5 text-zinc-400" />
                </div>
                {stats.recent_evaluations.length === 0 ? (
                    <p className="py-8 text-center text-sm text-zinc-500">Sin actividad reciente</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {stats.recent_evaluations.slice(0, 8).map((ev) => (
                            <div
                                key={ev.id_evaluation}
                                className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:border-zinc-700"
                            >
                                <div className="rounded-full bg-indigo-100 p-2 dark:bg-indigo-900/30">
                                    <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                        {ev.service_name}
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        Evaluado por {ev.evaluator_name}
                                    </p>
                                    <div className="mt-1 flex items-center gap-3 text-xs">
                                        <span className={`font-medium ${getScoreColor(ev.total_score)}`}>
                                            {Number(ev.total_score).toFixed(1)} / 5
                                        </span>
                                        <span className="flex items-center gap-1 text-zinc-400">
                                            <Clock className="h-3 w-3" />
                                            {formatDate(ev.created_at)}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-zinc-300 dark:text-zinc-600" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
