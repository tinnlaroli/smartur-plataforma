export interface Login {
    email: string;
    password: string;
    requiresVerification: boolean;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface TwoFactorPayload {
    email: string;
    token: number;
}

export interface SignUp {
    name: string;
    email: string;
    password: string;
    role_id: number;
}

export interface SignUpPayload {
    name: string;
    email: string;
    password: string;
    role_id: number;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    token: string;
    newPassword: string;
}
