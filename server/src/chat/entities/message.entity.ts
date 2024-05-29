import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop({ required: true, type: String, ref: 'User' })
  sender: string;

  @Prop({ required: true, type: String, ref: 'User' })
  receiver: string;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  @Prop({ required: true, type: Boolean, default: false })
  deleted: boolean;

  // TODO: Implement read status
  // @Prop({ required: true, type: Boolean, default: false })
  // read: boolean;
}

const messageSchema = SchemaFactory.createForClass(Message);

export { messageSchema };
