<template>
  <TheCard>
    <h1 class="text-3xl font-bold">Soulcore</h1>
    <p>Find what soulcore a character has</p>
    <TheInput
      label="Search for a character"
      placeHolder="Insert Character's name"
      @update:model-value="(inputValue: string) => (characterName = inputValue)"
      @keyup.enter="updateSoulCoreList()"
    />
    <TheButton
      label="Search"
      :isDisabled="isLoading || characterName === ''"
      @click="updateSoulCoreList()"
    />
    <div></div>
  </TheCard>
  <TheCard>
    <ListOfCreatures
      :list="listOfCreatures"
      :searchedCharacter="searchedCharacter"
      :footer-content="`Total of ${listOfCreatures.length}/200`"
    >
      <span>List of creatures in {{ searchedCharacter }} soulcore</span>
      <span>You gain <span class="text-red-400">{{ calculateXp() }}%</span> extra xp in the creatures in the list</span>

    </ListOfCreatures>
  </TheCard>
</template>

<script setup lang="ts">
import TheInput from "@/components/atoms/TheInput.vue";
import TheButton from "@/components/atoms/TheButton.vue";
import TheCard from "@/components/atoms/TheCard.vue";
import ListOfCreatures from "@/components/molecules/ListOfCreatures.vue";
import type { SoulCoreResponse } from "@repo/types";

const characterName = ref<string>("");
const isLoading = ref<boolean>(false);
const listOfCreatures = ref<string[]>([]);
const searchedCharacter = ref<string>("");

const getCharacterSoulCore = async (characterName: string): Promise<SoulCoreResponse> => {
    const response = await fetch(
      "http://localhost:3001/soulcore/player/" + characterName
    );
    
    if (!response.ok) {
      const errorMessage = await response.json();
      //Todo: use the notification component to show the error
      throw new Error(errorMessage.message || "An error occurred");
    }
    
    const data: SoulCoreResponse = await response.json();
    return data;
};

const updateSoulCoreList = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const response: SoulCoreResponse = await getCharacterSoulCore(characterName.value);
    listOfCreatures.value = response.creatures;
    searchedCharacter.value = response.characters.map((item) => item).join(", ");
  } catch (err) {
    console.error(err);
    listOfCreatures.value = [];
    searchedCharacter.value = "";
  }

  isLoading.value = false;
};

const calculateXp = () => {
    const decimal = listOfCreatures.value.length / 200;
    return 2 + (Math.floor(decimal * 100)/100);
};
</script>
