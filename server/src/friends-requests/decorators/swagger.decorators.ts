import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const SendRequestApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Request sent successfully',
    }),
    ApiHeader({
      name: 'authorization',
      description: 'Bearer token',
      required: true,
    }),
    HttpCode(HttpStatus.OK),
  );
};

export const CancelRequestApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Request canceled successfully',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    }),
    ApiHeader({
      name: 'authorization',
      description: 'Bearer token',
      required: true,
    }),
    HttpCode(HttpStatus.OK),
  );
};

export const GetReceivedRequestsApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Received requests fetched successfully',
    }),
    ApiHeader({
      name: 'authorization',
      description: 'Bearer token',
      required: true,
    }),
    HttpCode(HttpStatus.OK),
  );
};
