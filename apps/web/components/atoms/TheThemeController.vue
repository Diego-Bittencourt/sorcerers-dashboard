<template>
  <div class="group relative w-28" @click.stop="toggleTooltip">
    <div class="flex flex-col p-1 rounded gap-1 border-${mode}-background-secondary border-2 box-shadow">
      <div :class="`relative flex justify-evenly`">
        <!-- Active Vocation Icon -->
         <div>
        <FontAwesomeIcon :class="`text-${theme}`" v-if="currentVocation === 'sorcerer'" :icon="faFire" />
        <FontAwesomeIcon :class="`text-${theme}`" v-else-if="currentVocation === 'knight'" :icon="faShieldHalved" />
        <FontAwesomeIcon :class="`text-${theme}`" v-else-if="currentVocation === 'monk'" :icon="faHandFist" />
        <FontAwesomeIcon :class="`text-${theme}`" v-else-if="currentVocation === 'druid'" :icon="faSnowflake" />
        <FontAwesomeIcon :class="`text-${theme}`" v-else-if="currentVocation === 'paladin'" :icon="faAnkh" />
        <FontAwesomeIcon :class="`text-${theme}`" v-else :icon="faCircle" />
        </div>

        <!-- Mode Icons -->
         <div>
        <FontAwesomeIcon @click="turnLight" :class="`z-10  ${ currentMode === 'light' ? 'text-yellow-500' : '' }`" :icon="faSun" />
        <FontAwesomeIcon @click="turnDark" :class="`z-10 ${ currentMode === 'dark' ? 'text-blue-400' : '' } `" :icon="faMoon" />
        </div>
      </div>
      <div ref="tooltip" class="hidden group-hover:flex w-full justify-center transition-all duration-300 ease-in-out">
        <FontAwesomeIcon @click="setVocation('sorcerer')" v-if="currentVocation !== 'sorcerer'" :icon="faFire" />
        <FontAwesomeIcon @click="setVocation('knight')" v-if="currentVocation !== 'knight' ":icon="faShieldHalved" />
        <FontAwesomeIcon @click="setVocation('monk')" v-if="currentVocation !== 'monk'" :icon="faHandFist" />
        <FontAwesomeIcon @click="setVocation('druid')" v-if="currentVocation !== 'druid'" :icon="faSnowflake" />
        <FontAwesomeIcon @click="setVocation('paladin')" v-if="currentVocation !== 'paladin'" :icon="faAnkh" />
        <FontAwesomeIcon @click="setVocation('novoc')" v-if="currentVocation !== 'novoc'" :icon="faCircle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/theme/useTheme";
import { setVocation, setMode } from "@/composables/theme/setTheme";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFire,
  faShieldHalved,
  faHandFist,
  faSnowflake,
  faAnkh,
  faCircle,
  faSun,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

const { mode, vocation, theme } = useTheme();
const currentVocation = computed(() => vocation.value);
const currentMode = computed(() => mode.value);


const turnDark = () => { setMode('dark') };
const turnLight = () => { setMode('light') };

//Showing the tooltip on smart devices
const tooltip = ref<HTMLElement | null>(null)

const toggleTooltip = () => {
  if (!tooltip.value) return
  tooltip.value.classList.remove('hidden')
  tooltip.value.classList.add('flex')
}

const closeOnOutsideClick = (e: any) => {
  if (!tooltip.value || !e.target) return

  // If clicked outside the tooltip, close it
  if (!tooltip.value.contains(e.target)) {
    tooltip.value.classList.add('hidden')
    tooltip.value.classList.remove('flex')
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeOnOutsideClick)
})
</script>
