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
    let tries = 5;
    const fetchResult: any = async () => {
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
      );
      if (result.status === 502 && tries > 0) {
        tries -= 1;
        return fetchResult();
      } else if (result.status !== 202) {
        console.log(result.status);
        console.log(result.statusText);
        return result.json();
      } else {
        return JSON.stringify({ result: "success" });
      }
    };

    await fetchResult()
      .then((info: any) => {
        res.status(200).json({ result: info });
      })
      .catch((err: any) => {
        console.log(err.status)
        res.status(err.status).end(err.statusText);
      });
  } else {
    res.status(400).end();
  }
}

function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}
