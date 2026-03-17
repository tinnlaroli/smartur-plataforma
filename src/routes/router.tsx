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
import { NotFound } from '../features/notfound/NotFound';
import { ProfilesPage } from '../features/profiles/pages/ProfilesPage';
import { ActivitiesPage } from '../features/activities/pages/ActivitiesPage';
import { CertificationsPage } from '../features/certifications/pages/CertificationsPage';
import { POIPage } from '../features/points-of-interest/pages/POIPage';
import { StatisticsPage } from '../features/statistics/pages/StatisticsPage';
import { TemplatesPage } from '../features/evaluations/pages/TemplatesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />,
    },
    {
        children: [
            {
                element: <ProtectedRoute allowedRoles={[1]} />,
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
                            {
                                path: 'perfiles',
                                element: <ProfilesPage />,
                            },
                            {
                                path: 'actividades',
                                element: <ActivitiesPage />,
                            },
                            {
                                path: 'certificaciones',
                                element: <CertificationsPage />,
                            },
                            {
                                path: 'poi',
                                element: <POIPage />,
                            },
                            {
                                path: 'estadisticas',
                                element: <StatisticsPage />,
                            },
                            {
                                path: 'plantillas',
                                element: <TemplatesPage />,
                            },
                            {
                                path: '*',
                                element: <NotFound />,
                            },
                        ],
                    },
                ],
            },
            {
                element: <ProtectedRoute allowedRoles={[2]} />,
                children: [
                    {
                        path: '/form',
                        element: <Form />,
                    },
                ],
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
            { path: '*', element: <NotFound /> },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
