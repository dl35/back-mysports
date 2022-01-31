import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginateDto } from './dto/paginate.dto';
import { ParamsPaginateDto } from './dto/params-paginate.dto';
import { CreateUserDto } from './dto/users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const users = new Users();
    users.nom = createUserDto.nom;
    users.prenom = createUserDto.prenom;
    users.email = createUserDto.email;
    users.passwd = createUserDto.passwd;
    users.adresse = createUserDto.adresse;
    users.ville = createUserDto.ville;
    users.cp = createUserDto.cp;
    if( createUserDto.role )
        users.role = createUserDto.role;

    const u = await this.findByEmail(users.email) ;
    if( u ){
      throw new ConflictException('User already exist');
     
    }


    return this.usersRepository.save(users);
  }

  async update(id: number , createUserDto: CreateUserDto): Promise<Users> {
    const users = new Users();
    users.nom = createUserDto.nom;
    users.prenom = createUserDto.prenom;
    users.email = createUserDto.email;
    users.passwd = createUserDto.passwd;
    users.adresse = createUserDto.adresse;
    users.ville = createUserDto.ville;
    users.cp = createUserDto.cp;
    if( createUserDto.role )
        users.role = createUserDto.role;

    const u = await this.findOne(users.id) ;
    if( !u ){
      throw new  NotFoundException('User not exist');
    }


    return this.usersRepository.save(users);
  }





  async findAll(params:  ParamsPaginateDto ): Promise<PaginateDto> {
    
    let page: number = Number( params.page );
    const search = params.search;

    const pageSize = 2 ;
    if( page <= 0 ) {
      page = 1;
    }
     //doc https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
    const [list , count ] = await this.usersRepository.findAndCount({
      where: search ? { nom: Like('%' + search + '%') }  : {} ,
      order: { nom: 'ASC' } ,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

      const lastPage=Math.ceil(count/pageSize);
      console.log( page, page+1 , page-1 ,  lastPage );
      
      // page+1 >lastPage ? null :page+1;
      const next = page+1 >lastPage ? false : true ;
      //page-1 < 1 ? null :page-1;
      const prev = page-1 < 1 ? false : true ;
      const res = new PaginateDto(list, next ,prev); 
      return res;
    



  }

  async findOne(id: number): Promise<Users> {
    const u = await this.usersRepository.findOne(id);
    if ( !u  ){
        throw new NotFoundException()
    } 
    return u;
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.createQueryBuilder("users").where( "users.email = :email", { email: email } ).getOne(); 
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
