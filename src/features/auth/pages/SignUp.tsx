import { isAxiosError } from 'axios';
import { useToast } from '../../../shared/context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import type { SignUpPayload } from '../types';
import { authApi } from '../authApi';
import { Mail, Lock, User, ArrowRight, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';

function getErrorMessage(err: unknown): string {
    if (isAxiosError(err) && err.response?.data?.message) {
        return String(err.response.data.message);
    }
    if (err instanceof Error) return err.message;
    return 'Ha ocurrido un error';
}

export const SignUp = () => {
    const toast = useToast();
    const navigate = useNavigate();

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
            navigate('/login');
            toast.success('Cuenta creada correctamente');
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    // Validaciones de contraseña
    const passwordValidations = {
        minLength: formData.password.length >= 8,
        hasUpperCase: /[A-Z]/.test(formData.password),
        hasNumber: /[0-9]/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    };

    const allValidationsPassed = Object.values(passwordValidations).every(Boolean);

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card con fondo oscuro */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl">
                    {/* Icono decorativo */}
                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-indigo-600/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-indigo-400" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white">Crear cuenta</h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Ingresa tus datos para registrarte
                        </p>
                    </div>

                    <form onSubmit={handleSingUp} className="space-y-5">
                        {/* Nombre */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="user-name"
                                className="text-xs font-medium uppercase tracking-wider text-zinc-400"
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
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            </div>
                        </div>

                        {/* Email */}
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

                        {/* Contraseña */}
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
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 pl-9 pr-12 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-indigo-400 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Validaciones de contraseña */}
                            {formData.password && (
                                <div className="space-y-2 bg-zinc-950/50 rounded-lg p-3 border border-zinc-800 mt-2">
                                    <p className="text-xs font-medium text-zinc-400 mb-2">
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

                                    {/* Barra de fortaleza */}
                                    <div className="mt-3">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <span className="text-xs text-zinc-400">
                                                Fortaleza:
                                            </span>
                                            <span
                                                className={`text-xs font-medium ${
                                                    Object.values(passwordValidations).filter(
                                                        Boolean
                                                    ).length <= 2
                                                        ? 'text-rose-400'
                                                        : Object.values(passwordValidations).filter(
                                                                Boolean
                                                            ).length <= 3
                                                          ? 'text-yellow-400'
                                                          : 'text-emerald-400'
                                                }`}
                                            >
                                                {Object.values(passwordValidations).filter(Boolean)
                                                    .length <= 2
                                                    ? 'Débil'
                                                    : Object.values(passwordValidations).filter(
                                                            Boolean
                                                        ).length <= 3
                                                      ? 'Media'
                                                      : 'Fuerte'}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${
                                                    Object.values(passwordValidations).filter(
                                                        Boolean
                                                    ).length <= 2
                                                        ? 'bg-rose-500'
                                                        : Object.values(passwordValidations).filter(
                                                                Boolean
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
                                <a
                                    href="#"
                                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    términos y condiciones
                                </a>{' '}
                                y la{' '}
                                <a
                                    href="#"
                                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    política de privacidad
                                </a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !allValidationsPassed}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <Link
                                to="/auth/login"
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                Inicia sesión
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-zinc-600 mt-6">
                    © 2024 Smartur. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};
