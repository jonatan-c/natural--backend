import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import { PORT } from "./config";
import pokemonRoute from "./routes/pokemonRoutes";
import typesRoute from "./routes/typesRoutes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app: Express = express();
const port = PORT;
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
  }),
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon API",
      version: "1.0.0",
      description: "A simple Express Pokemon API",
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes/types.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/api/pokemon", pokemonRoute);
app.use("/api", typesRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
