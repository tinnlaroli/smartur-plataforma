import { useCallback, useEffect, useState } from 'react';
import type { Template, CreateTemplateDTO, UpdateTemplateDTO } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import { templatesApi } from '../api/templatesApi';
import { sileo } from 'sileo';

export function useTemplates() {
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
            sileo.error({ title: 'Error al cargar plantillas', description: error.message });
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
            sileo.success({ title: 'Plantilla creada' });
            await fetchTemplates();
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al crear plantilla', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return { templates, isLoading, totalPages, createTemplate, fetchTemplates };
}
