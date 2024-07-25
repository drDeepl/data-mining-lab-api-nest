import { HttpException, HttpStatus } from "@nestjs/common";

export class AccessTokenExpiredSignatureException extends HttpException{
    constructor(message: string = "Истек срок действия токена"){
        super(message, HttpStatus.UNAUTHORIZED)
    }
}