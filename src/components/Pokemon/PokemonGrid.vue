<template>
  <div class="grid xl:grid-cols-4 gap-8">
    <div v-for="(result, index) in results" :key="index">
      <PokemonCard :name="result.name" :url="result.url" />
    </div>
  </div>
</template>

<script setup>
import PokemonCard from "./PokemonCard.vue";
defineProps({
  results: Array,
});
</script>
