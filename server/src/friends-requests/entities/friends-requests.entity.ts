import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum FriendsRequestsStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  NONE = null,
}

@Schema()
export class FriendsRequests {
  _id: string;

  @Prop({ required: true, type: String, ref: 'User' })
  sender: string;

  @Prop({ required: true, type: String, ref: 'User' })
  receiver: string;

  @Prop({
    type: String,
    enum: FriendsRequestsStatus,
  })
  status: FriendsRequestsStatus;
}

const friendsRequestsSchema = SchemaFactory.createForClass(FriendsRequests);

export { friendsRequestsSchema };
