import { useState } from 'react';
import type { ForgotPasswordPayload } from '../types';
import { authApi } from '../authApi';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useToast } from '../../../shared/context/ToastContext';
import type { AuthStep } from '../context/AuthModalContext';

interface ForgotPasswordViewProps {
    onSwitchStep: (step: AuthStep, email?: string) => void;
}

export const ForgotPasswordView = ({ onSwitchStep }: ForgotPasswordViewProps) => {
    const toast = useToast();
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
            toast.success('Correo enviado', 'Revisa tu correo para restablecer tu contraseña');
            onSwitchStep('resetPassword', formData.email);
        } catch (error) {
            toast.error('Error', 'Algo salió mal al enviar el código');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={() => onSwitchStep('login')}
                className="group mb-6 flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-300"
            >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Volver al inicio de sesión</span>
            </button>

            <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10">
                    <Mail className="h-6 w-6 text-indigo-400" />
                </div>
            </div>

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-white">
                    ¿Olvidaste tu contraseña?
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                    No te preocupes, te enviaremos un código de verificación a tu correo
                    electrónico para restablecerla.
                </p>
            </div>

            <form onSubmit={handleReset} className="space-y-5">
                <div className="space-y-1.5">
                    <label
                        htmlFor="user-email"
                        className="text-xs font-medium tracking-wider text-zinc-400 uppercase"
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
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                        Te enviaremos un código de verificación a este correo
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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

                <div className="mt-4 text-center">
                    <p className="text-xs text-zinc-500">
                        ¿No tienes una cuenta?{' '}
                        <button
                            type="button"
                            onClick={() => onSwitchStep('signup')}
                            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            Regístrate aquí
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};
