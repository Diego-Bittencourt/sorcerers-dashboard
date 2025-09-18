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
