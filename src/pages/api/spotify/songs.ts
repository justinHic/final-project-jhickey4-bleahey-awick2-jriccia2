import type { NextApiRequest, NextApiResponse } from "next";

type data = {};
export default function songHandler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
  const { bpm, genres, numsongs, access_token } = req.query;
  if (
    isString(bpm) &&
    isString(genres) &&
    isString(numsongs) &&
    isString(access_token)
  ) {
    const g = genres.split(",");
    const num = parseInt(numsongs);
    console.log(bpm);
    console.log(genres);
    console.log(numsongs);
    fetch(
      //"https://api.spotify.com/v1/recommendations?seed_genres=club%2Cpop&target_tempo=120&target_liveness=1&target_energy=1",
      `https://api.spotify.com/v1/recommendations?seed_genres=${genres}&target_tempo=${bpm}`,
      //"https://api.spotify.com/v1/audio-features?ids=2S2od3hT7ceytw7d1pTRuE",
      //"https://api.spotify.com/v1/tracks/1iNPlFDLDGjnJZbt11SU1e",
      //2S2od3hT7ceytw7d1pTRuE
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    )
      .then(async (res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        let tracks = json['tracks']
        tracks.forEach((track: TrackObject) => {
          if (isTrackObject(track)) {
            console.log(track.name)
          }
        })
        
      });

    res.status(200).json({ result: "success" });
  } else {
    res.status(405).end();
  }
}

function isTrackObject(track: any): track is TrackObject {
  if (!("album" in track)) return false;
  if (!("artists" in track)) return false;
  if (!("available_markets" in track)) return false;
  if (!("disc_number" in track)) return false;
  if (!("duration_ms" in track)) return false;
  if (!("explicit" in track)) return false;
  if (!("external_ids" in track)) return false;
  if (!("external_urls" in track)) return false;
  if (!("href" in track)) return false;
  if (!("id" in track)) return false;
  if (!("name" in track)) return false;
  if (!("popularity" in track)) return false;
  if (!("preview_url" in track)) return false;
  if (!("track_number" in track)) return false;
  if (!("type" in track)) return false;
  if (!("uri" in track)) return false;
  if (!("is_local" in track)) return false;
  return true
}

export interface TrackObject {
  album: object,
  artists: object[],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: object,
  external_urls: object,
  href: string,
  id: string,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string,
  is_local: boolean,
}

function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}
