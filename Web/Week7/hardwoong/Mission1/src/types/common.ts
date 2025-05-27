export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: T;
    nextCursor: number;
    hasNext: boolean;
  }
};

export interface PaginationDto {
  cursor: number;
  limit: number;
  order: "asc" | "desc";
};