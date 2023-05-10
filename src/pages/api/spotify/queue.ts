import { isString } from "@/resources/utils";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This API route is used to queue songs to the web player.
 *
 * @param req The request object - contains the access token, song uris, and device id
 * @param res The response object - contains the result of the request
 */
export default async function queueHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | JSON> {
  // Retrieve the access token, song uris, and device id from the query parameters
  const { access_token, song_uris, device_id } = req.query;

  // If any of the parameters are undefined, send an error response
  if (isString(access_token) && isString(song_uris) && isString(device_id)) {
    const uris = JSON.parse(song_uris);
    const body = JSON.stringify({
      uris: uris,
      offset: {
        position: 0,
      },
      position_ms: 0,
    });
    // Defines the max number of times to retry the fetch request
    let tries = 5;
    // Fetches the result of starting playback on the web player
    const fetchResult: any = async () => {
      // Recursive function that retries the fetch request if it fails
      // This is necessary because the Spotify API sometimes returns a 502 error
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
        console.log(err.status);
        res.status(err.status).end(err.statusText);
      });
  } else {
    res.status(400).end();
  }
}
