import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

import { UserPage } from '../features/users/pages/UserPage';
import { CompanyPage } from '../features/companies/pages/CompanyPage';
import { TouristServicePage } from '../features/tourist-services/pages/TouristServicePage';
import { LocationPage } from '../features/locations/pages/LocationPage';
import { Login } from '../features/auth/pages/Login';
import { TwoFactor } from '../features/auth/pages/TwoFactor';
import { SignUp } from '../features/auth/pages/SignUp';
import { ForgotPassword } from '../features/auth/pages/ForgotPassword';
import { ResetPassword } from '../features/auth/pages/ResetPassword';
import { Home } from '../features/home/Home';
import Landing from '../features/landing/pages/Landing';
import Form from '../features/form/pages/Form';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        element: <ProtectedRoute />, // Protección para el dashboard
        children: [
            {
                path: '/dashboard',
                element: <AppLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'usuarios',
                        element: <UserPage />,
                    },
                    {
                        path: 'companias',
                        element: <CompanyPage />,
                    },
                    {
                        path: 'servicios',
                        element: <TouristServicePage />,
                    },
                    {
                        path: 'ubicaciones',
                        element: <LocationPage />,
                    },
                ],
            },
            {
                path: '/form',
                element: <Form />,
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
