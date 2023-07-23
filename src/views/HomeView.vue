<template>
  <div class="home">
    <PokemonList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PokemonList from "@/components/PokemonList.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    PokemonList,
  },
});
</script>
