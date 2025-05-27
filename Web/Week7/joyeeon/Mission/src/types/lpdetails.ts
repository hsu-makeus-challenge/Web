export interface LpDetail{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    author?: Author;
    createdAt:string;
    likes?:Like[];
    tags?: string[];           
    published?: boolean;  
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
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

export interface LpUpdateDetail {
    title?: string;
    content?: string;
    thumbnail?: string;
    tags?: string[];
    published?: boolean;
}