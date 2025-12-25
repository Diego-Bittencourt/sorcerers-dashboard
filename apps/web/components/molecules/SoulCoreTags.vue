<template>
    <div class="flex w-full justify-evenly text-2xl uppercase font-bold cursor-default">
        <div class="p-2 border-4 rounded-lg" :class="activeTag === 'character' ? `bg-${theme} border-${theme} text-${mode}-button-text` : ' border-transparent'" @click="setActiveTag('character')">Character</div>
        <div class="p-2 border-4 rounded-lg" :class="activeTag === 'creature' ? `bg-${theme} border-${theme} text-${mode}-button-text` : ' border-transparent'" @click="setActiveTag('creature')">Creature</div>
        <div class="p-2 border-4 rounded-lg" :class="activeTag === 'party' ? `bg-${theme} border-${theme} text-${mode}-button-text` : ' border-transparent'" @click="setActiveTag('party')">Party</div>
    </div>
</template>

<script setup lang="ts">
    import { useTheme } from "@/composables/theme/useTheme";

    const emit = defineEmits(["update:activeTag"]);
    const { mode, theme } = useTheme();
    const activeTag = ref<string>("character");

    const setActiveTag = (tag: string) => {
        activeTag.value = tag;
        emit("update:activeTag", tag);
    };

onMounted(() => {
    emit("update:activeTag", activeTag.value);
});
</script>