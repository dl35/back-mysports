import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { PaginateDto } from './dto/paginate.dto';
import { ParamsPaginateDto } from './dto/params-paginate.dto';
import { CreateUserDto } from './dto/users.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /*
  async create(createUserDto: CreateUserDto): Promise<User> {
    const users = new User();
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
  }*/

  async save(users) {
    return this.usersRepository.save(users);

  }


  async update(id: number , createUserDto: CreateUserDto): Promise<UpdateResult>   
   {
    const users = new User();
    users.nom = createUserDto.nom;
    users.prenom = createUserDto.prenom;
    users.email = createUserDto.email;
    users.passwd = createUserDto.passwd;
    users.adresse = createUserDto.adresse;
    users.ville = createUserDto.ville;
    users.cp = createUserDto.cp;
    if( createUserDto.role )
        users.role = createUserDto.role;

    let u =  await this.usersRepository.findOne(id);
    if( !u ){
      throw new  NotFoundException('User not exist');
    }

    u =  await this.findByEmailnotId( id, users.email );
    if(  u ){
      throw new ConflictException('this Email exist');
    }

    return this.usersRepository.update(id ,users);
    
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

  async findUser(id: number): Promise<User> {
    const u = await this.usersRepository.findOne(id);
    if ( !u  ){
        throw new NotFoundException('Users not found.')
    } 
    return u;
  }



  async findByEmailnotId(id: number, email: string): Promise<User | undefined> {
    return this.usersRepository.createQueryBuilder("users").where( "users.id != :id", { id: id } )
    .andWhere(  "users.email = :email", { email: email }  )
    .getOne(); 
  }


  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.createQueryBuilder("users").where( "users.id = :id", { id: id } )
    .getOne(); 
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.createQueryBuilder("users").where( "users.email = :email", { email: email } ).getOne(); 
  }

  async remove(id: number): Promise<DeleteResult> {
    const u: User = await this.findById(id);
    if ( ! u ) {
      throw new NotFoundException('Users not found.');      
    }

    return this.usersRepository.delete(id);
  }
}
