import { Mail, Lock, LogIn, ArrowRight, UserPlus, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { LoginPayload } from '../types';
import { authApi } from '../authApi';
import { sileo } from 'sileo';
import Loader from '../components/Loader';

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginPayload>({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authApi.login(formData);
            if (response.requiresVerification === true) {
                navigate('/auth/two-factor', {
                    state: { email: response.email },
                });
                sileo.success({
                    title: 'Código enviado a tu correo electrónico',
                    description: 'Revisa tu bandeja de entrada para verificar tu cuenta',
                    duration: 5000,
                    styles: {
                        title: 'text-white!',
                        description: 'text-white/75!',
                    },
                    fill: 'black',
                    icon: <Lock className="h-5 w-5" />,
                });
                return;
            }

        } catch (error) {
            sileo.error({
                title: 'Error',
                description: 'Algo salió mal',
                duration: 6000,
                styles: {
                    title: 'text-white!',
                    description: 'text-white/75!',
                },
                fill: 'black',
                icon: <XCircle className="h-5 w-5" />,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
            {(isInitialLoading || isLoading) && (
                <Loader
                    isLoading={isInitialLoading || isLoading}
                    onLoaded={() => {
                        setIsInitialLoading(false);
                    }}
                />
            )}
            <div className="w-full max-w-md">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
                    <div className="mb-6 flex justify-center">
                        <img src="/image.png" alt="Smartur" className="h-12 w-auto object-contain" />
                    </div>

                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-semibold text-white">Bienvenido</h2>
                        <p className="mt-1 text-sm text-zinc-400">Inicia sesión para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label htmlFor="user-email" className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <input
                                    id="user-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                                />
                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="user-password" className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="user-password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                                />
                                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/auth/forgot-password" className="flex items-center gap-1 text-xs text-indigo-400 transition-colors hover:text-indigo-300">
                                ¿Olvidaste tu contraseña?
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Iniciando sesión...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <LogIn className="h-4 w-4" />
                                    <span>Iniciar Sesión</span>
                                </div>
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-zinc-900 px-4 text-zinc-500">¿Primera vez?</span>
                            </div>
                        </div>

                        <Link
                            to="/auth/signup"
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Crear cuenta nueva</span>
                        </Link>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-zinc-600">© 2024 Smartur. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};
