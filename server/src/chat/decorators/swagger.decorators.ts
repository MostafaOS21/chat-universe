import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const GetLatestChatsApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Latest chats fetched successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};
