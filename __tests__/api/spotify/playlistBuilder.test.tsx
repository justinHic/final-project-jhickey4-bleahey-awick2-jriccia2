import { createMocks } from "node-mocks-http";
import playlistBuilderHandler from "@/pages/api/spotify/playlistBuilder";
import fetchMock from "jest-fetch-mock";
import { mockPlaylistsResponse, mockPlaylistsResponse2 } from "../../../mocks/mocks";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/playlistBuilder", () => {
  test("returns success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "access_token",
        id: "string",
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual('{"playlist_id":"string"}');
  });

  test("bad query - no access_token", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        id: "string",
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        access_code: "string",
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no name", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        id: "string",
        access_token: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no description", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        id: "string",
        playlist_name: "string",
        access_token: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - access_token is array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        access_token: [],
        id: "string",
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - id is array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "string",
        id: [],
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - name is array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "string",
        id: "string",
        playlist_name: [],
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - description is array", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "string",
        id: "string",
        playlist_name: "string",
        playlist_description: [],
      },
    });
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - empty", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req, res } = createMocks();
    await playlistBuilderHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("returns success mutliple times", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse));
    const { req: req1, res: res1 } = createMocks({
      query: {
        access_token: "access_token",
        id: "string",
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req1, res1);
    expect(res1.statusCode).toBe(200);
    expect(res1._getData()).toEqual('{"playlist_id":"string"}');

    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsResponse2));
    const { req: req2, res: res2 } = createMocks({
      query: {
        access_token: "access_token",
        id: "string",
        playlist_name: "string",
        playlist_description: "string",
      },
    });
    await playlistBuilderHandler(req2, res2);
    expect(res2.statusCode).toBe(200);
    expect(res2._getData()).toEqual('{"playlist_id":"string2"}');
  });
});