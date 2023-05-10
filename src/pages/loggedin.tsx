import Head from "next/head";
import { useEffect, useState } from "react";
import { Metronome } from "../scripts/metronome";
import { NextRouter, useRouter } from "next/router";
import { MetronomeController } from "@/components/MetronomeController";
import WebPlayer from "@/components/WebPlayer";
import { genres } from "@/resources/arrays";
import {
  HEAD_TITLE,
  APP_TITLE,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  EXPIRATION_STRING,
  LOGGED_IN_NO_USERNAME,
  LOGGED_IN_USERNAME,
  SAVE_AS_PLAYLIST_TEXT,
  FIND_SONGS_TEXT,
  SESSION_EXPIRED_TEXT,
  RATE_LIMIT_TEXT,
  OPEN_IN_SPOTIFY_TEXT,
  UNAUTHORIZED_TEXT,
} from "@/resources/strings";
import { HR_ZONES } from "@/resources/metrics";
import SpotifyButton, { SpotifyButtonAction } from "@/components/SpotifyButton";
import GenreSelect from "@/components/GenreSelect";
import { Mode } from "../types/Mode";
import ModeSelect from "@/components/ModeSelect";
import MetronomeSwitch from "@/components/MetronomeSwitch";
import { SpotifyProfile } from "../types/SpotifyProfile";
import NumSongsSelect from "@/components/NumSongsSelect";
import SexSelect from "@/components/SexSelect";
import { Sex } from "@/types/Sex";
import HeartRateSelect from "@/components/HeartRateSelect";
import HeightInput from "@/components/HeightInput";
import EnergyInput from "@/components/EnergyInput";
import CadenceInput from "@/components/CadenceInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * The page that is displayed when the user is logged in.
 * @returns {JSX.Element} The page that is displayed when the user is logged in.
 */
export default function LoggedIn(): JSX.Element {
  // State variables - these are used to store data that is used by the page
  const [tempo, setTempo] = useState(170);
  const [metronome, setMetronome] = useState(new Metronome(tempo));
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
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
  const [profile, setProfile] = useState<SpotifyProfile>({
    username: "",
    id: "",
  });
  const [energy, setEnergy] = useState<number>(0.5);
  const [webPlayerLoaded, setWebPlayerLoaded] = useState<boolean>(false);
  const [generatedPlaylistURL, setGeneratedPlaylistURL] = useState<string>("");

  //used to navigate between the pages
  const router: NextRouter = useRouter();
  // Get the code and state from the URL query parameters
  const { code, state, error } = router.query;

  /**
   * The access token data returned from the Spotify API.
   * @property {string} access_token The access token.
   * @property {number} expires_in The number of seconds until the access token expires.
   * @property {string} refresh_token The refresh token.
   */
  interface AccessTokenData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }

  // Does not allow the user to access the page if there was an error during
  // the login process
  if (error !== undefined) {
    console.error(error);
    logout();
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
        if (refresh_token === "undefined") {
          alert(SESSION_EXPIRED_TEXT);
          logout();
        } else if (new Date(expires_at).valueOf() - new Date().valueOf() <= 0) {
          fetch("/api/spotify/refresh?refresh_token=" + refresh_token)
            .then((res) => res.json())
            .then((json) => {
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
        console.log("Logged out: missing authorization tokens");
        logout();
      }
    }
  }, [code]);

  /**
   * Helper function to logout the user
   */
  function logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
  }

  // Retrieve user info from Spotify API after access token is set
  useEffect(() => {
    if (ready) {
      if (access_token !== undefined && access_token !== null) {
        retrieveUserInfo();
      }
    }
  }, [access_token]);

  /**
   * The response from the songs API request.
   * @property {string[]} uris The URIs of the songs.
   */
  interface SongsResponse {
    uris: string[];
  }

  /**
   * Handles the click event for the "Find Songs" button by making a request to the songs API formatted based on the mode.
   * @returns {void}
   */
  function handleFindSongs(): void {
    switch (mode) {
      case Mode.Standard:
        if (
          selectedGenres.length > 0 &&
          numSongs > 0 &&
          sex !== undefined &&
          inches !== undefined &&
          feet !== undefined
        ) {
          setGeneratedPlaylistURL("");
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
            localStorage.getItem(ACCESS_TOKEN_NAME) +
            "&height=" +
            totalInches +
            "&male=" +
            gen +
            (HR !== undefined ? "&hr=" + HR : "");
          console.log(url);
          fetch(url)
            .then((res) => {
              console.log("Fetched songs returned status " + res.status);
              if (res.status === 201) {
                alert(SESSION_EXPIRED_TEXT);
              } else {
                return res.json();
              }
            })
            .then((json: SongsResponse) => {
              setSongs(json.uris);
              console.log(json.uris);
              setPlayerShow(true);
            })
            .catch((err) => console.error(err));
        }
        break;
      case Mode.Watch:
        if (selectedGenres.length > 0 && numSongs > 0 && energy !== undefined) {
          setGeneratedPlaylistURL("");
          const url =
            "/api/spotify/songs?bpm=" +
            tempo +
            "&genres=" +
            selectedGenres +
            "&numsongs=" +
            numSongs +
            "&access_token=" +
            localStorage.getItem(ACCESS_TOKEN_NAME) +
            "&energy=" +
            energy +
            (HR !== undefined ? "&hr=" + HR : "");
          fetch(url)
            .then((res) => {
              console.log("Fetched songs returned status " + res.status);
              if (res.status === 201) {
                alert(SESSION_EXPIRED_TEXT);
              } else {
                return res.json();
              }
            })
            .then((json: SongsResponse) => {
              setSongs(json.uris);
              setPlayerShow(true);
            })
            .catch((err) => console.error(err));
        }
        break;
    }
  }

  /**
   * Helper function to retrieve the user's information from the Spotify API
   * using the profile endpoint.
   * @returns {Promise<void>}
   */
  async function retrieveUserInfo(): Promise<void> {
    const url = "/api/spotify/profile?access_token=" + access_token;

    fetch(url)
      .then((res) => {
        if (res.status === 401) {
          alert(UNAUTHORIZED_TEXT);
          logout();
        } else {
          res
            .json()
            .then((json: SpotifyProfile) => {
              if (
                json.username !== null &&
                json.username !== undefined &&
                json.id !== null &&
                json.id !== undefined
              ) {
                setProfile(json);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Checks if the find songs button should be disabled.
   * @returns {boolean} True if the button should be disabled, false otherwise.
   */
  function checkFindSongsButtonDisabled(): boolean {
    if (mode === Mode.Standard) {
      return (
        selectedGenres.length === 0 ||
        numSongs === 0 ||
        sex === undefined ||
        inches === undefined ||
        feet === undefined
      );
    } else {
      return (
        selectedGenres.length === 0 || numSongs === 0 || energy === undefined
      );
    }
  }

  /**
   * Generates a playlist on the user's Spotify account.
   * @param {string[]} songs A list of the URIs of the songs to add to the playlist.
   * @returns {Promise<void>}
   */
  async function generatePlaylist(songs: string[]): Promise<void> {
    let genres: string = "";
    selectedGenres.forEach((genre: string) => {
      genres = genres + genre + " ";
    });

    await fetch(
      "/api/spotify/playlistBuilder?access_token=" +
        access_token +
        "&id=" +
        profile.id +
        "&playlist_name=" +
        "CaDance Running Playlist: " +
        genres +
        "&playlist_description=" +
        "Playlist generated by CaDance"
    ).then(async (res) => {
      console.log("Playlist created with status " + res.status);
      if (res.status === 201) {
        alert(SESSION_EXPIRED_TEXT);
      } else if (res.status === 200) {
        await res.json().then(async (json) => {
          let playlist_id = json.playlist_id;
          let playlist_url = json.playlist_url;
          await fetch(
            "/api/spotify/playlistPopulator?access_token=" +
              access_token +
              "&playlist_id=" +
              playlist_id +
              "&song_uris=" +
              songs
          ).then(async (res) => {
            console.log("Playlist populated with status " + res.status);
            if (res.status === 401) {
              alert(SESSION_EXPIRED_TEXT);
            } else if (res.status === 429) {
              alert(RATE_LIMIT_TEXT);
            } else if (res.status === 200) {
              console.log("Playlist URL: " + playlist_url);
              setGeneratedPlaylistURL(playlist_url);
            } else {
              await res.json().then((json) => {
                console.log(json.message);
              });
            }
          });
        });
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
                  ? LOGGED_IN_NO_USERNAME
                  : LOGGED_IN_USERNAME + profile.username}
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
                <>
                  <CadenceInput cadence={tempo} setCadence={setTempo} />
                  <EnergyInput energy={energy} setEnergy={setEnergy} />
                </>
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
                  min={1}
                  max={100}
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
                disabled={checkFindSongsButtonDisabled()}
              >
                {FIND_SONGS_TEXT}
              </button>
            </div>
            {playerShow ? (
              <WebPlayer
                songURIs={songs}
                accessToken={access_token}
                setWebPlayerLoaded={setWebPlayerLoaded}
              ></WebPlayer>
            ) : (
              <></>
            )}
            {webPlayerLoaded ? (
              generatedPlaylistURL !== "" ? (
                <a
                  className="search-button playlist-url hvr-grow"
                  href={generatedPlaylistURL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {OPEN_IN_SPOTIFY_TEXT}
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="external-link-icon"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <button
                  className="search-button hvr-grow"
                  onClick={() => generatePlaylist(songs)}
                >
                  {SAVE_AS_PLAYLIST_TEXT}
                </button>
              )
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}
