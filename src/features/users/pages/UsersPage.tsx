import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { usersApi } from '../usersApi';
import type { User } from '../types';
import type { UserPayload, UserUpdatePayload } from '../types';
import { useToast } from '../../../shared/context/ToastContext';
import { UsersHeader } from '../components/UsersHeader';
import { UsersTable } from '../components/UsersTable';
import { ViewUserModal } from '../components/ViewUserModal';
import { EditUserModal } from '../components/EditUserModal';
import { DeleteUserModal } from '../components/DeleteUserModal';
import { AddUserModal } from '../components/AddUserModal';
import { Pagination } from '../components/Pagination';
import { isAxiosError } from 'axios';

function getErrorMessage(err: unknown): string {
    if (isAxiosError(err) && err.response?.data?.message) {
        return String(err.response.data.message);
    }
    if (err instanceof Error) return err.message;
    return 'Ha ocurrido un error';
}

export const UsersPage = () => {
    const toast = useToast();
    const usersState = useUsers();

    // Estados para controlar qué usuario se está viendo, editando o eliminando
    // Si es null, el modal correspondiente está cerrado
    const [viewUser, setViewUser] = useState<User | null>(null);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);

    // Estado para el modal de creación
    const [addModalOpen, setAddModalOpen] = useState(false);

    // Estado de carga para operaciones de mutación (crear, editar, eliminar)
    const [loadingMutation, setLoadingMutation] = useState(false);

    /**
     * Cierra todos los modales y resetea los estados de selección de usuario.
     */
    const closeModals = () => {
        setViewUser(null);
        setEditUser(null);
        setDeleteUser(null);
        setAddModalOpen(false);
    };

    /**
     * Maneja la creación de un nuevo usuario.
     * @param payload - Datos del formulario de creación.
     */
    const handleCreate = async (payload: UserPayload) => {
        setLoadingMutation(true);
        try {
            await usersApi.create(payload);
            closeModals();
            usersState.refetch(); // Recargar la lista de usuarios
            toast.success('Usuario registrado exitosamente');
        } catch (err) {
            toast.error(getErrorMessage(err) || 'Error al registrar usuario');
        } finally {
            setLoadingMutation(false);
        }
    };

    /**
     * Maneja la actualización de un usuario existente.
     * @param payload - Datos del formulario de edición.
     */
    const handleUpdate = async (payload: UserUpdatePayload) => {
        if (!editUser) return;
        setLoadingMutation(true);
        try {
            await usersApi.update(editUser.id, payload);
            closeModals();
            usersState.refetch(); // Recargar la lista de usuarios
            toast.success('Usuario actualizado exitosamente');
        } catch (err) {
            toast.error(getErrorMessage(err) || 'Error al actualizar usuario');
        } finally {
            setLoadingMutation(false);
        }
    };

    /**
     * Maneja la eliminación de un usuario.
     */
    const handleDelete = async () => {
        if (!deleteUser) return;
        setLoadingMutation(true);
        try {
            await usersApi.delete(deleteUser.id);
            closeModals();
            usersState.refetch(); // Recargar la lista de usuarios
            toast.success('Usuario eliminado exitosamente');
        } catch (err) {
            toast.error(getErrorMessage(err) || 'Error al eliminar usuario');
        } finally {
            setLoadingMutation(false);
        }
    };

    return (
        <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                        Administrador de usuarios
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        Gestiona los usuarios del sistema
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Cabecera con filtros y botón de crear */}
                    <UsersHeader
                        onSearch={usersState.setSearch}
                        onOrderChange={usersState.setOrder}
                        onAddUser={() => setAddModalOpen(true)}
                    />

                    <div className="space-y-0 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                        {/* Tabla de usuarios */}
                        <UsersTable
                            users={usersState.users}
                            loading={usersState.loading}
                            onView={setViewUser}
                            onEdit={setEditUser}
                            onDelete={setDeleteUser}
                        />
                        {/* Paginación */}
                        <Pagination
                            page={usersState.page}
                            totalPages={usersState.totalPages}
                            total={usersState.total}
                            from={usersState.from}
                            to={usersState.to}
                            limit={usersState.limit}
                            onPageChange={usersState.setPage}
                            onLimitChange={usersState.setLimit}
                        />
                    </div>
                </div>
            </div>

            {/* Modales */}
            <ViewUserModal
                user={viewUser}
                open={viewUser !== null}
                onClose={() => setViewUser(null)}
            />

            <EditUserModal
                user={editUser}
                open={editUser !== null}
                onClose={() => setEditUser(null)}
                onSubmit={handleUpdate}
                loading={loadingMutation}
            />

            <DeleteUserModal
                user={deleteUser}
                open={deleteUser !== null}
                onClose={() => setDeleteUser(null)}
                onConfirm={handleDelete}
                loading={loadingMutation}
            />

            <AddUserModal
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSubmit={handleCreate}
                loading={loadingMutation}
            />
        </div>
    );
};
