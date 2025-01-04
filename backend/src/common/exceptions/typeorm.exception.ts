import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

type ExceptionResponse = {
  statusCode: number;
  message: string;
};

interface PostgresError {
  code: string;
  detail: string;
  table: string;
  constraint: string;
}

@Catch(TypeORMError, QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  private defaultExceptionResponse: ExceptionResponse =
    new InternalServerErrorException().getResponse() as ExceptionResponse;

  private exceptionResponse: ExceptionResponse = this.defaultExceptionResponse;

  catch(exception: TypeORMError | QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof QueryFailedError) {
      const postgresError = exception.driverError as PostgresError;
      this.setQueryFailedErrorResponse(exception, postgresError);
    }

    response
      .status(this.exceptionResponse.statusCode)
      .json(this.exceptionResponse);
  }

  private setQueryFailedErrorResponse(
    _exception: QueryFailedError,
    error: PostgresError,
  ): void {
    if (error.code === '23505') {
      const message = error.detail.replace(
        /^Key \((.*)\)=\((.*)\) (.*)/,
        '$2 ya existe',
      );
      this.exceptionResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      };
    }

    if (error.code === '23502') {
      const message = error.detail.replace(
        /^Key \((.*)\)=\((.*)\) (.*)/,
        '$1 no puede ser vacio',
      );

      this.exceptionResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      };
    }

    // Other PostgreSQL error codes you might want to handle:
    // '23503' - foreign key violation
    // '23502' - not null violation
  }
}
