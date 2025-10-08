import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CharacterSoulCore,
  CharacterSoulCoreDocument,
} from './schemas/character.schema';

@Injectable()
export class SoulcoreService {
  constructor(
    @InjectModel(CharacterSoulCore.name)
    private readonly characterModel: Model<CharacterSoulCoreDocument>,
  ) {}

  async getCharacterSoulCore(characterName: string) {
    console.log(characterName, 'the player name');
    const list = await this.characterModel.findOne({
      character: characterName.trim(),
    });
    console.log('list', list);
    return list;
  }

  async addCreatureToCharacterList(
    creatureName: string[],
    characterName: string,
  ) {
    creatureName.forEach(async (creatureName) => {
      await this.characterModel.findOneAndUpdate(
        {
          character: characterName,
          creatures: { $ne: creatureName },
        },
        { $push: { creatures: creatureName } },
        { new: true },
      );
    });

    return await this.getCharacterSoulCore(characterName);
  }

  //removing a creature from a player is not a common event, because it is not a direct interaction in the game.
  //so the only real scenario to remove a creature from a player is when the creature was wrongly assigned to the player
  async removeCreatureFromPlayerList(
    creatureName: string,
    characterName: string,
  ) {
    return await this.characterModel.findOneAndUpdate(
      {
        character: characterName,
      },
      {
        $pull: { creatures: creatureName },
      },
    );
  }
}
