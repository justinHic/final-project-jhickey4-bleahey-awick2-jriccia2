import type { NextApiRequest, NextApiResponse } from "next";
const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";
const redirect_uri = "https://cadance-deployment.vercel.app/loggedin"; // Your redirect uri

type data = {
  url: string;
};
export default function verifyHandler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
  const state: string = generateRandomString(16);
  const scope: string =
    "user-read-private streaming user-modify-playback-state user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private app-remote-control";
  const params: URLSearchParams = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
    show_dialog: "true",
  });
  res.status(200).json({
    url: generateUrlWithSearchParams(
      "https://accounts.spotify.com/authorize",
      params
    ),
  });
}

function generateUrlWithSearchParams(
  url: string,
  params: URLSearchParams
): string {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();
  return urlObject.toString();
}

function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
