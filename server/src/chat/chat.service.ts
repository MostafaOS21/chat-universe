import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendsRequests } from 'src/friends-requests/entities/friends-requests.entity';
import { userRequest } from 'types';
import { Message } from './entities/message.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(FriendsRequests.name)
    private readonly friendsRequestsModel: Model<FriendsRequests>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findLatestChats(req: userRequest) {
    const userId = req.user._id;

    const allRequests = await this.friendsRequestsModel
      .find({
        $or: [{ sender: userId }, { receiver: userId }],
        status: 'accepted',
      })
      .populate('sender')
      .populate('receiver');

    const friends = allRequests.map((r) => {
      // @ts-ignore
      if (r.sender._id.toString() === userId.toString()) {
        return r.receiver;
      } else {
        return r.sender;
      }
    });

    return {
      message: 'Latest chats fetched successfully',
      data: friends,
    };
  }

  async findChat(req: userRequest, friendId: string) {
    const userId = req.user._id;

    const request = await this.friendsRequestsModel.findOne({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
      status: 'accepted',
    });

    if (!request) {
      throw new NotFoundException('Must be friends to chat');
    }

    const messages = await this.messageModel.find({
      $or: [
        { sender: userId, receiver: friendId },
        { sender: friendId, receiver: userId },
      ],
    });

    return {
      message: 'Chat fetched successfully',
      data: {
        messages,
      },
    };
  }

  async getChatFriendProfile(friendId: string) {
    const friend = await this.userModel.findById(friendId, '-password');

    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    return {
      message: 'Friend profile fetched successfully',
      data: friend,
    };
  }
}
