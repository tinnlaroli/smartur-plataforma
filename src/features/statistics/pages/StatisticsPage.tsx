import { useState } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { DollarSign, Briefcase, Zap } from 'lucide-react';

export const StatisticsPage = () => {
    const { isLoading, recordExpenditure, recordEmployment, recordInput } = useStatistics();
    const [activeTab, setActiveTab] = useState<'expenditure' | 'employment' | 'input'>('expenditure');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Estadísticas y Finanzas</h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Registro de KPIs turísticos, laborales y ambientales</p>
            </div>

            <div className="flex w-fit gap-2 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
                <button
                    onClick={() => setActiveTab('expenditure')}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === 'expenditure' ? 'bg-white text-indigo-600 shadow-sm dark:bg-zinc-800 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                    <DollarSign className="h-4 w-4" />
                    Gasto
                </button>
                <button
                    onClick={() => setActiveTab('employment')}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === 'employment' ? 'bg-white text-indigo-600 shadow-sm dark:bg-zinc-800 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                    <Briefcase className="h-4 w-4" />
                    Empleo
                </button>
                <button
                    onClick={() => setActiveTab('input')}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeTab === 'input' ? 'bg-white text-indigo-600 shadow-sm dark:bg-zinc-800 dark:text-indigo-400' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                    <Zap className="h-4 w-4" />
                    Insumos
                </button>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#121214]">
                {activeTab === 'expenditure' && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            recordExpenditure({
                                id_tourist: 1,
                                expenditure_type: formData.get('type') as string,
                                amount: Number(formData.get('amount')),
                                destination: formData.get('destination') as string,
                            });
                        }}
                        className="max-w-md space-y-4"
                    >
                        <h2 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                            <DollarSign className="h-5 w-5 text-indigo-500" /> Registrar Gasto
                        </h2>
                        <input name="type" placeholder="Tipo de gasto (Alojamiento, Comida...)" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        <input name="amount" type="number" placeholder="Monto ($)" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        <input name="destination" placeholder="Destino / Establecimiento" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-indigo-600 py-2.5 font-bold text-white hover:bg-indigo-500 disabled:opacity-50">
                            {isLoading ? 'Registrando...' : 'Guardar Gasto'}
                        </button>
                    </form>
                )}

                {activeTab === 'employment' && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            recordEmployment({
                                id_company: 1,
                                position: formData.get('position') as string,
                                contract_type: formData.get('contract') as string,
                                gender: formData.get('gender') as string,
                                salary: Number(formData.get('salary')),
                                start_date: new Date().toISOString().split('T')[0],
                            });
                        }}
                        className="max-w-md space-y-4"
                    >
                        <h2 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                            <Briefcase className="h-5 w-5 text-indigo-500" /> Registrar Empleo
                        </h2>
                        <input name="position" placeholder="Cargo / Puesto" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        <select name="contract" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                            <option value="Tiempo Completo">Tiempo Completo</option>
                            <option value="Medio Tiempo">Medio Tiempo</option>
                            <option value="Temporal">Temporal</option>
                        </select>
                        <input name="salary" type="number" placeholder="Salario mensual" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-indigo-600 py-2.5 font-bold text-white hover:bg-indigo-500 disabled:opacity-50">
                            Registar Empleado
                        </button>
                    </form>
                )}

                {activeTab === 'input' && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            recordInput({
                                id_company: 1,
                                input_type: formData.get('type') as string,
                                cost: Number(formData.get('cost')),
                                consumption: Number(formData.get('consumption')),
                                carbon_footprint: Number(formData.get('carbon')),
                            });
                        }}
                        className="max-w-md space-y-4"
                    >
                        <h2 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                            <Zap className="h-5 w-5 text-indigo-500" /> Huella de Carbono e Insumos
                        </h2>
                        <select name="type" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                            <option value="Energía Eléctrica">Energía Eléctrica</option>
                            <option value="Agua">Agua</option>
                            <option value="Gas - Combustible">Gas - Combustible</option>
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="consumption" type="number" placeholder="Consumo (kWh/m3)" className="rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                            <input name="carbon" type="number" step="0.01" placeholder="Huella CO2" className="rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        </div>
                        <input name="cost" type="number" placeholder="Costo asociado ($)" className="w-full rounded-lg border px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900" required />
                        <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-indigo-600 py-2.5 font-bold text-white hover:bg-indigo-500 disabled:opacity-50">
                            Guardar Indicadores
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
