import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}


  async createToken(user: any){
      const payload={sub:user.id};
      return this.jwtService.sign(payload);
  }

async createUser(signupDto: CreateSignupDto) {
  const existingUser = await this.userRepository.findOne({
    where: { email: signupDto.email }
  });
  if (existingUser) {
    throw new BadRequestException('User with this email already exists');
  }
  const hashedPassword = await bcrypt.hash(signupDto.password, 10);
  const user = this.userRepository.create({
    ...signupDto,
    password: hashedPassword
  });
  this.userRepository.save(user);
  return this.createToken(user);
}

async validateUser(loginDto:LoginDto){
    const user=await this.userRepository.findOne({where:{email:loginDto.email}});
    if(!user){
        throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid=await bcrypt.compare(loginDto.password,user.password);
    if(!isPasswordValid){
        throw new UnauthorizedException('Invalid credentials');
    }
    
    return this.createToken(user);
}
}
