import { Pokemon } from "../Types/Pokemon";
import { ref } from "vue";

const baseURL = "https://pokeapi.co/api/v2";

// fetch pokemons from pokedex api
function useFetchData() {
  const nextUrl = ref<string>("");
  const results = ref<Pokemon[]>([]);
  const pokemonTypes = ref<Pokemon[]>([]);
  const selectedPokemonTypeUrl = ref<string>();
  const isLoading = ref<boolean>(true);

  const fetchData = function (): boolean {
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
  };

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

  return {
    fetchData,
    results,
    selectedPokemonTypeUrl,
    pokemonTypes,
    isLoading,
    fetchTypes,
    fetchByType,
  };
}

export default useFetchData;
