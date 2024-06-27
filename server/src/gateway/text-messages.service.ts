import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/chat/entities/message.entity';
import { CreateTextMessageDto } from './dto/create-text-message';
import { SendTextMessageDto } from './dto/send-text-message';

@Injectable()
export class TextMessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async handleSendMessage(
    message: CreateTextMessageDto,
  ): Promise<SendTextMessageDto> {
    try {
      console.log(message);
      const newMessage = new this.messageModel(message);
      await newMessage.save();

      return {
        ...message,
        status: 'success',
      };
    } catch (error) {
      console.log(error);
      return {
        ...message,
        status: 'error',
      };
    }
  }
}
