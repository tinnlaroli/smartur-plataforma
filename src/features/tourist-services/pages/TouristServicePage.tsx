import { useEffect, useState } from 'react';
import { useTouristService } from '../hooks/useTouristService';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import CreateTouristServiceModal from '../components/CreateTouristServiceModal';
import TouristServiceDetailModal from '../components/TouristServiceDetailModal';
import TouristServiceTable from '../components/TouristServiceTable';
import SearchInput from '../components/SearchInput';
import { Trash2 } from 'lucide-react';

export const TouristServicePage = () => {
    const {
        services,
        isLoading,
        error,
        totalPages,
        createService,
        updateService,
        deleteService,
        search: urlSearch,
        setSearch: setUrlSearch,
    } = useTouristService();

    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const [searchTerm, setSearchTerm] = useState(urlSearch);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (urlSearch !== searchTerm) setSearchTerm(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== urlSearch) setUrlSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, urlSearch, setUrlSearch]);

    const toggleService = (id: number) => {
        setSelectedServices((prev) =>
            prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        if (
            window.confirm(
                `¿Estás seguro de que deseas eliminar ${selectedServices.length} servicios?`
            )
        ) {
            for (const id of selectedServices) await deleteService(id);
            setSelectedServices([]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Servicios Turísticos
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Lista de servicios turísticos disponibles
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:gap-3">
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />
                    {selectedServices.length > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-500 transition-all"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span>Eliminar ({selectedServices.length})</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 whitespace-nowrap"
                    >
                        Agregar servicio
                    </button>
                </div>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#121214] shadow-sm flex flex-col min-h-0">
                {isLoading && (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-zinc-600 dark:text-zinc-400 font-medium">Cargando...</p>
                    </div>
                )}
                {error && (
                    <div className="flex justify-center items-center h-96">
                        <p className="text-red-600 dark:text-red-400 font-medium font-medium">
                            Error: {error}
                        </p>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="h-[calc(100vh-260px)] min-h-[400px]">
                        <TouristServiceTable
                            services={services}
                            selectedServices={selectedServices}
                            onToggle={toggleService}
                            onViewDetail={(id) => {
                                setSelectedId(id);
                                setIsDetailModalOpen(true);
                            }}
                        />
                    </div>
                )}
            </div>

            {!isLoading && !error && services.length > 0 && (
                <div className="w-full">
                    <Pagination
                        page={page}
                        limit={limit}
                        totalPages={totalPages}
                        setSearchParams={setSearchParams}
                    />
                </div>
            )}

            {isCreateModalOpen && (
                <CreateTouristServiceModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={createService}
                />
            )}
            {isDetailModalOpen && selectedId && (
                <TouristServiceDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setSelectedId(null);
                        setIsDetailModalOpen(false);
                    }}
                    serviceId={selectedId}
                    updateService={updateService}
                />
            )}
        </div>
    );
};
