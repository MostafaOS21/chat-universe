import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PassportModule } from '@nestjs/passport';
import { FriendsRequestsModule } from './friends-requests/friends-requests.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PassportModule.register({ session: true }),
    FriendsRequestsModule,
    ProfileModule,
  ],
})
export class AppModule {}
