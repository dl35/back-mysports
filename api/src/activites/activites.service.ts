import { Activite } from './entities/activite.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ParamsPaginateDto } from 'src/users/dto/params-paginate.dto';
import { ActivitePageDto } from './dto/activite-page-dto';

@Injectable()
export class ActivitesService {

  constructor(
    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>,
  ) {}


  create(createActiviteDto: CreateActiviteDto) {
    
    const act = new Activite();
    act.type = createActiviteDto.type;
    act.date = createActiviteDto.date;
    act.dist = createActiviteDto.dist;
    act.desc = createActiviteDto.desc;
 
    act.userId = createActiviteDto.userId;

    return this.activiteRepository.save( act );
  }

  async findAll(userid: number , params:  ParamsPaginateDto ): Promise<ActivitePageDto> {
    
    let page: number = Number( params.page );
    // const search = params.search;

    const pageSize = 2 ;
    if( page <= 0 ) {
      page = 1;
    }

   
    const [list , count ] = await this.activiteRepository.findAndCount({
      where: { userId:  userid } ,
      order: { date: 'DESC' } ,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

      const lastPage=Math.ceil(count/pageSize);
      console.log( page, page+1 , page-1 ,  lastPage );
      
      // page+1 >lastPage ? null :page+1;
      const next = page+1 >lastPage ? false : true ;
      //page-1 < 1 ? null :page-1;
      const prev = page-1 < 1 ? false : true ;
      const res = new ActivitePageDto(list, next ,prev); 
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

    
     let a =  await this.activiteRepository.findOne(id);
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
