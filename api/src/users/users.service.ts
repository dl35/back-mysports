import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const users = new Users();
    users.nom = createUserDto.nom;
    users.prenom = createUserDto.prenom;
    users.adresse = createUserDto.adresse;
    users.ville = createUserDto.ville;
    users.cp = createUserDto.cp;
    users.prenom = createUserDto.prenom;
    users.passwd = createUserDto.passwd;
    if( createUserDto.role )
        users.role = createUserDto.role;


    return this.usersRepository.save(users);
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  findEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.createQueryBuilder("users").where( "user.email = :email", { email: email } ).getOne(); 
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
