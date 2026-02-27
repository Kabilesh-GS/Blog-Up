import { Controller, Post,Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./DTO/register.dto";

@Controller()
export class AuthController{
  constructor(private AuthSer : AuthService){}

  @Post('register')
  async register(@Body() info : RegisterDto){
    return await this.AuthSer.register(info);
  }
}