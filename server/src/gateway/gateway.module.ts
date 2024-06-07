import { Module } from '@nestjs/common';
import { ChatUniverseGateway } from './gateway';
import { User, userSchema } from 'src/auth/entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TextMessagesService } from './text-messages.service';
import { Message, messageSchema } from 'src/chat/entities/message.entity';

@Module({
  providers: [ChatUniverseGateway, TextMessagesService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: messageSchema }]),
  ],
})
export class GatewayModule {}
