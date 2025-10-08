import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SoulcoreController } from './soulcore.controller';
import { SoulcoreService } from './soulcore.service';
import {
  CharacterSoulCore,
  CharacterSoulCoreSchema,
} from './schemas/character.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CharacterSoulCore.name,
        schema: CharacterSoulCoreSchema,
        collection: 'character_soulcore',
      },
    ]),
  ],
  controllers: [SoulcoreController],
  providers: [SoulcoreService],
})
export class SoulcoreModule {}
