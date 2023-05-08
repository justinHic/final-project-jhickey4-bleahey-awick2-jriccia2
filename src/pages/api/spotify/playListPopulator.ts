import type { NextApiRequest, NextApiResponse } from "next";

/**
 *
 * @param req - The request object, containing an access token, playlist ID,
 * and and list of song URIs to add to the playlist
 * @param res - The response object, which is an empty JSON object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token, playlist_id, song_uris } = req.query;
  if (
    access_token === undefined ||
    Array.isArray(access_token) ||
    playlist_id === undefined ||
    Array.isArray(playlist_id) ||
    song_uris === undefined ||
    !Array.isArray(song_uris)
  ) {
    res.status(405).end();
  }

  const requestOptions = {
    method: "POST",
    Headers: {
      Authorization: "Bearer " + access_token,
    },
    body: JSON.stringify({
      uris: song_uris,
      position: 0,
    }),
  };

  fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    requestOptions
  ).then(async (response) => {
    if (response.ok) {
      response.json().then((json) => {
        res.status(200).json({});
      });
    } else {
      res.status(405).end();
    }
  });
}
