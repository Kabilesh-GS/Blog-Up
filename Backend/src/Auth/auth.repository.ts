import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { RegisterDto } from "./DTO/register.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository{
  constructor(private prisma : PrismaService){}

  async registerUser(info : RegisterDto){

    const hashed = await bcrypt.hash(info.password,10);

    const user = await this.prisma.user.create({
      data : {
        fullName : info.fullName,
        userName : info.userName,
        email : info.email,
        password : hashed,
        userRole : {
          create : {
            role : {
              connect : {
                id : 1
              }
            }
          }
        }
      }
    })

    return { name : user.fullName, userName : user.userName, email : user.email, createdAt : user.createdAt }
  }
}