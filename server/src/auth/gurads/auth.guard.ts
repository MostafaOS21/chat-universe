import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = request?.cookies['authorization']?.split(' ')[1];

    if (!token) {
      throw new BadRequestException('no token found');
    }

    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      response.clearCookie('authorization');
      throw new UnauthorizedException('session expired');
    }

    request.user = this.jwtService.decode(token)?._doc;

    if (!request.user) throw new UnauthorizedException('user not found');

    return request;
  }
}
