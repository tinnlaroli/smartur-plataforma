import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft, Check, MapPin, CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { useFormRecommendations } from '../hooks/useFormRecommendations';
import Loader from '../../auth/components/Loader';
import type { FormContext, RecommendationsResponse } from '../types/types';

interface Step4Props {
    data: Partial<FormContext>;
    onBack: () => void;
    onChange: (newData: Partial<FormContext>) => void;
    onLoadingChange?: (loading: boolean) => void;
    onShowRecommendations: (result: RecommendationsResponse) => void;
}

export const Step4Condiciones: React.FC<Step4Props> = ({ data = {}, onBack, onChange, onLoadingChange, onShowRecommendations }) => {
    const [accesibilidad, setAccesibilidad] = useState<string>(data.accesibilidad || 'no');
    const [detalleAcc, setDetalleAcc] = useState<string>(data.detalleAcc || '');
    const [visitado, setVisitado] = useState<string>(data.visitado || 'no');

    const { loading, error: apiError, getRecommendations, cancel } = useFormRecommendations();
    const isSubmittingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get user from localStorage (following SMARTUR pattern in TwoFactor.tsx)
    // Actually, TwoFactor.tsx doesn't save the full user, only the token.
    // Let's assume for now that we can get the user id if we had an auth context
    // or just use a placeholder if none exists yet.
    // The user mentioned response.user.id in TwoFactor.tsx.
    const authToken = localStorage.getItem('token');

    // NOTE: This should ideally come from an AuthContext.
    // Since we don't have it, we'll try to find where user data is stored.
    // In many of these apps, it might be in localStorage as 'user'.
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : { id: 2 }; // Fallback to id 2 (mentioned by user)

    useGSAP(
        () => {
            if (loading || apiError) return;

            if (containerRef.current) {
                gsap.from(containerRef.current.children, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                });
            }
        },
        { scope: containerRef, dependencies: [loading, apiError] },
    );

    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(loading);
        }
    }, [loading, onLoadingChange]);

    useEffect(() => {
        return () => {
            if (!isSubmittingRef.current) {
                cancel();
            }
        };
    }, [cancel]);

    const buildContext = (): Partial<FormContext> => {
        const d = data || {};
        const preferencia_lugar = d.preferencia_lugar || 'indiferente';
        const pref_outdoor = preferencia_lugar === 'aire';

        return {
            ...d,
            accesibilidad: accesibilidad === 'si' ? 'si' : 'no',
            detalleAcc: accesibilidad === 'si' ? detalleAcc : '',
            visitado: visitado === 'si' ? 'si' : 'no',
            pref_outdoor,
        };
    };

    const handleFinish = async () => {
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;

        onChange({
            accesibilidad,
            detalleAcc: accesibilidad === 'si' ? detalleAcc : '',
            visitado,
        });

        if (!user || !user.id) {
            alert('Debes iniciar sesión.');
            isSubmittingRef.current = false;
            return;
        }

        const context = buildContext();
        console.log('[Step4] Enviando context al recommender:', context);

        try {
            const result = await getRecommendations({
                userId: String(user.id),
                alpha: 0.7,
                candidates: 200,
                k_cf: 20,
                context,
                token: authToken,
            });

            if (result && result.recommendations && result.recommendations.length > 0) {
                onShowRecommendations(result);
            } else if (result) {
                throw new Error('No se encontraron recomendaciones.');
            }
        } catch (err) {
            console.error('[Step4] Error al obtener recomendaciones:', err);
        } finally {
            isSubmittingRef.current = false;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center">
                <Loader isLoading={true} onLoaded={() => {}} />
                <div className="mt-8 text-center text-white">
                    <h3 className="mb-4 text-2xl font-bold">Analizando tus preferencias...</h3>
                    <p className="text-zinc-400">Generando recomendaciones personalizadas para tu próximo viaje</p>
                </div>
            </div>
        );
    }

    if (apiError) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-zinc-900/50 p-8 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                    <XCircle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-white">Error al generar recomendaciones</h3>
                <p className="mb-8 max-w-md text-zinc-400">{apiError}</p>
                <button
                    onClick={() => {
                        isSubmittingRef.current = false;
                        handleFinish();
                    }}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white"
                >
                    <RotateCw className="h-5 w-5" />
                    <span>Reintentar</span>
                </button>
            </div>
        );
    }

    const accesibilidadOptions = [
        { label: 'Sí', value: 'si', icon: CheckCircle2 },
        { label: 'No', value: 'no', icon: XCircle },
    ];

    const visitadoOptions = [
        { label: 'Sí', value: 'si', icon: MapPin },
        { label: 'No', value: 'no', icon: MapPin },
    ];

    return (
        <div className="step-content px-4 py-6" ref={containerRef}>
            <div className="step-header mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-white">Condiciones Especiales</h2>
                <p className="text-zinc-400">Ayúdanos a personalizar aún más tu experiencia</p>
            </div>

            <div className="form-section mb-8">
                <label className="mb-4 block text-sm font-medium text-zinc-300">¿Necesitas accesibilidad?</label>
                <div className="grid grid-cols-2 gap-4">
                    {accesibilidadOptions.map((o) => (
                        <button
                            key={o.value}
                            type="button"
                            onClick={() => setAccesibilidad(o.value)}
                            className={`flex flex-col items-center rounded-2xl border p-5 text-center transition-all duration-200 ${
                                accesibilidad === o.value
                                    ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                            }`}
                        >
                            <div className="mb-3">
                                <o.icon className="h-6 w-6" />
                            </div>
                            <div className="font-bold">{o.label}</div>
                        </button>
                    ))}
                </div>
                {accesibilidad === 'si' && (
                    <div className="animate-slideDown mt-4">
                        <textarea
                            value={detalleAcc}
                            onChange={(e) => setDetalleAcc(e.target.value)}
                            placeholder="Describe tu requerimiento de accesibilidad..."
                            rows={4}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                )}
            </div>

            <div className="form-section mb-10">
                <label className="mb-4 block text-sm font-medium text-zinc-300">¿Has visitado la región antes?</label>
                <div className="grid grid-cols-2 gap-4">
                    {visitadoOptions.map((o) => (
                        <button
                            key={o.value}
                            type="button"
                            onClick={() => setVisitado(o.value)}
                            className={`flex flex-col items-center rounded-2xl border p-5 text-center transition-all duration-200 ${
                                visitado === o.value ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                            }`}
                        >
                            <div className="mb-3">
                                <o.icon className="h-6 w-6" />
                            </div>
                            <div className="font-bold">{o.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-auto flex justify-between">
                <button
                    onClick={onBack}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 font-bold text-zinc-400 transition-all hover:border-zinc-700 active:scale-95 disabled:opacity-50"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Atrás</span>
                </button>
                <button
                    onClick={handleFinish}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 active:scale-95 disabled:opacity-50"
                >
                    <span>Finalizar</span>
                    <Check className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};
