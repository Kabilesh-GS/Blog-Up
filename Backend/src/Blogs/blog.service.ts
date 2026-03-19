import { Injectable, Logger } from "@nestjs/common";
import { BlogRepository } from "./blog.repository";
import { BlogDto } from "./DTO/blog.dto";

@Injectable()
export class BlogService{
  constructor(private BlogRepo : BlogRepository){}
  private readonly logger = new Logger(BlogService.name);

  async addBlog(BlogDTO : BlogDto, id){
    this.logger.log('Hit on add Blog (service)');
    return await this.BlogRepo.addBlog(BlogDTO, id);
  }

  async getBlogs(){
    this.logger.log('Hit on get Blog (service)');
    return await this.BlogRepo.getBlogs();
  }

  async getFullBlog(id : number){
    this.logger.log('Hit on get Blog by ID (service)');
    return await this.BlogRepo.getFullBlog(id);
  }
}