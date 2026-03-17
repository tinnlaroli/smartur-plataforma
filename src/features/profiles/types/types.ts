export interface Profile {
    id: number;
    user_id: number;
    age?: number;
    gender?: string;
    travel_type?: string;
    interests?: string;
    restrictions?: string;
    sustainable_preferences?: string;
}

export interface CreateProfileDTO {
    user_id: number;
    age?: number;
    gender?: string;
    travel_type?: string;
    interests?: string;
    restrictions?: string;
    sustainable_preferences?: string;
}

export interface UpdateProfileDTO {
    age?: number;
    gender?: string;
    travel_type?: string;
    interests?: string;
    restrictions?: string;
    sustainable_preferences?: string;
}

export interface ProfileResponse {
    travelerProfiles: Profile[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
}
