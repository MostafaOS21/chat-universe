import { Module } from '@nestjs/common';
import { ChatUniverseGateway } from './gateway';
import { User, userSchema } from 'src/auth/entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [ChatUniverseGateway],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
})
export class GatewayModule {}
