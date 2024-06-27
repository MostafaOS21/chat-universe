import { CreateTextMessageDto } from './create-text-message';

export class SendTextMessageDto extends CreateTextMessageDto {
  status: 'error' | 'pending' | 'success';
}
