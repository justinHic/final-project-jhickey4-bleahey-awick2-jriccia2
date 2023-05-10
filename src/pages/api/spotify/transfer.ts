import { isString } from "@/resources/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function transferHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | JSON> {
  const { id, access_token } = req.query;
  if (isString(id) && isString(access_token)) {
    const result = await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify({
        device_ids: [id],
      }),
    });
    res.status(200).end();
  } else {
    res.status(405).end();
  }
}
