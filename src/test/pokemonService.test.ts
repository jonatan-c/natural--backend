import {
  getPokemonsByName,
  getPokemonsByType,
  getPokemons,
} from "../services/pokemonService";

describe("Pokemon Service Tests", () => {
  it("should fetch Pokemon by name", async () => {
    const pokemonData = await getPokemonsByName("pikachu");
    expect(pokemonData.data.length).toBe(1);
    expect(pokemonData.data[0].name).toBe("pikachu");
  });

  it("should fetch Pokemons by type", async () => {
    const pokemonData = await getPokemonsByType("fire");
    expect(pokemonData.data.length).toBeGreaterThan(0);
    expect(
      pokemonData.data.every((pokemon: any) => pokemon.types.includes("fire")),
    ).toBe(true);
  });

  it("should fetch Pokemons", async () => {
    const pokemonData = await getPokemons(1, 1, 1);
    expect(pokemonData.data.length).toBe(1);
  });
});
