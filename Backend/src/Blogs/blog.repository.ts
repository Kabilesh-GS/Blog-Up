import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/Prisma/prisma.service";
import { BlogDto } from "./DTO/blog.dto";

@Injectable()
export class BlogRepository{
  constructor(private prisma : PrismaService){}

  async addBlog(BlogDTO : BlogDto, id){
    const blog = await this.prisma.blogs.create({
      data : {
        title : BlogDTO.title,
        description : BlogDTO.description,
        ownerID : Number(id)
      }
    })

    return { message : "Posted" , blog : blog.createdAt}
  }

  async getBlogs(){
    const blog = await this.prisma.blogs.findMany();

    return { blog }
  }
}