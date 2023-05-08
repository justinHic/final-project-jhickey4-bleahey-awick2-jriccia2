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
export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token } = req.query;

  //TODO: error check response
  if (access_token === undefined || Array.isArray(access_token)) {
    res.status(400).end();
  } else {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    await response.json()
      .then((json) => {
        const displayName = json.display_name;
        const id = json.id;
        res.status(200).json({ username: displayName, id: id });
      }
    );
  }
}
