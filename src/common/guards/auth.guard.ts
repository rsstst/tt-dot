import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const isJson = req.query.format === 'json';

    if (req.session?.user) {
      return true;
    }

    if (isJson) {
      throw new UnauthorizedException('Silakan login terlebih dahulu');
    }

    const res = context.switchToHttp().getResponse();
    res.redirect('/login?error=Silakan login terlebih dahulu');
    return false;
  }
}