import { Controller, Post,Body, Req, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./DTO/register.dto";
import { LoginDto } from "./DTO/login.dto";
import { Role } from "src/Guards/role.decorator";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { RolesGuard } from "src/Guards/role.guard";

@Controller('auth')
export class AuthController{
  constructor(private AuthSer : AuthService){}

  @Post('register')
  async register(@Body() info : RegisterDto){
    return await this.AuthSer.register(info);
  }

  @Post('login')
  async login(@Body() info : LoginDto, @Req() req){
    console.log(req.user);
    return await this.AuthSer.login(info);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('ADMIN')
  @Get('getusers')
  async getusers(@Req() req){
    console.log(req)
    return await this.AuthSer.getUsers();
  }
}