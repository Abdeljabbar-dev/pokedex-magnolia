import { createStore, Store } from "vuex";
import { Pokemon } from "../Types/Pokemon";

interface State {
  pokemons: Pokemon[];
  nextUrl: string;
  pokemonTypes: Pokemon[];
  selectedPokemonTypeUrl: string | null;
  isLoading: boolean;
}

export default createStore<State>({
  state: {
    pokemons: [],
    nextUrl: "",
    pokemonTypes: [],
    selectedPokemonTypeUrl: null,
    isLoading: true,
  },
  mutations: {
    setPokemons(state, pokemons: Pokemon[]) {
      state.pokemons = pokemons;
    },
    setNextUrl(state, nextUrl: string) {
      state.nextUrl = nextUrl;
    },
    setPokemonTypes(state, pokemonTypes: Pokemon[]) {
      state.pokemonTypes = pokemonTypes;
    },
    setSelectedPokemonTypeUrl(state, selectedPokemonTypeUrl: string) {
      state.selectedPokemonTypeUrl = selectedPokemonTypeUrl;
    },
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchData({ state, commit }) {
      const url =
        state.nextUrl === ""
          ? "https://pokeapi.co/api/v2/pokemon/?limit=25"
          : state.nextUrl;
      try {
        const response = await fetch(url);
        const data = await response.json();
        commit("setNextUrl", data.next);
        commit("setPokemons", [...state.pokemons, ...data.results]);
        return data;
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    },
    async fetchTypes({ commit }) {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        commit("setPokemonTypes", data.results);
        return data;
      } catch (error) {
        console.error("Error fetching pokemon types:", error);
      }
    },
    async fetchByType({ state, commit }) {
      if (state.selectedPokemonTypeUrl) {
        try {
          const response = await fetch(state.selectedPokemonTypeUrl);
          const data = await response.json();
          const pokemonByType = data.pokemon.map((poke: any) => poke.pokemon);
          commit("setPokemons", pokemonByType);
          commit("setLoading", false);
          return data;
        } catch (error) {
          console.error("Error fetching pokemons by type:", error);
        }
      }
    },
  },
  getters: {
    pokemons(state) {
      return state.pokemons;
    },
    isLoading(state) {
      return state.isLoading;
    },
    pokemonTypes(state) {
      return state.pokemonTypes;
    },
  },
});
