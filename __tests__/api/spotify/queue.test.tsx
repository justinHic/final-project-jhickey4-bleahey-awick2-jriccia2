import { createMocks } from "node-mocks-http";
import queueHandler from "@/pages/api/spotify/queue";
import fetchMock from "jest-fetch-mock";
import { mockQueueResponse } from "../../../mocks/mocks";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/queue", () => {
  test("returns success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockQueueResponse));
    const { req, res } = createMocks({
      query: {
        access_token: localStorage.getItem("access_token"),
        song_uris: '["string", "string1"]',
        device_id: "001",
      },
    });
    await queueHandler(req, res);
    expect(res.statusCode).toBe(202);
  });

  test("bad query - no access_token", async () => {
    const { req, res } = createMocks({
      query: {
        song_uris: '["string", "string1"]',
        device_id: "001",
      },
    });
    await queueHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no device id", async () => {
    const { req, res } = createMocks({
      query: {
        access_token: localStorage.getItem("access_token"),
        song_uris: '["string", "string1"]',
      },
    });
    await queueHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no song_uris", async () => {
    const { req, res } = createMocks({
      query: {
        access_token: localStorage.getItem("access_token"),
        device_id: "001",
      },
    });
    await queueHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("returns success after multiple calls", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockQueueResponse));
    const { req: req1, res: res1 } = createMocks({
      query: {
        access_token: localStorage.getItem("access_token"),
        song_uris: '["1string", "1string1"]',
        device_id: "001",
      },
    });
    await queueHandler(req1, res1);
    expect(res1.statusCode).toBe(202);

    fetchMock.mockResponseOnce(JSON.stringify(mockQueueResponse));
    const { req: req2, res: res2 } = createMocks({
      query: {
        access_token: localStorage.getItem("access_token"),
        song_uris: '["string", "string1"]',
        device_id: "001",
      },
    });
    await queueHandler(req2, res2);
    expect(res1.statusCode).toBe(202);
  });
});
