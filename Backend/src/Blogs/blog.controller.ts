import { Controller,Body,Post, UseGuards, Req, Get,Param, Logger, Delete } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./DTO/blog.dto";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { RolesGuard } from "src/Guards/role.guard";
import { Role } from "src/Guards/role.decorator";

@Controller('blog')
export class BlogController{
  constructor(private BlogSer : BlogService){}
  private readonly logger = new Logger(BlogController.name);

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('USER','ADMIN')
  @Post('addPost')
  async addBlog(@Body() BlogDTO : BlogDto , @Req() req){
    this.logger.log('Hit on add Blog (controller)');
    return await this.BlogSer.addBlog(BlogDTO, req.user.id);
  }

  @Get('getPosts')
  async getBlogs(){
    this.logger.log('Hit on get Blog (controller)');
    return await this.BlogSer.getBlogs();
  }

  @Get('fullBlog/:id')
  async getFullBlog(@Param('id') id : number){
    this.logger.log('Hit on get Blog by ID (Controller)');
    return await this.BlogSer.getFullBlog(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('addFav/:userID/:blogID')
  async addFavoutite(@Param('userID') userID : number, @Param('blogID') blogID : number){
    this.logger.log('Hit on add Fav (service)');
    return await this.BlogSer.addFavourite(userID,blogID);
  }

  @Get('getFav/:id')
  async getFav(@Param('id') id : number){
    this.logger.log('Hit on get fav (controller)')
    return await this.BlogSer.getFav(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getFavBlogByID/:blogID/:userID')
  async getFavByBlogId(@Param('blogID') blogID : number,@Param('userID') userID : number){
    return await this.BlogSer.getFavByBlogId(blogID,userID);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('addFav/:userID/:blogID')
  async removeFavByBlogId(@Param('userID') userID : number,@Param('blogID') blogID : number){
    return await this.BlogSer.removeFavByBlogId(blogID,userID)
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role('USER','ADMIN')
  @Post('editBlog/:blogID')
  async editBlog(@Body() BlogDTO : BlogDto, @Param('blogID') blogID : number){
    this.logger.log('Hit on edit Blog (controller)');
    return await this.BlogSer.editBlog(BlogDTO, blogID);
  }
}