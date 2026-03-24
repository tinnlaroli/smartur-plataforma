import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Step1PerfilBasico } from '../components/Step1PerfilBasico';
import { Step2Preferencias } from '../components/Step2Preferencias';
import { Step3Contexto } from '../components/Step3Contexto';
import { Step4Condiciones } from '../components/Step4Condiciones';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { RecommendationsResult } from '../components/RecommendationsResult';
import type { FormContext, RecommendationsResponse } from '../types/types';

export default function Form() {
    const navigate = useNavigate();
    const location = useLocation();

    // Auth context or state from navigation
    const token = location.state?.tokenValide || localStorage.getItem('token');

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<FormContext>>({});
    const [isStep4Loading, setIsStep4Loading] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [recommendationsData, setRecommendationsData] = useState<RecommendationsResponse | null>(null);

    // Redirect if no token (protected route should handle this too, but anyway)
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

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

    const handleCloseForm = () => {
        // After finishing, most likely go to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
            <div className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 shadow-2xl duration-500">
                <div className="p-8 md:p-12">
                    <ProgressIndicator currentStep={currentStep + 1} totalSteps={totalSteps} isStep4Loading={isStep4Loading} />

                    <div className="mt-8 transition-all duration-300">
                        {currentStep === 0 && <Step1PerfilBasico data={formData} onNext={nextStep} onChange={updateFormData} />}
                        {currentStep === 1 && <Step2Preferencias data={formData} onNext={nextStep} onBack={prevStep} onChange={updateFormData} />}
                        {currentStep === 2 && <Step3Contexto data={formData} onNext={nextStep} onBack={prevStep} onChange={updateFormData} />}
                        {currentStep === 3 && (
                            <Step4Condiciones data={formData} onBack={prevStep} onChange={updateFormData} onLoadingChange={setIsStep4Loading} onShowRecommendations={handleShowRecommendations} />
                        )}
                    </div>
                </div>
            </div>

            {showRecommendations && recommendationsData && <RecommendationsResult recommendations={recommendationsData.recommendations} onClose={handleCloseForm} />}
        </div>
    );
}
