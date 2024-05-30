import { Body, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { User, UserStatus } from 'src/auth/entities/auth.entity';

@WebSocketGateway(8001, { cors: true })
export class ChatUniverseGateway implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
          }

          // Emit user status
          console.log('Emitting user status', { userId, status });
          this.server.emit('userStatus', { userId, status });

          // listen for disconnect
          socket.on('disconnect', async () => {
            const user = await this.userModel.findById(userId);

            if (user) {
              user.status = UserStatus.INACTIVE;
              user.save();

              // Emit user status
              this.server.emit('userStatus', {
                userId: user._id,
                status: UserStatus.INACTIVE,
              });
            }
          });
        },
      );
    });
  }
}
