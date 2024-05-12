import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  GetSentRequestsApiDecorator,
  SendRequestApiDecorator,
} from './decorators/swagger.decorators';
import { userRequest } from 'types';

@Controller('friends-requests')
@UseGuards(AuthGuard)
@ApiTags('Friends Requests')
export class FriendsRequestsController {
  constructor(
    private readonly friendsRequestsService: FriendsRequestsService,
  ) {}

  @Post('send/:id')
  @SendRequestApiDecorator()
  sendRequest(@Req() req: userRequest, @Param('id') id: string) {
    return this.friendsRequestsService.sendRequest(req, id);
  }

  @Delete('cancel/:id')
  @CancelRequestApiDecorator()
  cancelRequest(@Req() req: userRequest, @Param('id') id: string) {
    return this.friendsRequestsService.cancelRequest(req, id);
  }

  @Get('received')
  @GetReceivedRequestsApiDecorator()
  getReceivedRequests(
    @Req() req: userRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.friendsRequestsService.getReceivedRequests(req, page, limit);
  }

  @Get('sent')
  @GetSentRequestsApiDecorator()
  getSentRequests(
    @Req() req: userRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.friendsRequestsService.getSentRequests(req, page, limit);
  }

  @Patch('sent/cancel/:id')
  @CancelRequestApiDecorator()
  cancelSentRequest(@Param('id') id: string, @Req() req: userRequest) {
    return this.friendsRequestsService.cancelSentRequest(req, id);
  }
}
