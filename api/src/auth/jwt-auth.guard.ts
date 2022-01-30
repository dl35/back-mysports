import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {


  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    
       if (err || !user) {
        throw err || new UnauthorizedException();
       }

        const request = context.switchToHttp().getRequest();
        request.user = user;
        console.log( "handle request ", user , info )
        return user;
    }


}