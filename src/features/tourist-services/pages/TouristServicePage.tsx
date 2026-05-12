import { useEffect, useReducer, useState } from 'react';
import { useTouristService } from '../hooks/useTouristService';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import CreateTouristServiceModal from '../components/CreateTouristServiceModal';
import TouristServiceDetailModal from '../components/TouristServiceDetailModal';
import TouristServiceTable from '../components/TouristServiceTable';
import SearchInput from '../components/SearchInput';
import { Trash2, ClipboardCheck, Wrench, Plus, AlertCircle } from 'lucide-react';
import { TableSkeleton } from '../../../components/ui/TableSkeleton';
import EvaluationWizardModal from '../../evaluations/components/EvaluationWizardModal';
import { motion, AnimatePresence } from 'framer-motion';

type ModalState = {
    isCreateOpen: boolean; isDetailOpen: boolean;
    isEvaluationOpen: boolean; selectedId: number | null;
};
type ModalAction =
    | { type: 'OPEN_CREATE' } | { type: 'CLOSE_CREATE' }
    | { type: 'OPEN_DETAIL'; id: number } | { type: 'CLOSE_DETAIL' }
    | { type: 'OPEN_EVALUATION' } | { type: 'CLOSE_EVALUATION' };

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
    switch (action.type) {
        case 'OPEN_CREATE':     return { ...state, isCreateOpen: true };
        case 'CLOSE_CREATE':    return { ...state, isCreateOpen: false };
        case 'OPEN_DETAIL':     return { ...state, isDetailOpen: true, selectedId: action.id };
        case 'CLOSE_DETAIL':    return { ...state, isDetailOpen: false, selectedId: null };
        case 'OPEN_EVALUATION': return { ...state, isEvaluationOpen: true };
        case 'CLOSE_EVALUATION':return { ...state, isEvaluationOpen: false };
        default: return state;
    }
};

export const TouristServicePage = () => {
    const {
        services, isLoading, error, totalPages,
        createService, updateService, deleteService,
        search: urlSearch, setSearch: setUrlSearch, fetchServices,
    } = useTouristService();

    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const page  = Number(searchParams.get('page'))  || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const [searchTerm, setSearchTerm] = useState(urlSearch);
    const [modalState, dispatchModal] = useReducer(modalReducer, {
        isCreateOpen: false, isDetailOpen: false, isEvaluationOpen: false, selectedId: null,
    });

    useEffect(() => { if (urlSearch !== searchTerm) setSearchTerm(urlSearch); }, [urlSearch]);
    useEffect(() => {
        const t = setTimeout(() => { if (searchTerm !== urlSearch) setUrlSearch(searchTerm); }, 500);
        return () => clearTimeout(t);
    }, [searchTerm, urlSearch, setUrlSearch]);

    const toggleService = (id: number) =>
        setSelectedServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

    const handleDeleteSelected = async () => {
        if (!window.confirm(`¿Eliminar ${selectedServices.length} servicio(s)?`)) return;
        for (const id of selectedServices) await deleteService(id);
        setSelectedServices([]);
    };

    const isOneRestaurantSelected = () => {
        if (selectedServices.length !== 1) return false;
        return services.find((s) => s.id === selectedServices[0])?.service_type === 'restaurant';
    };

    const selectedServiceName = services.find((s) => s.id === selectedServices[0])?.name || '';

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: 'var(--color-green)' }}>
                        <Wrench className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
                            Servicios Turísticos
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--color-text-alt)' }}>
                            Hoteles, restaurantes, tours y más
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />

                    <AnimatePresence>
                        {selectedServices.length > 0 && (
                            <motion.button
                                key="delete"
                                initial={{ opacity: 0, scale: 0.9, x: 8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: 8 }}
                                onClick={handleDeleteSelected}
                                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500 active:scale-95"
                            >
                                <Trash2 className="h-4 w-4" />
                                Eliminar ({selectedServices.length})
                            </motion.button>
                        )}
                        {isOneRestaurantSelected() && (
                            <motion.button
                                key="evaluate"
                                initial={{ opacity: 0, scale: 0.9, x: 8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: 8 }}
                                onClick={() => dispatchModal({ type: 'OPEN_EVALUATION' })}
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-95"
                            >
                                <ClipboardCheck className="h-4 w-4" />
                                Evaluar Servicio
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => dispatchModal({ type: 'OPEN_CREATE' })}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                        style={{ background: 'var(--color-green)' }}
                    >
                        <Plus className="h-4 w-4" />
                        Agregar servicio
                    </button>
                </div>
            </div>

            {/* Table card */}
            <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                {isLoading && (
                    <TableSkeleton
                        rows={9}
                        colWidths={['w-5', 'flex-1', 'w-28', 'w-24', 'w-20', 'w-16']}
                    />
                )}
                {error && (
                    <div className="flex h-64 flex-col items-center justify-center gap-3">
                        <AlertCircle className="h-8 w-8 text-rose-400" />
                        <p className="text-sm font-medium text-rose-500">{error}</p>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="h-[calc(100vh-260px)] min-h-[400px]">
                        <TouristServiceTable
                            services={services}
                            selectedServices={selectedServices}
                            onToggle={toggleService}
                            onViewDetail={(id) => dispatchModal({ type: 'OPEN_DETAIL', id })}
                            onEvaluate={(service) => {
                                setSelectedServices([service.id]);
                                dispatchModal({ type: 'OPEN_EVALUATION' });
                            }}
                        />
                    </div>
                )}
            </div>

            {!isLoading && !error && services.length > 0 && (
                <Pagination page={page} limit={limit} totalPages={totalPages} setSearchParams={setSearchParams} />
            )}

            {modalState.isCreateOpen && (
                <CreateTouristServiceModal onClose={() => dispatchModal({ type: 'CLOSE_CREATE' })} onSubmit={createService} />
            )}
            {modalState.isDetailOpen && modalState.selectedId && (
                <TouristServiceDetailModal
                    isOpen={modalState.isDetailOpen}
                    onClose={() => dispatchModal({ type: 'CLOSE_DETAIL' })}
                    serviceId={modalState.selectedId}
                    updateService={updateService}
                />
            )}
            {modalState.isEvaluationOpen && selectedServices.length === 1 && (
                <EvaluationWizardModal
                    isOpen={modalState.isEvaluationOpen}
                    onClose={() => { dispatchModal({ type: 'CLOSE_EVALUATION' }); fetchServices(); }}
                    serviceId={selectedServices[0]}
                    serviceName={selectedServiceName}
                />
            )}
        </div>
    );
};
