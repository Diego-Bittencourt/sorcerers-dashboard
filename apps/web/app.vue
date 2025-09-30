<script setup lang="ts">
import TheButton from './components/atoms/TheButton.vue';
import { setMode, setVocation } from '@/composables/theme/setTheme';
 </script>

<template>
  Top Page
  <div class="h-1 w-full bg-gray-400"></div>
  <TheButton label="Click me" />
  <div class="p-4 flex gap-2">
    <div @click="setVocation('knight')" class="">Knight</div>
    <div @click="setVocation('paladin')" class="">Paladin</div>
    <div @click="setVocation('sorcerer')" class="">Sorcerer</div>
    <div @click="setVocation('druid')" class="">Druid</div>
    <div @click="setVocation('monk')" class="">Monk</div>
    <div @click="setVocation('novoc')" class="">Novoc</div>
  </div>
  <div class="p-4 flex gap-2">
    <div @click="setMode('light')" class="">Light</div>
    <div @click="setMode('dark')" class="">Dark</div>
  </div>
</template>

<script setup lang="ts">
// import { parsePartyAnalyzer } from "utils";
import { parseIndividualAnalyzer } from '@repo/utils/analyzer';
const string = `Session data: From 2025-03-02, 10:268 to 2025-03-02, 1144
Session: 00:45h
Raw XP Gain: 5,044,521
XP Gain: 15,133,563
Raw XP/h: 8,561,139
XP/h: 25,683,419
Loot: 1,559,074
Supplies: 272,212
Balance: 1,286,862
Damage: 1,677,149
Damage/h: 1,677,149
Healing: 684,555
Healing/h: 684,555
Killed Monsters:
  813x dragolisk
  258x mega dragon
  660x wardragon
Looted Items:
  40x a giant shimmering pearl
  11x a black pearl
  7794x a platinum coin
  4x a violet gem
  23x a green gem
  52x a red gem
  15x a blue gem
  1x a dragon shield
  1x a dragonbone staff
  55x an ultimate health potion
  26x a gold ingot
  3x a dragon's tail
  26x an onyx chip
  18x an ultimate mana potion
  36x dragon tongue
  13x a prismatic quartz
  13x a rainbow quartz
  1x a white gem
  106x Nimmersatt's seal
  7x molten dragon essence
  4x mega dragon heart
  25x dragolisk eye
  68x dragolisk poison gland
  51x wardragon claw
  17x wardragon tooth`;
const text = ref(parseIndividualAnalyzer(string));
// const text = ref("texxt")
</script>
