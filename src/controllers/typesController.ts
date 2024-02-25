// import clientAxios from "../config/clientAxios";
// import { Request, Response } from "express";

// export const getTypesNames = async (req: Request, res: Response) => {
//   try {
//     const response = await clientAxios.get("type");

//     const types = response.data.results;
//     res.status(200).json({
//       message: "Types list successfully fetched",
//       data: types,
//     });
//   } catch (error) {
//     console.error("Error fetching types list:", error);
//     res.status(500).json({
//       error: "Internal Server Error",
//     });
//   }
// };

// controllers/typesController.js

import { Request, Response } from "express";
import { getTypesNames } from "../services/typesService";
// import { getTypesNames } from "../services/typesService";

export const getTypes = async (req: Request, res: Response) => {
  try {
    const types = await getTypesNames();
    res.status(200).json({
      message: "Types list successfully fetched",
      data: types,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error fetching types list",
    });
  }
};
