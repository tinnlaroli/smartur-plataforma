import { api } from '../../shared/api/axiosClient';
import type {
    LoginPayload,
    SignUpPayload,
    TwoFactorPayload,
    TwoFactorResponse,
    ForgotPasswordPayload,
    ResetPasswordPayload,
    LoginResponse,
} from './types';

export const authApi = {
    login: async (payload: LoginPayload) => {
        const { data } = await api.post<LoginResponse>('/login', payload);
        return data;
    },

    signUp: async (payload: SignUpPayload) => {
        const { data } = await api.post<SignUpPayload>('/register', payload);
        return data;
    },

    twoFactor: async (payload: TwoFactorPayload) => {
        const { data } = await api.post<TwoFactorResponse>('/two-factor', payload);
        return data;
    },

    forgotPassword: async (payload: ForgotPasswordPayload) => {
        const { data } = await api.post<ForgotPasswordPayload>('forgot', payload);
        return data;
    },

    resetPassword: async (payload: ResetPasswordPayload) => {
        const { data } = await api.post<ResetPasswordPayload>('reset', payload);
        return data;
    },
};
