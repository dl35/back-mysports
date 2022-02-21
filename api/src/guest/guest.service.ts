import { Activite } from './../activites/entities/activite.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class GuestService {

  constructor(

    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>,

  ) {}



  async findAll( page: number) {
  
    const pageSize = 20 ;
    if( page <= 0 ) {
      page = 1;
    }
   
    const skip = (page - 1) * pageSize ;

    const values = this.activiteRepository.createQueryBuilder("a")
                   .leftJoinAndSelect('user','u' , 'a.userId = u.id' )
                   .select(['a.type as type','a.dist as dist','a.date as date','u.nom as nom','u.prenom as prenom'] )
                   .offset( skip )
                   .limit( pageSize )
                   .orderBy( "a.date" , "DESC")
                   .getRawMany();
  
    return values ;
     
  }



}


