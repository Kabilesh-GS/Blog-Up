import { Controller, Post,Body, Req, Get, UseGuards, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./DTO/register.dto";
import { LoginDto } from "./DTO/login.dto";
import { Role } from "src/Guards/role.decorator";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { RolesGuard } from "src/Guards/role.guard";

@Controller('auth')
export class AuthController{
  constructor(private AuthSer : AuthService){}
  private readonly logger = new Logger(AuthController.name);

  @Post('register')
  async register(@Body() info : RegisterDto){
    this.logger.log('Hit on register (controller)');
    return await this.AuthSer.register(info);
  }

  @Post('login')
  async login(@Body() info : LoginDto){
    this.logger.log('Hit on login (controller)');
    return await this.AuthSer.login(info);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('ADMIN')
  @Get('getusers')
  async getusers(@Req() req){
    this.logger.log('Hit on get all users (controller)');
    console.log(req.user)
    return await this.AuthSer.getUsers();
  }
}