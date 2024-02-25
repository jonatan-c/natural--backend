import { Router } from "express";
import {
  getPokemonById,
  getPokemonsController,
} from "../controllers/pokemonController";

const router = Router();

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     tags: [Pokemon]
 *     summary: Retrieve a list of Pokemon
 *     description: Fetches a list of all available Pokemon from the Pokemon API.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter Pokemon by name.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter Pokemon by type.
 *     responses:
 *       200:
 *         description: A list of Pokemon was successfully fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pokemon list successfully fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the Pokemon.
 *                       url:
 *                         type: string
 *                         description: The URL to the detailed information about this Pokemon.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

router.get("/", getPokemonsController);

/**
 * @swagger
 * /api/pokemon/{id}:
 *   get:
 *     tags: [Pokemon]
 *     summary: Retrieve a Pokemon by its name
 *     description: Fetches a Pokemon by its name from the Pokemon API.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the Pokemon to retrieve.
 *     responses:
 *       200:
 *         description: The Pokemon was successfully fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pokemon successfully fetched
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the Pokemon.
 *                     url:
 *                       type: string
 *                       description: The URL to the detailed information about this Pokemon.
 *       404:
 *         description: Pokemon not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Pokemon not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get("/:id", getPokemonById);

export default router;
