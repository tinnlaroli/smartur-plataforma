import { isAxiosError } from 'axios';
import type { TwoFactorPayload } from '../types';
import { useToast } from '../../../shared/context/ToastContext';
import { useState, useEffect, useRef } from 'react';
import { authApi } from '../authApi';
import { useLocation, useNavigate } from 'react-router-dom';

function getErrorMessage(err: unknown): string {
  if (isAxiosError(err) && err.response?.data?.message) {
    return String(err.response.data.message);
  }
  if (err instanceof Error) return err.message;
  return 'Ha ocurrido un error';
}

export const TwoFactor = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const email = location.state?.email;
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const payload: TwoFactorPayload = {
        email,
        token: Number(token),
      };
      await authApi.twoFactor(payload);
      toast.success('Inicio de sesión exitoso');
      navigate('dashboard/usuarios');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-8 space-y-6 border border-zinc-200 dark:border-zinc-700"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Verificación en 2 pasos
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Ingresa el código de 6 dígitos enviado a tu correo
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Código de verificación
          </label>

          <div className="flex items-center justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputsRef.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
                className={`
                  w-11 h-12 text-center text-lg font-semibold rounded-xl
                  border border-zinc-300 dark:border-zinc-600
                  bg-white dark:bg-zinc-700
                  text-zinc-900 dark:text-white
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none
                  transition-all duration-150
                  ${index === 2 ? 'mr-3' : ''}
                `}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || token.length !== 6}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 text-white font-medium py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </div>
  );
};