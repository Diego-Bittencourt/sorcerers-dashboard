<template>
    <TheCard>
        <SoulCoreTags @update:active-tag="activeTag => setActiveTag(activeTag)"/>
    </TheCard>
    <TheCard>
    <h1 class="text-3xl font-bold">Soulcore</h1>
    <p>Find what soulcore a character has</p>
    <TheInput label="Search for a character" placeHolder="Insert Character's name" @update:model-value="(inputValue: string) => characterName = inputValue "/>
    <TheButton label="Search" :isDisabled="isLoading || characterName === ''" @click="getCharacterSoulCore()"/>
    <div>
    </div>
    </TheCard>
    <TheCard>
        <ListOfCreatures :list="listOfCreatures" :searchedCharacter="searchedCharacter"/>
    </TheCard>

</template>

<script setup lang="ts">
import TheInput from '@/components/atoms/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import TheCard from '@/components/atoms/TheCard.vue';
import ListOfCreatures from '@/components/molecules/ListOfCreatures.vue';
import SoulCoreTags from '@/components/molecules/SoulCoreTags.vue';

const characterName = ref<string>("");
const isLoading = ref<boolean>(false);
const listOfCreatures = ref<string[]>([]);
const searchedCharacter = ref<string>("");
const activeTag = ref<string>("Character");

const setActiveTag = (tag: string) => {
    activeTag.value = tag;
};

const getCharacterSoulCore = async () => {
    isLoading.value = true;
    searchedCharacter.value = characterName.value
    try {
        const response = await fetch('http://localhost:3001/soulcore/player/' + searchedCharacter.value);
        const data = await response.json();
        listOfCreatures.value = data?.creatures;
    } catch (err) {
    }
    isLoading.value = false;
};

</script>