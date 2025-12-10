<template>
    <div class="relative inline-block group">
        <button :class="`shadow-${theme} group-hover:shadow-md p-2 rounded text-${mode}-button-text bg-${theme} font-medium`">{{ props.label }}</button>
        <div :class="`transition-all duration-300 ease-in-out rounded-lg absolute w-3 group-hover:w-7 h-[2px] bg-${mode}-button-text bottom-1.5 left-1/2 transform -translate-x-1/2`"></div>
    </div>
    
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/theme/useTheme";

const props = defineProps({
    isDisabled: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: 'Button'
    }
})

const { theme, mode } = useTheme()
</script>