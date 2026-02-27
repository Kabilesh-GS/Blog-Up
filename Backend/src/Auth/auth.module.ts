import { Module } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

@Module({
  controllers : [AuthController],
  providers : [PrismaService,AuthRepository,AuthService]
})

export class AuthModule{}