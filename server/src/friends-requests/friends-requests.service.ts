import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/auth.entity';
import { Model } from 'mongoose';
import { userRequest } from 'types';
import {
  FriendsRequests,
  FriendsRequestsStatus,
} from './entities/friends-requests.entity';

@Injectable()
export class FriendsRequestsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(FriendsRequests.name)
    private readonly friendsRequestsModel: Model<FriendsRequests>,
  ) {}

  async sendRequest(req: userRequest, id: string) {
    const receiver = await this.userModel.findById(id).select('_id');
    const sender = await this.userModel.findById(req.user._id);
    //.select('friendsList _id name username image');

    if (!receiver || !sender) {
      throw new NotFoundException('User not found');
    }

    if (receiver._id.toString() === sender._id) {
      throw new NotFoundException('You cannot send request to yourself');
    }

    let relation;

    relation = await this.friendsRequestsModel.findOne({
      sender: sender._id,
      receiver: receiver._id.toString(),
    });

    if (relation) {
      if (relation.status === FriendsRequestsStatus.PENDING) {
        throw new NotFoundException('Request already sent');
      }

      if (relation.status === FriendsRequestsStatus.ACCEPTED) {
        throw new NotFoundException('You are already friends');
      }

      if (relation.status === FriendsRequestsStatus.REJECTED) {
        const isTheRejectedOne = relation.sender.toString() === sender._id;

        if (isTheRejectedOne) {
          throw new NotFoundException(
            'You cannot send request to someone who rejected you',
          );
        }
      }

      relation.status = FriendsRequestsStatus.PENDING;

      await relation.save();

      return {
        message: 'Request sent successfully',
        data: receiver._id.toString(),
      };
    }

    relation = new this.friendsRequestsModel({
      sender: sender._id,
      receiver: receiver._id.toString(),
      status: FriendsRequestsStatus.PENDING,
    });

    await relation.save();

    return {
      message: 'Request sent successfully',
      data: receiver._id.toString(),
    };
  }

  async cancelRequest(req: userRequest, id: string) {
    const receiver = await this.userModel.findById(id).select('_id');
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
      data: receiver._id.toString(),
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

    return {
      message: 'Received requests fetched successfully',
      data: requests,
    };
  }

  async getSentRequests(
    req: userRequest,
    page: number = 1,
    limit: number = 30,
  ) {
    const requests = await this.friendsRequestsModel
      .find({ sender: req.user._id })
      .populate('receiver', '_id name username image')
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      message: 'Sent requests fetched successfully',
      data: requests,
    };
  }

  async cancelSentRequest(req: userRequest, id: string) {
    const receiver = await this.userModel
      .findById(id)
      .select('_id name username image');
    const sender = await this.userModel.findById(req.user._id);

    if (!receiver || !sender) {
      throw new NotFoundException('User not found');
    }

    const request = await this.friendsRequestsModel.findOneAndDelete({
      sender: sender._id,
      receiver: receiver._id.toString(),
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    return {
      message: 'Request cancelled successfully',
      data: receiver._id.toString(),
    };
  }

  async acceptRequest(req: userRequest, id: string) {
    const sender = await this.userModel.findById(id);
    const receiver = await this.userModel.findById(req.user._id);

    if (!sender || !receiver) {
      throw new NotFoundException('User not found');
    }

    const request = await this.friendsRequestsModel.findOne({
      sender: sender._id,
      receiver: receiver._id.toString(),
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    request.status = FriendsRequestsStatus.ACCEPTED;
    await request.save();

    return {
      message: 'Request accepted successfully',
      data: request._id.toString(),
    };
  }

  async unfriend(req: userRequest, id: string) {
    const friend = await this.userModel.findById(id);
    const user = await this.userModel.findById(req.user._id);

    if (!friend || !user) {
      throw new NotFoundException('User not found');
    }

    const relationship = await this.friendsRequestsModel.findOne({
      $or: [
        { sender: user._id, receiver: friend._id },
        { sender: friend._id, receiver: user._id },
      ],
    });

    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }

    relationship.status = FriendsRequestsStatus.NONE;

    await relationship.save();

    return {
      message: 'User unfriended successfully',
      data: friend._id.toString(),
    };
  }

  async rejectRequest(req: userRequest, id: string) {
    const sender = await this.userModel.findById(id);
    const receiver = await this.userModel.findById(req.user._id);

    if (!sender || !receiver) {
      throw new NotFoundException('User not found');
    }

    const request = await this.friendsRequestsModel.findOne({
      sender: sender._id,
      receiver: receiver._id.toString(),
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    request.status = FriendsRequestsStatus.REJECTED;
    await request.save();

    return {
      message: 'Request rejected successfully',
      data: sender._id.toString(),
    };
  }
}
