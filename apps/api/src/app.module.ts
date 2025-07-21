import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoulcoreModule } from './modules/soulcore/soulcore.module';

@Module({
  imports: [SoulcoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
