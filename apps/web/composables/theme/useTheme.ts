import { computed } from 'vue'
import { useModeStore } from '../../stores/modes'

export const useMode = () => {
    const modeStore = useModeStore()

    const vocation = computed(() => {
        return modeStore.vocation
    })

    const mode = computed(() => {
        return modeStore.mode
    })

    const theme = computed(() => {
        return modeStore.mode + '-' + modeStore.vocation
    })

    return {
        mode,
        vocation,
        theme
    }
}