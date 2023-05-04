import { createMocks } from "node-mocks-http";

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

export {};