import { createMocks } from "node-mocks-http";
import fetchMock from "jest-fetch-mock";
import { mockProfileResponse, mockProfileResponse2 } from "../../../mocks/mocks";
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

  test("bad query - no query", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProfileResponse));
    const { req, res } = createMocks();
    await profileHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - access_token is array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProfileResponse));
    const { req, res } = createMocks({
      query: {
        access_token: [],
      },
    });
    await profileHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("returns success multiple times", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockProfileResponse));
    const { req: req1, res: res1 } = createMocks({
      query: {
        access_token: "access_token",
      },
    });
    await profileHandler(req1, res1);
    expect(res1.statusCode).toBe(200);
    expect(res1._getData()).toBe('{"username":"string","id":"string"}');

    fetchMock.mockResponseOnce(JSON.stringify(mockProfileResponse2));
    const { req: req2, res: res2 } = createMocks({
    query: {
        access_token: "access_token",
    },
    });
    await profileHandler(req2, res2);
    expect(res2.statusCode).toBe(200);
    expect(res2._getData()).toBe('{"username":"string1","id":"string1"}');
  });
});