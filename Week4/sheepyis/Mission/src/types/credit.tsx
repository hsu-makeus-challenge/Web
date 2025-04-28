export interface Credit {
    id: number;
    cast: CastMember[];
}

export interface CastMember {
    id: number;
    name: string;
    profile_path: string;
    character: string;
}
