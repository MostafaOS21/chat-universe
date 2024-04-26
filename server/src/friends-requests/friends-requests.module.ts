import { Module } from '@nestjs/common';
import { FriendsRequestsService } from './friends-requests.service';
import { FriendsRequestsController } from './friends-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/auth/entities/auth.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  FriendsRequests,
  friendsRequestsSchema,
} from './entities/friends-requests.entity';

@Module({
  controllers: [FriendsRequestsController],
  providers: [FriendsRequestsService, AuthGuard],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([
      { name: FriendsRequests.name, schema: friendsRequestsSchema },
    ]),
  ],
})
export class FriendsRequestsModule {}
