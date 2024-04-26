import { PartialType } from '@nestjs/swagger';
import { CreateFriendsRequestDto } from './create-friends-request.dto';

export class UpdateFriendsRequestDto extends PartialType(CreateFriendsRequestDto) {}
