import {
  ACCESS_TOKEN_NAME,
  WEBPLAYER_LOADING_TEXT,
  WEBPLAYER_PAUSE,
  WEBPLAYER_PLAY,
} from "@/resources/strings";
import React, { useState, useEffect } from "react";
import { Track, emptyTrack } from "../types/WebPlayerDataTypes";

/**
 * The props for the WebPlayer component.
 * @property {string} access_token The access token for the Spotify API.
 * @property {string[]} song_uris The URIs of the songs to play.
 * @property {(loaded: boolean) => void} setWebPlayerLoaded A function to set the web player loaded state.
 */
interface WebPlayerProps {
  accessToken: string;
  songURIs: string[];
  setWebPlayerLoaded: (loaded: boolean) => void;
}

/**
 * A component that allows the user to play music from Spotify.
 * @param {WebPlayerProps} props The props for the WebPlayer.
 * @returns {JSX.Element} A WebPlayer component.
 */
export default function WebPlayer(props: WebPlayerProps): JSX.Element {
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [current_track, setTrack] = useState<Track>(emptyTrack);
  const [device_id, setDeviceId] = useState<string>();

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player: Spotify.Player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          cb(props.accessToken);
        },
        volume: 0.5,
      });
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
        fetch(
          "/api/spotify/transfer?access_token=" +
            localStorage.getItem(ACCESS_TOKEN_NAME) +
            "&id=" +
            device_id
        ).then(() => {
          fetch(
            "/api/spotify/queue?access_token=" +
              props.accessToken +
              "&song_uris=" +
              JSON.stringify(props.songURIs) +
              "&device_id=" +
              device_id
          ).catch((err) => {
            console.log(err);
            return;
          });
        });
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });
      player.on("initialization_error", ({ message }) => {
        console.error("Failed to initialize", message);
      });
      player.on("authentication_error", ({ message }) => {
        console.error("Failed to authenticate", message);
      });
      player.on("account_error", ({ message }) => {
        console.error("Failed to validate Spotify account", message);
        if (message.includes("premium users only")) {
          alert(
            "You must have a Premium Spotify account to access the Web Player."
          );
          //POTENTIAL TODO: return the list of songs for them to use regardless.

          //OTHER OPTION: skip webplayer, just give them a playlist
        }
      });
      player.on("playback_error", ({ message }) => {
        console.error("Failed to perform playback", message);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        player.getCurrentState().then((state: Spotify.PlaybackState | null) => {
          if (!state) {
            setActive(false);
            props.setWebPlayerLoaded(false);
          } else {
            setActive(true);
            props.setWebPlayerLoaded(true);
          }
        });
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    if (device_id !== undefined && player !== undefined) {
      setTrack(emptyTrack);
      fetch(
        "/api/spotify/transfer?access_token=" +
          localStorage.getItem(ACCESS_TOKEN_NAME) +
          "&id=" +
          device_id
      ).then(() => {
        fetch(
          "/api/spotify/queue?access_token=" +
            props.accessToken +
            "&song_uris=" +
            JSON.stringify(props.songURIs) +
            "&device_id=" +
            device_id
        ).then(() => player.seek(0));
      });
    }
  }, [props.songURIs]);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <p id="webplayerloading">{WEBPLAYER_LOADING_TEXT}</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <p className="now-playing__name">{current_track.name}</p>
              <p className="now-playing__artist">
                {current_track.artists[0].name}
              </p>
              <div className="spotify-btn-div">
                <button
                  className="btn-spotify"
                  onClick={() => {
                    if (player !== undefined) player.previousTrack();
                  }}
                >
                  &lt;&lt;
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    if (player !== undefined) player.togglePlay();
                  }}
                >
                  {is_paused ? WEBPLAYER_PLAY : WEBPLAYER_PAUSE}
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    if (player !== undefined) player.nextTrack();
                  }}
                >
                  &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
