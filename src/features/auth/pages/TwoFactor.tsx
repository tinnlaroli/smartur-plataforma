import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, XCircle } from 'lucide-react';
import { authApi } from '../authApi';
import type { TwoFactorPayload } from '../types';
import { sileo } from 'sileo';
import Loader from '../components/Loader';

export const TwoFactor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const email = location.state?.email;
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(!location.state?.email);

    useEffect(() => {
        if (!email) {
            navigate('/auth/login');
        }
    }, [email, navigate]);

    const handleChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        if (digit && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!pasted) return;
        const newOtp = Array(6).fill('');
        pasted.split('').forEach((char, i) => {
            newOtp[i] = char;
        });
        setOtp(newOtp);
        const nextIndex = Math.min(pasted.length, 5);
        inputsRef.current[nextIndex]?.focus();
    };

    const token = otp.join('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token.length !== 6) return;

        setIsLoading(true);
        try {
            const payload: TwoFactorPayload = {
                email,
                token,
            };

            const response = await authApi.twoFactor(payload);
            const { token: jwt } = response;

            localStorage.setItem('token', jwt);

            sileo.success({
                title: '¡Bienvenido!',
                description: 'Inicio de sesión exitoso',
                duration: 6000,
                styles: {
                    title: 'text-white!',
                    description: 'text-white/75!',
                },
                fill: 'black',
                icon: <Lock className="h-5 w-5" />,
            });

            navigate('/dashboard', {
                state: { tokenValide: jwt },
            });
        } catch (error) {
            sileo.error({
                title: 'Error de verificación',
                description: 'El código ingresado es incorrecto o ha expirado.',
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
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            {(isInitialLoading || isLoading) && (
                <Loader
                    isLoading={isInitialLoading || isLoading}
                    onLoaded={() => setIsInitialLoading(false)}
                />
            )}

            <div className="w-full max-w-md">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="bg-indigo-500/10 p-3 rounded-full">
                            <Shield className="w-8 h-8 text-indigo-500" />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-white">
                            Verificación de Seguridad
                        </h2>
                        <p className="text-sm text-zinc-400 mt-2">
                            Hemos enviado un código de 6 dígitos a <br />
                            <span className="text-zinc-200 font-medium">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 block text-center">
                                Código de verificación
                            </label>

                            <div className="flex items-center justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputsRef.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        onFocus={(e) => e.target.select()}
                                        className={`
                                            w-12 h-14 text-center text-xl font-bold rounded-lg
                                            border border-zinc-800 bg-zinc-950
                                            text-white
                                            focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none
                                            transition-all duration-150
                                            ${index === 3 ? 'ml-2' : ''}
                                        `}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || token.length !== 6}
                            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Verificando...</span>
                                </div>
                            ) : (
                                <span>Verificar Código</span>
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/auth/login')}
                                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center justify-center gap-2 mx-auto"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Volver al inicio de sesión
                            </button>
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
