import { Controller,Body,Post, UseGuards, Req, Get,Param, Logger } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./DTO/blog.dto";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { RolesGuard } from "src/Guards/role.guard";
import { Role } from "src/Guards/role.decorator";

@Controller('blog')
export class BlogController{
  constructor(private BlogSer : BlogService){}
  private readonly logger = new Logger(BlogService.name);

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('USER','ADMIN')
  @Post('addPost')
  async addBlog(@Body() BlogDTO : BlogDto , @Req() req){
    this.logger.log('Hit on add Blog');
    return await this.BlogSer.addBlog(BlogDTO, req.user.id);
  }

  @Get('getPosts')
  async getBlogs(){
    this.logger.log('Hit on get Blog');
    return await this.BlogSer.getBlogs();
  }

  @Get('fullBlog/:id')
  async getFullBlog(@Param('id') id : number){
    this.logger.log('Hit on get Blog by ID');
    return await this.BlogSer.getFullBlog(id);
  }
}