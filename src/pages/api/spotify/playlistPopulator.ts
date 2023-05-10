import { isString } from "@/resources/utils";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This function is used to add the songs to a generated playlist.
 *
 * @param req - The request object, containing an access token, playlist ID,
 * and and list of song URIs to add to the playlist
 * @param res - The response object, which is an empty JSON object
 */
export default async function playlistPopulatorHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | JSON> {
  const { access_token, playlist_id, song_uris } = req.query;
  if (
    !isString(access_token) ||
    !isString(playlist_id) ||
    !isString(song_uris)
  ) {
    res.status(400).end();
  } else {
    const urisAsArray = song_uris.split(",");

    await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: urisAsArray,
        position: 0,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          res.status(200).json({ result: "success!" });
        } else {
          await response.json().then((json) => {
            console.log(json);
            res.status(json.error.status).end(json.error.message);
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).end();
      });
  }
}
