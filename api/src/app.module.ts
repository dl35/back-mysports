import { RoleGuard } from './auth/role.guard';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActivitesModule } from './activites/activites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST', 'mysql'),
        port: configService.get<number>('DATABASE_PORT', 3306 ),
        username: configService.get('DATABASE_USER', 'prod'),
        password: configService.get('DATABASE_PASS', 'prod'),
        database: configService.get('DATABASE_SCHEMA', 'product'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    
    AuthModule,
    UsersModule,
    ActivitesModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy
   /* {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },*/

  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }

  
}
