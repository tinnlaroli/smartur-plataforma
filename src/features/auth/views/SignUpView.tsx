import { Mail, Lock, User, ArrowRight, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { SignUpPayload } from '../types';
import { authApi } from '../authApi';
import { sileo } from 'sileo';
import type { AuthStep } from '../context/AuthModalContext';

interface SignUpViewProps {
    onSwitchStep: (step: AuthStep) => void;
}

export const SignUpView = ({ onSwitchStep }: SignUpViewProps) => {

    const [formData, setFormData] = useState<SignUpPayload>({
        name: '',
        email: '',
        password: '',
        role_id: 2,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'name') {
            newValue = value.replace(/[0-9]/g, '');
        }
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await authApi.signUp(formData);
            onSwitchStep('login');
            sileo.success({
                title: '¡Bienvenido!',
                description: 'Ahora puedes iniciar sesión',
                duration: 5000,
                styles: {
                    title: 'text-white!',
                    description: 'text-white/75!',
                },
                fill: 'black',
                icon: <User className="h-5 w-5" />,
            });
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

    const passwordValidations = {
        minLength: formData.password.length >= 8,
        hasUpperCase: /[A-Z]/.test(formData.password),
        hasNumber: /[0-9]/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    };

    const allValidationsPassed = Object.values(passwordValidations).every(Boolean);

    return (
        <div className="w-full">
            <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10">
                    <User className="h-6 w-6 text-indigo-400" />
                </div>
            </div>

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-white">Crear cuenta</h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Ingresa tus datos para registrarte
                </p>
            </div>

            <form onSubmit={handleSingUp} className="space-y-5">
                <div className="space-y-1.5">
                    <label
                        htmlFor="user-name"
                        className="text-xs font-medium tracking-wider text-zinc-400 uppercase"
                    >
                        Nombre completo
                    </label>
                    <div className="relative">
                        <input
                            id="user-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej. Juan Pérez"
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                        <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    </div>
                </div>

                {/* Email */}
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
                </div>

                <div className="space-y-1.5">
                    <label
                        htmlFor="user-password"
                        className="text-xs font-medium tracking-wider text-zinc-400 uppercase"
                    >
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="user-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pr-12 pl-9 text-sm text-white transition-colors placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                        <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition-colors hover:text-indigo-400"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    {formData.password && (
                        <div className="mt-2 space-y-2 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
                            <p className="mb-2 text-xs font-medium text-zinc-400">
                                La contraseña debe tener:
                            </p>

                            <div className="flex items-center gap-2 text-xs">
                                {passwordValidations.minLength ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-zinc-600" />
                                )}
                                <span
                                    className={
                                        passwordValidations.minLength
                                            ? 'text-zinc-300'
                                            : 'text-zinc-500'
                                    }
                                >
                                    Mínimo 8 caracteres
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                {passwordValidations.hasUpperCase ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-zinc-600" />
                                )}
                                <span
                                    className={
                                        passwordValidations.hasUpperCase
                                            ? 'text-zinc-300'
                                            : 'text-zinc-500'
                                    }
                                >
                                    Al menos una mayúscula
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                {passwordValidations.hasNumber ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-zinc-600" />
                                )}
                                <span
                                    className={
                                        passwordValidations.hasNumber
                                            ? 'text-zinc-300'
                                            : 'text-zinc-500'
                                    }
                                >
                                    Al menos un número
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                {passwordValidations.hasSpecialChar ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-zinc-600" />
                                )}
                                <span
                                    className={
                                        passwordValidations.hasSpecialChar
                                            ? 'text-zinc-300'
                                            : 'text-zinc-500'
                                    }
                                >
                                    Al menos un carácter especial (!@#$%^&*)
                                </span>
                            </div>

                            <div className="mt-3">
                                <div className="mb-1 flex items-center gap-1.5">
                                    <span className="text-xs text-zinc-400">
                                        Fortaleza:
                                    </span>
                                    <span
                                        className={`text-xs font-medium ${
                                            Object.values(passwordValidations).filter(
                                                Boolean,
                                            ).length <= 2
                                                ? 'text-rose-400'
                                                : Object.values(passwordValidations).filter(
                                                        Boolean,
                                                    ).length <= 3
                                                  ? 'text-yellow-400'
                                                  : 'text-emerald-400'
                                        }`}
                                    >
                                        {Object.values(passwordValidations).filter(Boolean)
                                            .length <= 2
                                            ? 'Débil'
                                            : Object.values(passwordValidations).filter(
                                                    Boolean,
                                                ).length <= 3
                                              ? 'Media'
                                              : 'Fuerte'}
                                    </span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                                    <div
                                        className={`h-full transition-all duration-300 ${
                                            Object.values(passwordValidations).filter(
                                                Boolean,
                                            ).length <= 2
                                                ? 'bg-rose-500'
                                                : Object.values(passwordValidations).filter(
                                                        Boolean,
                                                    ).length <= 3
                                                  ? 'bg-yellow-500'
                                                  : 'bg-emerald-500'
                                        }`}
                                        style={{
                                            width: `${(Object.values(passwordValidations).filter(Boolean).length / 4) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-start gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-950 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="text-xs text-zinc-400">
                        Acepto los{' '}
                        <button
                            type="button"
                            className="text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            términos y condiciones
                        </button>{' '}
                        y la{' '}
                        <button
                            type="button"
                            className="text-indigo-400 transition-colors hover:text-indigo-300"
                        >
                            política de privacidad
                        </button>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !allValidationsPassed}
                    className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            <span>Registrando...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <span>Registrarse</span>
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    )}
                </button>

                <p className="text-center text-sm text-zinc-400">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                        type="button"
                        onClick={() => onSwitchStep('login')}
                        className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                    >
                        Inicia sesión
                    </button>
                </p>
            </form>
        </div>
    );
};
