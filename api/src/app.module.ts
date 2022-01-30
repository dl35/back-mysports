import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ActivitesModule } from './activites/activites.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'prod',
      password: 'prod',
      database: 'product',
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    UsersModule,
    
    AuthModule,
    
    ActivitesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
