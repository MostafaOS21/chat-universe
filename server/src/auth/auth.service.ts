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

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  async search(username: string, page: number = 1, limit: number = 8) {
    const formattedUsername = username.toLocaleLowerCase().trim();
    const skip = (page - 1) * limit;

    const foundUsers = await this.userModel
      .find({
        username: { $regex: formattedUsername, $options: 'i' },
      })
      .select('name image username email')
      .skip(skip)
      .limit(limit);

    console.log('page', page);
    console.log(foundUsers);

    return {
      message: 'Users found',
      data: foundUsers,
    };
  }

  async refresh(req: Request) {
    const user = req?.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      message: 'Token refreshed',
      data: user,
    };
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
