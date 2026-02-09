import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

import { UsersPage } from '../features/users/pages/UsersPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <div>Home</div>,
            },

            {
                path: 'users',
                element: <UsersPage />,
            },

            {
                path: 'about',
                element: <div>About</div>,
            },
        ],
    },
]);
