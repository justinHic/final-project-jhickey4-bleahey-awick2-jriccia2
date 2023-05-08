import { createMocks } from "node-mocks-http";
import songHandler from "../../../src/pages/api/spotify/songs";
import { mockResponse, mockResponse2 } from "../../../mocks/mocks";

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

  test("bad query - no bpm", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        genres: "hip-hop",
        numsongs: "5",
        access_token: localStorage.getItem("access_token"),
        height: "72",
        male: "true",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("bad query - no genres", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        bpm: "220",
        numsongs: "5",
        access_token: localStorage.getItem("access_token"),
        height: "72",
        male: "true",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("bad query - no numsongs", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        bpm: "220",
        genres: "hip-hop",
        access_token: localStorage.getItem("access_token"),
        height: "72",
        male: "true",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("bad query - no access_token", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        bpm: "220",
        genres: "hip-hop",
        numsongs: "5",
        height: "72",
        male: "true",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("bad query - no height", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        bpm: "220",
        genres: "hip-hop",
        numsongs: "5",
        access_token: localStorage.getItem("access_token"),
        male: "true",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("bad query - no male", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {
        bpm: "220",
        genres: "hip-hop",
        numsongs: "5",
        access_token: localStorage.getItem("access_token"),
        height: "72",
        hr: "",
      },
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("bad query", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req, res } = createMocks({
      method: "GET",
      query: {},
    });
    await songHandler(req, res);
    expect(res.statusCode).toBe(405);
  });

  test("returns success multiple calls", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    const { req: req1, res: res1 } = createMocks({
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
    await songHandler(req1, res1);
    expect(res1.statusCode).toBe(200);
    expect(res1._getData()).toEqual('{"uris":["string"],"result":"success!"}');

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse2));
    let { req: req2, res: res2 } = createMocks({
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
    await songHandler(req2, res2);
    expect(res2.statusCode).toBe(200);
    expect(res2._getData()).toEqual('{"uris":["string2"],"result":"success!"}');
  });
});
