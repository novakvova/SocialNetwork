import { Dayjs } from 'dayjs'; 

export interface IRegisterFormValues {
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    birthDate: Dayjs; 
}
export interface IGroupItem {
    id: number;
    name: string;
    description: string;
    created_by: string;
}

export interface IGroupPostRequest {
    name: string;
    description: string;
}

export interface IGroupPutRequest {
    id: number;
    name?: string;
    description?: string;
}

export interface Contact {
    id: number;
    username: string;
    email: string;
}
