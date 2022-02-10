import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

// cf code https://github.com/nestjs/passport/blob/master/lib/auth.guard.ts

/*
handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
       if (err || !user) {
         console.log( err , user  )
        throw err || new UnauthorizedException();
       }
        const request = context.switchToHttp().getRequest();
        request.user = user;
        console.log( "handle request guards ", user , info )
        return user;
    }
*/

}