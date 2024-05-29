import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {
  FriendsRequests,
  friendsRequestsSchema,
} from 'src/friends-requests/entities/friends-requests.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Message, messageSchema } from './entities/message.entity';
import { User, userSchema } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [ChatController],
  providers: [ChatService, AuthGuard],
  imports: [
    MongooseModule.forFeature([
      { name: FriendsRequests.name, schema: friendsRequestsSchema },
    ]),
    MongooseModule.forFeature([{ name: Message.name, schema: messageSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
})
export class ChatModule {}
