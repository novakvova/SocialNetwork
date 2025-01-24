
export type RegisterField = {
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    birthDate?: string;
  };


  
export type LoginField = {
    email: string;
    password: string;
    remember?: boolean;
};

export interface TokenPayload {
    id: string;
    username: string;
    email: string;
    role: string;
    phoneNumber: string;
    birthDate?: string;
}

export interface TokenPayloadItems {
    "user_id": string;
    "username": string;
    "email": string;
    "role": string;
    "phone_number": string;
    "birth_date"?: string;
}