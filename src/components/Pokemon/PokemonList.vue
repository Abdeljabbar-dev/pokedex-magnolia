<template>
  <div class="flex flex-col text-center px-12 lg:px-36 py-16 mb-8">
    <div class="text-2xl lg:text-4xl font-bold mb-16">Pokedex Magnolia</div>
    <div class="flex justify-center xl:justify-end mb-16">
      <div class="tabs tabs-boxed">
        <a
          class="tab"
          :class="{ 'tab-active': isShowAll() }"
          @click="selectMenu(menuOptions[0])"
        >
          Show All
        </a>
        <a
          class="tab"
          :class="{ 'tab-active': isShowFilterByType() }"
          @click="selectMenu(menuOptions[1])"
        >
          Filter by Type
        </a>
      </div>
    </div>
    <div v-if="!isLoading">
      <select
        class="select select-warning w-full max-w-xs mb-16"
        v-if="isShowFilterByType()"
        v-model="selectedPokemonTypeUrl"
      >
        <option disabled selected value="null">Filter by type..</option>
        <template v-for="(opt, index) in pokemonTypes" :key="index">
          <option :value="opt.url">
            {{ opt.name }}
          </option>
        </template>
      </select>
      <PokemonGrid :pokemons="results" />
      <button
        class="btn btn-warning max-w-md mt-16"
        @click="fetchData"
        v-if="isShowAll()"
      >
        Load More
      </button>
    </div>
    <div v-else>
      <span class="text-4xl font-bold"> Loading..</span>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watch, defineComponent } from "vue";
import PokemonGrid from "./PokemonGrid.vue";
import useFetchData from "../../services/api";
const menuOptions = ["showAll", "filterByType"];
export default defineComponent({
  components: { PokemonGrid },

  setup() {
    const currentMenu = ref<string>(menuOptions[0]);

    const {
      fetchData,
      results,
      selectedPokemonTypeUrl,
      pokemonTypes,
      isLoading,
      fetchTypes,
      fetchByType,
    } = useFetchData();

    // fetch data on mounted
    onMounted(() => {
      fetchTypes();
      fetchData();
      if (fetchData() && fetchTypes()) {
        isLoading.value = false;
      }
    });

    // watch pokemon type
    watch(selectedPokemonTypeUrl, () => {
      isLoading.value = true;
      fetchByType();
    });

    function isShowAll(): boolean {
      return currentMenu.value == menuOptions[0];
    }

    function isShowFilterByType(): boolean {
      return currentMenu.value == menuOptions[1];
    }

    function selectMenu(value: string): void {
      currentMenu.value = value;
    }

    return {
      isShowAll,
      isShowFilterByType,
      selectMenu,
      isLoading,
      results,
      menuOptions,
      selectedPokemonTypeUrl,
      pokemonTypes,
      fetchData,
    };
  },
});
</script>
