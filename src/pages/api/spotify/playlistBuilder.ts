import type { NextApiRequest, NextApiResponse } from "next";
/**
 * Creates a playlist for the user with the given name and description.
 * @param req - The request object, containing an access token, username,
 * playlist name, and playlist description
 * @param res - The response object, containing the playlist ID
 */
export default async function playlistBuilderHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | JSON> {
  const { access_token, id, playlist_name, playlist_description } = req.query;
  if (
    isString(access_token) &&
    isString(id) &&
    isString(playlist_name) &&
    isString(playlist_description)
  ) {
    const requestOptions = {
      method: "POST",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlist_name,
        description: playlist_description,
      }),
    };
    await fetch(
      `https://api.spotify.com/v1/users/${id}/playlists`,
      requestOptions
    )
      .then(async (response) => {
        if (response.ok) {
          await response.json().then((json) => {
            res.status(200).json({
              playlist_id: json.id,
              playlist_url: json.external_urls.spotify,
            });
          });
        } else {
          await response.json().then((json) => {
            console.log(json.error.message);
            res.status(json.error.status).end(json.error.message);
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        res.status(500).end();
      });
  } else {
    res.status(400).end();
  }

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

function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}
