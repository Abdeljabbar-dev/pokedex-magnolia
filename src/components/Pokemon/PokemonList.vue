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
// import { Pokemon } from "";
const baseURL = "https://pokeapi.co/api/v2";
const menuOptions = ["showAll", "filterByType"];
export default defineComponent({
  components: { PokemonGrid },
  setup() {
    const isLoading = ref<boolean>(true);
    const results = ref<any>([]);
    const nextUrl = ref<string>("");
    const pokemonTypes = ref<any>([]);
    const selectedPokemonTypeUrl = ref<any>(null);
    const currentMenu = ref<string>(menuOptions[0]);

    // fetch pokemons from pokedex api
    function fetchData(): boolean {
      if (nextUrl.value === "") {
        fetch(`${baseURL}/pokemon/?limit=25`)
          .then((res) => res.json())
          .then((data) => {
            nextUrl.value = data.next;
            results.value = [...data.results];
          });
      } else {
        fetch(`${nextUrl.value}`)
          .then((res) => res.json())
          .then((data) => {
            nextUrl.value = data.next;
            results.value = [...results.value, ...data.results];
          });
      }
      return true;
    }

    // fetch pokemon type list
    function fetchTypes(): boolean {
      fetch(`${baseURL}/type`)
        .then((res) => res.json())
        .then((data) => {
          pokemonTypes.value = [...data.results];
        });
      return true;
    }

    // fetch pokemon by type
    function fetchByType() {
      fetch(`${selectedPokemonTypeUrl.value}`)
        .then((res) => res.json())
        .then((data) => {
          const pokemonByType = data.pokemon.map((poke: any) => poke.pokemon);
          results.value = [...pokemonByType];

          isLoading.value = false;
        });
    }

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
/* eslint-disable */ 
</script>
