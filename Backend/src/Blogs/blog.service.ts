import { Injectable } from "@nestjs/common";
import { BlogRepository } from "./blog.repository";
import { BlogDto } from "./DTO/blog.dto";

@Injectable()
export class BlogService{
  constructor(private BlogRepo : BlogRepository){}

  async addBlog(BlogDTO : BlogDto, id){
    return await this.BlogRepo.addBlog(BlogDTO, id);
  }

  async getBlogs(){
    return await this.BlogRepo.getBlogs();
  }

  async getFullBlog(id : number){
    return await this.BlogRepo.getFullBlog(id);
  }
}