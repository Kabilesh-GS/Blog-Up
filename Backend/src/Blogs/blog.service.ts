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

  async addFavourite(userID : number, blogID : number){
    this.logger.log('Hit on add Fav (service)');
    return await this.BlogRepo.addFavourite(userID, blogID);
  }

  async getFav(id : number){
    this.logger.log('Hit on get fav (service)')
    return await this.BlogRepo.getFav(id);
  }

  async getFavByBlogId(blogId : number, userID : number){
    return await this.BlogRepo.getFavByBlogId(blogId,userID);
  }

  async removeFavByBlogId(userID : number,blogId : number){
    return await this.BlogRepo.removeFavByBlogId(blogId,userID);
  }
}