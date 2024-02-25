import clientAxios from "../config/clientAxios";

export const getTypesNames = async () => {
  try {
    const response = await clientAxios.get("type");
    const types = response.data.results;
    return types;
  } catch (error) {
    throw new Error("Failed to fetch types");
  }
};
