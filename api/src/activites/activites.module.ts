import { UsersService } from 'src/users/users.service';
import { Activite } from './entities/activite.entity';
import { Module } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Activite]) , UsersModule ],
  controllers: [ActivitesController],
  providers: [ActivitesService ]
})
export class ActivitesModule {}
