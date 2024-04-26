import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { userRequest } from 'types';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/auth.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async updateUsername(req: userRequest, updateUsernameDto: UpdateUsernameDto) {
    const { user } = req;
    const { oldUsername, newUsername } = updateUsernameDto;

    if (oldUsername === newUsername) {
      throw new BadRequestException(
        'New username cannot be the same as old username',
      );
    }

    const userExists = await this.userModel.findOne({ username: oldUsername });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    if (userExists._id.toString() !== user._id.toString()) {
      throw new NotFoundException('User not found');
    }

    userExists.username = newUsername;

    await userExists.save();

    return {
      message: 'Username updated successfully',
      data: newUsername,
    };
  }

  // TODO: Implement updatePassword & updateEmail
}
