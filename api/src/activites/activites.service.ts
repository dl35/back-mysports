import { Activite } from './entities/activite.entity';
import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ParamsPaginateDto } from 'src/users/dto/params-paginate.dto';
import { ActivitePage } from './entities/activite-page';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class ActivitesService {

  constructor(
    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>,
    @Inject(forwardRef(() => UsersService))
    private readonly userserv: UsersService,
  ) {}


  async create(id: number, createActiviteDto: CreateActiviteDto) {

    let u =  await this.userserv.findById(id);
    if( !u ){
      throw new  UnauthorizedException();
    }
    
    const act = new Activite();
    act.type = createActiviteDto.type;
    act.date = createActiviteDto.date;
    act.dist = createActiviteDto.dist;
    act.desc = createActiviteDto.desc;
 
    act.userId = id ;

    return this.activiteRepository.save( act );
  }

  async createtoId(id: number, createActiviteDto: CreateActiviteDto) {
    
    let u =  await this.userserv.findById(id);
    if( !u ){
      throw new  NotFoundException('User not exist');
    }


    const act = new Activite();
    act.type = createActiviteDto.type;
    act.date = createActiviteDto.date;
    act.dist = createActiviteDto.dist;
    act.desc = createActiviteDto.desc;
 
    act.userId = id;

    return this.activiteRepository.save( act );
  }






  async findAll(userid: number , params:  ParamsPaginateDto ): Promise<ActivitePage> {
    
    let page: number = Number( params.page );
    let size: number = Number( params.size );
    
  
    if( page <= 0 ) {
      page = 1;
    }

    console.log( params );

   
    const [ datas , total ] = await this.activiteRepository.findAndCount({
      where: { userId:  userid } ,
      order: { date: 'DESC' } ,
      skip: (page - 1) * size,
      take: size,
    });

     //   console.log( datas );
     
      const res = new ActivitePage ( datas , total ); 
      return res;
    



  }

 

  async get(id: number): Promise<Activite> {
    const act = await this.activiteRepository.findOne(id);
    if ( !act  ){
        throw new NotFoundException('Activite not found.')
    } 
    return act;
  }


  async update(id: number, updateActiviteDto: UpdateActiviteDto) : Promise<UpdateResult>{
  
     const act = new Activite();
     act.type = updateActiviteDto.type;
     act.date = updateActiviteDto.date;
     act.dist = updateActiviteDto.dist;
     act.desc = updateActiviteDto.desc;

    
     let a =  await this.activiteRepository.findOne( id);
     if( !a ){
       throw new  NotFoundException('Activite not exist');
     }
 
     return this.activiteRepository.update(id ,act);
     
  
  }


  private async findById(id: number): Promise<Activite | undefined> {
    return this.activiteRepository.createQueryBuilder("activite").where( "activite.id = :id", { id: id } )
    .getOne(); 
  }


  async remove(id: number): Promise<DeleteResult> {
    const a: Activite = await this.findById(id);
    if ( ! a ) {
      throw new NotFoundException('Activite not found.');      
    }

    return this.activiteRepository.delete(id);
  }
}
function UserRepository(UserRepository: any) {
  throw new Error('Function not implemented.');
}

