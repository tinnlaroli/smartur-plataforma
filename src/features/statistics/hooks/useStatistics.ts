import { useState } from 'react';
import type { CreateExpenditureDTO, CreateEmploymentDTO, CreateInputDTO } from '../types/types';
import { statisticsApi } from '../api/statisticsApi';
import { sileo } from 'sileo';

export function useStatistics() {
    const [isLoading, setIsLoading] = useState(false);

    const recordExpenditure = async (data: CreateExpenditureDTO) => {
        setIsLoading(true);
        try {
            await statisticsApi.registerExpenditure(data);
            sileo.success({ title: 'Gasto registrado correctamente' });
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al registrar gasto', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const recordEmployment = async (data: CreateEmploymentDTO) => {
        setIsLoading(true);
        try {
            await statisticsApi.registerEmployment(data);
            sileo.success({ title: 'Empleo registrado correctamente' });
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al registrar empleo', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const recordInput = async (data: CreateInputDTO) => {
        setIsLoading(true);
        try {
            await statisticsApi.registerInput(data);
            sileo.success({ title: 'Insumo registrado correctamente' });
            return true;
        } catch (error: any) {
            sileo.error({ title: 'Error al registrar insumo', description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, recordExpenditure, recordEmployment, recordInput };
}
