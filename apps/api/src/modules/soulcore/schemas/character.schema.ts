import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterSoulCoreDocument = HydratedDocument<CharacterSoulCore>;

@Schema()
export class CharacterSoulCore {
  @Prop()
  character: string;

  @Prop()
  creatures: string[];
}

export const CharacterSoulCoreSchema =
  SchemaFactory.createForClass(CharacterSoulCore);
