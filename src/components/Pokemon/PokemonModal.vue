<template>
  <div>
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="my-modal-5" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-5xl">
        <label
          @click="handleCloseModal"
          for="my-modal-5"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕</label
        >
        <p class="font-bold text-2xl uppercase">{{ pokemon?.name }}</p>
        <div v-if="isLoading">Loading Pokemon Data...</div>
        <div v-else-if="!isLoading && pokemonData != null">
          <div>{{ pokemonData.types }}</div>
          <div class="grid grid-cols-8">
            <template v-for="(sprite, idx) in pokemonData.sprites" :key="idx">
              <img :src="sprite" class="object-contain h-36" />
            </template>
          </div>
          <div class="mb-8">
            <p class="text-xl font-semibold">Ability</p>
            <template
              v-for="(ability, idx) in pokemonData.abilities"
              :key="idx"
            >
              <div>{{ ability }}</div>
            </template>
          </div>
          <div>
            <p class="text-xl font-semibold">Moves</p>
            <template v-for="(move, idx) in pokemonData.moves" :key="idx">
              <div>{{ move }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Pokemon } from "@/Types/Pokemon";
import { PropType, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>, // Specify the type using PropType
      required: false,
    },
  },

  setup(props) {
    const url = ref<string | undefined>("");
    const pokemonData = ref<any>(null);
    const isLoading = ref<boolean>(true);

    onMounted(() => {
      url.value = props.pokemon?.url;
      fetchPokemon();
    });

    function fetchPokemon(): void {
      fetch(`${url.value}`)
        .then((res) => res.json())
        .then((data) => {
          const abilities = data.abilities.map(
            (ability: any) => ability.ability.name
          );
          const types = data.types.map((type: any) => type.type.name);
          const moves = data.moves.map((move: any) => move.move.name);
          const versions = Object.values(data.sprites.versions);
          let sprites = versions.map((version: any) => Object.values(version));
          sprites = sprites.map((sprite: any) => sprite[0].front_default);

          let filteredData = {
            abilities,
            types: types.join(", "),
            moves,
            sprites,
          };

          pokemonData.value = filteredData;
          isLoading.value = false;
        });
    }

    // emit to close modal
    const emit = defineEmits(["close"]);
    function handleCloseModal(): void {
      emit("close");
    }
    return {
      handleCloseModal,
      pokemonData,
      isLoading,
    };
  },
});
</script>
