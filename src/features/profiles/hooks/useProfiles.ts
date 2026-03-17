import { useCallback, useEffect, useState } from 'react';
import type { Profile, CreateProfileDTO, UpdateProfileDTO } from '../types/types';
import { useSearchParams } from 'react-router-dom';
import { profileApi } from '../api/profileApi';
import { sileo } from 'sileo';

export function useProfiles() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const fetchProfiles = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await profileApi.findAll(page, limit);
            setProfiles(data.travelerProfiles || []);
            setTotalPages(data.totalPages);
        } catch (error: any) {
            sileo.error({ title: 'Error al cargar perfiles', description: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    const createProfile = async (data: CreateProfileDTO) => {
        setIsLoading(true);
        try {
            await profileApi.create(data);
            sileo.success({ title: 'Perfil creado' });
            await fetchProfiles();
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al crear perfil', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (id: number, data: UpdateProfileDTO) => {
        setIsLoading(true);
        try {
            await profileApi.update(id, data);
            sileo.success({ title: 'Perfil actualizado' });
            await fetchProfiles();
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al actualizar perfil', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return { profiles, isLoading, totalPages, createProfile, updateProfile, fetchProfiles };
}
