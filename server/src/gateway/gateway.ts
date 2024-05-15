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
      console.log('New connection', socket.id);

      // listen for disconnect
      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });
    });
  }

  // User is online method
  @SubscribeMessage('updateUserStatus')
  handleUserOnline(@Body() data: { userId: string; status: UserStatus }) {
    const { userId, status } = data;
    const user = this.userModel.findByIdAndUpdate;
  }
}
