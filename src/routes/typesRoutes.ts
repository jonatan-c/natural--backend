import { Router } from "express";
import { getTypes } from "../controllers/typesController";

const router = Router();

/**
 * @swagger
 * /api/types:
 *   get:
 *     tags: [Types]
 *     summary: Retrieve a list of Pokemon types
 *     description: Fetches a list of all available Pokemon types from the Pokemon API.
 *     responses:
 *       200:
 *         description: A list of types was successfully fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Types list successfully fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the Pokemon type.
 *                       url:
 *                         type: string
 *                         description: The URL to the detailed information about this type.
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

router.get("/types", getTypes);

export default router;
