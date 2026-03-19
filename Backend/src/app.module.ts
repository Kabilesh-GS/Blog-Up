import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { BlogModule } from './Blogs/blog.module';
import { ProfileModule } from './Profile/Profile.module';

@Module({
  imports: [AuthModule,BlogModule,ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
