import { Injectable, Logger } from "@nestjs/common";
import { ProfileRepo } from "./Profile.repository";

@Injectable()
export class ProfileService{
  constructor(private profileRepo : ProfileRepo){}
  private readonly logger = new Logger(ProfileService.name);

  async getUser(id : number){
    this.logger.log('Hit on Get user by ID (service)');
    return await this.profileRepo.getUser(id);
  }

  async getUserPosts(id : number){
    this.logger.log("Hit on Get users's post (service)");
    return await this.profileRepo.getUserPosts(id);
  }
}