import { useState, useRef, useCallback } from 'react';
import { formApi } from '../api/formApi';
import type { RecommendationsResponse, FormContext } from '../types/types';

export function useFormRecommendations() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<RecommendationsResponse | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const cancel = () => {
        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }
    };

    const getRecommendations = useCallback(
        async ({
            userId,
            alpha = 0.7,
            candidates = 200,
            k_cf = 20,
            context = {},
            token = null,
        }: {
            userId: string;
            alpha?: number;
            candidates?: number;
            k_cf?: number;
            context: Partial<FormContext>;
            token?: string | null;
        }) => {
            cancel();
            const controller = new AbortController();
            abortRef.current = controller;

            setLoading(true);
            setError(null);

            try {
                const json = await formApi.getRecommendations({
                    userId,
                    alpha,
                    candidates,
                    k_cf,
                    context,
                    token,
                });
                setData(json);
                return json;
            } catch (err: any) {
                if (err?.name === 'AbortError' || err?.message === 'The operation was aborted.') {
                    console.log('[useFormRecommendations] request aborted');
                    return null;
                }
                console.error('[useFormRecommendations] error:', err);
                const errorMessage = err?.response?.data?.detail || err?.message || 'Error al obtener recomendaciones';
                setError(errorMessage);
                throw new Error(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    return { loading, error, data, getRecommendations, cancel };
}
