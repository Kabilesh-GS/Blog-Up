import { Module } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import 'dotenv/config'
import { ProfileController } from "./Profile.controller";
import { ProfileRepo } from "./Profile.repository";
import { ProfileService } from "./Profile.service";

@Module({
  imports : [
    JwtModule.register({
      global : true,
      secret : process.env.JWT_TOKEN
    })
  ],
  controllers : [ProfileController],
  providers : [PrismaService, ProfileRepo, ProfileService]
})

export class ProfileModule{}