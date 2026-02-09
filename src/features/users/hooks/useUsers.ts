import { useEffect, useState, useCallback, useMemo } from 'react';
import { usersApi } from '../usersApi';
import type { User } from '../types';

const DEFAULT_LIMIT = 10;

export const useUsers = () => {
    // Estado para almacenar todos los usuarios traídos del backend
    const [allUsers, setAllUsers] = useState<User[]>([]);

    // Estados para la paginación local
    const [page, setPageState] = useState(1);
    const [limit, setLimitState] = useState(DEFAULT_LIMIT);

    // Estados para filtrado y ordenamiento
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

    // Estado de carga
    const [loading, setLoading] = useState(false);

    /**
     * Carga TODOS los usuarios haciendo múltiples peticiones secuenciales a la API.
     * Esta estrategia se usa para permitir filtrado y ordenamiento completo en el cliente,
     * dado que el backend pagina los resultados.
     */
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const allLoadedUsers: User[] = [];
            let currentPage = 1;
            let totalPages = 1;

            // Traer usuarios página por página hasta tener todos
            do {
                const res = await usersApi.getAll({
                    page: currentPage,
                    limit: 100, // Pide 100 por vez para minimizar el número de peticiones
                });

                allLoadedUsers.push(...res.users);
                totalPages = res.pagination.totalPages;
                currentPage++;

                console.log(
                    `Cargados ${allLoadedUsers.length} de ${res.pagination.totalUsers} usuarios`
                );
            } while (currentPage <= totalPages);

            console.log('Total usuarios cargados:', allLoadedUsers.length);
            setAllUsers(allLoadedUsers);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            setAllUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    /**
     * Filtra y ordena los usuarios localmente según el estado actual.
     * Se recalcula solo cuando cambian los usuarios, la búsqueda o el orden.
     */
    const filteredAndSortedUsers = useMemo(() => {
        let result = [...allUsers];

        // Filtrar por nombre o email
        if (search.trim()) {
            const searchLower = search.toLowerCase().trim();
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower)
            );
        }

        // Ordenar por fecha de creación
        result.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return result;
    }, [allUsers, search, order]);

    /**
     * Aplica paginación a los usuarios ya filtrados y ordenados.
     */
    const paginatedUsers = useMemo(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        return filteredAndSortedUsers.slice(start, end);
    }, [filteredAndSortedUsers, page, limit]);

    // Cálculos de metadatos de paginación
    const totalUsers = filteredAndSortedUsers.length;
    const totalPages = Math.ceil(totalUsers / limit) || 1;
    const from = totalUsers === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, totalUsers);

    return {
        users: paginatedUsers, // Usuarios de la página actual
        loading,
        page,
        totalPages,
        limit,
        total: totalUsers, // Total de usuarios después de filtrar
        from,
        to,
        setPage: (newPage: number) => setPageState(Math.max(1, Math.min(newPage, totalPages))),
        setLimit: (newLimit: number) => {
            setLimitState(newLimit);
            setPageState(1); // Resetear a página 1 al cambiar límite
        },
        setSearch: (value: string) => {
            setSearch(value);
            setPageState(1); // Resetear a página 1 al buscar
        },
        setOrder: (value: 'asc' | 'desc') => {
            setOrder(value);
            setPageState(1); // Resetear a página 1 al ordenar
        },
        refetch: fetchUsers,
    };
};
