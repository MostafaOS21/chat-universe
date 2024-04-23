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
    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();

        if (data?.data?.password) {
          data.data.password = undefined;

          console.log(data.data.toJSON());

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
