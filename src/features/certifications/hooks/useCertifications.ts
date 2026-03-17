import { useCallback, useEffect, useState } from 'react';
import type { Certification, CreateCertificationDTO, UpdateCertificationDTO } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import { certificationApi } from '../api/certificationApi';
import { sileo } from 'sileo';

export function useCertifications() {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const fetchCertifications = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await certificationApi.findAll(page, limit);
            setCertifications(data.certifications || []);
            setTotalPages(data.totalPages);
        } catch (error: any) {
            sileo.error({ title: 'Error al cargar certificaciones', description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchCertifications();
    }, [fetchCertifications]);

    const createCertification = async (data: CreateCertificationDTO) => {
        setIsLoading(true);
        try {
            await certificationApi.create(data);
            sileo.success({ title: 'Certificación registrada' });
            await fetchCertifications();
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al registrar certificación', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: number, status: string) => {
        setIsLoading(true);
        try {
            await certificationApi.updateStatus(id, status);
            sileo.success({ title: 'Estado actualizado' });
            await fetchCertifications();
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al actualizar estado', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return { certifications, isLoading, totalPages, createCertification, updateStatus, fetchCertifications };
}
