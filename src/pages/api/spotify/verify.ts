import type { NextApiRequest, NextApiResponse } from "next";
const client_id = "d4f1fb65364d48f38e76c1d7c26da3ae";
const redirect_uri = "http://localhost:3000/loggedin"; // Your redirect uri

/**
 * The data returned by the API route
 */
type data = {
  url: string;
};

/**
 * Generates a random string of the given length
 *
 * @param req - The request object (not use but is inherited from NextApiRequest)
 * @param res - The response object containing the url to redirect to
 */
export default function verifyHandler(
  req: NextApiRequest, // res is not used but is inherited from NextApiResponse
  res: NextApiResponse<data>
): void | JSON {
  const state: string = generateRandomString(16);
  const scope: string =
    "user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private app-remote-control";
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

/**
 * Generates a URL with the given search params
 *
 * @param url - The url to add the search params to
 * @param params - The search params to add to the url
 * @returns The url with the search params
 */
function generateUrlWithSearchParams(
  url: string,
  params: URLSearchParams
): string {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();
  return urlObject.toString();
}

/**
 * Generates a random string of the given length for the state parameter
 *
 * @param length - The length of the string to generate
 * @returns The generated string
 */
function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
