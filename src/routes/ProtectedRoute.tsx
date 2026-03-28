import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles?: number[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles) {
        if (!userStr) {
            // If we have no user data but need to check roles, something is wrong
            return <Navigate to="/" replace />;
        }

        const user = JSON.parse(userStr);
        const userRole = user.role_id || (Number(user.id) === 1 ? 1 : 2);

        if (!allowedRoles.includes(userRole)) {
            // Redirect to their default page instead of showing unauthorized content
            return <Navigate to={userRole === 1 ? '/dashboard' : '/'} replace />;
        }
    }

    return <Outlet />;
};
