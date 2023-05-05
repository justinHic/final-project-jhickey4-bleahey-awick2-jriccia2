import Head from "next/head";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Metronome } from "../scripts/metronome";
import Genre from "../components/Genre";
import { useRouter } from "next/router";
import { MetronomeComponent } from "@/components/MetronomeComponent";
import Webplayer from "@/components/Webplayer";
import { genres } from "@/resources/genres";
import { TITLE } from "@/resources/strings";
import {
  cadenceToEnergy,
  getValidTempos,
  hrToEnergy,
} from "@/scripts/algorithms";
import { HR_ZONES } from "@/resources/metrics";
import Select from "react-select";

interface SongsResponse {
  uris: string[];
}

export default function LoggedIn() {
  const [tempo, setTempo] = useState(170);
  const [metronome, setMetronome] = useState(new Metronome(tempo));
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [numSongs, setNumSongs] = useState<number>(0);
  const [ready, setReady] = useState(false);
  const [playerShow, setPlayerShow] = useState(false);
  const [songs, setSongs] = useState<string[]>([]);
  const [access_token, setAccessToken] = useState("");
  const [gender, setGender] = useState<string>();
  const [HR, setHR] = useState<string>();
  const [inches, setInches] = useState<number>();
  const [feet, setFeet] = useState<number>();
  const [watchMode, setWatchMode] = useState<boolean>(false);

  const router = useRouter();
  const { code, state } = router.query;

  //TODO: make code part of the state

  type data = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  };

  useEffect(() => {
    if (router.isReady) {
      const access = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      const expires_at = localStorage.getItem("expires_at");
      if (code !== undefined && state !== undefined) {
        fetch("/api/spotify/exchange?code=" + code + "&state=" + state)
          .then((res) => res.json())
          .then((json: data) => {
            console.log(json);
            const t = new Date();
            t.setSeconds(t.getSeconds() + json.expires_in);
            localStorage.setItem("access_token", json.access_token);
            localStorage.setItem("refresh_token", json.refresh_token);
            localStorage.setItem("expires_at", t.toString());
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
              const t = new Date();
              t.setSeconds(t.getSeconds() + json.expires_in);
              localStorage.setItem("access_token", json.access_token);
              localStorage.setItem("expires_at", t.toString());
              setAccessToken(json.access_token);
            });
        }
        let x = localStorage.getItem("access_token");
        {
          x !== null ? setAccessToken(x) : "";
        }
        setReady(true);
      } else {
        router.push("/").then(() => setReady(true));
      }
    }
  }, [code]);

  const genresOptions = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      !selectedGenres.includes(event.target.value) &&
      selectedGenres.length < 5
    ) {
      const copy = selectedGenres.slice();
      copy.push(event.target.value);
      setSelectedGenres(copy);
    } else if (selectedGenres.length >= 5) {
      alert("Can only select a maximum of 5 genres");
    }
  };

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

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
  };

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
            <title>{TITLE}</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="container">
            <h1 className="header">CADANCE</h1>
            <button className="spotify-button" onClick={logout}>
              Logout of Spotify
            </button>
            <div className="input-fields">
              <div className="mode-selector">
                <select
                  name="mode"
                  defaultValue={"standard"}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    if (event.target.value === "watch") {
                      setWatchMode(true);
                      if (metronomePlaying) {
                        metronome.startStop();
                        setMetronomePlaying(!metronomePlaying);
                      }
                    } else {
                      setWatchMode(false);
                    }
                  }}
                  className="dropdown hvr-grow"
                >
                  <option value={"standard"}>Standard mode</option>
                  <option value={"watch"}>Watch mode</option>
                </select>
              </div>
              <div className="metronome-container">
                <div className="metronome-switch-div">
                  <h3 className="switch-title">
                    Metronome {metronomePlaying ? <>ON</> : <> OFF</>}
                  </h3>
                  <label className="switch">
                    <input
                      checked={metronomePlaying}
                      onChange={() => {
                        metronome.startStop();
                        setMetronomePlaying(!metronomePlaying);
                      }}
                      aria-label="metronome switch"
                      type="checkbox"
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <MetronomeComponent
                  tempo={tempo}
                  setTempo={setTempo}
                  metronome={metronome}
                  max={300}
                  min={50}
                ></MetronomeComponent>
              </div>
              <div className="dropdown-div">
                <Select
                  defaultValue={[genres[2], genres[3]]}
                  isMulti
                  name="colors"
                  options={genresOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <select
                  name="genre"
                  value={
                    selectedGenres.length === 0
                      ? "disabled"
                      : selectedGenres[selectedGenres.length - 1]
                  }
                  onChange={handleGenreChange}
                  className="dropdown hvr-grow"
                >
                  <option disabled value={"disabled"}>
                    Select up to 5 desired genres
                  </option>
                  {genres.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </select>

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
                {watchMode ? (
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
