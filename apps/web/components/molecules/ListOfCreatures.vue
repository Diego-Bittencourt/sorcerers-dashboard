<template>
  <TheInput
    label="Filter"
    placeHolder=""
    @update:model-value="(inputValue: string) => (filter = inputValue)"
    v-if="list.length > 0"
  />
  <table
    v-if="list.length > 0"
    class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden"
  >
    <thead :class="`bg-${theme} text-${mode}-button-text`">
      <tr>
        <th class="px-4 py-3 font-medium flex justify-between">
          <slot></slot>
        </th>
      </tr>
    </thead>
    <tbody :class="`divide-y divide-${theme} text-${mode}-foreground-secondary`">
      <tr v-for="item in filteredList.sort()" :class="` border border-${theme} odd:bg-${mode}-background-secondary even:bg-${mode}-background-primary hover:bg-${theme} transition`">
        <td :key="item" class="px-4 py-3">{{ item}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="px-4 py-3 font-medium`">{{ footerContent }}</td>
      </tr>
    </tfoot>

  </table>
  <div v-else>
    <p>Insert the name of the character or creature and press Search.</p>
  </div>
</template>

<script setup lang="ts">
import TheInput from '@/components/atoms/TheInput.vue';
import { useTheme } from '@/composables/theme/useTheme';

const { theme, mode } = useTheme();

const props = defineProps({
  list: {
    type:   Array<string>,
    default: [],
  },
  searchedCharacter: {
    type:   String,
    default: "",
  },
  footerContent: {
    type:   String,
    default: "",
  }
});

const filter = ref('');

const filteredList = computed(() => {
  if (filter.value === '') return props.list;
  return props.list.filter(item => item.toLowerCase().includes(filter.value.toLowerCase()));
});


</script>
