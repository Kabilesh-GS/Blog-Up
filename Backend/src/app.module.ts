import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { BlogModule } from './Blogs/blog.module';

@Module({
  imports: [AuthModule,BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
