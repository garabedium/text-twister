import { Query } from 'express-serve-static-core';

// Express types
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T
}

export type ApiResponse<T> = Promise<T>;
