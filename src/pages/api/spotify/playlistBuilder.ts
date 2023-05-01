import { resolve } from "path";
import { initialState } from "./PKCEVerifier";

export async function testButton() {
  let pl = await getPlaylists("hiphop")
  console.log(getPlaylists("hiphop"));
}

//MAKE SURE TO USE .then WHEN CALLING THIS 
function getPlaylists(genre: string): Promise<SimplifiedPlaylistObject[] | undefined> {
  return new Promise((resolve) => {
    let plList: SimplifiedPlaylistObject[] = [];
    fetch(`https://api.spotify.com/v1/browse/categories/${genre}/playlists`, {
      headers: {
        Authorization: "Bearer " + initialState.access_token,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw await response.json();
        }
      })
      .then((data) => {
        console.log(data);
        let playlistsObject: any = data["playlists"];
        let playlists: PlaylistsObject;
        if (isPlaylistObject(playlistsObject)) {
          playlists = playlistsObject;
          let items: SimplifiedPlaylistObject[] = playlists.items;

          items.forEach((playlist: SimplifiedPlaylistObject) => {
            if (isSimplifiedPlaylistObject(playlist)) {
              plList.push(playlist);
            }
          });
          resolve(plList);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
}

function isPlaylistObject(data: any): data is PlaylistsObject {
  if (!("href" in data)) return false;
  if (!("limit" in data)) return false;
  if (!("next" in data)) return false;
  if (!("offset" in data)) return false;
  if (!("previous" in data)) return false;
  if (!("total" in data)) return false;
  if (!("items" in data)) return false;
  return true
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
  collaborative: boolean,
  description: string,
  external_urls: object,
  href: string,
  id: string,
  images: object[],
  public: boolean,
  tracks: object,
  type: string,
  uri: string,
}

interface PlaylistsObject {
  href: string,
  limit: number,
  next: string,
  offset: number,
  previous: string,
  total: number,
  items: SimplifiedPlaylistObject[],
}

export {}
