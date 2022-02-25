import { Activite } from './../activites/entities/activite.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ParamsGuest } from './params-guest';

@Injectable()
export class GuestService {

  constructor(

    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>,

  ) {}



  async findAll( page: number , query: ParamsGuest) {
  
    const pageSize = 18 ;
    if( page <= 0 ) {
      page = 1;
    }
    
    const atype = query.type;
    const search = query.search;

    console.log( query )

    let w = '';
    if ( search  )  w+="( u.nom LIKE '%"+ search +"%' OR  u.prenom LIKE '%"+ search +"%' ) " ;
        

    let wt = '';
    if( atype ) {

      for (var v of atype ) {
        ( wt == '' ) ?  wt+="a.type = '"+ v +"'" : wt+=" OR a.type = '"+ v +"'"
      }

    }
 
    console.log('wt' ,  wt , w  );


    if( w && wt ) {
      w =  w + " AND ( "+ wt+ " )";
    } else if ( wt ) {
      w = wt;
    }
    
      console.log('query ' ,  w )


    const skip = (page - 1) * pageSize ;

    const values = this.activiteRepository.createQueryBuilder("a")
                   .leftJoinAndSelect('user','u' , 'a.userId = u.id' )
                   .where( w )
                   .select(['a.type as type','a.dist as dist','a.date as date','u.nom as nom','u.prenom as prenom' ] )
                   .offset( skip )
                   .limit( pageSize )
                   .orderBy( "a.date" , "DESC")
                   .getRawMany();
  

    
      return values ;
    

    
     
  }



}


