import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class ProfileRepo{
  constructor(private prisma : PrismaService){}

  async getUser(id : number) {
    const user = await this.prisma.user.findUnique({
      where : {
        id : Number(id)
      }
    })

    return { email : user?.email, username : user?.userName, name : user?.fullName, createdAt : user?.createdAt }
  }

  async getUserPosts(id : number){
    const posts = await this.prisma.blogs.findMany({
      where : {
        user : {
          id : Number(id)
        }
      }
    })

    return posts;
  }
}