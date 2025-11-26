<template>
  <TheCard>
  <div>
    <div @click="setMode('dark')">Dark mode</div>
    <div @click="setMode('light')">Light mode</div>
    <div @click="setVocation('knight')">Knight</div>
    <div @click="setVocation('paladin')">Paladin</div>
    <div @click="setVocation('sorcerer')">Sorcerer</div>
    <div @click="setVocation('druid')">Druid</div>
    <div @click="setVocation('monk')">Monk</div>
    <div @click="setVocation('novoc')">NoVocation</div>
  </div>
  <div class="w-full h-full mt-5">
    <p>Here is the input element</p>
    
    <TheInput v-model="inputContent"/>

    <p>Here is the content: {{ inputContent}}</p>
    <p> Here is the theme: {{ theme }}</p>
  </div>
  </TheCard>
</template>

<script setup lang="ts">
import TheInput from '@/components/atoms/TheInput.vue'
import TheCard from '@/components/atoms/TheCard.vue'
import { setVocation, setMode } from '@/composables/theme/setTheme'
import { useTheme } from '@/composables/theme/useTheme'

const { theme, mode } = useTheme()


const inputContent = ref('Dummy data')



</script>