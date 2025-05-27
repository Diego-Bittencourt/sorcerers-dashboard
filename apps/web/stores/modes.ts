import { defineStore } from "pinia";

export const useModeStore = defineStore('mode', {
    state: () => ({
        mode: 'light',
        vocacao: 'knight'
    }),
    actions: {
        setMode(mode: string) {
            this.mode = mode
        },
        setVocacao(vocacao: string) {
            this.vocacao = vocacao
        }
    }
})