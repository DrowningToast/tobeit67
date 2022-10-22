import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req;
    
    const currentUser = request.current

    if (!currentUser) {
      return false
    }

    if (Object.keys(currentUser).length === 0) {
      return false;
    } else {
      return true
    }
  }
}
