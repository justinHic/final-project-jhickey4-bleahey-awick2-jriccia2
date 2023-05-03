import type { NextApiRequest, NextApiResponse } from "next";

type data = {};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<data>
) {
  const { bpm, genres, numsongs, male, access_token } = req.query;
  if (
    isString(bpm) &&
    isString(genres) &&
    isString(numsongs) &&
    isString(access_token) &&
    isString(male)
  ) {
    const g = genres.split(",");
    const m = male.toLowerCase() === "true";
    let x = "";
    g.forEach((val) => (x += val + "%2C"));
    x = x.substring(0, x.length - 3);
    x += "&target_tempo=" + numsongs;
    x += "&target_energy";
    console.log(x);
    fetch(
      "https://api.spotify.com/v1/recommendations?seed_genres=club%2Cpop&target_tempo=120&target_liveness=1&target_energy=1",
      //"https://api.spotify.com/v1/audio-features?ids=2S2od3hT7ceytw7d1pTRuE",
      //"https://api.spotify.com/v1/tracks/1iNPlFDLDGjnJZbt11SU1e",
      //2S2od3hT7ceytw7d1pTRuE
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        /*json.tracks.forEach((element: any) => {
          console.log(element.external_urls);
        });*/
        //console.log(json);
        //console.log(json.tracks.items[0]);
      });

    res.status(200).json({ result: "success" });
  } else {
    res.status(405).end();
  }
}

function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}
