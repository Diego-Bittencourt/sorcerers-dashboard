<template>
  <TheCard>
    <TheThemeController />
  </TheCard>
  <TheCard>
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
import TheThemeController from '@/components/atoms/TheThemeController.vue'
import { setVocation, setMode } from '@/composables/theme/setTheme'
import { useTheme } from '@/composables/theme/useTheme'

const { theme, mode } = useTheme()


const inputContent = ref('Dummy data')



</script>