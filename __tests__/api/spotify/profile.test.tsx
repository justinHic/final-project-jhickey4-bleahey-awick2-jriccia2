import { createMocks } from "node-mocks-http";
import fetchMock from "jest-fetch-mock";
import { mockProfileResponse } from "../../../mocks/mocks";
import profileHandler from "@/pages/api/spotify/profile";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/profile", () => {
  test("returns success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProfileResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "access_token",
      },
    });
    await profileHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe('{"username":"string","id":"string"}');
  });

  
});