import { createMocks } from "node-mocks-http";
import songHandler from "../src/pages/api/spotify/songs";
import { mockResponse } from "../mocks/data";

import fetchMock from "jest-fetch-mock";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/songs", () => {
  test("returns success", async () => {
    
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        bpm: "220",
        genres: "hip-hop",
        numsongs: "5",
        access_token: localStorage.getItem("access_token"),
        height: "72",
        male: "true",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual('{"uris":["string"],"result":"success!"}');

  });
});
