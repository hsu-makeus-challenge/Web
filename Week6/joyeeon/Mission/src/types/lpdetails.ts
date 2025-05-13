export interface LpDetail{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    author?: Author;
    createdAt:string;
}

export interface Author {
    id: number;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
}