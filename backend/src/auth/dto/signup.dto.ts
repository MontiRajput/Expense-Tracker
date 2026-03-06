import {IsNotEmpty, IsEmail, IsStrongPassword, IsString} from "class-validator";
export class CreateSignupDto {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

  
    @IsStrongPassword()
    password!: string;
}