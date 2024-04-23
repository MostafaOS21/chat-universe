import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/auth.entity';
import { GoogleStrategy } from './utils/google-strategy';
import { SessionSerializer } from './utils/serializer';
import { AuthGuard } from './gurads/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, GoogleStrategy, SessionSerializer, AuthGuard],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
