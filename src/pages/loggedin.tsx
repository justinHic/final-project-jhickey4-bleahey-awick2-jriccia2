import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { Metronome } from "../scripts/metronome";
import { NextRouter, useRouter } from "next/router";
import { MetronomeController } from "@/components/MetronomeController";
import Webplayer from "@/components/Webplayer";
import { genres } from "@/resources/genres";
import {
  HEAD_TITLE,
  APP_TITLE,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  EXPIRATION_STRING,
} from "@/resources/strings";
import { HR_ZONES } from "@/resources/metrics";
import SpotifyButton, { SpotifyButtonAction } from "@/components/SpotifyButton";
import GenreSelect, { defaultGenres } from "@/components/GenreSelect";
import { Mode } from "../types/Mode";
import ModeSelect from "@/components/ModeSelect";
import MetronomeSwitch from "@/components/MetronomeSwitch";
import { SpotifyProfile } from "../types/SpotifyProfile";
import NumSongsSelect from "@/components/NumSongsSelect";
import SexSelect from "@/components/SexSelect";
import { Sex } from "@/types/Sex";
import HeartRateSelect from "@/components/HeartRateSelect";
import HeightInput from "@/components/HeightInput";

interface SongsResponse {
  uris: string[];
}

/**
 * The page that is displayed when the user is logged in.
 * @returns The page that is displayed when the user is logged in.
 */
export default function LoggedIn() {
  const [tempo, setTempo] = useState(170);
  const [metronome, setMetronome] = useState(new Metronome(tempo));
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(defaultGenres);
  const [numSongs, setNumSongs] = useState<number>(0);
  const [ready, setReady] = useState(false);
  const [playerShow, setPlayerShow] = useState(false);
  const [songs, setSongs] = useState<string[]>([]);
  const [access_token, setAccessToken] = useState("");
  const [sex, setSex] = useState<Sex>();
  const [HR, setHR] = useState<string>();
  const [inches, setInches] = useState<number>();
  const [feet, setFeet] = useState<number>();
  const [mode, setMode] = useState<Mode>(Mode.Standard);
  const [profile, setProfile] = useState<SpotifyProfile>({ username: "" });

  const router: NextRouter = useRouter();
  const { code, state } = router.query;

  /**
   * The access token data returned from the Spotify API.
   * @interface
   * @property {string} access_token - The access token.
   * @property {number} expires_in - The number of seconds until the access token expires.
   *  @property {string} refresh_token - The refresh token.
   */
  interface AccessTokenData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }

  //waits for the router to be ready before checking for code
  //if code is present, exchange it for an access token, refresh token, and expiration time
  //if access token is present, refresh it if it is expired
  useEffect(() => {
    if (router.isReady) {
      const access = localStorage.getItem(ACCESS_TOKEN_NAME);
      const refresh_token = localStorage.getItem(REFRESH_TOKEN_NAME);
      const expires_at = localStorage.getItem(EXPIRATION_STRING);
      if (code !== undefined && state !== undefined) {
        fetch("/api/spotify/exchange?code=" + code + "&state=" + state)
          .then((res) => res.json())
          .then((json: AccessTokenData) => {
            console.log(json);
            const expirationTime = new Date();
            expirationTime.setSeconds(
              expirationTime.getSeconds() + json.expires_in
            );
            localStorage.setItem(ACCESS_TOKEN_NAME, json.access_token);
            localStorage.setItem(REFRESH_TOKEN_NAME, json.refresh_token);
            localStorage.setItem(EXPIRATION_STRING, expirationTime.toString());
            setAccessToken(json.access_token);
            window.history.replaceState({}, document.title, "/loggedin");
          });
        setReady(true);
      } else if (access && refresh_token && expires_at) {
        if (new Date(expires_at).valueOf() - new Date().valueOf() <= 0) {
          fetch("/api/spotify/refresh?refresh_token=" + refresh_token)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              const expirationTime = new Date();
              expirationTime.setSeconds(
                expirationTime.getSeconds() + json.expires_in
              );
              localStorage.setItem(ACCESS_TOKEN_NAME, json.access_token);
              localStorage.setItem(
                EXPIRATION_STRING,
                expirationTime.toString()
              );
              setAccessToken(json.access_token);
            });
        }
        let x = localStorage.getItem(ACCESS_TOKEN_NAME);
        {
          x !== null ? setAccessToken(x) : "";
        }
        setReady(true);
      } else {
        router.push("/").then(() => setReady(true));
      }
    }
  }, [code]);

  // Retrieve user info from Spotify API after access token is set
  useEffect(() => {
    if (ready) {
      if (access_token !== undefined && access_token !== null) {
        retrieveUserInfo();
      }
    }
  }, [access_token]);

  const handleFindSongs = (): void => {
    if (
      selectedGenres.length > 0 &&
      numSongs > 0 &&
      sex !== undefined &&
      inches !== undefined &&
      feet !== undefined
    ) {
      let gen: string = sex === Sex.Male ? "true" : "false";
      let totalInches = 12 * feet + inches;

      const url =
        "/api/spotify/songs?bpm=" +
        tempo +
        "&genres=" +
        selectedGenres +
        "&numsongs=" +
        numSongs +
        "&access_token=" +
        localStorage.getItem("access_token") +
        "&height=" +
        totalInches +
        "&male=" +
        gen +
        (HR !== undefined ? "&hr=" + HR : "");
      console.log(url);
      fetch(url)
        .then((res) => {
          if (res.status === 201) {
            alert("Session expired. Please refresh page");
          } else {
            return res.json();
          }
        })
        .then((json: SongsResponse) => {
          setSongs(json.uris);
          setPlayerShow(true);
        })
        .catch((err) => console.log(err));
    }
  };

  /**
   * Helper function to retrieve the user's information from the Spotify API.
   */
  async function retrieveUserInfo() {
    const url = "/api/spotify/profile?access_token=" + access_token;
    fetch(url)
      .then((res) => res.json())
      .then((json: SpotifyProfile) => {
        if (json.username !== null && json.username !== undefined) {
          setProfile(json);
        }
      });
  }

  return (
    <>
      {!ready ? (
        <></>
      ) : (
        <>
          <Head>
            <title>{HEAD_TITLE}</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="container">
            <h1 className="header">{APP_TITLE}</h1>
            <div className="login-container">
              <p className="user-info">
                {profile.username === ""
                  ? "Logged in"
                  : "Logged in as " + profile.username}
              </p>
              <SpotifyButton
                action={SpotifyButtonAction.Logout}
                router={router}
              />
            </div>
            <div className="input-fields">
              <ModeSelect
                setMode={setMode}
                metronome={metronome}
                metronomePlaying={metronomePlaying}
                setMetronomePlaying={setMetronomePlaying}
              />
              {mode == Mode.Watch ? (
                <></>
              ) : (
                <>
                  <div className="metronome-container">
                    <MetronomeSwitch
                      metronome={metronome}
                      metronomePlaying={metronomePlaying}
                      setMetronomePlaying={setMetronomePlaying}
                    />
                    <MetronomeController
                      tempo={tempo}
                      setTempo={setTempo}
                      metronome={metronome}
                      max={300}
                      min={50}
                    />
                  </div>
                </>
              )}
              <div className="dropdown-div">
                <GenreSelect
                  genres={genres}
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                  maxLimit={5}
                />

                <NumSongsSelect
                  min={0}
                  max={10}
                  numSongs={numSongs}
                  setNumSongs={setNumSongs}
                />
                {mode == Mode.Watch ? (
                  <></>
                ) : (
                  <>
                    <SexSelect sex={sex} setSex={setSex} />

                    <HeartRateSelect HRZones={HR_ZONES} setHR={setHR} />

                    <HeightInput setInches={setInches} setFeet={setFeet} />
                  </>
                )}
              </div>
            </div>

            <div className="search-button-div">
              <button
                className="search-button hvr-grow"
                onClick={handleFindSongs}
                disabled={
                  selectedGenres.length === 0 ||
                  numSongs === 0 ||
                  sex === undefined ||
                  inches === undefined ||
                  feet === undefined
                }
              >
                FIND SONGS
              </button>
            </div>
            {playerShow ? (
              <Webplayer songs={songs} access_token={access_token}></Webplayer>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}
