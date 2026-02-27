import { Module } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { BlogRepository } from "./blog.repository";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";
import { JwtModule } from "@nestjs/jwt";
import 'dotenv/config'

@Module({
  imports : [
    JwtModule.register({
      global : true,
      secret : process.env.JWT_TOKEN
    })
  ],
  controllers : [BlogController],
  providers : [PrismaService, BlogRepository, BlogService]
})

export class BlogModule{}