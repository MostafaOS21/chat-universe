import { Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { User, UserStatus } from 'src/auth/entities/auth.entity';
import { TextMessagesService } from './text-messages.service';
import { CreateTextMessageDto } from './dto/create-text-message';
import { GatewayGuard } from 'src/auth/guards/gateway.guard';

@WebSocketGateway(8001, {
  cors: { credentials: true, origin: 'http://localhost:3000', methods: '*' },
})
export class ChatUniverseGateway implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly textMessagesService: TextMessagesService,
  ) {}

  // Server instance
  @WebSocketServer()
  server: Server;

  // On module init
  onModuleInit() {
    this.server.on('connection', (socket) => {
      // User is online method
      socket.on(
        'updateUserStatus',
        async (data: { userId: string; status: UserStatus }) => {
          const { userId, status } = data;
          const user = await this.userModel.findById(userId);

          if (user) {
            user.status = status;
            user.save();

            console.log(`Activating user ${userId}`);

            // Emit user status
            this.server.emit('userStatusUpdated', {
              userId,
              status,
            });
          }

          // listen for disconnect
          socket.on('disconnect', async () => {
            const user = await this.userModel.findById(userId);

            if (user) {
              user.status = UserStatus.INACTIVE;
              user.save();

              console.log(`Deactivating user ${userId}`);

              // Emit user status
              this.server.emit('userStatusUpdated', {
                userId: user._id,
                status: UserStatus.INACTIVE,
              });
            }
          });
        },
      );
    });
  }

  // Send message
  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() data: CreateTextMessageDto) {
    const message = await this.textMessagesService.handleSendMessage(data);

    console.log(message);

    if (message.status === 'error') {
      this.server.emit('receiveMessage:Error', message);
    } else {
      this.server.emit('receiveMessage', message);
    }
  }
}
