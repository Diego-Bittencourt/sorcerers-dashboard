<template>
    <TheCard>
        <SoulCoreTags @update:active-tag="activeTag => setActiveTag(activeTag)"/>
    </TheCard>
    <SoulCoreCharacter v-if="activeTag === 'character'" />
    <SoulCoreCreature v-if="activeTag === 'creature'" />
    <SoulCoreParty v-if="activeTag === 'party'" />
   

</template>

<script setup lang="ts">
import SoulCoreTags from '@/components/molecules/SoulCoreTags.vue';
import TheCard from '@/components/atoms/TheCard.vue';
import SoulCoreCharacter from '@/components/organisms/SoulCoreCharacter.vue';
import SoulCoreCreature from '@/components/organisms/SoulCoreCreature.vue';
import SoulCoreParty from '@/components/organisms/SoulCoreParty.vue'


const activeTag = ref<string>("character");

const setActiveTag = (tag: string) => {
    activeTag.value = tag;
};

</script>