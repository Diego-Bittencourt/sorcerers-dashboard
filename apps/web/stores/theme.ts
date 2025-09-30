import { defineStore } from "pinia";

export const useThemeStore = defineStore('theme', {
    state: () => ({
        mode: 'light',
        vocation: 'knight'
    }),
    actions: {
        setMode(mode: string) {
            this.mode = mode
        },
        setVocation(vocation: string) {
            this.vocation = vocation
        }
    }
})