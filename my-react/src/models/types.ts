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

export interface Chat {
    id: number;
    is_group: boolean; 
    participants:[];
    group: number,
    messages: [
      {
        id: number,
        chat: number,
        sender: string,
        content: string,
        timestamp: string,
        is_read: boolean
      }
    ],
  }
  export interface CreateChat {
    id: number;
    is_group: boolean; 
    participants:[];
    group: number;
  }
  
  export interface Message {
    id: number;
    chat: number;
    sender: string;
    content: string;
    timestamp: string; 
    is_read: boolean
  }
  