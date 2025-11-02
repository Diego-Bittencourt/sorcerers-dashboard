import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import { SoulcoreService } from './soulcore.service';

@Controller('soulcore')
export class SoulcoreController {
  constructor(private readonly soulcoreService: SoulcoreService) {}

  @Get('player/:playerName')
  getPlayerSoulCoreList(@Param('playerName') playerName: string) {
    return this.soulcoreService.getCharacterSoulCore(playerName);
  }

  @Get('soulcore/:creatureName')
  getCreatureSoulCoreList(@Param('creatureName') creatureName: string) {
    console.log(creatureName);
    return null;
  }

  @Post('add-creature')
  async addCreatureToCharacterList(
    @Body('creatureName') creatureName: string[],
    @Body('characterName') characterName: string,
  ) {
    if (!creatureName || creatureName.length === 0) {
      throw new ForbiddenException('Creature name is required');
    }

    if (!characterName || characterName.trim() === '') {
      throw new ForbiddenException('Character name is required');
    }

    return await this.soulcoreService.addCreatureToCharacterList(
      creatureName,
      characterName,
    );
  }

  @Delete('remove-creature')
  removeCreatureFromPlayerList(
    @Body('creatureName') creatureName: string,
    @Body('characterName') characterName: string,
  ) {
    if (!creatureName || creatureName.trim() === '') {
      throw new ForbiddenException('Creature name is required');
    }

    if (!characterName || characterName.trim() === '') {
      throw new ForbiddenException('Character name is required');
    }
    return this.soulcoreService.removeCreatureFromPlayerList(
      creatureName,
      characterName,
    );
  }
}
