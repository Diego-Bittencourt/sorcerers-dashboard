<template>
  <div
    :class="`hover:shadow-${theme} hover:scale-[101%] lg:p-6 p-3 m-3 lg:m6 bg-${mode}-background-secondary rounded-xl shadow-2xl transition-all duration-300 ease-in-out text-${mode}-foreground-primary`"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "../../composables/theme/useTheme";

const { mode, theme } = useTheme();
</script>
