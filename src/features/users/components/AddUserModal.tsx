import { Modal } from './Modal';
import { UserForm } from './UserForm';
import type { UserPayload } from '../types';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (payload: UserPayload) => void;
    loading?: boolean;
}

export const AddUserModal = ({ open, onClose, onSubmit, loading }: Props) => {
    return (
        <Modal open={open} onClose={onClose} title="Nuevo usuario" showCloseButton={true}>
            <UserForm
                mode="create"
                onSubmit={(values) => onSubmit({ name: values.name, email: values.email, password: values.password ?? '' })}
                onCancel={onClose}
                loading={loading}
            />
        </Modal>
    );
};
