/**
 * Representa la estructura de un usuario en el sistema.
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role_id: number;
    role_name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

/**
 * Metadatos de paginación devueltos por la API.
 */
export interface UsersPagination {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalUsers: number;
}

/**
 * Respuesta estándar de la API al solicitar usuarios.
 */
export interface GetUsersResponse {
    message: string;
    pagination: UsersPagination;
    users: User[];
}

/**
 * Parámetros permitidos para filtrar y paginar la lista de usuarios.
 */
export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    order?: 'asc' | 'desc';
}

/**
 * Datos necesarios para crear un nuevo usuario.
 */
export interface UserPayload {
    name: string;
    email: string;
    password: string;
}

/**
 * Datos permitidos para actualizar un usuario existente.
 */
export interface UserUpdatePayload {
    name: string;
    email: string;
    password?: string;
}
