import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";

@Injectable()
export class ProfileRepo{
  constructor(private prisma : PrismaService){}
  private readonly logger = new Logger(ProfileRepo.name);

  async getUser(userName : string) {
    try{
      this.logger.log('Hit on Get user by ID (Repository)');
      const user = await this.prisma.user.findUnique({
        where : {
          userName : userName
        }
      })

      return { email : user?.email, username : user?.userName, name : user?.fullName, createdAt : user?.createdAt }
    }
    catch(e){
      this.logger.error('Error' + e);
    }
  }

  async getUserPosts(userName : string){
    try{
      this.logger.log("Hit on Get users's post (Repository)");
      const posts = await this.prisma.blogs.findMany({
        where : {
          user : {
            userName : userName
          }
        }
      })
      
      return posts;      
    }
    catch(e){
      this.logger.error('Error' + e);
    }
  }
}