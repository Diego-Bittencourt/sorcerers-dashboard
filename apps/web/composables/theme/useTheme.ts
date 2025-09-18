import { computed } from 'vue'
import { useThemeStore } from '../../stores/theme'

export const useTheme = () => {
    const themeStore = useThemeStore()

    const vocation = computed(() => {
        return themeStore.vocation
    })

    const mode = computed(() => {
        return themeStore.mode
    })

    const theme = computed(() => {
        return themeStore.mode + '-' + themeStore.vocation
    })

    return {
        mode,
        vocation,
        theme
    }
}

export { useThemeStore }
