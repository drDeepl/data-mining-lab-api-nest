import { Request as HttpRequest } from 'express';


export type AuthorizedRequest = HttpRequest & { user: UserJwtPayload };
