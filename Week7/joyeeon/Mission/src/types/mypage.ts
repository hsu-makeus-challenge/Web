export interface UserInfo {
    data: {
        id: number;
        email: string;
        name: string;
        bio?: string;
        avatar?: string;
    }

}

export interface UpdateInfoPayload {
    name: string;
    bio?: string;
    avatar?: string;
}