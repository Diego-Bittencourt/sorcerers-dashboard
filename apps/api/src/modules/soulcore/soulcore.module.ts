import { Module } from '@nestjs/common';
import { SoulcoreController } from './soulcore.controller';
import { SoulcoreService } from './soulcore.service';

@Module({
  controllers: [SoulcoreController],
  providers: [SoulcoreService],
})
export class SoulcoreModule {}
