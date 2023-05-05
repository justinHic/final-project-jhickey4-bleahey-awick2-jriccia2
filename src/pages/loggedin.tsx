import Head from "next/head";
import {
  ChangeEvent,
  ChangeEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Metronome } from "../scripts/metronome";
import Genre from "../components/Genre";
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
import {
  cadenceToEnergy,
  getValidTempos,
  hrToEnergy,
} from "@/scripts/algorithms";
import { HR_ZONES } from "@/resources/metrics";
import SpotifyButton, { SpotifyButtonAction } from "@/components/SpotifyButton";
import GenreSelect from "@/components/GenreSelect";
import { Mode } from "../types/Mode";
import ModeSelect from "@/components/ModeSelect";
import MetronomeSwitch from "@/components/MetronomeSwitch";
import GenreOption from "../types/GenreOption";

interface SongsResponse {
  uris: string[];
}

export default function LoggedIn() {
  const [tempo, setTempo] = useState(170);
  const [metronome, setMetronome] = useState(new Metronome(tempo));
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<GenreOption[]>([]);
  const [numSongs, setNumSongs] = useState<number>(0);
  const [ready, setReady] = useState(false);
  const [playerShow, setPlayerShow] = useState(false);
  const [songs, setSongs] = useState<string[]>([]);
  const [access_token, setAccessToken] = useState("");
  const [gender, setGender] = useState<string>();
  const [HR, setHR] = useState<string>();
  const [inches, setInches] = useState<number>();
  const [feet, setFeet] = useState<number>();
  const [mode, setMode] = useState<Mode>(Mode.Standard);
  const [profile, setProfile] = useState<Profile>({ username: "" });

  const router: NextRouter = useRouter();
  const { code, state } = router.query;

  type data = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  };

  useEffect(() => {
    if (router.isReady) {
      const access = localStorage.getItem(ACCESS_TOKEN_NAME);
      const refresh_token = localStorage.getItem(REFRESH_TOKEN_NAME);
      const expires_at = localStorage.getItem(EXPIRATION_STRING);
      if (code !== undefined && state !== undefined) {
        fetch("/api/spotify/exchange?code=" + code + "&state=" + state)
          .then((res) => res.json())
          .then((json: data) => {
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

  useEffect(() => {
    if (ready) {
      if (access_token !== undefined) {
        retrieveUserInfo();
      }
    }
  }, [ready, access_token]);

  const handleNumChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(event.target.value);
    setNumSongs(num);
  };

  const handleClick = () => {
    if (
      selectedGenres.length > 0 &&
      numSongs > 0 &&
      gender !== undefined &&
      inches !== undefined &&
      feet !== undefined
    ) {
      let gen: string = gender === "male" ? "true" : "false";
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
      fetch(url)
        .then((res) => res.json())
        .then((json: SongsResponse) => {
          setSongs(json.uris);
          setPlayerShow(true);
        });
    }
  };

  interface Profile {
    username: string;
  }

  /**
   * Helper function to retrieve the user's information from the Spotify API.
   */
  function retrieveUserInfo() {
    const url = "/api/spotify/profile?access_token=" + access_token;
    fetch(url)
      .then((res) => res.json())
      .then((json: Profile) => {
        if (json.username !== null && json.username !== undefined) {
          setProfile(json);
        }
      });
  }

  /**
   * TODO: make watch mode
   * Has fields:
   * - cadence
   * - energy
   * - genres
   * - number of songs
   *
   * Does not have:
   * - metronome
   * - gender
   * - height
   * - heart rate
   */

  //TODO: get the user's name from the spotify api and display it here
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

                <select
                  name="num-songs"
                  onChange={handleNumChange}
                  defaultValue={"disabled"}
                  className="dropdown hvr-grow"
                >
                  <option disabled value={"disabled"}>
                    Select desired number of songs
                  </option>
                  {[...Array(10)].map((x, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
                {mode == Mode.Watch ? (
                  <></>
                ) : (
                  <>
                    <select
                      name="gender"
                      defaultValue={"disabled"}
                      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        setGender(event.target.value)
                      }
                      className="dropdown hvr-grow"
                    >
                      <option disabled value={"disabled"}>
                        Select your gender
                      </option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>

                    <select
                      name="hr"
                      defaultValue={"disabled"}
                      className="dropdown hvr-grow"
                      onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        setHR(event.target.value)
                      }
                    >
                      <option disabled value={"disabled"}>
                        Select your heart rate zone (optional)
                      </option>
                      {HR_ZONES.map((val, index) => {
                        return (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        );
                      })}
                    </select>
                    <p className="height-title">Please enter your height</p>
                    <div className="height-div">
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="3"
                        max="8"
                        className="height-input"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setFeet(parseInt(event.target.value))
                        }
                      ></input>
                      <label className="height-label">ft</label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="12"
                        className="height-input"
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          setInches(parseInt(event.target.value))
                        }
                      ></input>
                      <label className="height-label">in</label>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="search-button-div">
              <button className="search-button hvr-grow" onClick={handleClick}>
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
