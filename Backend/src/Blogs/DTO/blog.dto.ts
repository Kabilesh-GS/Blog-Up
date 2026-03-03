import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class BlogDto{
  @IsString()
  @IsNotEmpty()
  title : string

  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(50000)
  description : string
}