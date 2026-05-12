import { useEffect, useState, useRef } from 'react';
import {
    Users, MapPin, Star, Building2, Activity,
    Clock, Award, FileText, Loader2, AlertCircle,
    RefreshCw, TrendingUp, TrendingDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dashboardApi, type DashboardStats } from './api/dashboardApi';

/* ── Design tokens (from design.md) ─────────────────────────────────── */
const C = {
    pink:   '#FC478E',
    purple: '#984EFD',
    cyan:   '#4DB9CA',
    green:  '#9CCC44',
    orange: '#FF7D1F',
    success:'#10B981',
    warning:'#F59E0B',
    error:  '#EF4444',
} as const;

/* ── Animated counter ────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1100, delay = 0) {
    const [val, setVal] = useState(0);
    const raf = useRef<number>(0);
    useEffect(() => {
        if (!target) return;
        const t0 = performance.now() + delay;
        const tick = (now: number) => {
            const p = Math.min(Math.max(now - t0, 0) / duration, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, [target, duration, delay]);
    return val;
}

/* ── KPI card ────────────────────────────────────────────────────────── */
interface KpiProps {
    label: string; value: number;
    icon: React.ElementType; color: string; delay?: number;
}
const KpiCard = ({ label, value, icon: Icon, color, delay = 0 }: KpiProps) => {
    const count = useCountUp(value, 1100, delay);
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: delay / 1000 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4"
            style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
        >
            <div className="flex items-start justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-alt)' }}>
                    {label}
                </p>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: color + '22' }}>
                    <Icon className="h-4 w-4" style={{ color }} />
                </div>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {count.toLocaleString('es-MX')}
            </p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: 'var(--color-bg-alt)' }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((value / 2000) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: delay / 1000 + 0.25, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
};

/* ── Responsive SVG area chart ───────────────────────────────────────── */
interface AreaPoint { label: string; evalCount: number; avg: number; }
const AreaChart = ({ data }: { data: AreaPoint[] }) => {
    const PAD = { t: 8, r: 8, b: 22, l: 28 };
    if (data.length < 2) return (
        <div className="flex h-full items-center justify-center">
            <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>Sin datos suficientes</p>
        </div>
    );
    const W = 500; const H = 160;
    const iW = W - PAD.l - PAD.r; const iH = H - PAD.t - PAD.b;
    const maxE = Math.max(...data.map(d => d.evalCount), 1);
    const xP = (i: number) => PAD.l + (i / (data.length - 1)) * iW;
    const yE = (v: number) => PAD.t + iH - (v / maxE) * iH;
    const yA = (v: number) => PAD.t + iH - (v / 5) * iH;
    const ep = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xP(i)},${yE(d.evalCount)}`).join(' ');
    const ap = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xP(i)},${yA(d.avg)}`).join(' ');
    const ea = `${ep} L${xP(data.length-1)},${PAD.t+iH} L${PAD.l},${PAD.t+iH} Z`;
    const aa = `${ap} L${xP(data.length-1)},${PAD.t+iH} L${PAD.l},${PAD.t+iH} Z`;
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.purple} stopOpacity=".3" />
                    <stop offset="100%" stopColor={C.purple} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.cyan} stopOpacity=".25" />
                    <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
                </linearGradient>
            </defs>
            {[0, .33, .67, 1].map(t => {
                const y = PAD.t + iH * (1 - t);
                return <line key={t} x1={PAD.l} y1={y} x2={W-PAD.r} y2={y} stroke="currentColor" strokeWidth=".5" className="text-zinc-200 dark:text-zinc-800" />;
            })}
            <motion.path d={ea} fill="url(#ge)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7 }} />
            <motion.path d={aa} fill="url(#ga)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .15 }} />
            <motion.path d={ep} fill="none" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} />
            <motion.path d={ap} fill="none" stroke={C.cyan} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeOut', delay: .12 }} />
            {data.map((d, i) => (
                <g key={i}>
                    <circle cx={xP(i)} cy={yE(d.evalCount)} r="3" fill={C.purple} />
                    <circle cx={xP(i)} cy={yA(d.avg)} r="2.5" fill={C.cyan} />
                    <text x={xP(i)} y={H - 4} textAnchor="middle" fontSize="8" fill="currentColor" className="text-zinc-400">
                        {d.label}
                    </text>
                </g>
            ))}
        </svg>
    );
};

/* ── Score ring ──────────────────────────────────────────────────────── */
const ScoreRing = ({ score }: { score: string }) => {
    const n = Math.min(Math.max(Number(score), 0), 5);
    const R = 36; const circ = 2 * Math.PI * R;
    const color = n >= 4 ? C.success : n >= 3 ? C.warning : C.error;
    return (
        <div className="flex flex-col items-center">
            <svg width="88" height="88" viewBox="0 0 88 88">
                <circle cx="44" cy="44" r={R} fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-100 dark:text-zinc-800" />
                <motion.circle cx="44" cy="44" r={R} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ - (n / 5) * circ }}
                    transition={{ duration: 1.3, ease: 'easeOut', delay: .4 }}
                    transform="rotate(-90 44 44)" />
                <text x="44" y="50" textAnchor="middle" fontSize="17" fontWeight="700" fill={color}>
                    {n.toFixed(1)}
                </text>
            </svg>
            <p className="text-[10px] font-medium" style={{ color: 'var(--color-text-alt)' }}>/ 5.0</p>
        </div>
    );
};

/* ── Helpers ─────────────────────────────────────────────────────────── */
const ROLE_LABELS: Record<number, string> = { 1: 'Admin', 2: 'Evaluador', 3: 'Empresa', 4: 'Turista' };
const scoreColor = (s: string | number) => {
    const n = Number(s);
    if (n >= 4) return C.success;
    if (n >= 3) return C.warning;
    return C.error;
};
const formatDate = (d: string) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(diff / 3600000);
    if (m < 60) return `${m}m`;
    if (h < 24) return `${h}h`;
    return new Date(d).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
};

/* ── DONUT chart ─────────────────────────────────────────────────────── */
const DONUT_COLORS = [C.purple, C.cyan, C.orange, C.pink];
interface DonutSlice { name: string; value: number; }
const Donut = ({ data }: { data: DonutSlice[] }) => {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const R = 38; const r = 24; const cx = 50; const cy = 50;
    let angle = -Math.PI / 2;
    const slices = data.map((d, i) => {
        const sw = (d.value / total) * 2 * Math.PI;
        const x1 = cx + R * Math.cos(angle), y1 = cy + R * Math.sin(angle);
        angle += sw;
        const x2 = cx + R * Math.cos(angle), y2 = cy + R * Math.sin(angle);
        const xi1 = cx + r * Math.cos(angle), yi1 = cy + r * Math.sin(angle);
        angle -= sw;
        const xi2 = cx + r * Math.cos(angle), yi2 = cy + r * Math.sin(angle);
        angle += sw;
        const lg = sw > Math.PI ? 1 : 0;
        return { path: `M${x1},${y1} A${R},${R} 0 ${lg},1 ${x2},${y2} L${xi1},${yi1} A${r},${r} 0 ${lg},0 ${xi2},${yi2} Z`, color: DONUT_COLORS[i % DONUT_COLORS.length], ...d };
    });
    return (
        <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0">
                {slices.map((s, i) => (
                    <motion.path key={s.name} d={s.path} fill={s.color}
                        initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: .3 + i * .08 }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
                ))}
                <circle cx={cx} cy={cy} r={r} className="fill-white dark:fill-zinc-900" />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" className="text-zinc-900 dark:text-zinc-100">
                    {total}
                </text>
            </svg>
            <div className="space-y-1">
                {slices.map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5 text-[11px]">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
                        <span style={{ color: 'var(--color-text-alt)' }}>{s.name}</span>
                        <span className="ml-auto pl-2 font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ── Main ────────────────────────────────────────────────────────────── */
export const Home = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true); setError(null);
        try { setStats(await dashboardApi.getStats()); }
        catch { setError('No se pudieron cargar las estadísticas'); }
        finally { setLoading(false); }
    };
    useEffect(() => { fetchStats(); }, []);

    if (loading) return (
        <div className="flex h-full items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4">
                <div className="relative h-14 w-14">
                    <div className="absolute inset-0 animate-ping rounded-full" style={{ background: C.purple + '33' }} />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full" style={{ background: C.purple + '15' }}>
                        <Loader2 className="h-7 w-7 animate-spin" style={{ color: C.purple }} />
                    </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>Cargando dashboard…</p>
            </motion.div>
        </div>
    );

    if (error) return (
        <div className="flex h-full items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border p-8 text-center shadow-sm"
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <AlertCircle className="mx-auto h-10 w-10" style={{ color: C.error }} />
                <p className="mt-3 font-semibold" style={{ color: 'var(--color-text)' }}>{error}</p>
                <button onClick={fetchStats}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white transition hover:opacity-80 active:scale-95"
                    style={{ background: C.purple }}>
                    <RefreshCw className="h-3.5 w-3.5" /> Reintentar
                </button>
            </motion.div>
        </div>
    );

    if (!stats) return null;

    /* derived */
    const monthlyData: AreaPoint[] = stats.evaluations_by_month.map((e) => ({
        label: new Date(e.month + '-01').toLocaleDateString('es-MX', { month: 'short' }),
        evalCount: e.count,
        avg: parseFloat(Number(e.avg_score).toFixed(2)),
    }));
    const pieData = stats.users_by_role.map((r) => ({
        name: ROLE_LABELS[r.role_id] ?? `Rol ${r.role_id}`,
        value: r.count,
    }));
    const avgScore = Number(stats.average_score);
    const scoreLabel = avgScore >= 4 ? '¡Excelente!' : avgScore >= 3 ? 'Aceptable' : 'Mejorable';
    const scoreClr = avgScore >= 4 ? C.success : avgScore >= 3 ? C.warning : C.error;

    /* ── No-scroll grid layout ── */
    return (
        <div className="flex h-[calc(100vh-9rem)] flex-col gap-3 overflow-hidden">

            {/* ── Row 1: header ── */}
            <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex shrink-0 items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl font-bold tracking-tight"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                        Panel de Control
                    </h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-alt)' }}>
                        Vista general del ecosistema Smartur
                    </p>
                </div>
                <button onClick={fetchStats}
                    className="flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80 active:scale-95"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-alt)', background: 'var(--color-bg)' }}>
                    <RefreshCw className="h-3 w-3" /> Actualizar
                </button>
            </motion.div>

            {/* ── Row 2: KPI cards ── */}
            <div className="grid shrink-0 grid-cols-2 gap-3 xl:grid-cols-4">
                <KpiCard label="Lugares"     value={stats.total_locations}   icon={MapPin}     color={C.cyan}   delay={0}   />
                <KpiCard label="Servicios"   value={stats.total_services}    icon={Building2}  color={C.green}  delay={60}  />
                <KpiCard label="Usuarios"    value={stats.active_users}      icon={Users}      color={C.purple} delay={120} />
                <KpiCard label="Evaluaciones"value={stats.total_evaluations} icon={Star}       color={C.orange} delay={180} />
            </div>

            {/* ── Row 3: main content (flex-1) ── */}
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 xl:grid-cols-5">

                {/* Left col (3/5): chart + top services */}
                <div className="flex min-h-0 flex-col gap-3 xl:col-span-3">

                    {/* Area chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}
                        className="flex min-h-0 flex-1 flex-col rounded-2xl border p-4"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                    >
                        <div className="mb-2 flex shrink-0 items-center justify-between">
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                                Evaluaciones por Mes
                            </p>
                            <div className="flex items-center gap-3 text-[10px]" style={{ color: 'var(--color-text-alt)' }}>
                                <span className="flex items-center gap-1">
                                    <span className="h-1.5 w-3 rounded-full inline-block" style={{ background: C.purple }} />Eval.
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="h-1.5 w-3 rounded-full inline-block" style={{ background: C.cyan }} />Prom.
                                </span>
                            </div>
                        </div>
                        <div className="min-h-0 flex-1">
                            <AreaChart data={monthlyData} />
                        </div>
                    </motion.div>

                    {/* Top services */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }}
                        className="shrink-0 rounded-2xl border p-4"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                    >
                        <div className="mb-2 flex items-center gap-2">
                            <Award className="h-3.5 w-3.5" style={{ color: C.orange }} />
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                                Top Servicios
                            </p>
                        </div>
                        {stats.top_services.length === 0 ? (
                            <p className="py-2 text-center text-xs" style={{ color: 'var(--color-text-alt)' }}>Sin datos</p>
                        ) : (
                            <div className="space-y-2">
                                {stats.top_services.slice(0, 3).map((s, i) => {
                                    const score = Number(s.avg_score);
                                    const clr = score >= 4 ? C.success : score >= 3 ? C.warning : C.error;
                                    const name = s.service_name.length > 22 ? s.service_name.slice(0, 22) + '…' : s.service_name;
                                    return (
                                        <div key={s.id_service} className="flex items-center gap-2">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white"
                                                style={{ background: C.purple }}>
                                                {i + 1}
                                            </span>
                                            <span className="flex-1 truncate text-xs" style={{ color: 'var(--color-text)' }}>{name}</span>
                                            <div className="h-1.5 w-24 overflow-hidden rounded-full" style={{ background: 'var(--color-bg-alt)' }}>
                                                <motion.div className="h-full rounded-full"
                                                    style={{ background: clr }}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(score / 5) * 100}%` }}
                                                    transition={{ duration: .8, delay: .5 + i * .1, ease: 'easeOut' }} />
                                            </div>
                                            <span className="w-8 text-right text-[11px] font-bold" style={{ color: clr }}>
                                                {score.toFixed(1)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right col (2/5): score + donut + activity */}
                <div className="flex min-h-0 flex-col gap-3 xl:col-span-2">

                    {/* Score + stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }}
                        className="shrink-0 rounded-2xl border p-4"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <ScoreRing score={stats.average_score} />
                                <p className="mt-0.5 text-[11px] font-bold" style={{ color: scoreClr }}>{scoreLabel}</p>
                            </div>
                            <div className="flex-1 space-y-2">
                                {[
                                    { label: 'Usuarios totales', value: stats.total_users,     up: true,  change: '+12%', icon: Users },
                                    { label: 'Empresas',         value: stats.total_companies, up: true,  change: '+8%',  icon: Building2 },
                                    { label: 'Puntos de Interés',value: stats.total_poi,       up: true,  change: '+5%',  icon: MapPin },
                                ].map((s) => (
                                    <div key={s.label} className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <s.icon className="h-3 w-3" style={{ color: 'var(--color-text-alt)' }} />
                                            <span className="text-[11px]" style={{ color: 'var(--color-text-alt)' }}>{s.label}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</span>
                                            <span className="flex items-center text-[10px] font-semibold" style={{ color: s.up ? C.success : C.error }}>
                                                {s.up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                                                {s.change}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Donut */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .33 }}
                        className="shrink-0 rounded-2xl border p-4"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                    >
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                            Distribución de Usuarios
                        </p>
                        {pieData.length === 0
                            ? <p className="text-xs" style={{ color: 'var(--color-text-alt)' }}>Sin datos</p>
                            : <Donut data={pieData} />}
                    </motion.div>

                    {/* Activity feed (flex-1, internally scrollable) */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .37 }}
                        className="flex min-h-0 flex-1 flex-col rounded-2xl border p-4"
                        style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                    >
                        <div className="mb-2 flex shrink-0 items-center gap-2">
                            <Activity className="h-3.5 w-3.5" style={{ color: C.purple }} />
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                                Actividad Reciente
                            </p>
                        </div>
                        {stats.recent_evaluations.length === 0 ? (
                            <p className="text-xs" style={{ color: 'var(--color-text-alt)' }}>Sin actividad</p>
                        ) : (
                            <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
                                <AnimatePresence>
                                    {stats.recent_evaluations.slice(0, 8).map((ev, i) => (
                                        <motion.div
                                            key={ev.id_evaluation}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: .45 + i * .04 }}
                                            className="flex items-center gap-2 rounded-xl p-2 transition-colors"
                                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(var(--rgb-text),.04)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                                        >
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                                                style={{ background: scoreColor(ev.total_score) + '22' }}>
                                                <FileText className="h-3.5 w-3.5" style={{ color: scoreColor(ev.total_score) }} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[11px] font-semibold" style={{ color: 'var(--color-text)' }}>
                                                    {ev.service_name}
                                                </p>
                                                <p className="text-[10px]" style={{ color: 'var(--color-text-alt)' }}>
                                                    {ev.evaluator_name}
                                                </p>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-[11px] font-bold" style={{ color: scoreColor(ev.total_score) }}>
                                                    {Number(ev.total_score).toFixed(1)}★
                                                </p>
                                                <p className="flex items-center gap-0.5 text-[9px]" style={{ color: 'var(--color-text-alt)' }}>
                                                    <Clock className="h-2 w-2" />
                                                    {formatDate(ev.created_at)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
