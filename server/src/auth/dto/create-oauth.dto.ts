import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class CreateOAuthDto extends OmitType(CreateAuthDto, [
  'password',
  'confirmPassword',
]) {}
