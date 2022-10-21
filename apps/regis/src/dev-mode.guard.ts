import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import 'dotenv/config'

@Injectable()
export class DevModeGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean {
    return process.env.NODE_ENV === 'development'
  }
}
