import { Request as HttpRequest } from 'express';

interface UserJwtPayload {
  sub: string;
  role: string,
  iat: string,
  exp: string
}
export type AuthorizedRequest = HttpRequest & { user: UserJwtPayload };