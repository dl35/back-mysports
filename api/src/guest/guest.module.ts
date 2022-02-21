import { ActivitesModule } from './../activites/activites.module';
import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { Activite } from 'src/activites/entities/activite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Activite]) , ActivitesModule ],
  controllers: [GuestController],
  providers: [GuestService]
})
export class GuestModule {}
