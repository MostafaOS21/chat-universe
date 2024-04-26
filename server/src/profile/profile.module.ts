import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/auth/entities/auth.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, AuthGuard],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
})
export class ProfileModule {}
