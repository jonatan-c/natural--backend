import clientAxios from "../config/clientAxios";
import { IRespTypes } from "../interfaces";
import { CustomError } from "../shared/CustomError";

export const getTypesNames = async () => {
  try {
    const response = await clientAxios.get<IRespTypes>("type");
    const types = response.data.results;
    return types;
  } catch (error) {
    throw new CustomError("Failed to fetch types", 500);
  }
};
