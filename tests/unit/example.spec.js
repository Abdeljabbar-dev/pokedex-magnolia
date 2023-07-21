import { shallowMount } from "@vue/test-utils";
import PokemonList from "@/components/PokemonList.vue";

describe("PokemonList.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(PokemonList, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
