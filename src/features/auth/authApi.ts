import { api } from '../../shared/api/axiosClient';
import type {
    Login,
    LoginPayload,
    SignUp,
    TwoFactorPayload,
    ForgotPasswordPayload,
    ResetPasswordPayload
} from './types';

export const authApi = {
    login: async (payload: LoginPayload) => {
        const { data } = await api.post<Login>('/login', payload);
        return data;
    },

    signUp: async (payload: SignUp) => {
        const { data } = await api.post<SignUp>('/users', payload);
        return data;
    },

    twoFactor: async (payload: TwoFactorPayload) => {
        const { data } = await api.post<TwoFactorPayload>('/two-factor', payload);
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
