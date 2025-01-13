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
    email: string;
    role: string;
}

export interface TokenPayloadItems {
    "user_id": string;
    "email": string;
    "role": string;
}