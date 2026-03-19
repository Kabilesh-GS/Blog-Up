import { Controller, Get, Logger, Param } from "@nestjs/common";
import { ProfileService } from "./Profile.service";

@Controller()
export class ProfileController{
  constructor(private profileServ : ProfileService){}
  private readonly logger = new Logger(ProfileController.name);

  @Get('getUser/:id')
  async getUser(@Param('id') id : number){
    this.logger.log('Hit on Get user by ID (Controller)');
    return await this.profileServ.getUser(id);
  }

  @Get('getUserPost/:id')
  async getUserPost(@Param('id') id : number){
    this.logger.log("Hit on Get users's post (Controller)");
    return await this.profileServ.getUserPosts(id);
  }
}