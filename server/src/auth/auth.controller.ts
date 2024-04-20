import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateApiDecorator,
  FindUsersApiDecorator,
  SignInApiDecorator,
} from './decorators/swagger.decorators';
import { FindAuthDto } from './dto/find-auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/search/:username')
  @FindUsersApiDecorator()
  async search(@Param('username') username: string) {
    return this.authService.search(username);
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
}
