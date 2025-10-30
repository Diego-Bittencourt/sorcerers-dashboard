<template>
  <div
    :class="`w-full group relative sm:h-10 md:h-12 lg:h-14 my-3 text-${mode}-foreground-primary`"
  >
    <p
      :class="`absolute left-2 -top-4 px-2 py-1 bg-${mode}-background-secondary z-50 transition-all duration-300 ease-in-out`"
    >
      {{ props.label }}
    </p>
    <div
      :class="`absolute bottom-0 left-0 w-full group-focus-within:h-full h-1 border-2 group-focus-within:border-${theme} transition-all duration-300 ease-in-out`"
    ></div>
    <div
      :class="`absolute right-2 top-1/2 transform -translate-y-1/2 px-1.5 flex flex-col justify-center align-center rounded-full bg-${mode}-background-secondary text-${mode}-foreground-primary cursor-default opacity-100 :hover:opacity-90`"
      @click="clearInputContent"
    >
      <p class="-mt-1">x</p>
    </div>
    <input
      class="h-full w-full focus:outline-none px-4"
      type="text"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="props.placeHolder"
      :value="modelValue"
      ref="input-element"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { useTheme } from "../../composables/theme/useTheme";
import { defineProps } from "vue";

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Input",
  },
  placeHolder: {
    type: String,
    default: "Placeholder",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const { theme, mode } = useTheme();

const inputContent = ref("Dummy data");

const inputElement = useTemplateRef("input-element");
const clearInputContent = () => {
    if (inputElement.value) {
        inputElement.value.value = "";
    }
  emit("update:modelValue", "");
  console.log("click");
};

</script>
