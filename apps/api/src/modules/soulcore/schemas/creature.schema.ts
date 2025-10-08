import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CreatureSoulCoreDocument = HydratedDocument<CreatureSoulCore>;

@Schema()
export class CreatureSoulCore {
  @Prop({ required: true, unique: true })
  creature: string;

  @Prop({ type: [String], index: true })
  characters: string[];
}

export const CreatureSoulCoreSchema =
  SchemaFactory.createForClass(CreatureSoulCore);
