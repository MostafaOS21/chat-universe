import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class FindAuthDto {
  @ApiProperty({
    name: 'email',
    description: 'User email',
    type: String,
    example: 'email@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'User password',
    type: String,
    example: 'Password@1234',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
