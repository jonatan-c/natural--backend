import clientAxios from "../config/clientAxios";
import axios from "axios";
import { IRespPokeByName } from "../interfaces";

interface customServicePokePagination {
  data: PokemonData[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
  };
}

interface customServicePoke {
  data: PokemonData[];
}

interface PokemonData {
  id: number;
  name: string;
  stats: Array<{
    name: string;
    value: number;
  }>;
  height: number;
  weight: number;
  types: string[];
  image: string;
  abilities: string[];
}

export const getPokemonsByName = async (name: string) => {
  try {
    const response = await clientAxios.get<IRespPokeByName>(`pokemon/${name}`);
    if (response.status === 404) {
      throw new Error("Pokemon not found");
    }
    const pokemonData: PokemonData = {
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
    const resp: customServicePoke = {
      data: [pokemonData],
    };

    return resp;
  } catch (error) {
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
    const result = pokemonData.filter((pokemon: any) => pokemon);
    const resp: customServicePoke = {
      data: result,
    };

    return resp;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw new Error("Internal Server Error");
  }
};

export const getPokemons = async (
  offset: number,
  limit: number,
  page: number,
) => {
  try {
    const response = await clientAxios.get(
      `pokemon?offset=${offset}&limit=${limit}`,
    );
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

    const totalCount = response.data.count;
    const totalPages = Math.ceil(totalCount / Number(limit));

    const resp: customServicePokePagination = {
      data: pokemonData,
      pagination: {
        total: totalCount,
        totalPages,
        currentPage: Number(page),
      },
    };

    return resp;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw new Error("Internal Server Error");
  }
};
