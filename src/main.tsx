import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';


import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { AuthModalProvider } from './features/auth/context/AuthModalContext.tsx';
import { ToastProvider } from './shared/context/ToastContext.tsx';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <LanguageProvider>
            <ToastProvider>
                <AuthModalProvider>
                    <RouterProvider router={router} />
                </AuthModalProvider>
            </ToastProvider>
        </LanguageProvider>
    </ThemeProvider>,
);
