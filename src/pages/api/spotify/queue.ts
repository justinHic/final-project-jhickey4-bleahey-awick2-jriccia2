import type { NextApiRequest, NextApiResponse } from "next";

export default async function queueHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token, song_uris, device_id } = req.query;

  if (isString(access_token) && isString(song_uris) && isString(device_id)) {
    const uris = JSON.parse(song_uris);
    const body = JSON.stringify({
      uris: uris,
      offset: {
        position: 0,
      },
      position_ms: 0,
    });
    console.log(body)
    const result = await fetch(
      "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
        body: body,
      }
    )
      .then((resp) => {
        if (resp !== undefined) {
          resp
            .json()
            .then((json) => console.log(json))
            .catch((err) => {
              console.log(err);
              res.status(400).end();
            })
        };
      })
      .catch((err) => {
        console.log(err);
        res.status(405).end();
      })
    res.status(200).end();
  } else {
    res.status(400).end();
  }
}

function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}