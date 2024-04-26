import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { userRequest } from 'types';
import { UpdateUsernameDto } from './dto/update-username.dto';

@Controller('profile')
@ApiTags('Profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('update-username')
  updateUsername(
    @Req() req: userRequest,
    @Body() updateUsernameDto: UpdateUsernameDto,
  ) {
    return this.profileService.updateUsername(req, updateUsernameDto);
  }
}
