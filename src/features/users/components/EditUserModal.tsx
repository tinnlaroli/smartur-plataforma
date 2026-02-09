import { Modal } from './Modal';
import { UserForm } from './UserForm';
import type { User } from '../types';
import type { UserUpdatePayload } from '../types';

interface Props {
    user: User | null;
    open: boolean;
    onClose: () => void;
    onSubmit: (payload: UserUpdatePayload) => void;
    loading?: boolean;
}

export const EditUserModal = ({ user, open, onClose, onSubmit, loading }: Props) => {
    if (!user) return null;

    return (
        <Modal open={open} onClose={onClose} title="Editar usuario" showCloseButton={true}>
            <UserForm
                mode="edit"
                initialValues={{ name: user.name, email: user.email }}
                onSubmit={onSubmit}
                onCancel={onClose}
                loading={loading}
            />
        </Modal>
    );
};
