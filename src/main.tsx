import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import { Toaster } from 'sileo';

createRoot(document.getElementById('root')!).render(
    <>
        <Toaster position="top-right" />
        <div className="px-4 sm:px-6 lg:px-8"></div>

        <RouterProvider router={router} />
    </>
);
