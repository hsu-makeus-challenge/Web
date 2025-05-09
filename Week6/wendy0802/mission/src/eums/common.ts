import {PAGINATION_ORDER} from "../enums/common.ts";

export type CommonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export type CursorBasedResponse<T> = COmmmonResponse<{
    data: T;
    nextCursor: number | null;
    hasNext: boolean;
}>;

export type PaginationDto = {
    order: PAGINATION_ORDER;
    limit: number;
    cursor: number;
}
