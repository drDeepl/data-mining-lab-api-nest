import { HttpException, HttpStatus } from "@nestjs/common";

export class ExistsException extends HttpException{
    constructor(message: string){
        super(message, HttpStatus.FORBIDDEN)
    }
}