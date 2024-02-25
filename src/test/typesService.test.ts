import { getTypesNames } from "../services/typesService";
import clientAxios from "../config/clientAxios";

jest.mock("../config/clientAxios");

describe("typesService", () => {
  it("should fetch types successfully", async () => {
    const mockResponse = {
      data: {
        results: ["Type1", "Type2"],
      },
    };
    (clientAxios.get as jest.Mock).mockResolvedValue(mockResponse);

    const types = await getTypesNames();

    expect(types).toEqual(["Type1", "Type2"]);
  });

  it("should handle error when fetching types", async () => {
    const errorMessage = "Failed to fetch types";
    (clientAxios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getTypesNames()).rejects.toThrow(errorMessage);
  });
});
