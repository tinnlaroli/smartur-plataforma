import { Mail, Lock, LogIn, ArrowRight, UserPlus } from 'lucide-react';
import { useState } from 'react';
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
            if (response.requiresVerification) {
                navigate('/auth/two-factor', {
                    state: { email: response.email },
                });
                sileo.success({
                    title: 'Code sent to your email',
                    description: 'Check your email to verify your account',
                    duration: 6000,
                    fill: 'black',
                    styles: {
                        description: 'text-white',
                        title: 'text-white',
                    },
                    autopilot: {
                        expand: 500,
                        collapse: 3000,
                    },
                });
                return;
            }
        } catch (error) {
            sileo.error({
                title: 'Error',
                description: 'Something went wrong',
                duration: 6000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            {isInitialLoading && <Loader onLoaded={() => setIsInitialLoading(false)} />}
            {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}
            <div className="w-full max-w-md">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/image.png"
                            alt="Smartur"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white">Bienvenido</h2>
                        <p className="text-sm text-zinc-400 mt-1">Inicia sesión para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label
                                htmlFor="user-email"
                                className="text-xs font-medium uppercase tracking-wider text-zinc-400"
                            >
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
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="user-password"
                                className="text-xs font-medium uppercase tracking-wider text-zinc-400"
                            >
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
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/auth/forgot-password"
                                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                            >
                                ¿Olvidaste tu contraseña?
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                <span className="bg-zinc-900 px-4 text-zinc-500">
                                    ¿Primera vez?
                                </span>
                            </div>
                        </div>

                        <Link
                            to="/auth/signup"
                            className="w-full rounded-lg border border-zinc-800 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 flex items-center justify-center gap-2"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Crear cuenta nueva</span>
                        </Link>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-600 mt-6">
                    © 2024 Smartur. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};
