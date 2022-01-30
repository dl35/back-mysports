import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';


import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "secret" ,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
 
})
export class AuthModule {}
