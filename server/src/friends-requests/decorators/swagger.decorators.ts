import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const SendRequestApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Request sent successfully',
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

    HttpCode(HttpStatus.OK),
  );
};

export const GetReceivedRequestsApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Received requests fetched successfully',
    }),
    HttpCode(HttpStatus.OK),
  );
};

export const GetSentRequestsApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Sent requests fetched successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};

export const CancelUserSentRequest = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Request canceled successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};

export const AcceptRequestApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Request accepted successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};

export const UnfriendApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User unfriended successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};

export const RejectRequestApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Request rejected successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};

export const GetFriendsApiDecorator = () => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Friends fetched successfully',
    }),

    HttpCode(HttpStatus.OK),
  );
};
