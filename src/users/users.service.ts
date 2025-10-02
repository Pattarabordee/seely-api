import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';

import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // create hash (เข้ารหัสด้วยอัลกอริธึม bcrypt)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // replace hashed to password
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    // save new user with hashed password
    return this.repository.save(user);
  }
  async findByUsername(username: string) {
    return this.repository.findOneByOrFail({ username });
  }
}

// findAll() {
//   return `This action returns all users`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} user`;
// }

// update(id: number, updateUserDto: UpdateUserDto) {
//   return `This action updates a #${id} user`;
// }

// remove(id: number) {
//   return `This action removes a #${id} user`;
// }
