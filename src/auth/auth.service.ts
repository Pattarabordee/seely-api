import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@app/users/users.service';
import bcrypt from 'bcrypt';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    // find user by username
    const user = await this.usersService.findByUsername(loginDto.username);

    // compare hashed-password
    const matched = await bcrypt.compare(loginDto.password, user.password)
    if (!matched) {
      throw new UnauthorizedException(`wrong password: username=${loginDto.username}`)
    }
    // return token
    const accessToken = 'VALID-TOKEN-' + user.username;
    return { accessToken };
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
