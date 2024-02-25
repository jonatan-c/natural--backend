import { Request, Response } from "express";
import * as typesService from "../services/typesService";
import { getTypes } from "../controllers/typesController";

jest.mock("../services/typesService");

describe("typesController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return types successfully", async () => {
    const mockResponse = {
      data: ["Type1", "Type2"],
    };
    (typesService.getTypesNames as jest.Mock).mockResolvedValue(mockResponse);

    await getTypes(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Types list successfully fetched",
      data: {
        data: ["Type1", "Type2"],
      },
    });
  });

  it("should handle error when fetching types", async () => {
    const errorMessage = "Error fetching types list";
    (typesService.getTypesNames as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    await getTypes(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: errorMessage,
    });
  });
});
