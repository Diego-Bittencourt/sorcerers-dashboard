import { useModeStore } from '../../stores/modes'

export type Mode = 'light' | 'dark'
export type Vocation = 'knight' | 'paladin' | 'sorcerer' | 'druid' | 'monk' | 'novoc'

export const setVocation = (vocation: Vocation) => {
    const modeStore = useModeStore()

    modeStore.setVocation(vocation)

    return {
        mode: modeStore.vocation,
    }
}

export const setMode = (mode: Mode) => {
    const modeStore = useModeStore()

    modeStore.setMode(mode)

    return {
        vocation: modeStore.mode,
    }
}