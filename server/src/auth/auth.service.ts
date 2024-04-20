import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import { FindAuthDto } from './dto/find-auth.dto';
import * as bcrypt from 'bcryptjs';

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

    user.username =
      createAuthDto.email.split('@')[0].toLocaleLowerCase() +
      '_' +
      user._id.toString();

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
      data: {
        email: foundUser.email,
        id: foundUser._id,
        username: foundUser.username,
        image: foundUser.image,
        name: foundUser.name,
      },
    };
  }

  async search(username: string) {
    const formattedUsername = username.toLocaleLowerCase().trim();

    const foundUsers = await this.userModel
      .find({
        username: { $regex: formattedUsername, $options: 'i' },
      })
      .select('name image');

    return {
      message: 'Users found',
      data: foundUsers,
    };
  }
}
