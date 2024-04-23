import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User {
  _id: string;

  @Prop({ required: true, maxlength: 50 })
  name: string;
  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ default: 'default.png' })
  image: string;

  @Prop({ default: '' })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

export { userSchema };
