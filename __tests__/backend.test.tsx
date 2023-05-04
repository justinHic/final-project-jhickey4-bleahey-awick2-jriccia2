import { createMocks } from "node-mocks-http";
import songHandler from "../src/pages/api/spotify/songs";

test("test songs api", async () => {
  const url =
    "/api/spotify/songs?bpm=200" +
    "&genres=hip-hop" +
    "&numsongs=5" +
    "&access_token=" +
    localStorage.getItem("access_token") +
    "&height=72" +
    "&male=true" +
    "&hr=";
});

describe("/api/spotify/songs", () => {
  test("returns success", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        animal: "dog",
      },
    });
    await songHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Your favorite animal is dog",
      })
    );
  });
});

export {};