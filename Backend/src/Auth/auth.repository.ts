import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { RegisterDto } from "./DTO/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./DTO/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository{
  constructor(private prisma : PrismaService, private jwt : JwtService){}

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

  async login(info : LoginDto){
    const user = await this.prisma.user.findUnique({
      where : {
        email : info.email
      },
      include : {
        userRole : {
          include : {
            role : true
          }
        }
      }
    })

    if(!user) throw new BadRequestException("No such user");

    if(await bcrypt.compare(user.password,info.password)) throw new BadRequestException("Incorrect Password");

    const role = user.userRole.map((u) => { return u.role.role})
    const payload = {
      id : user.id,
      email : user.email,
      role : role
    }

    const accessToken = await this.jwt.signAsync(payload, {
      secret : process.env.JWT_TOKEN,
      expiresIn : '3d'
    })

    const refreshToken = await this.jwt.signAsync(payload, {
      secret : process.env.JWT_TOKEN,
      expiresIn : '7d'
    })

    await this.prisma.user.update({
      where : {
        id : user.id
      },
      data : {
        refreshToken : refreshToken
      }
    })

    return {
      accessToken,
      refreshToken,
      email : user.email,
      userName : user.userName
    }
  }

  async getUsers(){
    const users = await this.prisma.user.findMany();

    return users;
  }
}