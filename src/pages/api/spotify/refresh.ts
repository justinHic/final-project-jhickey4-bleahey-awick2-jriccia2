import type { NextApiRequest, NextApiResponse } from "next";
const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";

/**
 * The data that is returned from the spotify api
 * @field access_token The access token that is used to make requests to the spotify api
 * @field expires_in The time in seconds that the access token is valid for
 * @field refresh_token The refresh token that is used to get a new access token
 */
type data = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

/**
 * The API endpoint for getting the refresh token. This is used to get a new
 * access token when the current access token expires.
 *
 * @param req The request that is sent to the server
 * @param res The response that is sent to the client
 * @returns The data that is returned from the spotify api
 */
export default async function refreshHandler(
  req: NextApiRequest,
  res: NextApiResponse<data>
): Promise<void | JSON> {
  const refresh_token = req.query.refresh_token;
  if (refresh_token === undefined || Array.isArray(refresh_token)) {
    res.status(400).end();
  } else {
    const response = async () => {
      const client_secret = process.env.CLIENT_SECRET;
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64url"),
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refresh_token,
        }),
      });
      return response.json();
    };
    await response().then((info) => {
      res.status(200).json({
        access_token: info.access_token,
        refresh_token: info.refresh_token,
        expires_in: info.expires_in,
      });
    });
  }
}
