import React, { useReducer, useEffect, useRef } from 'react';
import {
    X,
    ChevronRight,
    ChevronLeft,
    Check,
    Camera,
    ClipboardList,
    ShieldCheck,
    Soup,
    Layout,
    Save,
} from 'lucide-react';
import { useEvaluations } from '../hooks/useEvaluations';
import type { EvaluationCriterion, EvaluationDetailDTO } from '../types/types';
import { useToast } from '../../../shared/context/ToastContext';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    serviceId: number;
    serviceName: string;
}

const STEPS = [
    { title: 'Infraestructura', icon: Layout, description: 'Espacio y accesibilidad' },
    { title: 'Higiene y Limpieza', icon: ShieldCheck, description: 'NOM-251 / Distintivo H' },
    { title: 'Servicio y Calidad', icon: Soup, description: 'Atención y Experiencia' },
    { title: 'Resumen', icon: Camera, description: 'Evidencia final' },
];

// Criterios específicos eliminados para usar rúbrica dinámica de 13 registros

interface WizardState {
    currentStep: number;
    responses: Record<number, { score: number; subcriterionId: number; observations?: string }>;
    generalObservations: string;
    evidences: Array<{ id: string; url: string }>;
}

type WizardAction =
    | { type: 'SET_STEP'; step: number }
    | { type: 'SET_SCORE'; criterionId: number; subcriterionId: number; score: number }
    | { type: 'SET_OBSERVATIONS'; value: string }
    | { type: 'ADD_EVIDENCES'; urls: Array<{ id: string; url: string }> }
    | { type: 'RESET' };

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, currentStep: action.step };
        case 'SET_SCORE':
            return {
                ...state,
                responses: {
                    ...state.responses,
                    [action.criterionId]: {
                        ...state.responses[action.criterionId],
                        subcriterionId: action.subcriterionId,
                        score: action.score,
                    },
                },
            };
        case 'SET_OBSERVATIONS':
            return { ...state, generalObservations: action.value };
        case 'ADD_EVIDENCES':
            return { ...state, evidences: [...state.evidences, ...action.urls] };
        case 'RESET':
            return initialWizardState();
        default:
            return state;
    }
}

function initialWizardState(): WizardState {
    return {
        currentStep: 0,
        responses: {},
        generalObservations: '',
        evidences: [],
    };
}

const EvaluationWizardModal: React.FC<Props> = ({ isOpen, onClose, serviceId, serviceName }) => {
    const toast = useToast();
    const { getRubric, registerEvaluation, rubric, isLoading } = useEvaluations();
    const [state, dispatch] = useReducer(wizardReducer, undefined, initialWizardState);
    const { currentStep, responses, generalObservations, evidences } = state;

    const startTimeRef = useRef<number>(Date.now());

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map((f) => ({
                id: `${f.name}-${f.lastModified}-${f.size}`,
                url: URL.createObjectURL(f),
            }));
            dispatch({ type: 'ADD_EVIDENCES', urls: newFiles });
        }
    };

    useEffect(() => {
        if (!isOpen) return;
        startTimeRef.current = Date.now();
        dispatch({ type: 'RESET' });
        let cancelled = false;
        getRubric(1).then(() => {
            if (cancelled) return;
        });
        return () => {
            cancelled = true;
        };
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isOpen) return null;

    // Helper to group criteria by step dynamically
    const getCriteriaForStep = (stepIndex: number): EvaluationCriterion[] => {
        if (!rubric || !rubric.criteria) return [];
        if (stepIndex === 3) return []; // Summary step

        const criteria = rubric.criteria;
        const total = criteria.length;

        // Split criteria into 3 steps
        const perStep = Math.floor(total / 3);
        const extra = total % 3;

        let start = 0;
        let count = perStep;

        if (stepIndex === 0) {
            start = 0;
            count = perStep + (extra > 0 ? 1 : 0);
        } else if (stepIndex === 1) {
            start = perStep + (extra > 0 ? 1 : 0);
            count = perStep + (extra > 1 ? 1 : 0);
        } else if (stepIndex === 2) {
            start = perStep * 2 + (extra > 0 ? 1 : 0) + (extra > 1 ? 1 : 0);
            count = total - start;
        }

        return criteria.slice(start, start + count);
    };

    const handleScoreSelect = (criterionId: number, subId: number, score: number) => {
        dispatch({ type: 'SET_SCORE', criterionId, subcriterionId: subId, score });
    };

    const handleFinish = async () => {
        // Validar que se hayan respondido todos los criterios obligatorios
        const criteriaCount = [0, 1, 2].reduce(
            (acc, idx) => acc + getCriteriaForStep(idx).length,
            0
        );

        if (Object.keys(responses).length < criteriaCount) {
            toast.error('Error', 'Por favor califica todos los criterios antes de finalizar.');
            return;
        }

        const endTime = Date.now();
        const durationMinutes = Math.max(
            1,
            Math.round((endTime - startTimeRef.current) / 1000 / 60)
        );

        const details: EvaluationDetailDTO[] = Object.entries(responses).map(
            ([criterionId, data]) => ({
                id_criterion: Number(criterionId),
                assigned_score: data.score,
                id_selected_subcriterion: data.subcriterionId,
                observations: data.observations || '',
                // As requested: send a single fake URL string instead of an array
                attached_evidences:
                    evidences.length > 0 ? 'https://via.placeholder.com/150' : '',
            })
        );

        const payload = {
            id_service: serviceId,
            id_template: 1,
            evaluator_id: 1,
            evaluation_date: new Date().toISOString().split('T')[0],
            evaluation_time: durationMinutes,
            general_observations: generalObservations,
            details,
        };

        console.log(
            'DEBUG: Payload de Evaluación que se enviará:',
            JSON.stringify(payload, null, 2)
        );

        const result = await registerEvaluation(payload);
        if (result) {
            toast.success(
                'Evaluación registrada exitosamente',
                '¡Gracias por completar la evaluación!'
            );
            onClose();
        } else {
            toast.error('Error', 'Ocurrió un error al registrar la evaluación');
        }
    };

    const stepCriteria = getCriteriaForStep(currentStep);
    const isLastStep = currentStep === STEPS.length - 1;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#121214] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all border border-zinc-200 dark:border-zinc-800">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/50">
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3">
                            <ClipboardList className="size-6 text-violet-500" />
                            Evaluación de Servicio
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Evaluando:{' '}
                            <span className="font-semibold text-violet-500">{serviceName}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all"
                    >
                        <X className="size-6" />
                    </button>
                </div>

                {/* Stepper Progress */}
                <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#121214]">
                    <div className="flex items-center justify-between relative">
                        {STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = currentStep === idx;
                            const isCompleted = currentStep > idx;

                            return (
                                <div key={step.title} className="flex flex-col items-center z-10 flex-1">
                                    <div
                                        className={`size-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                            isActive
                                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-110'
                                                : isCompleted
                                                  ? 'bg-emerald-500 text-white'
                                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="size-5" />
                                        ) : (
                                            <Icon className="size-5" />
                                        )}
                                    </div>
                                    <span
                                        className={`text-[10px] font-semibold uppercase tracking-wider mt-2 ${
                                            isActive ? 'text-violet-500' : 'text-zinc-500'
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800 -z-10 mx-10">
                            <div
                                className="h-full bg-violet-500 transition-all duration-500"
                                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="size-12 animate-spin rounded-full border-4 border-zinc-200 border-t-violet-600 mb-4"></div>
                            <p className="text-zinc-500 animate-pulse">
                                Cargando rúbrica de evaluación…
                            </p>
                        </div>
                    )}

                    {!isLoading && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {currentStep < 3 ? (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                                            {STEPS[currentStep].title}
                                        </h3>
                                        <p className="text-zinc-500 dark:text-zinc-400">
                                            {STEPS[currentStep].description}
                                        </p>
                                    </div>

                                    <div className="space-y-10">
                                        {stepCriteria.map((criterion) => (
                                            <div key={criterion.id_criterion} className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="size-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center font-semibold text-sm">
                                                        {criterion.order_index || 1}
                                                    </span>
                                                    <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                                                        {criterion.name}
                                                    </h4>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3">
                                                    {criterion.levels
                                                        .sort((a, b) => a.score - b.score)
                                                        .map((level) => {
                                                            const isSelected =
                                                                responses[criterion.id_criterion]
                                                                    ?.subcriterionId ===
                                                                level.id_subcriterion;
                                                            return (
                                                                <button
                                                                    key={level.id_subcriterion}
                                                                    onClick={() =>
                                                                        handleScoreSelect(
                                                                            criterion.id_criterion,
                                                                            level.id_subcriterion,
                                                                            level.score
                                                                        )
                                                                    }
                                                                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 text-left group ${
                                                                        isSelected
                                                                            ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-500 ring-1 ring-violet-500'
                                                                            : 'bg-white dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                                                    }`}
                                                                >
                                                                    <div
                                                                        className={`mt-1 size-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                                                            isSelected
                                                                                ? 'border-violet-600 bg-violet-600'
                                                                                : 'border-zinc-300 dark:border-zinc-600'
                                                                        }`}
                                                                    >
                                                                        {isSelected && (
                                                                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <span
                                                                                className={`text-sm font-semibold ${isSelected ? 'text-violet-600 dark:text-violet-400' : 'text-zinc-600 dark:text-zinc-400'}`}
                                                                            >
                                                                                Puntaje:{' '}
                                                                                {level.score}
                                                                            </span>
                                                                        </div>
                                                                        <p
                                                                            className={`text-sm leading-relaxed ${isSelected ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'}`}
                                                                        >
                                                                            {level.description}
                                                                        </p>
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                                        Resumen y Evidencias
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label
                                                htmlFor="general-observations"
                                                className="block text-xs font-semibold uppercase tracking-widest text-zinc-500"
                                            >
                                                Observaciones Generales
                                            </label>
                                            <textarea
                                                id="general-observations"
                                                value={generalObservations}
                                                onChange={(e) =>
                                                    dispatch({
                                                        type: 'SET_OBSERVATIONS',
                                                        value: e.target.value,
                                                    })
                                                }
                                                className="w-full h-40 rounded-xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 p-4 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none resize-none"
                                                placeholder="Escribe aquí las observaciones generales de la evaluación…"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label
                                                htmlFor="evidence-upload"
                                                className="block text-xs font-semibold uppercase tracking-widest text-zinc-500"
                                            >
                                                Evidencias Fotográficas
                                            </label>
                                            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-zinc-50/50 dark:bg-zinc-900/20 relative">
                                                <Camera className="size-10 text-zinc-400" />
                                                <p className="text-sm text-zinc-500 text-center">
                                                    Haz clic para subir fotos o arrastra los
                                                    archivos aquí
                                                </p>
                                                <input
                                                    id="evidence-upload"
                                                    type="file"
                                                    multiple
                                                    onChange={handleFileUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {evidences.map((ev) => (
                                                        <img
                                                            key={ev.id}
                                                            src={ev.url}
                                                            className="size-12 rounded-lg object-cover border border-zinc-200"
                                                            alt="evidencia"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 flex gap-3">
                                        <div className="size-5 text-amber-500 mt-0.5">
                                            <ShieldCheck />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-400">
                                                Verificación de datos
                                            </p>
                                            <p className="text-xs text-amber-700 dark:text-amber-500">
                                                Al finalizar la evaluación, el puntaje será
                                                calculado automáticamente y los resultados serán
                                                vinculados permanentemente a este servicio.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-8 py-5 bg-zinc-50/30 dark:bg-zinc-900/30">
                    <button
                        onClick={() =>
                            dispatch({ type: 'SET_STEP', step: Math.max(0, currentStep - 1) })
                        }
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            currentStep === 0
                                ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed'
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                    >
                        <ChevronLeft className="size-4" />
                        Atrás
                    </button>

                    <div className="flex gap-3">
                        {!isLastStep ? (
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: 'SET_STEP',
                                        step: Math.min(STEPS.length - 1, currentStep + 1),
                                    })
                                }
                                className="flex items-center gap-2 px-8 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 shadow-lg shadow-violet-600/20 active:scale-[0.98] transition-all"
                            >
                                Siguiente
                                <ChevronRight className="size-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleFinish}
                                className="flex items-center gap-2 px-10 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition-all"
                            >
                                <Save className="size-4" />
                                Finalizar Evaluación
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluationWizardModal;
