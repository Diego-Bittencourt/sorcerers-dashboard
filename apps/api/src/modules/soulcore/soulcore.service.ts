import { Injectable, NotFoundException } from '@nestjs/common';
import { DummySoulcoreCreatures } from './dummyData/DummySoulcoreCreatures';
import { DummySoulcorePlayers } from './dummyData/DummySoulcorePlayers';

@Injectable()
export class SoulcoreService {
  getCreaturesFromPlayer(playerName: string) {
    if (playerName === '' || playerName === 'error') {
      throw new NotFoundException('Player not found');
    }
    //currently, dummy data
    const response = {
      playerName: playerName,
      creatures: DummySoulcoreCreatures,
    };
    return response;
  }

  getPlayersFromCreature(creatureName: string) {
    if (creatureName === '' || creatureName === 'error') {
      throw new NotFoundException('Creature not found');
    }
    //currently, dummy data
    const response = {
      creatureName: creatureName,
      players: DummySoulcorePlayers,
    };
    return response;
  }
}
