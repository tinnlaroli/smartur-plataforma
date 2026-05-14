import { useState, useCallback } from 'react';
import { evaluationsApi } from '../api/evaluationsApi';
import { templatesApi } from '../api/templatesApi';
import type { EvaluationRubric, FullEvaluationRegisterDTO } from '../types/types';
import { extractAxiosErrorMessage } from '../../../shared/api/extractAxiosErrorMessage';

export const useEvaluations = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rubric, setRubric] = useState<EvaluationRubric | null>(null);

    const getRubric = useCallback(async (templateId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await evaluationsApi.getRubric(templateId);
            setRubric(response.rubric);
            return response.rubric;
        } catch (err: unknown) {
            setRubric(null);
            setError(extractAxiosErrorMessage(err));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    /** Resuelve la plantilla activa por tipo de servicio y carga la rúbrica (evita depender del id fijo 1). */
    const loadRubricByServiceType = useCallback(async (serviceType: string) => {
        setIsLoading(true);
        setError(null);
        setRubric(null);
        try {
            const data = await templatesApi.findAll(1, 20, {
                service_type: serviceType,
                active: true,
            });
            const list = data.templates || [];
            if (list.length === 0) {
                setError(
                    `No hay plantilla de evaluación activa para el tipo «${serviceType}». ` +
                        'Crea una en Plantillas de evaluación o, en desarrollo, recrea la base para aplicar los seeds de bd.sql (volumen postgres).'
                );
                return null;
            }
            const templateId = list[0].id;
            const response = await evaluationsApi.getRubric(templateId);
            setRubric(response.rubric);
            return response.rubric;
        } catch (err: unknown) {
            setRubric(null);
            setError(extractAxiosErrorMessage(err));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const registerEvaluation = useCallback(async (data: FullEvaluationRegisterDTO) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await evaluationsApi.registerFull(data);
            return response;
        } catch (err: unknown) {
            setError(extractAxiosErrorMessage(err));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getEvaluationByServiceId = useCallback(async (serviceId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await evaluationsApi.findByServiceId(serviceId);
            return response;
        } catch (err: any) {
            // It's possible it doesn't exist, so we don't necessarily set error
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        rubric,
        getRubric,
        loadRubricByServiceType,
        registerEvaluation,
        getEvaluationByServiceId,
    };
};
