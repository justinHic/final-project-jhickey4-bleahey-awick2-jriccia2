import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This API route is used to get the current user's profile, which currently
 * only returns the user's display name.
 *
 * This display name may be null or a string.$
 *
 * @param req The request object
 * @param res The response object
 * @returns A JSON object containing the user's profile information or an error
 * message
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token } = req.query;

  //TODO: error check response
  if (access_token === undefined || Array.isArray(access_token)) {
    res.status(405).end();
  } else {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    response.json().then((json) => {
      res.status(200).json({ username: json.display_name, id: json.id });
    });
  }
}
