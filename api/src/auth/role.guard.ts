import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {



    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log("roles" , roles)

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user // as Users; //Use passport authentication strategy

    console.log('user !!!!.... ', user )
    return roles.some((role) => user.role.includes(role));
    

  }
}
