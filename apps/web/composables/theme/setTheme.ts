import { useThemeStore } from '../../stores/theme'

export type Mode = 'light' | 'dark'
export type Vocation = 'knight' | 'paladin' | 'sorcerer' | 'druid' | 'monk' | 'novoc'

export const setVocation = (vocation: Vocation) => {
    const themeStore = useThemeStore()

    themeStore.setVocation(vocation)

    return {
        mode: themeStore.vocation,
    }
}

export const setMode = (mode: Mode) => {
    const themeStore = useThemeStore()

    themeStore.setMode(mode)

    return {
        vocation: themeStore.mode,
    }
}