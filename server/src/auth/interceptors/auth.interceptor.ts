import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/auth.entity';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Before...');

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();

        if (data?.data?.password) {
          data.data.password = undefined;
          data.data.friendList = undefined;

          const payload = data.data.toJSON() as User;
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
          });

          response.cookie('authorization', `Bearer ${token}`, {
            maxAge: process.env.JWT_COOKIE_EXPIRE,
          });
        }

        return data;
      }),
    );
  }
}
