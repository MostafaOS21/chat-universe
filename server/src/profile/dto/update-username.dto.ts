import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class UpdateUsernameDto {
  @IsNotEmpty()
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  oldUsername: string;

  @IsNotEmpty()
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  newUsername: string;
}
