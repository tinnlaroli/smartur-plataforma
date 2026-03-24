import { useEffect, useState } from 'react';
import { authApi } from '../authApi';
import type { ResetPasswordPayload } from '../types';
import { KeyRound, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../../../shared/context/ToastContext';
import type { AuthStep } from '../context/AuthModalContext';

interface ResetPasswordViewProps {
    email: string;
    onSwitchStep: (step: AuthStep) => void;
}

export const ResetPasswordView = ({ email, onSwitchStep }: ResetPasswordViewProps) => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState<ResetPasswordPayload>({
        email: email || '',
        token: '',
        newPassword: '',
    });

    useEffect(() => {
        if (!email) {
            onSwitchStep('forgotPassword');
        }
    }, [email, onSwitchStep]);

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
            toast.success('¡Contraseña actualizada!', 'Ahora puedes iniciar sesión');
            setTimeout(() => onSwitchStep('login'), 2000);
        } catch (error) {
            toast.error('Error', 'Algo salió mal al restablecer tu contraseña');
        } finally {
            setIsLoading(false);
        }
    };

    if (!email) return null;

    return (
        <div className="w-full">
            <button
                onClick={() => onSwitchStep('forgotPassword')}
                className="group mb-6 flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-300"
            >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Volver</span>
            </button>

            <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10">
                    <KeyRound className="h-6 w-6 text-indigo-400" />
                </div>
            </div>

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-white">
                    Restablecer contraseña
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                    Ingresa el código que enviamos a{' '}
                    <span className="font-medium text-indigo-400">{formData.email}</span> y
                    tu nueva contraseña
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label
                        htmlFor="token"
                        className="text-xs font-medium tracking-wider text-zinc-400 uppercase"
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
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                        <KeyRound className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                        Revisa tu bandeja de entrada
                    </p>
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="newPassword"
                        className="text-xs font-medium tracking-wider text-zinc-400 uppercase"
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
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-indigo-400 hover:text-indigo-300"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">Mínimo 8 caracteres</p>
                </div>

                {formData.newPassword && (
                    <div className="space-y-1.5 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
                        <p className="mb-2 text-xs font-medium text-zinc-400">
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
                    className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
    );
};
