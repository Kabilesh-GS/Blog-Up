import { IsEmail, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator'

export class RegisterDto{
  @IsNotEmpty()
  @MaxLength(50)
  fullName : string
  
  @IsNotEmpty()
  @MaxLength(50)
  userName : string

  @IsEmail()
  email : string

  @MinLength(7)
  @MaxLength(27)
  password : string
}