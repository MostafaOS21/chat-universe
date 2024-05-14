import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/auth.entity';
import { Model } from 'mongoose';
import { FindAuthDto } from './dto/find-auth.dto';
import * as bcrypt from 'bcryptjs';
import { CreateOAuthDto } from './dto/create-oauth.dto';
import { generateUsername } from './utils/generateUsername';
import { Request, Response } from 'express';
import { userRequest } from 'types';
import { FriendsRequests } from 'src/friends-requests/entities/friends-requests.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(FriendsRequests.name)
    private readonly friendsRequestsModel: Model<FriendsRequests>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    if (createAuthDto.password !== createAuthDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const foundUser = await this.userModel.findOne({
      email: createAuthDto.email,
    });

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel(createAuthDto);

    user.username = generateUsername(user);

    await user.save();

    return {
      message: 'User created successfully',
    };
  }

  async signIn(findAuthDto: FindAuthDto) {
    const foundUser = await this.userModel.findOne({
      email: findAuthDto.email,
    });

    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(
      findAuthDto.password,
      foundUser.password,
    );

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return {
      message: 'Logged in successfully',
      data: foundUser,
    };
  }

  async search(
    req: userRequest,
    username: string,
    page: number = 1,
    limit: number = 5,
  ) {
    const { user } = req;
    const formattedUsername = username.toLocaleLowerCase().trim();
    const skip = (page - 1) * limit;
    const searchingUser = await this.userModel.findById(user._id);

    if (!searchingUser) {
      throw new BadRequestException('User not found');
    }

    const foundUsers = await this.userModel
      .find({
        _id: { $ne: searchingUser._id },
        $or: [
          { username: { $regex: formattedUsername, $options: 'i' } },
          { name: { $regex: formattedUsername, $options: 'i' } },
        ],
      })
      .select('name image username email')
      .skip(skip)
      .limit(limit);

    const users = [];

    for (const u of foundUsers) {
      const friendRequest = await this.friendsRequestsModel
        .findOne({
          sender: { $in: [searchingUser._id, u._id] },
          receiver: { $in: [searchingUser._id, u._id] },
        })
        .select('status sender');

      // Check if the user is the sender or the receiver
      let isSender;

      if (friendRequest) {
        isSender =
          friendRequest.sender.toString() === searchingUser._id.toString();
      }

      console.log({ name: u.name, isSender, status: friendRequest?.status });

      users.push({
        ...u.toObject(),
        status: friendRequest?.status ? friendRequest?.status : null,
        isSender,
      });
    }

    return {
      message: 'Users found',
      data: users,
    };
  }

  async refresh(req: Request) {
    const user = req?.user;

    // @ts-ignore
    if (!user?._id) {
      throw new UnauthorizedException();
    }

    //@ts-ignore
    const userExists = await this.userModel.findById(user._id);

    if (!userExists) {
      throw new UnauthorizedException();
    }

    return {
      message: 'Token refreshed',
      data: userExists,
    };
  }

  async signOut(res: Response) {
    res.clearCookie('authorization');
    res.clearCookie('connect.sid');

    return res.json({
      message: 'Logged out successfully',
    });
  }

  // OAuth Services
  async validateUser(createOAuthDto: CreateOAuthDto) {
    let user = await this.userModel.findOne({ email: createOAuthDto.email });

    if (!user) {
      const newUser = new this.userModel(createOAuthDto);
      newUser.username = generateUsername(user);

      await newUser.save();

      user = newUser;
    }

    return user;
  }

  async deserializeUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return null;
    }

    return user;
  }

  // Google OAuth Services
  async googleRedirect(res: Response) {}
}
