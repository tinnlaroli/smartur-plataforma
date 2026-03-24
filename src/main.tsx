import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import { Toaster } from 'sileo';

import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { AuthModalProvider } from './features/auth/context/AuthModalContext.tsx';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <LanguageProvider>
            <AuthModalProvider>
                <Toaster position="top-right" />
                <RouterProvider router={router} />
            </AuthModalProvider>
        </LanguageProvider>
    </ThemeProvider>,
);
