import { Request, Response } from "express";
import clientAxios from "../config/clientAxios";
import {
  getPokemonsByName,
  getPokemonsByType,
  getPokemons,
} from "../services/pokemonService";

export const getPokemonsController = async (req: Request, res: Response) => {
  try {
    let pokemonData;
    if (req.query.name) {
      pokemonData = await getPokemonsByName(req.query.name as string);
    } else if (req.query.type) {
      pokemonData = await getPokemonsByType(req.query.type as string);
    } else {
      pokemonData = await getPokemons();
    }
    res.status(200).json({
      message: "Pokemon data successfully fetched",
      data: pokemonData,
    });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await clientAxios.get(`pokemon/${id}`);
    res.json({
      message: "Pokemon data successfully fetched",
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
