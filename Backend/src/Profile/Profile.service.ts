import { Injectable } from "@nestjs/common";
import { ProfileRepo } from "./Profile.repository";

@Injectable()
export class ProfileService{
  constructor(private profileRepo : ProfileRepo){}

  async getUser(id : number){
    return await this.profileRepo.getUser(id);
  }

  async getUserPosts(id : number){
    return await this.profileRepo.getUserPosts(id);
  }
}