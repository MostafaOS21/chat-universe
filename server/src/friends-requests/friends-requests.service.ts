import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/auth.entity';
import { Model } from 'mongoose';
import { userRequest } from 'types';
import { FriendsRequests } from './entities/friends-requests.entity';

@Injectable()
export class FriendsRequestsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(FriendsRequests.name)
    private readonly friendsRequestsModel: Model<FriendsRequests>,
  ) {}

  async sendRequest(req: userRequest, id: string) {
    const receiver = await this.userModel
      .findById(id)
      .select('_id name username image');
    const sender = await this.userModel.findById(req.user._id);
    //.select('friendsList _id name username image');

    if (!receiver || !sender) {
      throw new NotFoundException('User not found');
    }

    if (receiver._id.toString() === sender._id) {
      throw new NotFoundException('You cannot send request to yourself');
    }

    const friendRequest = new this.friendsRequestsModel({
      sender: sender._id,
      receiver: receiver._id.toString(),
    });

    await friendRequest.save();

    return {
      message: 'Request sent successfully',
      data: {
        ...receiver.toObject(),
        status: 'pending',
      },
    };
  }

  async cancelRequest(req: userRequest, id: string) {
    const receiver = await this.userModel
      .findById(id)
      .select('_id name username image');
    const sender = await this.userModel.findById(req.user._id);

    if (!receiver || !sender) {
      throw new NotFoundException('User not found');
    }

    if (receiver._id.toString() === sender._id) {
      throw new NotFoundException('You cannot cancel request to yourself');
    }

    await this.friendsRequestsModel.deleteOne({
      sender: sender._id,
      receiver: receiver._id.toString(),
    });

    return {
      message: 'Request cancelled successfully',
      data: {
        ...receiver.toObject(),
        status: null,
      },
    };
  }

  async getReceivedRequests(
    req: userRequest,
    page: number = 1,
    limit: number = 30,
  ) {
    const { user } = req;

    const requests = await this.friendsRequestsModel
      .find({ receiver: user._id })
      .populate('sender', '_id name username image')
      .skip((page - 1) * limit)
      .limit(limit);

    if (requests.length === 0) {
      throw new NotFoundException('No requests found');
    }

    console.log(requests);

    return {
      message: 'Received requests fetched successfully',
      data: requests,
    };
  }
}
