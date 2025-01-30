export interface Post {
    id: number;
    title: string;
    content: string;
    image?: string;
    created_at: string;
    updated_at: string;
    likes_count: number;
    comments_count: number;
}

export interface Comment {
    id: number;
    user: string;
    post: number;
    content: string;
    created_at: string;
}

export interface Like {
    id: number;
    user: string;
    post: number;
    created_at: string;
}
