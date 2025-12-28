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

  async checkForCharacterAndAddIfNotExist(characterName: string) {
    const list = await this.characterModel.findOne({
      character: characterName.trim(),
    });
    if (!list) {
      await this.characterModel.create({
        character: characterName.trim(),
        creatures: [],
      });
    }
    return true;
  }

  async getCharacterSoulCore(characterName: string) {
    const list = await this.characterModel.findOne({
      character: characterName.trim(),
    });
    return list;
  }

  async addCreatureToCharacterList(
    creatureName: string[],
    characterName: string,
  ) {
    //check if the character exists and add if not
    await this.checkForCharacterAndAddIfNotExist(characterName);

    await this.characterModel.findOneAndUpdate(
      { character: characterName },
      { $addToSet: { creatures: { $each: creatureName } } },
      { new: true },
    );
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

  async getCharactersFromCreatures(creatureName: string) {
    const list = await this.characterModel.find({
      creatures: { $nin: creatureName },
    });
    const listOfCharacters = list.map((item) => item.character);
    return listOfCharacters;
  }
}
