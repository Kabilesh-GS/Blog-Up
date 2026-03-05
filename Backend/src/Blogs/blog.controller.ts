import { Controller,Body,Post, UseGuards, Req, Get,Param } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./DTO/blog.dto";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { RolesGuard } from "src/Guards/role.guard";
import { Role } from "src/Guards/role.decorator";

@Controller('blog')
export class BlogController{
  constructor(private BlogSer : BlogService){}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('USER','ADMIN')
  @Post('addPost')
  async addBlog(@Body() BlogDTO : BlogDto , @Req() req){
    return await this.BlogSer.addBlog(BlogDTO, req.user.id);
  }

  @Get('getPosts')
  async getBlogs(){
    return await this.BlogSer.getBlogs();
  }

  @Post('fullBlog/:id')
  async getFullBlog(@Param('id') id : number){
    return await this.BlogSer.getFullBlog(id)
  }
}