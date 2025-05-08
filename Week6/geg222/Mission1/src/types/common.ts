import { PAGINATION_ORDER } from "../enums/commons.ts";

export type CommonResponse<T> = {
  status: string;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = {
  status: string;
  statusCode: number;
  message: string;
  data: T;
  nextCursor: number;
  hasNext: boolean;
};

export type PaginationDto = {
  data: any;
  cursor?: number;
  limit?: number;
  page?: number;
  order?: PAGINATION_ORDER;
  search?: string;
};
