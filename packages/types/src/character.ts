import { Druid, Knight, Monk, NoVocation, Paladin, Sorcerer } from "./vocations";

export type Sex = 'male' | 'female';

export type Character = {
    name: string,
    vocation: Knight | Sorcerer | Druid | Monk | Paladin | NoVocation,
    level: number,
};