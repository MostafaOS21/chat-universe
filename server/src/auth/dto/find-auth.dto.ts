import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class FindAuthDto {
  @ApiProperty({
    name: 'email',
    description: 'User email',
    type: String,
    example: 'email@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'User password',
    type: String,
    example: 'Password@1234',
  })
  @IsStrongPassword()
  password: string;
}
