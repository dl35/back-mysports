import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { UserPageDto } from './dto/user-page.dto';
import { ParamsPaginateDto } from './dto/params-paginate.dto';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserComplete } from './dto/user.complete.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /*
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    user.email = createUserDto.email;
    user.passwd = createUserDto.passwd;
    user.adresse = createUserDto.adresse;
    user.ville = createUserDto.ville;
    user.cp = createUserDto.cp;
    if( createUserDto.role )
        user.role = createUserDto.role;

    const u = await this.findByEmail(user.email) ;
    if( u ){
      throw new ConflictException('User already exist');
     
    }


    return this.userRepository.save(user);
  }*/

  async save(user) {
    return this.userRepository.save(user);

  }


  async update(id: number , createUserDto: CreateUserDto): Promise<UpdateResult>   
   {
    const user = new User();
    user.nom = createUserDto.nom;
    user.prenom = createUserDto.prenom;
    user.email = createUserDto.email;
    user.passwd = createUserDto.passwd;
    user.adresse = createUserDto.adresse;
    user.ville = createUserDto.ville;
    user.cp = createUserDto.cp;
    if( createUserDto.role )
        user.role = createUserDto.role;

    let u =  await this.userRepository.findOne(id);
    if( !u ){
      throw new  NotFoundException('User not exist');
    }

    u =  await this.findByEmailnotId( id, user.email );
    if(  u ){
      throw new ConflictException('this Email exist');
    }

    return this.userRepository.update(id ,user);
    
  }

  async autocomplete(search: string ): Promise<UserComplete[]> {
    const pageSize = 10 ;
    const datas = await this.userRepository.find({
      select: ["id","nom","prenom"],
      where: [ { nom:    Like('%' + search + '%')  } , 
               { prenom: Like('%' + search + '%')  } ,
             ] ,
      order: { nom: 'ASC' , prenom:'ASC' } ,
      take: pageSize,
    });
    return datas;

  }



  async findAll(params:  ParamsPaginateDto ): Promise<UserPageDto> {
    
    let page: number = Number( params.page );
    const search = params.search;

    const pageSize = 2 ;
    if( page <= 0 ) {
      page = 1;
    }
     //doc https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
    const [list , count ] = await this.userRepository.findAndCount({
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
      const res = new UserPageDto(list, next ,prev, lastPage ); 
      return res;
    



  }

  async findUser(id: number): Promise<User> {
    const u = await this.userRepository.findOne(id);
    if ( !u  ){
        throw new NotFoundException('user not found.')
    } 
    return u;
  }



  async findByEmailnotId(id: number, email: string): Promise<User | undefined> {
    return this.userRepository.createQueryBuilder("user").where( "user.id != :id", { id: id } )
    .andWhere(  "user.email = :email", { email: email }  )
    .getOne(); 
  }


  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.createQueryBuilder("user").where( "user.id = :id", { id: id } )
    .getOne(); 
  }

  async findByEmail(email: string): Promise<User | undefined> {
    // return this.userRepository.createQueryBuilder("user").where( "user.email = :email", { email: email } ).getOne(); 
    return this.userRepository.findOne( {email} );
  }

  async remove(id: number): Promise<DeleteResult> {
    const u: User = await this.findById(id);
    if ( ! u ) {
      throw new NotFoundException('user not found.');      
    }

    return this.userRepository.delete(id);
  }
}
