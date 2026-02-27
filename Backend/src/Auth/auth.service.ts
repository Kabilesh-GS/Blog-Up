import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { RegisterDto } from "./DTO/register.dto";

@Injectable()
export class AuthService{
  constructor(private AuthRepo : AuthRepository){}

  async register(info : RegisterDto){
    return await this.AuthRepo.registerUser(info);
  }
}