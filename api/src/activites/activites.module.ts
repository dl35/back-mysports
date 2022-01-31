import { Activite } from './entities/activite.entity';
import { Module } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Activite])],
  controllers: [ActivitesController],
  providers: [ActivitesService]
})
export class ActivitesModule {}
