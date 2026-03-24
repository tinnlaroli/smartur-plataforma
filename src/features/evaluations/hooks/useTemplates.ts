import { useCallback, useEffect, useState } from 'react';
import type { Template, CreateTemplateDTO, UpdateTemplateDTO } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import { templatesApi } from '../api/templatesApi';
import { useToast } from '../../../shared/context/ToastContext';

export function useTemplates() {
    const toast = useToast();
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const fetchTemplates = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await templatesApi.findAll(page, limit);
            setTemplates(data.templates || []);
            setTotalPages(data.totalPages);
        } catch (error: any) {
            toast.error('Error al cargar plantillas');
        } finally {
            setIsLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const createTemplate = async (data: CreateTemplateDTO) => {
        setIsLoading(true);
        try {
            await templatesApi.create(data);
            toast.success('Plantilla creada');
            await fetchTemplates();
            return true;
        } catch (error: any) {
            toast.error('Error al crear plantilla');
        } finally {
            setIsLoading(false);
        }
    };

    return { templates, isLoading, totalPages, createTemplate, fetchTemplates };
}
