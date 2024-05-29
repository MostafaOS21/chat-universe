import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateApiDecorator,
  FindUsersApiDecorator,
  RefreshApiDecorator,
  SignInApiDecorator,
  SignOutApiDecorator,
} from './decorators/swagger.decorators';
import { FindAuthDto } from './dto/find-auth.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Request, Response } from 'express';
import { userRequest } from 'types';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@ApiTags('Auth')
// @UseInterceptors(AuthInterceptor) // Refresh Token is now handled in the client
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/search/:username')
  @UseGuards(AuthGuard)
  @FindUsersApiDecorator()
  async search(
    @Req() req: userRequest,
    @Param('username') username: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.authService.search(req, username, page, limit);
  }

  @Post('sign-up')
  @CreateApiDecorator()
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('sign-in')
  @SignInApiDecorator()
  async signIn(@Body() findAuthDto: FindAuthDto) {
    return this.authService.signIn(findAuthDto);
  }

  @Post('refresh')
  @RefreshApiDecorator()
  @UseGuards(AuthGuard)
  async refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }

  @Delete('sign-out')
  @SignOutApiDecorator()
  @UseGuards(AuthGuard)
  async signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }

  /* ----- Google Strategy ----- */
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    console.log('Redirecting to google login');
    return {
      message: 'Redirecting to google login',
    };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: userRequest, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    const userPayload = { ...user };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie('authorization', `Bearer ${token}`, {
      maxAge: +process.env.JWT_COOKIE_EXPIRE,
    });

    res.redirect(`${process.env.CLIENT_URL}`);
  }

  /* ----- Github Strategy ----- */
  // TODO: Add Github strategy
}
