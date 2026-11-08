import 'express-session';
import { User } from '@prisma/client';

type SafeUser = Omit<User, 'password'>;

declare module 'express-session' {
  interface SessionData {
    user?: SafeUser;
  }
}