import { useState } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { DollarSign, Briefcase, Zap, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartURSpinner } from '../../../components/ui/SmartURSpinner';

const TABS = [
    { key: 'expenditure', label: 'Gasto Turístico',  icon: DollarSign, color: 'var(--color-purple)' },
    { key: 'employment',  label: 'Empleo',            icon: Briefcase,  color: 'var(--color-cyan)'   },
    { key: 'input',       label: 'Huella de Carbono', icon: Zap,        color: 'var(--color-green)'  },
] as const;
type TabKey = typeof TABS[number]['key'];

const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-alt)' }}>
        {children}
    </label>
);

const inputCls = "mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2";
const inputStyle: React.CSSProperties = {
    background: 'var(--color-bg-alt)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
};

export const StatisticsPage = () => {
    const { isLoading, recordExpenditure, recordEmployment, recordInput } = useStatistics();
    const [activeTab, setActiveTab] = useState<TabKey>('expenditure');

    const activeTabData = TABS.find((t) => t.key === activeTab)!;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: 'var(--color-purple)' }}>
                    <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                        Estadísticas y Finanzas
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
                        KPIs turísticos, laborales y ambientales
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-2xl p-1.5" style={{ background: 'var(--color-bg-alt)' }}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className="relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                            style={{ color: isActive ? 'white' : 'var(--color-text-alt)' }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ background: tab.color }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                />
                            )}
                            <tab.icon className="relative h-4 w-4" />
                            <span className="relative">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Form panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl border p-8 shadow-sm"
                    style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                    {/* Panel title */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{ background: activeTabData.color }}>
                            <activeTabData.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h2 className="font-semibold" style={{ color: 'var(--color-text)' }}>
                                {activeTab === 'expenditure' && 'Registrar Gasto Turístico'}
                                {activeTab === 'employment'  && 'Registrar Empleado'}
                                {activeTab === 'input'       && 'Registrar Insumo / Huella'}
                            </h2>
                            <p className="text-xs" style={{ color: 'var(--color-text-alt)' }}>
                                Completa los campos y guarda el registro
                            </p>
                        </div>
                    </div>

                    {activeTab === 'expenditure' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                recordExpenditure({
                                    id_tourist: 1,
                                    expenditure_type: fd.get('type') as string,
                                    amount: Number(fd.get('amount')),
                                    destination: fd.get('destination') as string,
                                });
                                e.currentTarget.reset();
                            }}
                            className="max-w-md space-y-4"
                        >
                            <div>
                                <Label>Tipo de gasto</Label>
                                <input name="type" placeholder="Alojamiento, Comida, Transporte…"
                                    className={inputCls} style={inputStyle} required />
                            </div>
                            <div>
                                <Label>Monto ($)</Label>
                                <input name="amount" type="number" placeholder="0.00"
                                    className={inputCls} style={inputStyle} required />
                            </div>
                            <div>
                                <Label>Destino / Establecimiento</Label>
                                <input name="destination" placeholder="Nombre del lugar o establecimiento"
                                    className={inputCls} style={inputStyle} required />
                            </div>
                            <button type="submit" disabled={isLoading}
                                className="mt-2 w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                style={{ background: activeTabData.color }}>
                                {isLoading ? <><SmartURSpinner size={22} /> Guardando…</> : 'Guardar Gasto'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'employment' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                recordEmployment({
                                    id_company: 1,
                                    position: fd.get('position') as string,
                                    contract_type: fd.get('contract') as string,
                                    gender: fd.get('gender') as string,
                                    salary: Number(fd.get('salary')),
                                    start_date: new Date().toISOString().split('T')[0],
                                });
                                e.currentTarget.reset();
                            }}
                            className="max-w-md space-y-4"
                        >
                            <div>
                                <Label>Cargo / Puesto</Label>
                                <input name="position" placeholder="Ej: Recepcionista, Guía turístico…"
                                    className={inputCls} style={inputStyle} required />
                            </div>
                            <div>
                                <Label>Tipo de contrato</Label>
                                <select name="contract" className={inputCls} style={inputStyle}>
                                    <option value="Tiempo Completo">Tiempo Completo</option>
                                    <option value="Medio Tiempo">Medio Tiempo</option>
                                    <option value="Temporal">Temporal</option>
                                </select>
                            </div>
                            <div>
                                <Label>Género</Label>
                                <select name="gender" className={inputCls} style={inputStyle}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="No binario">No binario</option>
                                    <option value="Prefiero no decir">Prefiero no decir</option>
                                </select>
                            </div>
                            <div>
                                <Label>Salario mensual ($)</Label>
                                <input name="salary" type="number" placeholder="0.00"
                                    className={inputCls} style={inputStyle} required />
                            </div>
                            <button type="submit" disabled={isLoading}
                                className="mt-2 w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                style={{ background: activeTabData.color }}>
                                {isLoading ? <><SmartURSpinner size={22} /> Guardando…</> : 'Registrar Empleado'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'input' && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const fd = new FormData(e.currentTarget);
                                recordInput({
                                    id_company: 1,
                                    input_type: fd.get('type') as string,
                                    cost: Number(fd.get('cost')),
                                    consumption: Number(fd.get('consumption')),
                                    carbon_footprint: Number(fd.get('carbon')),
                                });
                                e.currentTarget.reset();
                            }}
                            className="max-w-md space-y-4"
                        >
                            <div>
                                <Label>Tipo de insumo</Label>
                                <select name="type" className={inputCls} style={inputStyle}>
                                    <option value="Energía Eléctrica">Energía Eléctrica</option>
                                    <option value="Agua">Agua</option>
                                    <option value="Gas - Combustible">Gas / Combustible</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label>Consumo (kWh / m³)</Label>
                                    <input name="consumption" type="number" placeholder="0"
                                        className={inputCls} style={inputStyle} required />
                                </div>
                                <div>
                                    <Label>Huella CO₂ (kg)</Label>
                                    <input name="carbon" type="number" step="0.01" placeholder="0.00"
                                        className={inputCls} style={inputStyle} required />
                                </div>
                            </div>
                            <div>
                                <Label>Costo asociado ($)</Label>
                                <input name="cost" type="number" placeholder="0.00"
                                    className={inputCls} style={inputStyle} required />
                            </div>
                            <button type="submit" disabled={isLoading}
                                className="mt-2 w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                style={{ background: activeTabData.color }}>
                                {isLoading ? <><SmartURSpinner size={22} /> Guardando…</> : 'Guardar Indicadores'}
                            </button>
                        </form>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
