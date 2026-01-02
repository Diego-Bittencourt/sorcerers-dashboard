<template>
<TheCard>
    <h1 class="text-3xl font-bold">Soulcore</h1>
    <p>Find what soulcore a character has</p>
    <TheInput
      label="Add a character to your party"
      placeHolder="Insert Character's name"
      @update:model-value="(inputValue: string) => inputCharacter = inputValue"
      ref="inputRef"
      @keyup.enter="addCharacterToParty()"
    />
    <TheButton 
        label="Add to party"
        :isDisabled="isLoading || inputCharacter === ''"
        @click="addCharacterToParty()"
    />
    <div class="">
        <div class="text-2xl">Party:</div>
        <div v-for="item in listOfCharacters" class="flex flex-row items-center">
            <p class="mr-2">{{ item }}</p>
            <FontAwesomeIcon :icon="faCircleMinus" :class="`text-${theme} cursor-pointer`" @click="removeCharacterFromParty(item)"/>

        </div>
    </div>
    <TheButton
      label="Search"
      :isDisabled="isLoading || listOfCharacters.length === 0"
      @click="getPartySoulCore()"
    />
    <div></div>
  </TheCard>
  <TheCard>
    <ListOfCreatures
      :list="listOfCreatures"
      :searchedCharacter="listOfCharacters.map((item) => item).join(', ')"
      :footer-content="`Total of ${listOfCreatures.length} creatures`"
    >
      <span>Creatures in {{ listOfCharacters.map((item) => item).join(', ') }} soulcore list</span>
    </ListOfCreatures>
  </TheCard>
</template>

<script setup lang="ts">
import TheInput from "@/components/atoms/TheInput.vue";
import TheButton from "@/components/atoms/TheButton.vue";
import TheCard from "@/components/atoms/TheCard.vue";
import ListOfCreatures from "@/components/molecules/ListOfCreatures.vue";
import { useTheme } from "@/composables/theme/useTheme";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import type { TheInputType } from "@/types/TheInputType";

const listOfCharacters = ref<string[]>([]);
const isLoading = ref<boolean>(false);
const listOfCreatures = ref<string[]>([]);
const inputCharacter = ref<string>("");
const inputRef = ref<TheInputType | null>(null);
const { theme } = useTheme();

const clearChildInput = () => {
    if (inputRef.value) {
        inputRef.value.clearInputContent();
    }
};

const addCharacterToParty = () => {
    const character = inputCharacter.value;
    if (character && character !== "" && listOfCharacters.value.includes(character) === false && listOfCharacters.value.length < 5) {
        listOfCharacters.value.push(character);
        clearChildInput();
    }
};

const removeCharacterFromParty = (character: string) => {
    const index = listOfCharacters.value.indexOf(character);
    if (index > -1) {
        listOfCharacters.value.splice(index, 1);
    }
};

const getPartySoulCore = async () => {
  isLoading.value = true;
  const postPayload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      party: listOfCharacters.value,
    }),
  }
  
  try {
    const response = await fetch(
      "http://localhost:3001/soulcore/party/",
      postPayload
    );
    const data = await response.json();
    listOfCreatures.value = data;
  } catch (err) {}
  isLoading.value = false;
};
</script>