import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class Util {
  requiredParamValidator(data: any, params: any): void {
    for (const param of params) {
      if (!data[param]) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `${param} is required`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  handleError(error: HttpException | Error) {
    if (!(error instanceof HttpException)) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw error;
  }

  HandleNotFoundError() {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Not found error',
      },
      HttpStatus.NOT_FOUND,
    );
  }

}
