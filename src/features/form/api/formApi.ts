import axios from 'axios';
import type { GetRecommendationsParams, RecommendationsResponse } from '../types/types';

const REC_API_BASE = 'http://localhost:8000';

export const formApi = {
    getRecommendations: async ({ userId, alpha = 0.7, candidates = 200, k_cf = 20, context = {}, token = null }: GetRecommendationsParams): Promise<RecommendationsResponse> => {
        const url = `${REC_API_BASE}/recommend/${userId}`;
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await axios.post<RecommendationsResponse>(url, { alpha, candidates, k_cf, context }, { headers });

        return response.data;
    },
};
