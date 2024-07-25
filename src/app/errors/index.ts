import { BadRequestException, ForbiddenException, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AccessTokenExpiredSignatureException } from '../exceptions/auth/AccessTokenExpiredSignatureException';

interface IErrData {
  msg?: string;
  raise?: boolean;
}

export const authorizationFailed = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new HttpException(
      {
        status: 400,
        error: data?.msg || 'AUTHORIZATION_FAILED',
      },
      400
    );
  } else {
    err = new Error(data?.msg || 'AUTHORIZATION_FAILED');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const unauthorized = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new UnauthorizedException(data?.msg || "UNAUTHORIZED")
  } else {
    err = new Error(data?.msg || 'UNAUTHORIZED');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const accessTokenExpiredSignature = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new AccessTokenExpiredSignatureException(data?.msg);
  } else {
    err = new Error(data?.msg);
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const refreshTokenExpiredSignature = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new HttpException(
      {
        status: 419,
        error: data?.msg || 'REFRESH_TOKEN_EXPIRED',
      },
      419
    );
  } else {
    err = new Error(data?.msg || 'REFRESH_TOKEN_EXPIRED');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const accessDenied = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;
  if (is_http_exception) {
    err = new ForbiddenException("ACCESS_DENIDED")
  } else {
    err = new Error(data?.msg || "ACCESS_DENIDED");
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const badRequest = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new BadRequestException("BAD_REQUEST")
  } else {
    err = new Error(data?.msg || 'BAD_REQUEST');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const not_found = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new NotFoundException('NOT_FOUND')
  } else {
    err = new Error(data?.msg || 'NOT_FOUND');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const internalServerError = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: data?.msg || 'INTERNAL_SERVER_ERROR',
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  } else {
    err = new Error(data?.msg || 'INTERNAL_SERVER_ERROR');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const serviceUnavailable = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new HttpException(
      {
        status: 503,
        error: data?.msg || 'SERVICE_UNAVAILABLE',
      },
      503
    );
  } else {
    err = new Error(data?.msg || 'SERVICE_UNAVAILABLE');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};

export const corsNotAllowed = (data?: IErrData, is_http_exception = true) => {
  let err: HttpException | Error = null;

  if (is_http_exception) {
    err = new HttpException(
      {
        status: 400,
        error: data?.msg || 'CORS_NOT_ALLOWED',
      },
      400
    );
  } else {
    err = new Error(data?.msg || 'CORS_NOT_ALLOWED');
  }

  if (data?.raise) {
    throw err;
  }

  return err;
};