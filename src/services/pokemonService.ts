import clientAxios from "../config/clientAxios";
import axios from "axios";

export const getPokemonsByName = async (name: string) => {
  try {
    const response = await clientAxios.get(`pokemon/${name}`);
    if (response.status === 404) {
      throw new Error("Pokemon not found");
    }
    const pokemonData = {
      id: response.data.id,
      name: response.data.name,
      stats: response.data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map((type: any) => type.type.name),
      image: response.data.sprites.front_default,
      abilities: response.data.abilities.map(
        (ability: any) => ability.ability.name,
      ),
    };
    return [pokemonData];
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw new Error("Pokemon not found");
  }
};

export const getPokemonsByType = async (type: string) => {
  try {
    const response = await clientAxios.get("pokemon?limit=100");
    const pokemonList = response.data.results;
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon: any) => {
        const pokemonInfoResponse = await axios.get(pokemon.url as string);
        const pokemonInfo = pokemonInfoResponse.data;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (pokemonInfo.types.some((t: any) => t.type.name === type)) {
          return {
            id: pokemonInfo.id,
            name: pokemonInfo.name,
            stats: pokemonInfo.stats.map((stat: any) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
            height: pokemonInfo.height,
            weight: pokemonInfo.weight,
            image: pokemonInfo.sprites.front_default,
            abilities: pokemonInfo.abilities.map(
              (ability: any) => ability.ability.name,
            ),
            types: pokemonInfo.types.map((t: any) => t.type.name),
          };
        }
      }),
    );
    return pokemonData.filter((pokemon: any) => pokemon);
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw new Error("Internal Server Error");
  }
};

export const getPokemons = async () => {
  try {
    const response = await clientAxios.get("pokemon?limit=10");
    const pokemonList = response.data.results;
    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon: any) => {
        const pokemonInfoResponse = await axios.get(pokemon.url as string);
        const pokemonInfo = pokemonInfoResponse.data;
        return {
          id: pokemonInfo.id,
          name: pokemonInfo.name,
          stats: pokemonInfo.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
          height: pokemonInfo.height,
          weight: pokemonInfo.weight,
          image: pokemonInfo.sprites.front_default,
          abilities: pokemonInfo.abilities.map(
            (ability: any) => ability.ability.name,
          ),
          types: pokemonInfo.types.map((t: any) => t.type.name),
        };
      }),
    );
    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw new Error("Internal Server Error");
  }
};
