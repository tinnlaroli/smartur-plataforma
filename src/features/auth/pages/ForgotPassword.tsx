import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import type { ForgotPasswordPayload } from '../types';
import { authApi } from '../authApi';
import { Mail, ArrowLeft, Send, XCircle } from 'lucide-react';
import { sileo } from 'sileo';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<ForgotPasswordPayload>({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await authApi.forgotPassword(formData);
            sileo.success({
                title: 'Correo enviado',
                description: 'Revisa tu correo para restablecer tu contraseña',
                styles: {
                    title: 'text-white!',
                    description: 'text-white/75!',
                },
                fill: 'black',
                icon: <Mail className="h-5 w-5" />,
            })
            navigate('/auth/reset-password', {
                state: { email: formData.email },
            });
        } catch (error) {
            sileo.error({
                title: 'Error',
                description: 'Something went wrong',
                duration: 6000,
                styles: {
                    title: 'text-white!',
                    description: 'text-white/75!',
                },
                fill: 'black',
                icon: <XCircle className="h-5 w-5" />,
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl">
                    <button
                        onClick={() => navigate('/auth/login')}
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Volver al inicio de sesión</span>
                    </button>

                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-indigo-600/10 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-indigo-400" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white">
                            ¿Olvidaste tu contraseña?
                        </h2>
                        <p className="text-sm text-zinc-400 mt-2">
                            No te preocupes, te enviaremos un código de verificación a tu correo
                            electrónico para restablecerla.
                        </p>
                    </div>

                    <form onSubmit={handleReset} className="space-y-5">
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
                            <p className="text-xs text-zinc-500 mt-1">
                                Te enviaremos un código de verificación a este correo
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Enviando código...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Send className="h-4 w-4" />
                                    <span>Enviar código</span>
                                </div>
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-xs text-zinc-500">
                                ¿No tienes una cuenta?{' '}
                                <Link
                                    to="/auth/signup"
                                    className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-600 mt-6">
                    © 2024 Smartur. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};
