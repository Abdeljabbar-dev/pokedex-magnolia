<template>
  <div class="card max-w-md bg-base-100 shadow-xl">
    <div class="card-body flex">
      <p class="capitalize text-2xl font-bold">{{ pokemon?.name }}</p>
    </div>
    <label
      for="my-modal-5"
      class="btn btn-warning modal-button"
      @click="handleModal"
    >
      See Details
    </label>

    <PokemonModal
      v-if="isModalOpen"
      :name="pokemon?.name"
      :url="pokemon?.url"
      @close="handleModal"
    />
  </div>
</template>

<script lang="ts">
import PokemonModal from "./PokemonModal.vue";
import { PropType, defineComponent, ref } from "vue";
import { Pokemon } from "../../Types/Pokemon";

export default defineComponent({
  components: { PokemonModal },
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>, // Specify the type using PropType
      required: false,
    },
  },
  setup() {
    const isModalOpen = ref<boolean>(false);

    function handleModal(): void {
      isModalOpen.value = !isModalOpen.value;
    }
    return {
      handleModal,
      isModalOpen,
    };
  },
});
</script>
