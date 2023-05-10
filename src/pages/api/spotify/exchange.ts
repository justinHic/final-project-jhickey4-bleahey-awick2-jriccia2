import type { NextApiRequest, NextApiResponse } from "next";
const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";
const redirect_uri = "http://localhost:3000/loggedin";

/**
 * @typedef data
 * @property {string} access_token - The access token for the user's spotify account
 * @property {number} expires_in - The time in seconds until the access token expires
 * @property {string} refresh_token - The refresh token for the user's spotify account
 */
type data = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

/**
 * Handles the exchange of the authorization code for the access token and refresh token
 *
 * @param {NextApiRequest} req - The request object containing the code and state
 * @param {NextApiResponse} res - The response object
 * @returns {Promise<void | JSON>} - The response object
 */
export default async function exchangeHandler(
  req: NextApiRequest,
  res: NextApiResponse<data>
): Promise<void | JSON> {
  // The code created in the first step of the authorization process
  const code = req.query.code;
  // The state of the application
  const state = req.query.state;

  //checking variables in proper format
  if (
    state === null ||
    code === null ||
    code === undefined ||
    state === undefined ||
    Array.isArray(code) ||
    Array.isArray(state)
  ) {
    // Issue with queried parameters
    res.status(400).end();
  } else {
    const response = async () => {
      // The client secret for the application - stored in the .env file (DO NOT SHARE)
      const client_secret = process.env.CLIENT_SECRET;

      // Fetches the access token and refresh token from the spotify api
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
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          scope:
            "user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private app-remote-control",
          state: state,
        }),
      });

      return response.json();
    };

    // After fetching the access token and refresh token, send the response
    // to the client as a json object
    await response().then((info) => {
      res.status(200).json({
        access_token: info.access_token,
        refresh_token: info.refresh_token,
        expires_in: info.expires_in,
      });
    });
  }
}
