import { Controller, Get, Param } from '@nestjs/common';
import { SoulcoreService } from './soulcore.service';

@Controller('soulcore')
export class SoulcoreController {
  constructor(private readonly soulcoreService: SoulcoreService) {}

  @Get('player/:playerName')
  getPlayerSoulCoreList(@Param('playerName') playerName: string) {
    return this.soulcoreService.getCreaturesFromPlayer(playerName);
  }

  @Get('soulcore/:creatureName')
  getCreatureSoulCoreList(@Param('creatureName') creatureName: string) {
    return this.soulcoreService.getPlayersFromCreature(creatureName);
  }
}
