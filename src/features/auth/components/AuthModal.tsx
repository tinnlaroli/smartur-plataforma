import React from 'react';
import { useAuthModal } from '../context/AuthModalContext';
import { LoginView } from '../views/LoginView';
import { SignUpView } from '../views/SignUpView';
import { ForgotPasswordView } from '../views/ForgotPasswordView';
import { TwoFactorView } from '../views/TwoFactorView';
import { ResetPasswordView } from '../views/ResetPasswordView';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthModal: React.FC = () => {
    const { isOpen, step, email, closeModal, setStep } = useAuthModal();
    
    if (isOpen) {
        console.log('[AuthModal] Rendered step:', step);
    }

    const renderStep = () => {
        switch (step) {
            case 'login':
                return <LoginView onSwitchStep={setStep} onClose={closeModal} />;
            case 'signup':
                return <SignUpView onSwitchStep={setStep} />;
            case 'forgotPassword':
                return <ForgotPasswordView onSwitchStep={setStep} />;
            case 'twoFactor':
                return <TwoFactorView email={email} onSwitchStep={setStep} onClose={closeModal} />;
            case 'resetPassword':
                return <ResetPasswordView email={email} onSwitchStep={setStep} />;
            default:
                return <LoginView onSwitchStep={setStep} onClose={closeModal} />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
                            {renderStep()}
                        </div>
                        
                        <p className="mt-8 text-center text-xs text-zinc-600">
                            © 2024 Smartur. Todos los derechos reservados.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
