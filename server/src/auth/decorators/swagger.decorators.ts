import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiResponse } from '@nestjs/swagger';

// create decorators for swagger
export const CreateApiDecorator = () => {
  return applyDecorators(
    ApiResponse({ status: 201, description: 'User created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
};

// sign In decorators for swagger
export const SignInApiDecorator = () => {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'User found successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
    HttpCode(HttpStatus.OK),
  );
};

// find users for swagger
export const FindUsersApiDecorator = () => {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Users found successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
    ApiQuery({ name: 'page', required: false, description: 'Page number' }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Number of users per page',
    }),
    HttpCode(HttpStatus.OK),
  );
};

// refresh token for swagger
export const RefreshApiDecorator = () => {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Token refreshed successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
    ApiHeader({
      name: 'authorization',
      description: 'Bearer token',
      required: true,
    }),
    HttpCode(HttpStatus.OK),
  );
};

// sign out for swagger
export const SignOutApiDecorator = () => {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Logged out successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
    ApiHeader({
      name: 'authorization',
      description: 'Bearer token',
      required: true,
    }),
    HttpCode(HttpStatus.OK),
  );
};
