import { createMocks } from "node-mocks-http";
import fetchMock from "jest-fetch-mock";
import { mockPlaylistsTracksResponse, mockPlaylistsTracksResponse2 } from "../../../mocks/mocks";
import playlistPopulatorHandler from "@/pages/api/spotify/playlistPopulator";

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("/api/spotify/playlistPopulator", () => {
  test("returns success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "access_token",
        playlist_id: "string",
        song_uris: '["string", "string1"]',
      },
    });
    await playlistPopulatorHandler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getData()).toBe('{"result":"success!"}');
  });

  test("bad query - no access_token", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse));
    const { req, res } = createMocks({
      query: {
        playlist_id: "string",
        song_uris: '["string", "string1"]',
      },
    });
    await playlistPopulatorHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no playlist_id", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse));
    const { req, res } = createMocks({
      query: {
        access_token: "string",
        song_uris: '["string", "string1"]',
      },
    });
    await playlistPopulatorHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query - no song_uris", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse));
    const { req, res } = createMocks({
      query: {
        playlist_id: "string",
        access_token: "string",
      },
    });
    await playlistPopulatorHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("bad query empty", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse));
    const { req, res } = createMocks();
    await playlistPopulatorHandler(req, res);
    expect(res.statusCode).toBe(400);
  });

  test("returns success multiple times", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse));
    const { req: req1, res: res1 } = createMocks({
      query: {
        access_token: "access_token",
        playlist_id: "string",
        song_uris: '["string", "string1"]',
      },
    });
    await playlistPopulatorHandler(req1, res1);
    expect(res1.statusCode).toBe(200);
    expect(res1._getData()).toBe('{"result":"success!"}');

    fetchMock.mockResponseOnce(JSON.stringify(mockPlaylistsTracksResponse2));
    const { req: req2, res: res2 } = createMocks({
      query: {
        access_token: "access_token",
        playlist_id: "string",
        song_uris: '["string", "string1"]',
      },
    });
    await playlistPopulatorHandler(req2, res2);
    expect(res2.statusCode).toBe(200);
    expect(res2._getData()).toBe('{"result":"success!"}');
  });
});