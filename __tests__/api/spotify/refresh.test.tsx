import { createMocks } from "node-mocks-http";
import fetchMock from "jest-fetch-mock";
import { mockExchangeResponse, mockExchangeResponse2 } from "../../../mocks/mocks";
import refreshHandler from "@/pages/api/spotify/refresh"

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/refresh", () => {
  test("returns success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExchangeResponse));
    const { req, res } = createMocks({
      query: {
        refresh_token: "refresh_token",
      },
    });
    await refreshHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe(
      '{"access_token":"access","refresh_token":"refresh","expires_in":3600}'
    );
  });

  test("bad query - no refresh_token", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExchangeResponse));
    const { req, res } = createMocks();
    await refreshHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - code is array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExchangeResponse));
    const { req, res } = createMocks({
      query: {
        refresh_token: [],
      },
    });
    await refreshHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("returns success multiple times", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExchangeResponse));
    const { req: req1, res: res1 } = createMocks({
      query: {
        refresh_token: "refresh_token",
      },
    });
    await refreshHandler(req1, res1);
    expect(res1.statusCode).toBe(200);
    expect(res1._getData()).toEqual(
      '{"access_token":"access","refresh_token":"refresh","expires_in":3600}'
    );

    fetchMock.mockResponseOnce(JSON.stringify(mockExchangeResponse2));
    const { req: req2, res: res2 } = createMocks({
      query: {
        refresh_token: "refresh_token",
      },
    });
    await refreshHandler(req2, res2);
    expect(res2.statusCode).toBe(200);
    expect(res2._getData()).toEqual(
      '{"access_token":"access2","refresh_token":"refresh2","expires_in":3600}'
    );
  });
});