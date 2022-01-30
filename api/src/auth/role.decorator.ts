import { UserRole } from './../users/users.entity';

import { SetMetadata } from '@nestjs/common';


export const Role = (...roles: UserRole[] ) => SetMetadata('roles', roles);
