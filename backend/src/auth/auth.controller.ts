import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/common/decoraters';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
constructor(private authService:AuthService, private jwtService:JwtService){}


@Public()
@Post('signup')
async  signup(@Body() signupDto:CreateSignupDto){
      return await this.authService.createUser(signupDto);
    }

  @Public()
  @Post('login')    
  async login(@Body() loginDto:LoginDto){
    return this.authService.validateUser(loginDto);
  }
    
}
