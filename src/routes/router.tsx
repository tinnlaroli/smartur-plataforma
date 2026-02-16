import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

import { UserPage } from '../features/users/pages/UserPage';
import { Login } from '../features/auth/pages/Login';
import { TwoFactor } from '../features/auth/pages/TwoFactor';
import { SignUp } from '../features/auth/pages/SignUp';
import { ForgotPassword } from '../features/auth/pages/ForgotPassword';
import { ResetPassword } from '../features/auth/pages/ResetPassword';

export const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <div>Home</div>,
            },
            {
                path: 'usuarios',
                element: <UserPage />,
            },
        ],
    },
    {
        path: '/auth',
        children: [
            { path: 'login', element: <Login /> },
            { path: 'two-factor', element: <TwoFactor /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'reset-password', element: <ResetPassword /> },
        ],
    },
]);
