import type { NextApiRequest, NextApiResponse } from "next";
const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";
const redirect_uri = "http://localhost:3000/loggedin"; // Your redirect uri

type data = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export default async function refreshHandler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
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
        //`grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
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
