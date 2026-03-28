import axios from 'axios';

export const api = axios.create({
    // En desarrollo, Vite redirige /api/v2 → https://api.smartur.dev via proxy (evita CORS)
    // En producción apunta directamente al dominio con variable de entorno
    baseURL: 'https://api-smartur.fly.dev/api/v2',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
