import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { userRequest } from 'types';
import { GetLatestChatsApiDecorator } from './decorators/swagger.decorators';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('chat')
@ApiTags('Chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('latest')
  @GetLatestChatsApiDecorator()
  getLatestChats(@Req() req: userRequest) {
    return this.chatService.findLatestChats(req);
  }

  @Get(':friendId')
  getChat(@Req() req: userRequest, @Param('friendId') friendId: string) {
    return this.chatService.findChat(req, friendId);
  }

  @Get('profile/:friendId')
  getChatFriendProfile(@Param('friendId') friendId: string) {
    return this.chatService.getChatFriendProfile(friendId);
  }
}
