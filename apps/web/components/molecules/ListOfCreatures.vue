<template>

  <div class="text-xl font-bold">List of Creatures for {{ searchedCharacter }}</div>
  <table
    v-if="list.length > 0"
    class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden"
  >
    <thead class="bg-gray-100 text-gray-600">
      <tr>
        <th class="px-4 py-3 font-medium flex justify-between"><span>Creature</span><span>You gain <span class="text-red-400">{{ calculateXp() }}%</span> extra xp in the creatures in the list</span></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr v-for="item in list.sort()" class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
        <td :key="item" class="px-4 py-3">{{ item}}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="px-4 py-3 font-medium">Total: {{ list.length }}/200</td>
      </tr>
    </tfoot>

  </table>
  <div v-else>
    <p>Insert the name of the character and press search.</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    type:   Array<string>,
    default: [],
  },
  searchedCharacter: {
    type:   String,
    default: "",
  },
});

const calculateXp = () => {
    const decimal = props.list.length / 200;
    return 2 + (Math.floor(decimal * 100)/100);
};
</script>
