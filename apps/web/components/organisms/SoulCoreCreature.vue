<template>
      <TheCard>
    <h1 class="text-3xl font-bold">Soulcore</h1>
    <p>Find characters that DON'T have this creature's soulcore</p>
    <TheInput
      label="Search for a creature"
      placeHolder="Insert Creature's name"
      @update:model-value="(inputValue: string) => (creatureName = inputValue)"
    />
    <TheButton
      label="Search"
      :isDisabled="isLoading || creatureName === ''"
      @click="getCreatureSoulCore()"
    />
    <div></div>
  </TheCard>
  <TheCard>
    <ListOfCreatures
      :list="listOfCharacters"
      :searchedCharacter="searchedCreature"
    />
  </TheCard>
</template>

<script setup lang="ts">
import TheInput from "@/components/atoms/TheInput.vue";
import TheButton from "@/components/atoms/TheButton.vue";
import TheCard from "@/components/atoms/TheCard.vue";
import ListOfCreatures from "@/components/molecules/ListOfCreatures.vue";

const creatureName = ref<string>("");
const isLoading = ref<boolean>(false);
const listOfCharacters = ref<string[]>([]);
const searchedCreature = ref<string>("");

const getCreatureSoulCore = async () => {
  isLoading.value = true;
  searchedCreature.value = creatureName.value;
  try {
    const response = await fetch(
      "http://localhost:3001/soulcore/creature/" + searchedCreature.value
    );
    const data = await response.json();
    listOfCharacters.value = data;
  } catch (err) {}
  isLoading.value = false;
};
</script>