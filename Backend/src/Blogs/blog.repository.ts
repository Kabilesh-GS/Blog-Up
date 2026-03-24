import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { BlogDto } from "./DTO/blog.dto";
import { useContainer } from "class-validator";

@Injectable()
export class BlogRepository{
  constructor(private prisma : PrismaService){}
  private readonly logger = new Logger(BlogRepository.name);

  async addBlog(BlogDTO : BlogDto, id){
    try{
      this.logger.log('Hit on add Blog (repository)');
      const blog = await this.prisma.blogs.create({
        data : {
          title : BlogDTO.title,
          description : BlogDTO.description,
          ownerID : Number(id)
        }
      })  
      return { message : "Posted" , blog : blog.createdAt}    
    }
    catch(e){
      this.logger.error('Error' + e);
    }
  }

  async getBlogs(){
    try{
      this.logger.log('Hit on get Blog (repository)');
      return await this.prisma.blogs.findMany({
        include :{
          user : true
        }
      });      
    }
    catch(e){
      this.logger.error('Error' + e)
    }
  }

  async getFullBlog(BlogId : number){
    try{
      this.logger.log('Hit on get Blog by ID (repository)');
      return await this.prisma.blogs.findUnique({
        where : {
          id : Number(BlogId)
        },
        include : {
          user : true
        }
      })
    }
    catch(e){
      this.logger.error('Error' + e)
    }
  }

  async addFavourite(userID : number,blogID : number){
    try{
      const fav = await this.prisma.favourite.create({
        data : {
           userID : Number(userID),
           blogID : Number(blogID)
        }
      })

      return fav;
    }
    catch(e){
      this.logger.error('Error' + e)
    }
  }

  async getFav(id : number){
    try{
      const data = await this.prisma.favourite.findMany({
        where : {
          userID : Number(id)
        },
        include : {
          blogs : true
        }
      })

      return data;
    }
    catch(e){
      this.logger.error('Error' + e)
    }
  }

  async getFavByBlogId(blogId : number, userID : number){
    try{
      const blog = await this.prisma.favourite.findMany({
        where : {
          blogID : blogId,
          userID : userID
        }
      })

      return blog;
    }
    catch(e){
      throw e;
    }
  }

  async removeFavByBlogId(blogId : number, userID : number){
    try{
      const blog = await this.prisma.favourite.delete({
        where:{
          userID_blogID: {
            userID: userID,
            blogID: blogId
          }
        }
      })

      return "deleted";
    }
    catch(e){
      throw e;
    }
  }
}