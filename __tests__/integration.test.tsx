const SPOTIFY_API: string = "/api/spotify";

let access_token = "";

/**
 *
 */

describe("Get songs in standard mode", () => {
  it("should return a list of song uris matching query", async () => {
    const response: Response = await fetch(
      `${SPOTIFY_API}/songs?bpm=170&genres=club,chill&numsongs=7&access_token=`
    );
  });
});
