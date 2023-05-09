import { access } from "fs";
import React, { useState, useEffect } from "react";
const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

interface PlayerProps {
  access_token: string;
  songs: string[];
}

export default function Webplayer(props: PlayerProps) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState<any>(undefined);
  const [current_track, setTrack] = useState(track);
  const [device_id, setDeviceId] = useState<string>();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: any) => {
          cb(props.access_token);
        },
        volume: 0.5,
      });
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
        fetch(
          "/api/spotify/transfer?access_token=" +
            localStorage.getItem("access_token") +
            "&id=" +
            device_id
        ).then(() => {
          fetch(
            "/api/spotify/queue?access_token=" +
              props.access_token +
              "&song_uris=" +
              JSON.stringify(props.songs) +
              "&device_id=" +
              device_id
          );
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
        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    if (device_id !== undefined) {
      setTrack(track);
      fetch(
        "/api/spotify/transfer?access_token=" +
          localStorage.getItem("access_token") +
          "&id=" +
          device_id
      ).then(() => {
        fetch(
          "/api/spotify/queue?access_token=" +
            props.access_token +
            "&song_uris=" +
            JSON.stringify(props.songs) +
            "&device_id=" +
            device_id
        ).then(() => player.seek(0));
      });
    }
  }, [props.songs]);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b></b>
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
                    player.previousTrack();
                  }}
                >
                  &lt;&lt;
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.togglePlay();
                  }}
                >
                  {is_paused ? "PLAY" : "PAUSE"}
                </button>

                <button
                  className="btn-spotify"
                  onClick={() => {
                    player.nextTrack();
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
