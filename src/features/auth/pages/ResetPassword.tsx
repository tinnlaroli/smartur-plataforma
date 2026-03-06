import { isAxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authApi } from '../authApi';
import type { ResetPasswordPayload } from '../types';
import { KeyRound, Lock, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { sileo } from 'sileo';

function getErrorMessage(err: unknown): string {
    if (isAxiosError(err) && err.response?.data?.message) {
        return String(err.response.data.message);
    }
    if (err instanceof Error) return err.message;
    return 'Ha ocurrido un error';
}

export const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const emailFromState = location.state?.email;

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState<ResetPasswordPayload>({
        email: emailFromState || '',
        token: '',
        newPassword: '',
    });

    useEffect(() => {
        if (!emailFromState) {
            navigate('/forgotpassword');
        }
    }, [emailFromState, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await authApi.resetPassword(formData);

            sileo.success({
                title: '¡Contraseña actualizada!',
                description: 'Ahora puedes iniciar sesión',
                duration: 6000,
                styles: {
                    title: 'text-white!',
                    description: 'text-white/75!',
                },
                fill: 'black',
                icon: <Lock className="h-5 w-5" />,
            })
            setTimeout(() => navigate('/auth/login'), 2000);
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

    if (!emailFromState) return null;

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl">

                    <button
                        onClick={() => navigate('/forgotpassword')}
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Volver</span>
                    </button>

                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-indigo-600/10 flex items-center justify-center">
                            <KeyRound className="h-6 w-6 text-indigo-400" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white">
                            Restablecer contraseña
                        </h2>
                        <p className="text-sm text-zinc-400 mt-2">
                            Ingresa el código que enviamos a{' '}
                            <span className="text-indigo-400 font-medium">{formData.email}</span> y
                            tu nueva contraseña
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label
                                htmlFor="token"
                                className="text-xs font-medium uppercase tracking-wider text-zinc-400"
                            >
                                Código de verificación
                            </label>
                            <div className="relative">
                                <input
                                    id="token"
                                    type="text"
                                    name="token"
                                    required
                                    value={formData.token}
                                    onChange={handleChange}
                                    placeholder="Ej. 123456"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
                                />
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">
                                Revisa tu bandeja de entrada
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="newPassword"
                                className="text-xs font-medium uppercase tracking-wider text-zinc-400"
                            >
                                Nueva contraseña
                            </label>
                            <div className="relative">
                                <input
                                    id="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    required
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    minLength={8}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-400 hover:text-indigo-300"
                                >
                                    {showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">Mínimo 8 caracteres</p>
                        </div>

                        {formData.newPassword && (
                            <div className="space-y-1.5 bg-zinc-950/50 rounded-lg p-3 border border-zinc-800">
                                <p className="text-xs font-medium text-zinc-400 mb-2">
                                    La contraseña debe tener:
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle
                                        className={`h-3 w-3 ${formData.newPassword.length >= 8 ? 'text-emerald-400' : 'text-zinc-600'}`}
                                    />
                                    <span
                                        className={
                                            formData.newPassword.length >= 8
                                                ? 'text-zinc-300'
                                                : 'text-zinc-500'
                                        }
                                    >
                                        Mínimo 8 caracteres
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle
                                        className={`h-3 w-3 ${/[A-Z]/.test(formData.newPassword) ? 'text-emerald-400' : 'text-zinc-600'}`}
                                    />
                                    <span
                                        className={
                                            /[A-Z]/.test(formData.newPassword)
                                                ? 'text-zinc-300'
                                                : 'text-zinc-500'
                                        }
                                    >
                                        Al menos una mayúscula
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle
                                        className={`h-3 w-3 ${/[0-9]/.test(formData.newPassword) ? 'text-emerald-400' : 'text-zinc-600'}`}
                                    />
                                    <span
                                        className={
                                            /[0-9]/.test(formData.newPassword)
                                                ? 'text-zinc-300'
                                                : 'text-zinc-500'
                                        }
                                    >
                                        Al menos un número
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Actualizando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    <span>Actualizar contraseña</span>
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-zinc-600 mt-6">
                    © 2024 Smartur. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};
