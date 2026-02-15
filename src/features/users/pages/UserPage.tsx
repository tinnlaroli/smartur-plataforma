import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import CreateUserModal from '../components/CreateUserModal';
import UserDetailModal from '../components/UserDetailModal';
import UserTable from '../components/UserTable';
import SearchInput from '../components/SearchInput';

export const UserPage = () => {
    const {
        users,
        isLoading,
        error,
        totalPages,
        createUser,
        updateUser,
        role,
        setRole,
        search: urlSearch,
        setSearch: setUrlSearch,
    } = useUser();

    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const [searchTerm, setSearchTerm] = useState(urlSearch);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (urlSearch !== searchTerm) {
            setSearchTerm(urlSearch);
        }
    }, [urlSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== urlSearch) {
                setUrlSearch(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, urlSearch, setUrlSearch]);

    const toggleUser = (id: number) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
        );
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                        Administrador de usuarios
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Lista de usuarios registrados en el sistema
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:flex sm:items-center sm:gap-3">
                    <SearchInput value={searchTerm} onChange={setSearchTerm} />

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 whitespace-nowrap"
                    >
                        Agregar usuario
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center h-10 mt-4">
                    <p className="text-gray-600">Cargando...</p>
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center h-10 mt-4">
                    <p className="text-red-600 font-medium">Error: {error}</p>
                </div>
            )}

            {!isLoading && !error && (
                <>
                    <UserTable
                        users={users}
                        selectedUsers={selectedUsers}
                        onToggle={toggleUser}
                        onViewDetail={(id) => {
                            setSelectedId(id);
                            setIsDetailModalOpen(true);
                        }}
                        role={role}
                        setRole={setRole}
                    />

                    <div className="mt-4">
                        <Pagination
                            page={page}
                            limit={limit}
                            totalPages={totalPages}
                            setSearchParams={setSearchParams}
                        />
                    </div>
                </>
            )}

            {isCreateModalOpen && (
                <CreateUserModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={createUser}
                />
            )}

            {isDetailModalOpen && selectedId && (
                <UserDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => {
                        setSelectedId(null);
                        setIsDetailModalOpen(false);
                    }}
                    userId={selectedId}
                    updateUser={updateUser}
                />
            )}
        </div>
    );
};
