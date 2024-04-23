import { Request } from 'express';
import { User } from 'src/auth/entities/auth.entity';
type userRequest = Request & { user: User };
