import { Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { RegisterDto } from "./DTO/register.dto";
import { LoginDto } from "./DTO/login.dto";

@Injectable()
export class AuthService{
  constructor(private AuthRepo : AuthRepository){}
  private readonly logger = new Logger(AuthService.name);

  async register(info : RegisterDto){
    this.logger.log('Hit on register (service)');
    return await this.AuthRepo.registerUser(info);
  }

  async login(info : LoginDto){
    return await this.AuthRepo.login(info);
  }

  async getUsers(){
    this.logger.log('Hit on get all users (service)');
    return await this.AuthRepo.getUsers();
  }
}