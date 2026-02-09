import { api } from '../../shared/api/axiosClient';
import type {
    GetUsersResponse,
    GetUsersParams,
    UserPayload,
    UserUpdatePayload,
    User,
} from './types';

const DEFAULT_LIMIT = 10;

export const usersApi = {
    /**
     * Obtiene una lista paginada de usuarios, con opciones de filtrado y ordenamiento.
     * @param params - Parámetros de búsqueda, paginación y ordenamiento.
     * @returns Una promesa que resuelve con la respuesta de la API (usuarios y metadatos de paginación).
     */
    getAll: async (params: GetUsersParams = {}) => {
        const { page = 1, limit = DEFAULT_LIMIT, search, order } = params;
        const searchParams = new URLSearchParams();
        searchParams.set('page', String(page));
        searchParams.set('limit', String(limit));
        if (search?.trim()) searchParams.set('search', search.trim());
        if (order) searchParams.set('order', order);
        const { data } = await api.get<GetUsersResponse>(`/users?${searchParams.toString()}`);
        return data;
    },

    /**
     * Crea un nuevo usuario en el sistema.
     * @param payload - Datos del nuevo usuario (nombre, email, contraseña).
     * @returns Una promesa que resuelve con los datos del usuario creado.
     */
    create: async (payload: UserPayload) => {
        const { data } = await api.post<User>('/users', payload);
        return data;
    },

    /**
     * Actualiza la información de un usuario existente.
     * @param id - ID del usuario a actualizar.
     * @param payload - Datos a actualizar (nombre, email, y opcionalmente contraseña).
     * @returns Una promesa que resuelve con los datos del usuario actualizado.
     */
    update: async (id: number, payload: UserUpdatePayload) => {
        const { data } = await api.put<User>(`/users/${id}`, payload);
        return data;
    },

    /**
     * Elimina (o desactiva, según la implementación del backend) un usuario del sistema.
     * @param id - ID del usuario a eliminar.
     * @returns Una promesa que se resuelve cuando la operación se completa.
     */
    delete: async (id: number) => {
        await api.delete(`/users/${id}`);
    },
};
