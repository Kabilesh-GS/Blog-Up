import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ProfileService } from "./Profile.service";
import { Role } from "src/Guards/role.decorator";
import { JwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { RolesGuard } from "src/Guards/role.guard";

@Controller()
export class ProfileController{
  constructor(private profileServ : ProfileService){}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getUser/:id')
  @Role('USER', 'ADMIN')
  async getUser(@Param('id') id : number){
    return await this.profileServ.getUser(id);
  }

  @Get('getUserPost/:id')
  async getUserPost(@Param('id') id : number){
    return await this.profileServ.getUserPosts(id);
  }
}