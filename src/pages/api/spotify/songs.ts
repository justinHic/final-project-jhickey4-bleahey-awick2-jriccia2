import { cadenceToEnergy, hrToEnergy } from "@/scripts/algorithms";
import type { NextApiRequest, NextApiResponse } from "next";
import { CADENCE_WEIGHT, HR_WEIGHT } from "@/resources/metrics";
import { isString } from "@/resources/utils";

/**
 * A list of tracks returned by the Spotify API
 * @property tracks - the tracks
 */
interface Tracks {
  tracks: track[];
}

/**
 * A track
 * @propertyuri - the uri of the track
 */
interface track {
  uri: string;
}

/**
 * The api route for getting songs from spotify.
 *
 * @param req - The request object containing the query parameters
 * @param res - The response object containing the uris of the songs
 */
export default async function songHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | JSON> {
  const { bpm, genres, numsongs, hr, height, male, access_token } = req.query;
  let { energy } = req.query;

  if (
    isString(bpm) &&
    isString(genres) &&
    isString(numsongs) &&
    isString(access_token) &&
    !Array.isArray(energy)
  ) {
    const copiedGenres = genres.split(",");
    const copiedCadence = parseInt(bpm);
    // energy must be calculated (not in watch mode)
    if (energy === undefined) {
      if (isString(male) && isString(height)) {
        const copiedSex = male.toLowerCase() === "true";
        const copiedHeight = parseInt(height);
        if (Array.isArray(hr)) {
          res.status(405).end();
        } else if (hr === undefined) {
          energy = cadenceToEnergy(
            copiedCadence,
            copiedHeight,
            copiedSex
          ).toString();
        } else {
          energy = (
            CADENCE_WEIGHT *
              cadenceToEnergy(copiedCadence, copiedHeight, copiedSex) +
            HR_WEIGHT * hrToEnergy(parseInt(hr))
          ).toString();
        }
      }
    }
    // genres will be added based on the user's preferences
    let params = "seed_genres=";
    //add each genre to the seed
    copiedGenres.forEach((val) => (params += val + "%2C"));
    params = params.substring(0, params.length - 3);
    params += "&target_tempo=" + bpm;
    params += "&limit=" + numsongs;
    params += "&target_energy=" + energy;
    const result = await fetch(
      // example url:
      //"https://api.spotify.com/v1/recommendations?seed_genres=club%2Cpop&target_tempo=120&target_liveness=1&target_energy=1",
      "https://api.spotify.com/v1/recommendations?" + params,
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
          res.status(200).json({ uris: uris, result: "success!" });
        } else {
          if (result.status === 401) {
            res.status(401).json({ error: "access token expired" });
          } else {
            // unknown error
            console.log(result.status);
            res.status(result.status).end();
          }
        }
      })
      .catch((err) => {
        // unknown error
        console.error(err);
        res.status(405).end();
      });
  } else {
    // invalid query parameters
    res.status(405).end();
  }
}

/**
 * checks if the given json is a list of tracks
 * @param json - the json to check
 * @returns true if the json is a list of tracks, false otherwise
 */
function isTracks(json: any): json is Tracks {
  return json.tracks !== undefined;
}
