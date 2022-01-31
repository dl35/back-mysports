import { Activite } from './entities/activite.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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
 
    // act.user = createActiviteDto.userid;

    return this.activiteRepository.save( act );
  }

  findAll() {
    return `This action returns all activites`;
  }

  async get(id: number): Promise<Activite> {
    const act = await this.activiteRepository.findOne(id);
    if ( !act  ){
        throw new NotFoundException('Users not found.')
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
