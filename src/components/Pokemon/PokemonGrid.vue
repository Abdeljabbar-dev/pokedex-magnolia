<template>
  <div class="grid xl:grid-cols-4 gap-8">
    <div v-for="(pokemon, index) in pokemons" :key="index">
      <PokemonCard :pokemon="pokemon" />
    </div>
  </div>
</template>

<script lang="ts">
import PokemonCard from "./PokemonCard.vue";
import { PropType, defineComponent } from "vue";
import { Pokemon } from "@/Types/Pokemon";

export default defineComponent({
  components: { PokemonCard },
  props: {
    pokemons: {
      type: Array as PropType<Pokemon[]>, // Specify the type using PropType
      required: false,
    },
  },
});
</script>
