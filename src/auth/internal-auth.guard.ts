import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const secret = request.headers['x-internal-secret'];
    const expected = process.env.INTERNAL_SECRET;

    if (!expected) {
      console.warn(
        '[InternalAuthGuard] INTERNAL_SECRET env var is not set — rejecting all internal requests',
      );
      return false;
    }

    return secret === expected;
  }
}
