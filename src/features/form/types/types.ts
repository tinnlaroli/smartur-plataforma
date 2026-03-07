export interface FormContext {
    edad?: number;
    edad_range?: string;
    presupuesto_daily?: number;
    presupuesto_bucket?: string;
    duracion_dias?: number;
    duracion_dias_range?: string;
    tiposTurismo: string[];
    actividad_level: number;
    preferencia_lugar: string;
    pref_outdoor: boolean;
    group_type?: string;
    services: string[];
    needs_hotel: boolean;
    needs_transport: boolean;
    pref_food: boolean;
    wants_tours: boolean;
    accesibilidad: string;
    detalleAcc: string;
    visitado: string;
}

export interface Recommendation {
    item_id: number;
    title: string;
    description?: string;
    category?: string;
    score: number;
    pred_cf: number;
    pred_rf: number;
}

export interface RecommendationsResponse {
    recommendations: Recommendation[];
    user_id: string | number;
    message?: string;
}

export interface GetRecommendationsParams {
    userId: string;
    alpha?: number;
    candidates?: number;
    k_cf?: number;
    context: Partial<FormContext>;
    token?: string | null;
}
