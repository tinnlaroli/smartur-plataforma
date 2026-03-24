import { useState, useEffect } from 'react';
import { Step1PerfilBasico } from './Step1PerfilBasico';
import { Step2Preferencias } from './Step2Preferencias';
import { Step3Contexto } from './Step3Contexto';
import { Step4Condiciones } from './Step4Condiciones';
import { ProgressIndicator } from './ProgressIndicator';
import { RecommendationsResult } from './RecommendationsResult';
import { X } from 'lucide-react';
import type { FormContext, RecommendationsResponse } from '../types/types';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FormModal({ isOpen, onClose }: FormModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<FormContext>>({});
    const [isStep4Loading, setIsStep4Loading] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [recommendationsData, setRecommendationsData] = useState<RecommendationsResponse | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const totalSteps = 4;

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const updateFormData = (newData: Partial<FormContext>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const handleShowRecommendations = (result: RecommendationsResponse) => {
        setRecommendationsData(result);
        setShowRecommendations(true);
    };

    const handleCloseFinal = () => {
        setShowRecommendations(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={onClose}
            />
            
            {/* Modal Card */}
            <div className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="p-8 md:p-12 overflow-y-auto">
                    <ProgressIndicator currentStep={currentStep + 1} totalSteps={totalSteps} isStep4Loading={isStep4Loading} />

                    <div className="mt-8">
                        {currentStep === 0 && <Step1PerfilBasico data={formData} onNext={nextStep} onChange={updateFormData} />}
                        {currentStep === 1 && <Step2Preferencias data={formData} onNext={nextStep} onBack={prevStep} onChange={updateFormData} />}
                        {currentStep === 2 && <Step3Contexto data={formData} onNext={nextStep} onBack={prevStep} onChange={updateFormData} />}
                        {currentStep === 3 && (
                            <Step4Condiciones 
                                data={formData} 
                                onBack={prevStep} 
                                onChange={updateFormData} 
                                onLoadingChange={setIsStep4Loading} 
                                onShowRecommendations={handleShowRecommendations} 
                            />
                        )}
                    </div>
                </div>
            </div>

            {showRecommendations && recommendationsData && (
                <RecommendationsResult 
                    recommendations={recommendationsData.recommendations} 
                    onClose={handleCloseFinal} 
                />
            )}
        </div>
    );
}
