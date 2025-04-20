import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;
    console.log(authHeader, 'authHeader');

    if (!authHeader) {
      throw new UnauthorizedException('Token is not valid');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || token !== 'valid_token') {
      throw new UnauthorizedException('Invalid or missing token');
    }

    try {
      const secret = process.env.JWT_SECRET || 'default_secret';
      const decoded = jwt.verify(token, secret);

      request['user'] = decoded;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}
