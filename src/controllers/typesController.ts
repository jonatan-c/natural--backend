import { Request, Response } from "express";
import { getTypesNames } from "../services/typesService";
import { CustomError } from "../shared/CustomError";

export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await getTypesNames();
    res.status(200).json({
      message: "Types list successfully fetched",
      data: types,
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
