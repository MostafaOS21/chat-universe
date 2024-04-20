import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    name: 'name',
    description: 'User name',
    type: String,
    example: 'John Doe',
  })
  @MaxLength(50, { message: 'Name is too long' })
  name: string;

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

  @ApiProperty({
    name: 'confirmPassword',
    description: 'User password confirmation',
    type: String,
    example: 'Password@1234',
  })
  @IsStrongPassword()
  confirmPassword: string;
}
