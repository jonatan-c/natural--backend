import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import { PORT } from "./config";

const app: Express = express();
const port = PORT;
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
