import { cadenceToEnergy, hrToEnergy } from "@/scripts/algorithms";
import type { NextApiRequest, NextApiResponse } from "next";

interface Tracks {
  tracks: track[];
}
interface track {
  uri: string;
}

export default async function songHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bpm, genres, numsongs, hr, height, male, access_token } = req.query;
  if (
    isString(bpm) &&
    isString(genres) &&
    isString(numsongs) &&
    isString(access_token) &&
    isString(male) &&
    isString(height)
  ) {
    const g = genres.split(",");
    const m = male.toLowerCase() === "true";
    const h = parseInt(height);
    const t = parseInt(bpm);
    const energy =
      hr === undefined
        ? cadenceToEnergy(t, h, m)
        : hrToEnergy(convertHR(hr.toString()));
    let x = "seed_genres=";
    g.forEach((val) => (x += val + "%2C"));
    x = x.substring(0, x.length - 3);
    x += "&target_tempo=" + bpm;
    x += "&limit=" + numsongs;
    x += "&target_energy=" + energy;
    const result = await fetch(
      //"https://api.spotify.com/v1/recommendations?seed_genres=club%2Cpop&target_tempo=120&target_liveness=1&target_energy=1",
      "https://api.spotify.com/v1/recommendations?" + x,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    await result
      .json()
      .then((json) => {
        if (isTracks(json)) {
          let uris: string[] = [];
          json.tracks.forEach((element) => {
            uris.push(element.uri);
          });
          res.status(200).json({ uris: uris });
        } else {
          if (result.status === 401) {
            res.status(201).json({ error: "access token expired" });
          } else {
            console.log(result.status);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(405).end();
      });
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

function convertHR(hr: string): number {
  let arr = hr.split("-");
  let diff = (parseInt(arr[1]) - parseInt(arr[0])) / 2;
  return parseInt(arr[1]) - diff;
}

function isTracks(json: any): json is Tracks {
  return json.tracks !== undefined;
}
