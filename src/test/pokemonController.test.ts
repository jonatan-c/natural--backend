/* eslint-disable @typescript-eslint/unbound-method */
import { Request, Response } from "express";
import {
  getPokemonsController,
  getPokemonById,
} from "../controllers/pokemonController";

describe("Pokemon Controller Tests", () => {
  it("should fetch Pokemon data by name", async () => {
    const req = { query: { name: "pikachu" } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getPokemonsController(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should fetch Pokemon data by type", async () => {
    const req = { query: { type: "fire" } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getPokemonsController(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should fetch all Pokemon data", async () => {
    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getPokemonsController(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should fetch Pokemon data by ID", async () => {
    const req = { params: { id: "1" } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getPokemonById(req as Request, res);

    expect(res.json).toHaveBeenCalled();
  });
});
