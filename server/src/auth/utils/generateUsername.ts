import { User } from '../entities/auth.entity';

export const generateUsername = (user: User) => {
  user.username =
    user.email.split('@')[0].toLocaleLowerCase() + '_' + user._id.toString();

  return user.username;
};
