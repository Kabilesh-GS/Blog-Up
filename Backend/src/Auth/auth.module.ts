import { Module } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/Guards/jwt.strategy";
import 'dotenv/config'

@Module({
  imports : [
    JwtModule.register({
      global : true,
      secret : process.env.JWT_TOKEN
    })
  ],
  controllers : [AuthController],
  providers : [PrismaService,AuthRepository,AuthService,JwtStrategy]
})

export class AuthModule{}