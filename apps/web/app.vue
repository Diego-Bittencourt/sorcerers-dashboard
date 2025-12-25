<template>
  <TheCard>
    <TheThemeController />
  </TheCard>
  <NuxtPage />
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