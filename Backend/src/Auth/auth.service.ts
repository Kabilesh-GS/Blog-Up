import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { RegisterDto } from "./DTO/register.dto";
import { LoginDto } from "./DTO/login.dto";

@Injectable()
export class AuthService{
  constructor(private AuthRepo : AuthRepository){}

  async register(info : RegisterDto){
    return await this.AuthRepo.registerUser(info);
  }

  async login(info : LoginDto){
    return await this.AuthRepo.login(info);
  }

  async getUsers(){
    return await this.AuthRepo.getUsers();
  }
}