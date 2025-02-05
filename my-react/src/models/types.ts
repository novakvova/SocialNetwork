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
    created_detail_by: number;
    image?: string;
}

export interface IGroupPostRequest {
    name: string;
    description: string;
    image?: FormData;

}

export interface IGroupPutRequest {
    id: number;
    name: string;
    description?: string;
    image?: FormData;
}

export interface Contact {
    id: number;
    username: string;
    email: string;
}

export interface IChatItem {
    id: number;
    is_group: boolean; 
    participants: number[];
    slug: string;
    group_name: string;
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
  export interface IChatPostRequest {
    is_group: boolean; 
    participants: number[];
    slug: string;
    group_name: string;
  }
  
  export interface IMessageItem {
    id: number;
    chat: number;
    sender: string;
    content: string;
    timestamp: string; 
    is_read: boolean
  }
  export interface IMessagePostRequest{
    chat: number;
    sender: string;
    content: string;
    is_read: boolean
  }
  
  export interface IMessagePutRequest{
    id: number;
    chat: number;
    sender: string;
    content: string;
    is_read: boolean
  }
  