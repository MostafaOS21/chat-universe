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
  AcceptRequestApiDecorator,
  CancelRequestApiDecorator,
  GetFriendsApiDecorator,
  GetReceivedRequestsApiDecorator,
  GetSentRequestsApiDecorator,
  RejectRequestApiDecorator,
  SendRequestApiDecorator,
  UnfriendApiDecorator,
} from './decorators/swagger.decorators';
import { userRequest } from 'types';

@Controller('friends-requests')
@UseGuards(AuthGuard)
@ApiTags('Friends Requests')
export class FriendsRequestsController {
  constructor(
    private readonly friendsRequestsService: FriendsRequestsService,
  ) {}

  @Get('friends')
  @GetFriendsApiDecorator()
  getFriends(@Req() req: userRequest) {
    return this.friendsRequestsService.getFriends(req);
  }

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

  @Patch('received/accept/:id')
  @AcceptRequestApiDecorator()
  acceptRequest(@Param('id') id: string, @Req() req: userRequest) {
    return this.friendsRequestsService.acceptRequest(req, id);
  }

  @Patch('received/unfriend/:id')
  @UnfriendApiDecorator()
  unfriend(@Param('id') id: string, @Req() req: userRequest) {
    return this.friendsRequestsService.unfriend(req, id);
  }

  @Delete('received/reject/:id')
  @RejectRequestApiDecorator()
  rejectRequest(@Param('id') id: string, @Req() req: userRequest) {
    return this.friendsRequestsService.rejectRequest(req, id);
  }
}
