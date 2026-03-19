import { Controller, Get, Logger, Param } from "@nestjs/common";
import { ProfileService } from "./Profile.service";

@Controller()
export class ProfileController{
  constructor(private profileServ : ProfileService){}
  private readonly logger = new Logger(ProfileController.name);

  @Get('getUser/:userName')
  async getUser(@Param('userName') userName : string){
    this.logger.log('Hit on Get user by ID (Controller)');
    return await this.profileServ.getUser(userName);
  }

  @Get('getUserPost/:userName')
  async getUserPost(@Param('userName') userName : string){
    this.logger.log("Hit on Get users's post (Controller)");
    return await this.profileServ.getUserPosts(userName);
  }
}