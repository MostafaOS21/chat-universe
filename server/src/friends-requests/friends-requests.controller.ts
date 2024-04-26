import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsRequestsService } from './friends-requests.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  CancelRequestApiDecorator,
  GetReceivedRequestsApiDecorator,
  SendRequestApiDecorator,
} from './decorators/swagger.decorators';
import { userRequest } from 'types';

@Controller('friends-requests')
@ApiTags('Friends Requests')
export class FriendsRequestsController {
  constructor(
    private readonly friendsRequestsService: FriendsRequestsService,
  ) {}

  @Post('send/:id')
  @UseGuards(AuthGuard)
  @SendRequestApiDecorator()
  sendRequest(@Req() req: userRequest, @Param('id') id: string) {
    return this.friendsRequestsService.sendRequest(req, id);
  }

  @Delete('cancel/:id')
  @UseGuards(AuthGuard)
  @CancelRequestApiDecorator()
  cancelRequest(@Req() req: userRequest, @Param('id') id: string) {
    return this.friendsRequestsService.cancelRequest(req, id);
  }

  @Get('received')
  @UseGuards(AuthGuard)
  @GetReceivedRequestsApiDecorator()
  getReceivedRequests(
    @Req() req: userRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.friendsRequestsService.getReceivedRequests(req, page, limit);
  }
}
