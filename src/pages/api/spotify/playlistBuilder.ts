import type { NextApiRequest, NextApiResponse } from "next";

// export async function testButton() {
//   let pl = await getPlaylists("hiphop");
//   console.log(getPlaylists("hiphop"));
// }

/**
 * Creates a playlist for the user with the given name and description.
 * @param req - The request object, containing an access token, username,
 * playlist name, and playlist description
 * @param res - The response object, containing the playlist ID
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access_token, username, playlist_name, playlist_description } =
    req.query;
  if (
    access_token === undefined ||
    Array.isArray(access_token) ||
    username === undefined ||
    Array.isArray(username) ||
    playlist_name === undefined ||
    Array.isArray(playlist_name) ||
    playlist_description === undefined ||
    Array.isArray(playlist_description)
  ) {
    res.status(405).end();
  }

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    body: JSON.stringify({
      name: playlist_name,
      description: playlist_description,
    }),
  };

  fetch(
    `https://api.spotify.com/v1/users/${username}/playlists`,
    requestOptions
  ).then(async (response) => {
    if (response.ok) {
      response.json().then((json) => {
        res.status(200).json({ playlist_id: json.id });
      });
    } else {
      res.status(405).end();
    }
  });

  //TODO: use this type checking to error check response

  // .then((data) => {
  //   console.log(data);
  //   let playlistsObject: any = data["playlists"];
  //   let playlists: PlaylistsObject;
  //   if (isPlaylistObject(playlistsObject)) {
  //     playlists = playlistsObject;
  //     let items: SimplifiedPlaylistObject[] = playlists.items;

  //     items.forEach((playlist: SimplifiedPlaylistObject) => {
  //       if (isSimplifiedPlaylistObject(playlist)) {
  //         plList.push(playlist);
  //       }
  //     });
  //     resolve(plList);
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
}

function isPlaylistObject(data: any): data is PlaylistsObject {
  if (!("href" in data)) return false;
  if (!("limit" in data)) return false;
  if (!("next" in data)) return false;
  if (!("offset" in data)) return false;
  if (!("previous" in data)) return false;
  if (!("total" in data)) return false;
  if (!("items" in data)) return false;
  return true;
}

function isSimplifiedPlaylistObject(item: any): item is PlaylistsObject {
  if (!("collaborative" in item)) return false;
  if (!("description" in item)) return false;
  if (!("external_urls" in item)) return false;
  if (!("href" in item)) return false;
  if (!("id" in item)) return false;
  if (!("images" in item)) return false;
  if (!("public" in item)) return false;
  if (!("tracks" in item)) return false;
  if (!("type" in item)) return false;
  if (!("uri" in item)) return false;
  return true;
}

interface SimplifiedPlaylistObject {
  collaborative: boolean;
  description: string;
  external_urls: object;
  href: string;
  id: string;
  images: object[];
  public: boolean;
  tracks: object;
  type: string;
  uri: string;
}

interface PlaylistsObject {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: SimplifiedPlaylistObject[];
}
