import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import React from 'react';
import { ToastProvider } from './shared/context/ToastContext.tsx';

createRoot(document.getElementById('root')!).render(
    <ToastProvider>
        <RouterProvider router={router} />
    </ToastProvider>
);
