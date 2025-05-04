import { Druid, Knight, Monk, Paladin, Sorcerer } from "./vocations";

export type Sex = 'male' | 'female';

export type Character = {
    name: string,
    vocation: Knight | Sorcerer | Druid | Monk | Paladin,
    level: number,
    sex: Sex,
    activated: boolean
};