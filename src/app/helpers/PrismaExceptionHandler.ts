import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PrismaExceptionHandler {
  private readonly logger = new Logger(PrismaExceptionHandler.name)
  private readonly errorMessages: {
    [key: string]: { statusCode: number; description: string };
  };
  constructor(errorMessages: {
    [key: string]: { statusCode: number; description: string };
  }) {
    this.errorMessages = errorMessages;
  }
  public handleError(error: any): HttpException {
    if(error instanceof HttpException){
      throw error;
    }
    if(error.code === undefined){
      this.logger.error(error.message)
      throw new HttpException("что-то пошло не так", HttpStatus.BAD_GATEWAY)
    }
    console.log(`error code: ${error.code}`);
    console.log(
      `error message for user: ${this.errorMessages[error.code].description}`,
    );
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("error is prisma error")
      if (this.errorMessages[error.code]) {
        return new HttpException(
          this.errorMessages[error.code].description,
          this.errorMessages[error.code].statusCode,
        );
      }
      console.error(`Prisma Error: ${error.message}`);
    }
    return error;
  }
}
