import { api } from '../../../shared/api/axiosClient';
import type { Criterion, CriterionResponse, CreateCriterionDTO, UpdateCriterionDTO } from '../types/types';

export const criteriaApi = {
    findAll: async (page: number = 1, limit: number = 50): Promise<CriterionResponse> => {
        const response = await api.get('/criteria', {
            params: { page, limit },
        });
        return response.data;
    },

    create: async (data: CreateCriterionDTO): Promise<Criterion> => {
        const response = await api.post('/criteria/register', data);
        return response.data;
    },

    update: async (id: number, data: UpdateCriterionDTO): Promise<Criterion> => {
        const response = await api.patch(`/criteria/update/${id}`, data);
        return response.data;
    },
};
