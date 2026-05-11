export type FieldType = 'text' | 'multiple_choice' | 'scale' | 'checkbox' | 'select';

export interface InstrumentTemplate {
    id: number;
    name: string;
    version: string;
    servicio: string;
    estado: boolean;
    register_at: string;
}

export interface InstrumentDetail {
    id: number;
    name: string;
    version: string;
    service_type: string;
    active: boolean;
    creation_date: string;
}

export interface Subcriterion {
    id_subcriterion: number;
    id_criterion: number;
    description: string;
    score: number;
    order_index: number;
}

export interface Criterion {
    id_criterion: number;
    id_template: number;
    name: string;
    description?: string;
    weight: number;
    order_index: number;
    active: boolean;
    field_type: FieldType;
    is_required: boolean;
    levels?: Subcriterion[];
}

export interface FullRubric {
    id_template: number;
    name: string;
    version: string;
    service_type: string;
    active: boolean;
    criteria: Criterion[];
}

export interface TemplateResponse {
    templates: InstrumentTemplate[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
}

export interface RubricResponse {
    message: string;
    rubric: FullRubric;
}

export interface CreateTemplateDTO {
    name: string;
    version: string;
    service_type: string;
    active: boolean;
}

export interface UpdateTemplateDTO {
    name?: string;
    version?: string;
    service_type?: string;
    active?: boolean;
}

export interface CreateCriterionDTO {
    id_template: number;
    name: string;
    description?: string;
    weight: number;
    order_index?: number;
    active: boolean;
    field_type: FieldType;
    is_required?: boolean;
}

export interface UpdateCriterionDTO {
    name?: string;
    description?: string;
    weight?: number;
    order_index?: number;
    active?: boolean;
    field_type?: FieldType;
    is_required?: boolean;
}
