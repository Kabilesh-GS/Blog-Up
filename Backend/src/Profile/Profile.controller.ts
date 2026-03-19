import { Controller, Get, Param } from "@nestjs/common";
import { ProfileService } from "./Profile.service";

@Controller()
export class ProfileController{
  constructor(private profileServ : ProfileService){}

  @Get('getUser/:id')
  async getUser(@Param('id') id : number){
    return await this.profileServ.getUser(id);
  }

  @Get('getUserPost/:id')
  async getUserPost(@Param('id') id : number){
    return await this.profileServ.getUserPosts(id);
  }
}