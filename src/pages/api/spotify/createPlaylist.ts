import { NextApiRequest, NextApiResponse } from "next"
import { defaultConfig } from "next/dist/server/config-shared"
import { resourceLimits } from "worker_threads";

export default async function handler(
    req: NextApiRequest,
    resp: NextApiResponse
) {
    const { access_token, song_uris, device_id } = req.query;
    
    async function createPlaylist() {
        if (isString(access_token) && isString(song_uris) && isString(device_id)) {
            const uris = JSON.parse(song_uris);
            const uid = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer " + access_token,
                },
            })
            uid.json().then((json) => {
                let id = json.id;
                console.log(id)
            })
            
        }
    }
    
    createPlaylist()
}

// export async function create(access_token: string, song_uris: any) {
//   if (isString(access_token) && isString(song_uris)) {
//     const uris = JSON.parse(song_uris);
//     const uid = await fetch("https://api.spotify.com/v1/me", {
//       headers: {
//         Authorization: "Bearer " + access_token,
//       },
//     })
//       .then((res) => {
//         res.json();
//       })
//       .then((json) => {
//         console.log(json);
//       });
//   }
// }       

function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}


