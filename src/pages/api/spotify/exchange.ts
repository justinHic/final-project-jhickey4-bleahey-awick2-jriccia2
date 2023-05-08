import type { NextApiRequest, NextApiResponse } from "next";
const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";
const redirect_uri = "http://localhost:3000/loggedin";

type data = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export default async function exchangeHandler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
  const code = req.query.code;
  const state = req.query.state;

  if (
    state === null ||
    code === null ||
    code === undefined ||
    state === undefined ||
    Array.isArray(code) ||
    Array.isArray(state)
  ) {
    console.log(state);
    res.status(400).end();
  } else {
    const response = async () => {
      /*
      const resp = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + process.env.CLIENT_SECRET).toString(
              'base64'
            ),
        },
        body: new URLSearchParams({
          code,
          redirect_uri,
          client_id,
          grant_type: "authorization_code",
        }),
      });
      return resp.json();
      */
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
        //`grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          scope:
            "user-read-private streaming streaming user-modify-playback-state user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private app-remote-control",
          state: state,
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
