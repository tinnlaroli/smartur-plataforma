import { useCallback, useEffect, useState } from 'react';
import type { POI, CreatePOIDTO, UpdatePOIDTO } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import { poiApi } from '../api/poiApi';
import { sileo } from 'sileo';

export function usePOI() {
    const [points, setPoints] = useState<POI[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const fetchPoints = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await poiApi.findAll(page, limit);
            setPoints(data.points || []);
            setTotalPages(data.totalPages);
        } catch (error: any) {
            sileo.error({ title: 'Error al cargar puntos de interés', description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchPoints();
    }, [fetchPoints]);

    const createPoint = async (data: CreatePOIDTO) => {
        setIsLoading(true);
        try {
            await poiApi.create(data);
            sileo.success({ title: 'Punto de interés creado' });
            await fetchPoints();
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al crear punto de interés', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return { points, isLoading, totalPages, createPoint, fetchPoints };
}
