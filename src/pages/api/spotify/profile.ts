import type { NextApiRequest, NextApiResponse } from "next";

/**
 * This API route is used to get the current user's profile, which currently
 * only returns the user's display name and id.
 *
 * This display name may be null or a string.$
 * The id may be null or a string
 *
 * @param req The request object
 * @param res The response object
 * @returns A JSON object containing the user's profile information or an error
 * message
 */
export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | JSON> {
  // Retrieve the access token from the query parameters
  const { access_token } = req.query;

  // If the access token is undefined, send an error response
  if (
    access_token === undefined ||
    access_token === "undefined" ||
    Array.isArray(access_token)
  ) {
    res.status(400).end();
  } else {
    // Retrieve the user's profile information from the Spotify API
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // If the response status is 401 or 403, send a user unauthorized response
    if (response.status === 401) {
      res.status(401).end();
    } else if (response.status === 403) {
      res.status(403).end();
    } else {
      await response
        .json()
        .then((json) => {
          const displayName = json.display_name;
          const id = json.id;
          res.status(200).json({ username: displayName, id: id });
        })
        .catch((err) => {
          // If an error occurs, log it and send an internal server error response
          console.error(err);
          res.status(500).end(err.message);
        });
    }
  }
}
