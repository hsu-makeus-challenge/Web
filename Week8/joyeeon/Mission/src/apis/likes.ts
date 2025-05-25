import { api } from "./api";
const token = localStorage.getItem('ACCESS_TOKEN');

export const addLike = (lpid: number) => {
    return api.post(`/lps/${lpid}/likes`, {}, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}

export const removeLike = (lpid: number) => {
    return api.delete(`/lps/${lpid}/likes`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}