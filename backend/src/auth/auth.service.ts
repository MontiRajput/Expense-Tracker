import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    private jwtService: JwtService,
  ) {}

  async createToken(userId: string) {
    const payload = { id: userId };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async createUser(signupDto: CreateSignupDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    const user = this.userRepository.create({
      ...signupDto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return this.createToken(user.id);
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createToken(user.id);
  }

  async getUserWithExpenses(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['expenses'],
    });
    console.log(user);
    return user;
  }
}
