<template>
      <TheCard>
    <h1 class="text-3xl font-bold">Soulcore</h1>
    <p>Find characters that DON'T have this creature's soulcore</p>
    <TheInput
      label="Search for a creature"
      placeHolder="Insert Creature's name"
      @update:model-value="(inputValue: string) => (creatureName = inputValue)"
      @keyup.enter="updateSoulCoreList()"
    />
    <TheButton
      label="Search"
      :isDisabled="isLoading || creatureName === ''"
      @click="updateSoulCoreList()"
    />
    <div></div>
  </TheCard>
  <TheCard>
    <ListOfCreatures
      :list="listOfCharacters"
      :searchedCharacter="searchedCreature"
      :footer-content="`Total of ${listOfCharacters.length} characters`"
    >
      <span>Characteres that <span :class="`text-${theme} font-bold`">DO NOT</span> have the soulcore for {{ searchedCreature }}</span>
    </ListOfCreatures>
  </TheCard>
</template>

<script setup lang="ts">
import TheInput from "@/components/atoms/TheInput.vue";
import TheButton from "@/components/atoms/TheButton.vue";
import TheCard from "@/components/atoms/TheCard.vue";
import ListOfCreatures from "@/components/molecules/ListOfCreatures.vue";
import { useTheme } from "@/composables/theme/useTheme";
import type { SoulCoreResponse } from "@repo/types";

const creatureName = ref<string>("");
const isLoading = ref<boolean>(false);
const listOfCharacters = ref<string[]>([]);
const searchedCreature = ref<string>("");
const { theme } = useTheme();

const getCreatureSoulCore = async (creatureName: string): Promise<SoulCoreResponse> => {
    const response = await fetch(
      "http://localhost:3001/soulcore/creature/" + creatureName
    );

    if (!response.ok) {
      const errorMessage = await response.json();
      //Todo: use the notification component to show the error
      throw new Error(errorMessage.message || "An error occurred");
    }
    const data = await response.json();
    return data;
};

const updateSoulCoreList = async (): Promise<void> => {
  isLoading.value = true;
  try {
    const response = await getCreatureSoulCore(creatureName.value);
    listOfCharacters.value = response.characters;
    searchedCreature.value = response.creatures.map((item) => item).join(", ");
  } catch (err) {}
  isLoading.value = false;
};
</script>